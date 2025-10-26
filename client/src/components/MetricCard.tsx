/**
 * METRIC CARD COMPONENT
 * 
 * Displays a single KPI (Key Performance Indicator) with:
 * - Title (e.g., "Average Sentiment")
 * - Current value (e.g., "7.8")
 * - Percentage change from previous period with trend arrow (up/down)
 * - Icon representing the metric type
 * 
 * USAGE: Dashboard page showing 4 main metrics
 * 
 * STYLING:
 * - Green text for positive changes
 * - Red text for negative changes
 * - Icon badge in top-right corner with light primary background
 */

import { Card } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  testId?: string;
}

export default function MetricCard({ title, value, change, icon: Icon, testId }: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="p-6" data-testid={testId}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-bold" data-testid={`${testId}-value`}>{value}</p>
          
          {/* CHANGE INDICATOR: Shows percentage change with color-coded trend arrow */}
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              isPositive ? "text-green-600" : isNegative ? "text-red-600" : "text-muted-foreground"
            }`}>
              {isPositive && <TrendingUp className="w-4 h-4" />}
              {isNegative && <TrendingDown className="w-4 h-4" />}
              <span data-testid={`${testId}-change`}>
                {change > 0 ? "+" : ""}{change}%
              </span>
            </div>
          )}
        </div>
        
        {/* ICON BADGE: Visual indicator of metric type */}
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}
