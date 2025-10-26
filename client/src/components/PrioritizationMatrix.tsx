/**
 * Prioritization Matrix Component
 * 
 * Scatter plot visualization of priority items plotted on a 2D grid:
 * - X-axis: Effort (1-10, low to high)
 * - Y-axis: Impact (1-10, low to high)
 * 
 * Four quadrants help identify initiative types:
 * - Bottom-left: Fill Ins (low impact, low effort)
 * - Bottom-right: Quick Wins (high impact, low effort) ⭐ Best opportunities
 * - Top-left: Hard Slogs (low impact, high effort) ⚠️ Avoid these
 * - Top-right: Major Projects (high impact, high effort)
 */

import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { PriorityItem } from "@shared/schema";

export default function PrioritizationMatrix() {
  /**
   * Fetch Priority Items Data
   * Retrieves all priority items from the API for plotting
   */
  const { data: priorityData, isLoading } = useQuery<PriorityItem[]>({
    queryKey: ["/api/priority-items"],
  });

  // Limit to first 6 items for cleaner visualization
  const matrixItems = priorityData?.slice(0, 6) || [];

  return (
    <Card className="p-6" data-testid="card-prioritization-matrix">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Impact vs. Effort Matrix</h3>
      </div>
      
      {isLoading ? (
        // Loading State: Show skeleton placeholder
        <div className="aspect-square rounded-lg bg-muted/20 animate-pulse" />
      ) : (
        <>
          {/* Matrix Grid */}
          <div className="relative aspect-square bg-muted/20 rounded-lg border">
            {/* Four Quadrants with Color-Coded Labels */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {/* Bottom-Left: Fill Ins (low impact, low effort) */}
              <div className="border-r border-b p-4 flex items-start justify-start">
                <span className="text-xs font-medium text-muted-foreground">Fill Ins</span>
              </div>
              
              {/* Bottom-Right: Quick Wins (high impact, low effort) */}
              <div className="border-b p-4 flex items-start justify-start bg-green-500/5">
                <span className="text-xs font-medium text-green-700">Quick Wins</span>
              </div>
              
              {/* Top-Left: Hard Slogs (low impact, high effort) */}
              <div className="border-r p-4 flex items-start justify-start bg-red-500/5">
                <span className="text-xs font-medium text-red-700">Hard Slogs</span>
              </div>
              
              {/* Top-Right: Major Projects (high impact, high effort) */}
              <div className="p-4 flex items-start justify-start bg-yellow-500/5">
                <span className="text-xs font-medium text-yellow-700">Major Projects</span>
              </div>
            </div>
            
            {/* Plotted Items as Numbered Circles */}
            {matrixItems.map((item, index) => {
              // Calculate position based on impact/effort scores
              // X position: effort (0-10) mapped to 0-100%
              const x = (item.effort / 10) * 100;
              // Y position: impact (0-10) mapped to 100-0% (inverted for top = high)
              const y = 100 - (item.impact / 10) * 100;
              
              return (
                <div
                  key={item.id}
                  className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-xs font-medium cursor-pointer hover-elevate active-elevate-2 border-2 border-background"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  data-testid={`matrix-item-${item.id}`}
                  title={`${item.title} - Impact: ${item.impact}, Effort: ${item.effort}`}
                >
                  {index + 1}
                </div>
              );
            })}
            
            {/* X-Axis Label (Effort) */}
            <div className="absolute -bottom-6 left-0 right-0 text-center">
              <span className="text-xs font-medium text-muted-foreground">Effort →</span>
            </div>
            
            {/* Y-Axis Label (Impact) */}
            <div className="absolute -left-12 top-0 bottom-0 flex items-center">
              <span className="text-xs font-medium text-muted-foreground transform -rotate-90">← Impact</span>
            </div>
          </div>
          
          {/* Legend: Maps numbered circles to item titles */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {matrixItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-2 text-sm"
                data-testid={`matrix-legend-${item.id}`}
              >
                {/* Number Badge */}
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                {/* Item Title */}
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
