/**
 * Sentiment Trend Chart Component
 * 
 * Line chart showing sentiment score evolution over time
 * - X-axis: Months (Jan through Oct)
 * - Y-axis: Sentiment score (0-10 scale)
 * - Filled area under the line for visual emphasis
 * 
 * Built with Chart.js for smooth, interactive visualization
 * Includes period selector buttons (30D, 90D, All) - currently non-functional
 */

import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import type { SentimentTrend } from "@shared/schema";

// Register Chart.js components (required for Chart.js v3+)
Chart.register(...registerables);

export default function SentimentTrendChart() {
  // Canvas reference for Chart.js rendering
  const chartRef = useRef<HTMLCanvasElement>(null);
  // Chart instance reference for cleanup
  const chartInstance = useRef<Chart | null>(null);

  /**
   * Fetch Sentiment Trends Data
   * Retrieves historical sentiment scores from the API
   */
  const { data: trendsData, isLoading } = useQuery<SentimentTrend[]>({
    queryKey: ["/api/sentiment-trends"],
  });

  /**
   * Chart Rendering Effect
   * Creates and updates the line chart when data changes
   * Cleans up previous chart instance to prevent memory leaks
   */
  useEffect(() => {
    // Exit early if canvas or data not available
    if (!chartRef.current || !trendsData || trendsData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Prepare chart data
    const labels = trendsData.map((t) => t.month); // Month labels (Jan, Feb, etc.)
    const data = trendsData.map((t) => parseFloat(t.score)); // Sentiment scores

    // Create new Chart.js line chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Sentiment Score",
            data,
            borderColor: "hsl(221, 83%, 53%)", // Primary blue line color
            backgroundColor: "hsla(221, 83%, 53%, 0.1)", // Light blue fill
            fill: true, // Fill area under line
            tension: 0.4, // Smooth curve (0 = straight, 1 = very curved)
            pointRadius: 4, // Data point size
            pointHoverRadius: 6, // Data point size on hover
          },
        ],
      },
      options: {
        responsive: true, // Adapt to container size
        maintainAspectRatio: false, // Allow custom height
        plugins: {
          legend: {
            display: false, // Hide legend (only one dataset)
          },
          tooltip: {
            // Custom tooltip styling
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
            beginAtZero: true, // Y-axis starts at 0
            max: 10, // Maximum sentiment score
            grid: {
              color: "hsl(0, 0%, 88%)", // Light gray grid lines
            },
            ticks: {
              color: "hsl(221, 6%, 40%)", // Muted text color
            },
          },
          x: {
            grid: {
              display: false, // Hide vertical grid lines
            },
            ticks: {
              color: "hsl(221, 6%, 40%)", // Muted text color
            },
          },
        },
      },
    });

    // Cleanup function: destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [trendsData]); // Re-run when data changes

  return (
    <Card className="p-6" data-testid="chart-sentiment-trend">
      {/* Chart Header with Period Selectors */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Overall Sentiment Trend</h3>
        
        {/* Time Period Buttons (currently non-functional - placeholder for future feature) */}
        <div className="flex gap-2">
          {/* 30 Days - Active by default */}
          <button className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground" data-testid="button-period-30d">
            30D
          </button>
          
          {/* 90 Days */}
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-90d">
            90D
          </button>
          
          {/* All Time */}
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-all">
            All
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80">
        {isLoading ? (
          // Loading State
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-muted-foreground">Loading chart data...</div>
          </div>
        ) : (
          // Chart Canvas
          <canvas ref={chartRef} />
        )}
      </div>
    </Card>
  );
}
