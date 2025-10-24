import ImpactComparison from "@/components/ImpactComparison";
import UsageMetricsChart from "@/components/UsageMetricsChart";
import ChannelsIntegrated from "@/components/ChannelsIntegrated";

export default function ImpactTracker() {
  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Impact Tracker</h1>
          <p className="text-muted-foreground">
            Measure the success of your customer experience initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <ImpactComparison
            title="Time to Resolution"
            beforeValue="4.2"
            afterValue="1.5"
            improvement={64}
            unit="hours"
            testId="comparison-resolution-time"
          />
          <ImpactComparison
            title="Customer Satisfaction"
            beforeValue="7.2"
            afterValue="8.5"
            improvement={18}
            unit="/10"
            testId="comparison-satisfaction"
          />
          <ImpactComparison
            title="Retention Rate"
            beforeValue="78%"
            afterValue="91%"
            improvement={17}
            testId="comparison-retention"
          />
        </div>

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
