/**
 * Regional Sentiment Chart Component
 * 
 * Bar chart visualization showing average sentiment scores
 * across different U.S. regions (Northeast, Southeast, Midwest, Southwest, West)
 * 
 * Built with Chart.js for interactive, responsive visualization
 * Scores range from 0-10 (higher is better)
 */

import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import type { RegionalSentiment } from "@shared/schema";

// Register Chart.js components (required for Chart.js v3+)
Chart.register(...registerables);

export default function RegionalSentimentChart() {
  // Canvas reference for Chart.js rendering
  const chartRef = useRef<HTMLCanvasElement>(null);
  // Chart instance reference for cleanup
  const chartInstance = useRef<Chart | null>(null);

  /**
   * Fetch Regional Sentiment Data
   * Retrieves sentiment scores for all U.S. regions from the API
   */
  const { data: regionalData, isLoading } = useQuery<RegionalSentiment[]>({
    queryKey: ["/api/regional-sentiment"],
  });

  /**
   * Chart Rendering Effect
   * Creates and updates the bar chart when data changes
   * Cleans up previous chart instance to prevent memory leaks
   */
  useEffect(() => {
    // Exit early if canvas or data not available
    if (!chartRef.current || !regionalData || regionalData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Prepare chart data
    const labels = regionalData.map((r) => r.region); // Region names
    const data = regionalData.map((r) => parseFloat(r.sentimentScore)); // Sentiment scores

    // Create new Chart.js bar chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Average Sentiment Score",
            data,
            backgroundColor: "hsl(221, 83%, 53%)", // Primary blue color
            borderRadius: 6, // Rounded bar corners
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
  }, [regionalData]); // Re-run when data changes

  return (
    <Card className="p-6" data-testid="chart-regional-sentiment">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Sentiment by U.S. Region</h3>
        <span className="text-xs text-muted-foreground">Last 30 days</span>
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
