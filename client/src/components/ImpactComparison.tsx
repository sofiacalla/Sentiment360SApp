/**
 * IMPACT COMPARISON COMPONENT
 * 
 * Displays before/after metrics to demonstrate ROI of improvements:
 * - Side-by-side comparison (Before | After)
 * - Percentage improvement badge at bottom
 * - Optional unit display (hours, %, /10, etc.)
 * - Smart arrow direction based on metric type
 * 
 * USAGE: Impact Tracker page showing 3 key metrics:
 * - Time to Resolution (hours) - lower is better → down arrow
 * - Customer Satisfaction (/10) - higher is better → up arrow
 * - Issue Recurrence (%) - lower is better → down arrow
 * 
 * ARROW LOGIC:
 * - Metrics where HIGHER is better (satisfaction, scores): up arrow
 * - Metrics where LOWER is better (time, recurrence): down arrow
 */

import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface ImpactComparisonProps {
  title: string;
  beforeValue: string;
  afterValue: string;
  improvement: number;
  unit?: string;
  testId?: string;
}

export default function ImpactComparison({
  title,
  beforeValue,
  afterValue,
  improvement,
  unit = "",
  testId,
}: ImpactComparisonProps) {
  /**
   * Determine if higher values are better for this metric
   * Returns true if improvement means value should INCREASE (like satisfaction)
   * Returns false if improvement means value should DECREASE (like resolution time)
   */
  const isHigherBetter = () => {
    const titleLower = title.toLowerCase();
    
    // Metrics where HIGHER is better
    const higherBetterKeywords = [
      "satisfaction", 
      "score", 
      "rating", 
      "quality",
      "retention",
      "engagement",
      "adoption",
      "success"
    ];
    
    // Check if any "higher is better" keyword is in the title
    const isHigher = higherBetterKeywords.some(keyword => 
      titleLower.includes(keyword)
    );
    
    return isHigher;
  };
  
  // Determine which arrow to show
  const showUpArrow = isHigherBetter();
  const ArrowIcon = showUpArrow ? ArrowUp : ArrowDown;
  
  return (
    <Card className="p-6" data-testid={testId}>
      <h3 className="text-sm text-muted-foreground mb-6">{title}</h3>
      
      {/* BEFORE/AFTER GRID: Two-column comparison of values */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <div className="text-xs text-muted-foreground mb-2">Before</div>
          <div className="text-3xl font-bold" data-testid={`${testId}-before`}>
            {beforeValue}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground mb-2">After</div>
          <div className="text-3xl font-bold text-green-600" data-testid={`${testId}-after`}>
            {afterValue}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
      </div>
      
      {/* IMPROVEMENT BADGE: Shows percentage improvement with directional arrow */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
        <ArrowIcon className="w-5 h-5 text-green-600" data-testid={`${testId}-arrow`} />
        <span className="text-sm font-medium text-green-700" data-testid={`${testId}-improvement`}>
          {improvement}% improvement
        </span>
      </div>
    </Card>
  );
}
