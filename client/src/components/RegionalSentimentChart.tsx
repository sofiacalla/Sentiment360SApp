/**
 * Regional Sentiment Chart Component
 * 
 * Bar chart visualization showing average sentiment scores
 * across different U.S. regions (Northeast, Southeast, Midwest, Southwest, West)
 * 
 * Built with Chart.js for interactive, responsive visualization
 * Scores range from 0-10 (higher is better)
 */

// Import the Card component from shadcn/ui library for consistent card styling
import { Card } from "@/components/ui/card";
// Import useEffect hook for running side effects when component mounts or data changes
import { useEffect, useRef } from "react";
// Import Chart class and registerables (all Chart.js components) from chart.js library
import { Chart, registerables } from "chart.js";
// Import useQuery hook from TanStack Query for data fetching with caching
import { useQuery } from "@tanstack/react-query";
// Import the RegionalSentiment TypeScript type from shared schema for type safety
import type { RegionalSentiment } from "@shared/schema";

// Register all Chart.js components (required for Chart.js version 3 and above)
Chart.register(...registerables);

// Export the component as default export so it can be imported elsewhere
export default function RegionalSentimentChart() {
  // Create a ref to store the canvas DOM element for Chart.js rendering
  const chartRef = useRef<HTMLCanvasElement>(null);
  // Create a ref to store the Chart instance for cleanup and updates
  const chartInstance = useRef<Chart | null>(null);

  /**
   * Fetch Regional Sentiment Data
   * Retrieves sentiment scores for all U.S. regions from the API
   */
  // Destructure data and isLoading from useQuery hook
  const { data: regionalData, isLoading } = useQuery<RegionalSentiment[]>({
    // Set the query key to the regional sentiment API endpoint
    queryKey: ["/api/regional-sentiment"],
  }); // Close useQuery call

  /**
   * Chart Rendering Effect
   * Creates and updates the bar chart when data changes
   * Cleans up previous chart instance to prevent memory leaks
   */
  // useEffect hook runs after render when regionalData changes
  useEffect(() => {
    // Check if canvas ref is not available - exit early if true
    if (!chartRef.current || !regionalData || regionalData.length === 0) return;

    // Get the 2D rendering context from the canvas element
    const ctx = chartRef.current.getContext("2d");
    // If context is null (shouldn't happen but TypeScript safety), exit early
    if (!ctx) return;

    // Check if a chart instance already exists
    if (chartInstance.current) {
      // Destroy the previous chart to prevent memory leaks and duplicate rendering
      chartInstance.current.destroy();
    } // Close if statement

    // Map the regionalData array to extract region names
    const labels = regionalData.map((r) => r.region); // Region names
    // Map the regionalData array to extract sentiment scores and convert to numbers
    const data = regionalData.map((r) => parseFloat(r.sentimentScore)); // Sentiment scores

    // Create new Chart.js bar chart instance
    chartInstance.current = new Chart(ctx, {
      // Set chart type to bar chart
      type: "bar",
      // Define the data for the chart
      data: {
        // Set the x-axis labels to region names
        labels,
        // Define the datasets (we have only one dataset)
        datasets: [
          // First (and only) dataset configuration
          {
            // Label for the dataset (shown in tooltip)
            label: "Average Sentiment Score",
            // The actual data points (sentiment scores)
            data,
            // Background color for the bars (primary blue color)
            backgroundColor: "hsl(221, 83%, 53%)", // Primary blue color
            // Border radius for rounded bar corners (6 pixels)
            borderRadius: 6, // Rounded bar corners
          }, // Close dataset object
        ], // Close datasets array
      }, // Close data object
      // Configure chart options
      options: {
        // Make chart responsive to container size changes
        responsive: true, // Adapt to container size
        // Don't maintain aspect ratio - allow custom height
        maintainAspectRatio: false, // Allow custom height
        // Configure plugins (legend, tooltip, etc.)
        plugins: {
          // Configure the legend
          legend: {
            // Hide legend since we only have one dataset
            display: false, // Hide legend (only one dataset)
          }, // Close legend config
          // Configure the tooltip that appears on hover
          tooltip: {
            // Custom tooltip styling
            // Set tooltip background to dark gray
            backgroundColor: "hsl(0, 0%, 12%)",
            // Set padding inside tooltip to 12 pixels
            padding: 12,
            // Set tooltip title text color to near-white
            titleColor: "hsl(0, 0%, 98%)",
            // Set tooltip body text color to near-white
            bodyColor: "hsl(0, 0%, 98%)",
            // Set tooltip border color to slightly lighter gray
            borderColor: "hsl(0, 0%, 18%)",
            // Set tooltip border width to 1 pixel
            borderWidth: 1,
          }, // Close tooltip config
        }, // Close plugins config
        // Configure the chart scales (x and y axes)
        scales: {
          // Configure the y-axis
          y: {
            // Start y-axis at zero
            beginAtZero: true, // Y-axis starts at 0
            // Set maximum value to 10 (sentiment score range)
            max: 10, // Maximum sentiment score
            // Configure grid lines for y-axis
            grid: {
              // Set grid line color to light gray
              color: "hsl(0, 0%, 88%)", // Light gray grid lines
            }, // Close grid config
            // Configure tick labels on y-axis
            ticks: {
              // Set tick label color to muted gray
              color: "hsl(221, 6%, 40%)", // Muted text color
            }, // Close ticks config
          }, // Close y-axis config
          // Configure the x-axis
          x: {
            // Configure grid lines for x-axis
            grid: {
              // Hide vertical grid lines
              display: false, // Hide vertical grid lines
            }, // Close grid config
            // Configure tick labels on x-axis
            ticks: {
              // Set tick label color to muted gray
              color: "hsl(221, 6%, 40%)", // Muted text color
            }, // Close ticks config
          }, // Close x-axis config
        }, // Close scales config
      }, // Close options object
    }); // Close Chart constructor

    // Cleanup function: runs when component unmounts or before next effect
    return () => {
      // Check if chart instance exists
      if (chartInstance.current) {
        // Destroy the chart to free memory
        chartInstance.current.destroy();
      } // Close if statement
    }; // Close cleanup function
  }, [regionalData]); // Re-run effect when regionalData changes

  // Return the JSX to render
  return (
    // Outer Card container with padding and test ID
    <Card className="p-6" data-testid="chart-regional-sentiment">
      {/* Chart Header */}
      {/* Flex container for header with space between items */}
      <div className="flex justify-between items-center mb-4">
        {/* Chart title heading */}
        <h3 className="text-lg font-semibold">Sentiment by U.S. Region</h3>
        {/* Time period label */}
        <span className="text-xs text-muted-foreground">Last 30 days</span>
      </div>

      {/* Chart Container with fixed height */}
      <div className="h-80">
        {/* Conditional rendering based on loading state */}
        {isLoading ? (
          // Loading State - shown while data is being fetched
          // Flex container to center loading message
          <div className="flex items-center justify-center h-full">
            {/* Loading message text */}
            <div className="text-sm text-muted-foreground">Loading chart data...</div>
          </div> // Close loading container
        ) : (
          // Chart Canvas - shown when data is loaded
          // Canvas element where Chart.js renders the chart
          <canvas ref={chartRef} />
        )} {/* Close conditional rendering */}
      </div> {/* Close chart container */}
    </Card> // Close Card component
  ); // Close return statement
} // Close component function
