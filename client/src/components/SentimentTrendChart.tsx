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

// Import the Card component from shadcn/ui library for consistent card styling
import { Card } from "@/components/ui/card";
// Import useEffect hook for side effects and useRef for DOM references
import { useEffect, useRef } from "react";
// Import Chart class and all Chart.js components from chart.js library
import { Chart, registerables } from "chart.js";
// Import useQuery hook from TanStack Query for server state management
import { useQuery } from "@tanstack/react-query";
// Import the SentimentTrend TypeScript type from shared schema
import type { SentimentTrend } from "@shared/schema";

// Register all Chart.js components (required for Chart.js v3+)
Chart.register(...registerables);

// Export the component as default so it can be imported elsewhere
export default function SentimentTrendChart() {
  // Create ref to store canvas DOM element reference
  const chartRef = useRef<HTMLCanvasElement>(null);
  // Create ref to store Chart instance for cleanup and updates
  const chartInstance = useRef<Chart | null>(null);

  /**
   * Fetch Sentiment Trends Data
   * Retrieves historical sentiment scores from the API
   */
  // Destructure data and isLoading from useQuery hook
  const { data: trendsData, isLoading } = useQuery<SentimentTrend[]>({
    // Define the query key for caching and identification
    queryKey: ["/api/sentiment-trends"],
  }); // Close useQuery call

  /**
   * Chart Rendering Effect
   * Creates and updates the line chart when data changes
   * Cleans up previous chart instance to prevent memory leaks
   */
  // useEffect runs after render when trendsData dependency changes
  useEffect(() => {
    // Exit early if canvas ref, trendsData, or data array is empty
    if (!chartRef.current || !trendsData || trendsData.length === 0) return;

    // Get 2D rendering context from canvas element
    const ctx = chartRef.current.getContext("2d");
    // Exit early if context is null (TypeScript safety check)
    if (!ctx) return;

    // Check if chart instance already exists
    if (chartInstance.current) {
      // Destroy previous chart to prevent memory leaks
      chartInstance.current.destroy();
    } // Close if statement

    // Extract month labels from trends data array
    const labels = trendsData.map((t) => t.month); // Month labels (Jan, Feb, etc.)
    // Extract sentiment scores and convert decimal strings to floats
    const data = trendsData.map((t) => parseFloat(t.score)); // Sentiment scores

    // Create new Chart.js line chart instance
    chartInstance.current = new Chart(ctx, {
      // Set chart type to line chart
      type: "line",
      // Define chart data
      data: {
        // Set x-axis labels to month names
        labels,
        // Define datasets array
        datasets: [
          // First and only dataset
          {
            // Label shown in tooltip
            label: "Sentiment Score",
            // The data points (sentiment scores)
            data,
            // Line color (primary blue)
            borderColor: "hsl(221, 83%, 53%)", // Primary blue line color
            // Fill color under line (transparent blue)
            backgroundColor: "hsla(221, 83%, 53%, 0.1)", // Light blue fill
            // Enable fill under the line
            fill: true, // Fill area under line
            // Curve tension (0 = straight, 1 = very curved)
            tension: 0.4, // Smooth curve (0 = straight, 1 = very curved)
            // Size of data point circles
            pointRadius: 4, // Data point size
            // Size of data point circles on hover
            pointHoverRadius: 6, // Data point size on hover
          }, // Close dataset object
        ], // Close datasets array
      }, // Close data object
      // Configure chart options
      options: {
        // Make chart adapt to container size
        responsive: true, // Adapt to container size
        // Don't maintain aspect ratio - use custom height
        maintainAspectRatio: false, // Allow custom height
        // Configure plugins
        plugins: {
          // Configure legend display
          legend: {
            // Hide legend (only one dataset)
            display: false, // Hide legend (only one dataset)
          }, // Close legend config
          // Configure tooltip appearance
          tooltip: {
            // Custom tooltip styling
            // Dark background color
            backgroundColor: "hsl(0, 0%, 12%)",
            // Inner padding
            padding: 12,
            // Title text color
            titleColor: "hsl(0, 0%, 98%)",
            // Body text color
            bodyColor: "hsl(0, 0%, 98%)",
            // Border color
            borderColor: "hsl(0, 0%, 18%)",
            // Border width
            borderWidth: 1,
          }, // Close tooltip config
        }, // Close plugins config
        // Configure x and y axes
        scales: {
          // Configure y-axis
          y: {
            // Start y-axis at 0
            beginAtZero: true, // Y-axis starts at 0
            // Set maximum to 10
            max: 10, // Maximum sentiment score
            // Configure grid lines
            grid: {
              // Light gray grid lines
              color: "hsl(0, 0%, 88%)", // Light gray grid lines
            }, // Close grid config
            // Configure tick labels
            ticks: {
              // Muted text color
              color: "hsl(221, 6%, 40%)", // Muted text color
            }, // Close ticks config
          }, // Close y-axis config
          // Configure x-axis
          x: {
            // Configure grid lines
            grid: {
              // Hide vertical grid lines
              display: false, // Hide vertical grid lines
            }, // Close grid config
            // Configure tick labels
            ticks: {
              // Muted text color
              color: "hsl(221, 6%, 40%)", // Muted text color
            }, // Close ticks config
          }, // Close x-axis config
        }, // Close scales config
      }, // Close options object
    }); // Close Chart constructor

    // Cleanup function runs before next effect or unmount
    return () => {
      // Check if chart instance exists
      if (chartInstance.current) {
        // Destroy chart to free memory
        chartInstance.current.destroy();
      } // Close if statement
    }; // Close cleanup function
  }, [trendsData]); // Re-run when trendsData changes

  // Return JSX to render
  return (
    // Outer Card container with padding and test ID
    <Card className="p-6" data-testid="chart-sentiment-trend">
      {/* Chart Header with Period Selectors */}
      {/* Flex container with space between items */}
      <div className="flex justify-between items-center mb-4">
        {/* Chart title */}
        <h3 className="text-lg font-semibold">Overall Sentiment Trend</h3>
        
        {/* Time Period Buttons (currently non-functional - placeholder for future feature) */}
        {/* Flex container for button group */}
        <div className="flex gap-2">
          {/* 30 Days - Active by default */}
          {/* Button with primary background (active state) */}
          <button className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground" data-testid="button-period-30d">
            {/* Button text */}
            30D
          </button> {/* Close button */}
          
          {/* 90 Days */}
          {/* Button with hover and active elevation effects */}
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-90d">
            {/* Button text */}
            90D
          </button> {/* Close button */}
          
          {/* All Time */}
          {/* Button with hover and active elevation effects */}
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-all">
            {/* Button text */}
            All
          </button> {/* Close button */}
        </div> {/* Close button group container */}
      </div> {/* Close header */}

      {/* Chart Container with fixed height */}
      <div className="h-80">
        {/* Conditional rendering based on loading state */}
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
