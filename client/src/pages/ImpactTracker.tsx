/**
 * IMPACT TRACKER PAGE
 * 
 * Measures the success of implemented customer experience initiatives
 * 
 * SECTIONS:
 * 1. Impact Comparison Cards: Before/after metrics showing improvement
 *    - Time to Resolution: How fast issues are resolved
 *    - Customer Satisfaction: Overall satisfaction scores
 *    - Issue Recurrence: How often issues repeat
 *    - Shows percentage improvement for each metric
 * 
 * 2. Usage Metrics Chart: Dual-axis line chart showing:
 *    - Left axis: Daily Active Users (DAU) growth
 *    - Right axis: Customer Satisfaction Score (0-10)
 *    - Demonstrates correlation between user growth and satisfaction
 * 
 * 3. Integrated Channels: Grid of all active communication channels
 *    - Twitter, Facebook, Instagram, Email, Live Chat
 *    - Shows connection status and message counts
 *    - TODO: Add real-time API integration for social media channels
 * 
 * DATA FLOW:
 * - Impact metrics: /api/impact-metrics
 * - Usage chart: /api/usage-metrics
 * - Channels: /api/channels
 */

import ImpactComparison from "@/components/ImpactComparison";
import UsageMetricsChart from "@/components/UsageMetricsChart";
import ChannelsIntegrated from "@/components/ChannelsIntegrated";
import { useQuery } from "@tanstack/react-query";
import type { ImpactMetric } from "@shared/schema";

export default function ImpactTracker() {
  // Fetch before/after comparison metrics
  const { data: metricsData, isLoading } = useQuery<ImpactMetric[]>({
    queryKey: ["/api/impact-metrics"],
  });

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Impact Tracker</h1>
          <p className="text-muted-foreground">
            Measure the success of your customer experience initiatives
          </p>
        </div>

        {/* IMPACT COMPARISON CARDS: Before/after metrics showing improvements */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-lg bg-card border animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {metricsData?.map((metric) => (
              <ImpactComparison
                key={metric.id}
                title={metric.metricName}
                beforeValue={metric.beforeValue}
                afterValue={metric.afterValue}
                improvement={metric.improvement}
                unit={metric.unit || ""}
                testId={`comparison-${metric.metricName.toLowerCase().replace(/\s+/g, "-")}`}
              />
            ))}
          </div>
        )}

        {/* USAGE METRICS CHART: Shows DAU and satisfaction trends over time */}
        <div className="mb-6">
          <UsageMetricsChart />
        </div>

        {/* INTEGRATED CHANNELS: Grid of all active communication channels */}
        <div>
          <ChannelsIntegrated />
        </div>
      </div>
    </div>
  );
}
