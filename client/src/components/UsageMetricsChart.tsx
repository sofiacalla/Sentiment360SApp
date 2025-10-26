/**
 * Usage Metrics Chart Component
 * 
 * Dual-axis line chart showing:
 * - Left Y-axis: Daily Active Users (DAU) - Blue line
 * - Right Y-axis: Satisfaction Score (0-10) - Purple line
 * - X-axis: Week labels
 * 
 * Demonstrates correlation between user growth and satisfaction over time
 * Built with Chart.js for interactive, multi-axis visualization
 */

import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import type { UsageMetric } from "@shared/schema";

// Register Chart.js components (required for Chart.js v3+)
Chart.register(...registerables);

export default function UsageMetricsChart() {
  // Canvas reference for Chart.js rendering
  const chartRef = useRef<HTMLCanvasElement>(null);
  // Chart instance reference for cleanup
  const chartInstance = useRef<Chart | null>(null);

  /**
   * Fetch Usage Metrics Data
   * Retrieves weekly user engagement data from the API
   */
  const { data: usageData, isLoading } = useQuery<UsageMetric[]>({
    queryKey: ["/api/usage-metrics"],
  });

  /**
   * Chart Rendering Effect
   * Creates and updates the dual-axis line chart when data changes
   * Cleans up previous chart instance to prevent memory leaks
   */
  useEffect(() => {
    // Exit early if canvas or data not available
    if (!chartRef.current || !usageData || usageData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Prepare chart data
    const labels = usageData.map((m) => m.week); // Week labels (Week 1, Week 2, etc.)
    const dauData = usageData.map((m) => m.dailyActiveUsers); // DAU counts
    const satisfactionData = usageData.map((m) => parseFloat(m.satisfactionScore)); // Satisfaction scores

    // Create new Chart.js line chart with dual axes
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Daily Active Users",
            data: dauData,
            borderColor: "hsl(221, 83%, 53%)", // Primary blue
            backgroundColor: "hsla(221, 83%, 53%, 0.1)", // Light blue fill
            yAxisID: "y", // Use left Y-axis
            tension: 0.4, // Smooth curve
          },
          {
            label: "Satisfaction Score",
            data: satisfactionData,
            borderColor: "hsl(262, 83%, 58%)", // Purple
            backgroundColor: "hsla(262, 83%, 58%, 0.1)", // Light purple fill
            yAxisID: "y1", // Use right Y-axis
            tension: 0.4, // Smooth curve
          },
        ],
      },
      options: {
        responsive: true, // Adapt to container size
        maintainAspectRatio: false, // Allow custom height
        interaction: {
          mode: "index", // Show both datasets on hover
          intersect: false, // Show tooltip without hovering directly on line
        },
        plugins: {
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
          // Left Y-axis: Daily Active Users
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Daily Active Users",
              color: "hsl(221, 6%, 40%)",
            },
            grid: {
              color: "hsl(0, 0%, 88%)", // Light gray grid lines
            },
            ticks: {
              color: "hsl(221, 6%, 40%)", // Muted text color
            },
          },
          // Right Y-axis: Satisfaction Score
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Satisfaction Score",
              color: "hsl(221, 6%, 40%)",
            },
            grid: {
              drawOnChartArea: false, // Don't draw grid lines (avoid overlap with left axis)
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
            },
            min: 0, // Minimum satisfaction score
            max: 10, // Maximum satisfaction score
          },
          // X-axis: Week Labels
          x: {
            grid: {
              display: false, // Hide vertical grid lines
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
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
  }, [usageData]); // Re-run when data changes

  return (
    <Card className="p-6" data-testid="chart-usage-metrics">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Usage & Satisfaction Trends</h3>
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
