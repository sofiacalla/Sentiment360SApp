/**
 * Impact Comparison Component
 * 
 * Displays before/after metrics showing improvement results
 * Used on the Impact Tracker page to demonstrate ROI
 * 
 * Features:
 * - Side-by-side before/after values
 * - Percentage improvement indicator
 * - Green color coding for positive results
 * - Optional unit display (hours, %, /10, etc.)
 */

import { Card } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

interface ImpactComparisonProps {
  title: string; // Metric name (e.g., "Time to Resolution")
  beforeValue: string; // Value before improvement (e.g., "4.2")
  afterValue: string; // Value after improvement (e.g., "1.5")
  improvement: number; // Percentage improvement (e.g., 64 for 64%)
  unit?: string; // Optional unit (e.g., "hours", "/10", "%")
  testId?: string; // Optional test ID for automated testing
}

export default function ImpactComparison({
  title,
  beforeValue,
  afterValue,
  improvement,
  unit = "",
  testId,
}: ImpactComparisonProps) {
  return (
    <Card className="p-6" data-testid={testId}>
      {/* Metric Title */}
      <h3 className="text-sm text-muted-foreground mb-6">{title}</h3>
      
      {/* Before/After Comparison Grid */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        {/* Before Value */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">Before</div>
          <div className="text-3xl font-bold" data-testid={`${testId}-before`}>
            {beforeValue}
            {/* Unit Label (if provided) */}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
        
        {/* After Value (highlighted in green) */}
        <div>
          <div className="text-xs text-muted-foreground mb-2">After</div>
          <div className="text-3xl font-bold text-green-600" data-testid={`${testId}-after`}>
            {afterValue}
            {/* Unit Label (if provided) */}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
      </div>
      
      {/* Improvement Badge */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
        {/* Down Arrow (indicating reduction in time/issues) */}
        <ArrowDown className="w-5 h-5 text-green-600" />
        
        {/* Percentage Improvement */}
        <span className="text-sm font-medium text-green-700" data-testid={`${testId}-improvement`}>
          {improvement}% improvement
        </span>
      </div>
    </Card>
  );
}
