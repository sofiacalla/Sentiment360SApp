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

// Import the Card component from shadcn/ui for consistent styling
import { Card } from "@/components/ui/card";
// Import ArrowDown icon to indicate reduction/improvement
import { ArrowDown } from "lucide-react";

// Define the props interface for type-safe component usage
interface ImpactComparisonProps {
  title: string; // Metric name (e.g., "Time to Resolution")
  beforeValue: string; // Value before improvement (e.g., "4.2")
  afterValue: string; // Value after improvement (e.g., "1.5")
  improvement: number; // Percentage improvement (e.g., 64 for 64%)
  unit?: string; // Optional unit (e.g., "hours", "/10", "%")
  testId?: string; // Optional test ID for automated testing
}

// Export the ImpactComparison functional component with destructured props
export default function ImpactComparison({
  title, // Metric title
  beforeValue, // Pre-implementation value
  afterValue, // Post-implementation value
  improvement, // Percentage change
  unit = "", // Default to empty string if not provided
  testId, // Test identifier
}: ImpactComparisonProps) {
  // Return the JSX structure
  return (
    // Outer Card container with padding and test ID
    <Card className="p-6" data-testid={testId}>
      {/* Metric Title - small, muted text with bottom margin */}
      <h3 className="text-sm text-muted-foreground mb-6">{title}</h3>
      
      {/* Before/After Comparison Grid - 2 equal columns with gap */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        {/* Before Value Column */}
        <div>
          {/* "Before" label - small muted text */}
          <div className="text-xs text-muted-foreground mb-2">Before</div>
          {/* Before value - large bold text with test ID */}
          <div className="text-3xl font-bold" data-testid={`${testId}-before`}>
            {/* Display the before value */}
            {beforeValue}
            {/* Unit Label (if provided) - smaller muted text */}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
        
        {/* After Value Column */}
        <div>
          {/* "After" label - small muted text */}
          <div className="text-xs text-muted-foreground mb-2">After</div>
          {/* After value - large bold text in green (success color) with test ID */}
          <div className="text-3xl font-bold text-green-600" data-testid={`${testId}-after`}>
            {/* Display the after value */}
            {afterValue}
            {/* Unit Label (if provided) - smaller muted text */}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
      </div>
      
      {/* Improvement Badge - green background indicating success */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
        {/* Down Arrow icon - indicates reduction (improvement for time/issues) */}
        <ArrowDown className="w-5 h-5 text-green-600" />
        
        {/* Percentage Improvement text with test ID */}
        <span className="text-sm font-medium text-green-700" data-testid={`${testId}-improvement`}>
          {/* Display improvement percentage with "% improvement" suffix */}
          {improvement}% improvement
        </span>
      </div>
    </Card>
  );
}
