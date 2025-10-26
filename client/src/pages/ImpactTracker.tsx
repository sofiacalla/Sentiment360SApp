/**
 * Impact Tracker Page
 * 
 * Measures success of customer experience initiatives:
 * - Before/after comparison metrics
 * - User engagement trends (DAU and satisfaction)
 * - Integrated communication channels
 * 
 * Demonstrates ROI of implemented improvements
 */

import ImpactComparison from "@/components/ImpactComparison";
import UsageMetricsChart from "@/components/UsageMetricsChart";
import ChannelsIntegrated from "@/components/ChannelsIntegrated";
import { useQuery } from "@tanstack/react-query";
import type { ImpactMetric } from "@shared/schema";

export default function ImpactTracker() {
  /**
   * Fetch Impact Metrics
   * Retrieves before/after comparison data showing improvement results
   * Used to display success metrics in card format
   */
  const { data: metricsData, isLoading } = useQuery<ImpactMetric[]>({
    queryKey: ["/api/impact-metrics"],
  });

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Impact Tracker</h1>
          <p className="text-muted-foreground">
            Measure the success of your customer experience initiatives
          </p>
        </div>

        {/* Impact Comparison Cards Section */}
        {isLoading ? (
          // Loading state: Display skeleton cards
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-lg bg-card border animate-pulse" />
            ))}
          </div>
        ) : (
          // Loaded state: Display actual impact metrics
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {metricsData?.map((metric) => (
              <ImpactComparison
                key={metric.id}
                title={metric.metricName} // e.g., "Time to Resolution"
                beforeValue={metric.beforeValue} // Value before improvement
                afterValue={metric.afterValue} // Value after improvement
                improvement={metric.improvement} // Percentage improvement
                unit={metric.unit || ""} // Unit (e.g., "hours", "/10")
                testId={`comparison-${metric.metricName.toLowerCase().replace(/\s+/g, "-")}`}
              />
            ))}
          </div>
        )}

        {/* Usage Metrics Chart
            Line chart showing:
            - Daily Active Users (DAU) growth over time
            - Customer Satisfaction Score trends
            Demonstrates engagement improvement */}
        <div className="mb-6">
          <UsageMetricsChart />
        </div>

        {/* Integrated Channels Section
            Displays all active communication channels
            Shows message counts and status
            TODO: Add Twitter API integration
            TODO: Add Instagram API integration
            TODO: Add Facebook API integration */}
        <div>
          <ChannelsIntegrated />
        </div>
      </div>
    </div>
  );
}
