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

import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string; // Metric title displayed above the value
  value: string; // Current metric value (can be number or formatted string)
  change?: number; // Optional percentage change (positive = improvement)
  icon: LucideIcon; // Lucide icon component to display
  testId?: string; // Optional test ID for automated testing
}

export default function MetricCard({ title, value, change, icon: Icon, testId }: MetricCardProps) {
  // Determine trend direction for color coding
  const isPositive = change && change > 0; // Green for positive change
  const isNegative = change && change < 0; // Red for negative change

  return (
    <Card className="p-6" data-testid={testId}>
      <div className="flex items-start justify-between">
        {/* Left Section: Metric Information */}
        <div className="flex-1">
          {/* Metric Title */}
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          
          {/* Current Value */}
          <p className="text-3xl font-bold" data-testid={`${testId}-value`}>{value}</p>
          
          {/* Change Indicator (if provided) */}
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-muted-foreground"
            }`}>
              {/* Trend Arrow Icons */}
              {isPositive && <TrendingUp className="w-4 h-4" />}
              {isNegative && <TrendingDown className="w-4 h-4" />}
              
              {/* Percentage Change */}
              <span data-testid={`${testId}-change`}>
                {change > 0 ? "+" : ""}{change}%
              </span>
            </div>
          )}
        </div>

        {/* Right Section: Icon Badge */}
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
