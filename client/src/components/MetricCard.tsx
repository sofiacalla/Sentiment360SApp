/**
 * Metric Card Component
 * 
 * Displays a single KPI metric with:
 * - Title (e.g., "Average Sentiment")
 * - Current value (e.g., "7.8")
 * - Percentage change indicator with trend arrow
 * - Icon representing the metric type
 * 
 * Used on the Dashboard page to show key performance indicators
 */

// Import the Card component from shadcn/ui for consistent card styling
import { Card } from "@/components/ui/card";
// Import Lucide icon types and specific trend arrow icons
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

// Define the props interface for type safety
interface MetricCardProps {
  title: string; // Metric title displayed above the value
  value: string; // Current metric value (can be number or formatted string)
  change?: number; // Optional percentage change (positive = improvement)
  icon: LucideIcon; // Lucide icon component to display
  testId?: string; // Optional test ID for automated testing
}

// Export the MetricCard functional component
export default function MetricCard({ title, value, change, icon: Icon, testId }: MetricCardProps) {
  // Determine trend direction for color coding
  const isPositive = change && change > 0; // Green for positive change
  const isNegative = change && change < 0; // Red for negative change

  // Return the JSX structure
  return (
    // Outer Card container with padding and test ID
    <Card className="p-6" data-testid={testId}>
      {/* Flex container to position content and icon */}
      <div className="flex items-start justify-between">
        {/* Left Section: Metric Information */}
        <div className="flex-1">
          {/* Metric Title - muted color, small size, bottom margin */}
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          
          {/* Current Value - large, bold font with test ID */}
          <p className="text-3xl font-bold" data-testid={`${testId}-value`}>{value}</p>
          
          {/* Change Indicator (only rendered if change is provided) */}
          {change !== undefined && (
            // Flex row for icon and percentage - color changes based on trend direction
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-muted-foreground"
            }`}>
              {/* Trending Up icon - only shown for positive changes */}
              {isPositive && <TrendingUp className="w-4 h-4" />}
              {/* Trending Down icon - only shown for negative changes */}
              {isNegative && <TrendingDown className="w-4 h-4" />}
              
              {/* Percentage Change text with test ID */}
              <span data-testid={`${testId}-change`}>
                {/* Add "+" prefix for positive numbers */}
                {change > 0 ? "+" : ""}{change}%
              </span>
            </div>
          )}
        </div>

        {/* Right Section: Icon Badge */}
        <div className="p-3 rounded-lg bg-primary/10">
          {/* Render the icon passed as prop with primary color */}
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
