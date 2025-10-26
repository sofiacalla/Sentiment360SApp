/**
 * Prioritization Matrix Component
 * 
 * Scatter plot visualization of priority items plotted on a 2D grid:
 * - X-axis: Effort (1-10, low to high)
 * - Y-axis: Impact (1-10, low to high)
 * 
 * Four quadrants help identify initiative types:
 * - Bottom-left: Fill Ins (low impact, low effort)
 * - Bottom-Right: Quick Wins (high impact, low effort) ⭐ Best opportunities
 * - Top-left: Hard Slogs (low impact, high effort) ⚠️ Avoid these
 * - Top-right: Major Projects (high impact, high effort)
 */

// Import Card component from shadcn/ui for consistent card styling
import { Card } from "@/components/ui/card";
// Import useQuery hook from TanStack Query for data fetching
import { useQuery } from "@tanstack/react-query";
// Import PriorityItem TypeScript type from shared schema
import type { PriorityItem } from "@shared/schema";

// Export the component as default export
export default function PrioritizationMatrix() {
  /**
   * Fetch Priority Items Data
   * Retrieves all priority items from the API for plotting
   */
  // Destructure data (renamed to priorityData) and isLoading from useQuery
  const { data: priorityData, isLoading } = useQuery<PriorityItem[]>({
    // Define the query key for caching
    queryKey: ["/api/priority-items"],
  }); // Close useQuery call

  // Limit to first 6 items for cleaner visualization - use optional chaining and fallback to empty array
  const matrixItems = priorityData?.slice(0, 6) || [];

  // Return JSX to render
  return (
    // Outer Card container with padding and test ID
    <Card className="p-6" data-testid="card-prioritization-matrix">
      {/* Chart Header - flex container with space between items and bottom margin */}
      <div className="flex justify-between items-center mb-6">
        {/* Chart title heading with large semibold font */}
        <h3 className="text-lg font-semibold">Impact vs. Effort Matrix</h3>
      </div>
      
      {/* Conditional rendering based on loading state */}
      {isLoading ? (
        // Loading State: Show skeleton placeholder with square aspect ratio and pulse animation
        <div className="aspect-square rounded-lg bg-muted/20 animate-pulse" />
      ) : (
        // Loaded State: Show matrix and legend wrapped in fragment
        <>
          {/* Matrix Grid - relative positioned container with square aspect ratio */}
          <div className="relative aspect-square bg-muted/20 rounded-lg border">
            {/* Four Quadrants with Color-Coded Labels - absolute positioned grid filling parent */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {/* Bottom-Left Quadrant: Fill Ins (low impact, low effort) */}
              {/* Right and bottom borders, padding, flex to position content */}
              <div className="border-r border-b p-4 flex items-start justify-start">
                {/* Quadrant label in small muted text */}
                <span className="text-xs font-medium text-muted-foreground">Fill Ins</span>
              </div>
              
              {/* Bottom-Right Quadrant: Quick Wins (high impact, low effort) */}
              {/* Bottom border, padding, flex, light green background */}
              <div className="border-b p-4 flex items-start justify-start bg-green-500/5">
                {/* Quadrant label in small green text */}
                <span className="text-xs font-medium text-green-700">Quick Wins</span>
              </div>
              
              {/* Top-Left Quadrant: Hard Slogs (low impact, high effort) */}
              {/* Right border, padding, flex, light red background */}
              <div className="border-r p-4 flex items-start justify-start bg-red-500/5">
                {/* Quadrant label in small red text */}
                <span className="text-xs font-medium text-red-700">Hard Slogs</span>
              </div>
              
              {/* Top-Right Quadrant: Major Projects (high impact, high effort) */}
              {/* Padding, flex, light yellow background */}
              <div className="p-4 flex items-start justify-start bg-yellow-500/5">
                {/* Quadrant label in small yellow text */}
                <span className="text-xs font-medium text-yellow-700">Major Projects</span>
              </div>
            </div>
            
            {/* Plotted Items as Numbered Circles - map over matrixItems array */}
            {matrixItems.map((item, index) => {
              // Calculate X position based on effort score (0-10 mapped to 0-100%)
              const x = (item.effort / 10) * 100;
              // Calculate Y position based on impact score (0-10 mapped to 100-0%, inverted so high impact is at top)
              const y = 100 - (item.impact / 10) * 100;
              
              // Return JSX for each item circle
              return (
                // Absolute positioned circle with negative margins to center on calculated position
                // Width and height 12, centered with flex, primary background, white text, rounded full circle
                // Small font, pointer cursor, hover and active elevation effects, white border
                <div
                  key={item.id} // Unique key for React list rendering
                  className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-xs font-medium cursor-pointer hover-elevate active-elevate-2 border-2 border-background"
                  style={{ left: `${x}%`, top: `${y}%` }} // Inline styles for dynamic positioning
                  data-testid={`matrix-item-${item.id}`} // Test ID for testing
                  title={`${item.title} - Impact: ${item.impact}, Effort: ${item.effort}`} // Tooltip on hover
                >
                  {/* Display item number (1-indexed) */}
                  {index + 1}
                </div>
              ); // Close return statement
            })} {/* Close map function */}
            
            {/* X-Axis Label (Effort) - absolute positioned below matrix */}
            <div className="absolute -bottom-6 left-0 right-0 text-center">
              {/* Label text with arrow indicating direction */}
              <span className="text-xs font-medium text-muted-foreground">Effort →</span>
            </div>
            
            {/* Y-Axis Label (Impact) - absolute positioned left of matrix */}
            <div className="absolute -left-12 top-0 bottom-0 flex items-center">
              {/* Label text rotated -90 degrees with arrow */}
              <span className="text-xs font-medium text-muted-foreground transform -rotate-90">← Impact</span>
            </div>
          </div>
          
          {/* Legend: Maps numbered circles to item titles - grid with 2 columns and gap */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {/* Map over matrixItems to create legend entries */}
            {matrixItems.map((item, index) => (
              // Flex container for each legend item with gap between badge and text
              <div
                key={item.id} // Unique key for React list rendering
                className="flex items-center gap-2 text-sm"
                data-testid={`matrix-legend-${item.id}`} // Test ID
              >
                {/* Number Badge - small circle matching matrix item numbers */}
                {/* Width and height 6, rounded full circle, primary background and text, centered flex, small font */}
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  {/* Display item number (1-indexed) */}
                  {index + 1}
                </div>
                {/* Item Title text */}
                <span>{item.title}</span>
              </div>
            ))} {/* Close map function */}
          </div>
        </>
      )} {/* Close conditional rendering */}
    </Card>
  ); // Close return
} // Close component function
