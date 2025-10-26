/**
 * SENTIMENT TREND CHART COMPONENT
 * 
 * Line chart showing sentiment score evolution over time:
 * - X-axis: Months (Jan through Oct)
 * - Y-axis: Sentiment score (0-10 scale)
 * - Filled area under the line for visual emphasis
 * 
 * FEATURES:
 * - Smooth curved line with tension 0.4
 * - Interactive tooltips showing exact values
 * - Period selector buttons (30D, 90D, All) - currently non-functional placeholders
 * 
 * CHART CONFIGURATION:
 * - Built with Chart.js
 * - Auto-destroys and recreates on data updates
 */

import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import type { SentimentTrend } from "@shared/schema";

Chart.register(...registerables);

export default function SentimentTrendChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Fetch sentiment trends from API
  const { data: trendsData, isLoading } = useQuery<SentimentTrend[]>({
    queryKey: ["/api/sentiment-trends"],
  });

  // CHART LIFECYCLE: Create/update chart when data changes
  useEffect(() => {
    if (!chartRef.current || !trendsData || trendsData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Extract labels and data
    const labels = trendsData.map((t) => t.month);
    const data = trendsData.map((t) => parseFloat(t.score));

    // Create new line chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Sentiment Score",
            data,
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
  }, [trendsData]);

  return (
    <Card className="p-6" data-testid="chart-sentiment-trend">
      {/* Chart Header with Period Selectors */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Overall Sentiment Trend</h3>
        
        {/* Time Period Buttons - currently non-functional placeholders */}
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground" data-testid="button-period-30d">
            30D
          </button>
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-90d">
            90D
          </button>
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-all">
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
