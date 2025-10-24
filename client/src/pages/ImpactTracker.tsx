import ImpactComparison from "@/components/ImpactComparison";
import UsageMetricsChart from "@/components/UsageMetricsChart";
import ChannelsIntegrated from "@/components/ChannelsIntegrated";
import { useQuery } from "@tanstack/react-query";
import type { ImpactMetric } from "@shared/schema";

export default function ImpactTracker() {
  // Fetch data from API
  const { data: metricsData, isLoading } = useQuery<ImpactMetric[]>({
    queryKey: ["/api/impact-metrics"],
  });

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Impact Tracker</h1>
          <p className="text-muted-foreground">
            Measure the success of your customer experience initiatives
          </p>
        </div>

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

        <div className="mb-6">
          <UsageMetricsChart />
        </div>

        <div>
          <ChannelsIntegrated />
        </div>
      </div>
    </div>
  );
}
