/**
 * SENTIMENT TREND CHART COMPONENT
 * 
 * Line chart showing sentiment score evolution over time:
 * - X-axis: Days (for 30D view) or Months (for 90D/All views)
 * - Y-axis: Sentiment score (0-10 scale)
 * - Filled area under the line for visual emphasis
 * 
 * FEATURES:
 * - Smooth curved line with tension 0.4
 * - Interactive tooltips showing exact values
 * - Period selector buttons (30D, 90D, All) - filters data by time range
 * - Smart data fetching: daily data for 30D, monthly data for 90D/All
 * 
 * CHART CONFIGURATION:
 * - Built with Chart.js
 * - Auto-destroys and recreates on data updates
 */

import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";

Chart.register(...registerables);

type TimePeriod = "30d" | "90d" | "all";

// Type for daily sentiment data
interface DailySentimentData {
  date: string; // "Day 1", "Day 2", etc.
  score: string;
}

// Type for monthly sentiment data
interface MonthlySentimentData {
  month: string; // "Jan", "Feb", etc.
  score: string;
}

export default function SentimentTrendChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  
  // Track selected time period (default: 30 days)
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("30d");

  // Fetch daily sentiment data for 30D view using custom queryFn
  const { data: dailyData, isLoading: isDailyLoading } = useQuery<DailySentimentData[]>({
    queryKey: ["/api/sentiment-trends", "daily", 30],
    queryFn: async () => {
      const response = await fetch("/api/sentiment-trends?period=daily&days=30");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    },
    enabled: selectedPeriod === "30d", // Only fetch when 30D is selected
  });

  // Fetch monthly sentiment data for 90D and All views
  const { data: monthlyData, isLoading: isMonthlyLoading } = useQuery<MonthlySentimentData[]>({
    queryKey: ["/api/sentiment-trends"],
    enabled: selectedPeriod !== "30d", // Only fetch when 90D or All is selected
  });

  /**
   * FILTER MONTHLY DATA BY TIME PERIOD
   * Returns subset of monthly data based on selected period
   */
  const getFilteredMonthlyData = () => {
    if (!monthlyData || monthlyData.length === 0) return [];
    
    if (selectedPeriod === "all") {
      return monthlyData;
    }
    
    // 90D: show last 3 months
    return monthlyData.slice(-3);
  };

  /**
   * GET CHART DATA
   * Returns the appropriate data set based on selected period
   */
  const getChartData = () => {
    if (selectedPeriod === "30d") {
      return {
        labels: dailyData?.map(d => d.date) || [],
        data: dailyData?.map(d => parseFloat(d.score)) || [],
      };
    } else {
      const filteredData = getFilteredMonthlyData();
      return {
        labels: filteredData.map(d => d.month),
        data: filteredData.map(d => parseFloat(d.score)),
      };
    }
  };

  const chartData = getChartData();
  const isLoading = selectedPeriod === "30d" ? isDailyLoading : isMonthlyLoading;

  // CHART LIFECYCLE: Create/update chart when data or period changes
  useEffect(() => {
    if (!chartRef.current || !chartData.labels.length || isLoading) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new line chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: "Sentiment Score",
            data: chartData.data,
            borderColor: "hsl(221, 83%, 53%)",
            backgroundColor: "hsla(221, 83%, 53%, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "hsl(0, 0%, 12%)",
            padding: 12,
            titleColor: "hsl(0, 0%, 98%)",
            bodyColor: "hsl(0, 0%, 98%)",
            borderColor: "hsl(0, 0%, 18%)",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            grid: {
              color: "hsl(0, 0%, 88%)",
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
              // For 30D view with many days, show fewer labels
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: selectedPeriod === "30d" ? 10 : 12,
            },
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData, isLoading, selectedPeriod]);

  return (
    <Card className="p-6" data-testid="chart-sentiment-trend">
      {/* Chart Header with Period Selectors */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Overall Sentiment Trend</h3>
        
        {/* Time Period Buttons - filters chart data */}
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedPeriod("30d")}
            className={`text-xs px-3 py-1 rounded-md ${
              selectedPeriod === "30d" 
                ? "bg-primary text-primary-foreground" 
                : "hover-elevate active-elevate-2"
            }`}
            data-testid="button-period-30d"
          >
            30D
          </button>
          <button 
            onClick={() => setSelectedPeriod("90d")}
            className={`text-xs px-3 py-1 rounded-md ${
              selectedPeriod === "90d" 
                ? "bg-primary text-primary-foreground" 
                : "hover-elevate active-elevate-2"
            }`}
            data-testid="button-period-90d"
          >
            90D
          </button>
          <button 
            onClick={() => setSelectedPeriod("all")}
            className={`text-xs px-3 py-1 rounded-md ${
              selectedPeriod === "all" 
                ? "bg-primary text-primary-foreground" 
                : "hover-elevate active-elevate-2"
            }`}
            data-testid="button-period-all"
          >
            All
          </button>
        </div>
      </div>

      {/* Chart Canvas or Loading State */}
      <div className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-muted-foreground">Loading chart data...</div>
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </Card>
  );
}
