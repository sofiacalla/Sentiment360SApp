/**
 * Priority List Component
 * 
 * Displays priority items in a ranked list format with:
 * - Rank number badge
 * - Item title and description
 * - Category badge
 * - Impact and Effort scores
 * 
 * Items are sorted by rank (1 = highest priority)
 * Includes sort filter buttons (currently non-functional placeholders)
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { PriorityItem } from "@shared/schema";

export default function PriorityList() {
  /**
   * Fetch Priority Items Data
   * Retrieves all priority items from the API
   */
  const { data: priorityData, isLoading } = useQuery<PriorityItem[]>({
    queryKey: ["/api/priority-items"],
  });

  // Sort items by rank (ascending: 1, 2, 3...)
  const sortedItems = priorityData?.sort((a, b) => a.rank - b.rank) || [];

  return (
    <Card className="p-6" data-testid="card-priority-list">
      {/* Header with Sort Buttons */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Top Priority Areas</h3>
        
        {/* Sort Filter Buttons (currently non-functional - placeholder for future feature) */}
        <div className="flex gap-2">
          {/* Sort by Impact - Active by default */}
          <button className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground" data-testid="button-sort-impact">
            By Impact
          </button>
          
          {/* Sort by Effort */}
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-sort-effort">
            By Effort
          </button>
        </div>
      </div>
      
      {isLoading ? (
        // Loading State: Display skeleton cards
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        // Loaded State: Display priority items
        <div className="space-y-3">
          {sortedItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 rounded-lg border bg-card hover-elevate"
              data-testid={`priority-item-${item.id}`}
            >
              {/* Rank Number Badge */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                {index + 1}
              </div>
              
              {/* Item Details Section */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h4 className="font-medium mb-1">{item.title}</h4>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                
                {/* Category Badge */}
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
              </div>
              
              {/* Impact and Effort Scores Section */}
              <div className="flex gap-4 flex-shrink-0">
                {/* Impact Score (with green arrow indicating positive impact) */}
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Impact</div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold">{item.impact}</span>
                    <ArrowUp className="w-3 h-3 text-green-600" />
                  </div>
                </div>
                
                {/* Effort Score (1-10 scale) */}
                <div className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">Effort</div>
                  <div className="font-bold">{item.effort}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
