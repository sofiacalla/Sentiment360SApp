/**
 * PRIORITIZATION MATRIX COMPONENT
 * 
 * Scatter plot visualization showing priority items on an Impact vs Effort grid:
 * 
 * FOUR QUADRANTS:
 * - Bottom-Left: "Fill Ins" (low impact, low effort) - nice to have
 * - Bottom-Right: "Quick Wins" (high impact, low effort) ⭐ PRIORITIZE THESE
 * - Top-Left: "Hard Slogs" (low impact, high effort) - avoid these
 * - Top-Right: "Major Projects" (high impact, high effort) - plan carefully
 * 
 * VISUALIZATION:
 * - Items plotted as numbered circles (1-6)
 * - Position calculated from impact/effort scores (0-10 scale)
 * - Legend below maps numbers to item titles
 * - Colored quadrants indicate strategic value
 * 
 * USAGE: Helps teams identify which initiatives provide best ROI
 */

import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { PriorityItem } from "@shared/schema";

export default function PrioritizationMatrix() {
  // Fetch all priority items from API
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
        <div className="aspect-square rounded-lg bg-muted/20 animate-pulse" />
      ) : (
        <>
          {/* MATRIX GRID: Four quadrants with color coding */}
          <div className="relative aspect-square bg-muted/20 rounded-lg border">
            {/* Four Quadrants with Labels */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              {/* Bottom-Left: Fill Ins */}
              <div className="border-r border-b p-4 flex items-start justify-start">
                <span className="text-xs font-medium text-muted-foreground">Fill Ins</span>
              </div>
              
              {/* Bottom-Right: Quick Wins (green highlight) */}
              <div className="border-b p-4 flex items-start justify-start bg-green-500/5">
                <span className="text-xs font-medium text-green-700">Quick Wins</span>
              </div>
              
              {/* Top-Left: Hard Slogs (red highlight) */}
              <div className="border-r p-4 flex items-start justify-start bg-red-500/5">
                <span className="text-xs font-medium text-red-700">Hard Slogs</span>
              </div>
              
              {/* Top-Right: Major Projects (yellow highlight) */}
              <div className="p-4 flex items-start justify-start bg-yellow-500/5">
                <span className="text-xs font-medium text-yellow-700">Major Projects</span>
              </div>
            </div>
            
            {/* PLOTTED ITEMS: Numbered circles positioned by impact/effort scores */}
            {matrixItems.map((item, index) => {
              // Calculate X position (0-100%) based on effort score
              const x = (item.effort / 10) * 100;
              // Calculate Y position (100-0%) based on impact score (inverted so high impact is at top)
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
            
            {/* AXIS LABELS */}
            <div className="absolute -bottom-6 left-0 right-0 text-center">
              <span className="text-xs font-medium text-muted-foreground">Effort →</span>
            </div>
            <div className="absolute -left-12 top-0 bottom-0 flex items-center">
              <span className="text-xs font-medium text-muted-foreground transform -rotate-90">← Impact</span>
            </div>
          </div>
          
          {/* LEGEND: Maps numbered circles to item titles */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {matrixItems.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center gap-2 text-sm"
                data-testid={`matrix-legend-${item.id}`}
              >
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                  {index + 1}
                </div>
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
