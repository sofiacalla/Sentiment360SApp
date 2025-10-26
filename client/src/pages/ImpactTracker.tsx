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

// Import ImpactComparison component to display before/after metrics
import ImpactComparison from "@/components/ImpactComparison";
// Import UsageMetricsChart component to display dual-axis engagement chart
import UsageMetricsChart from "@/components/UsageMetricsChart";
// Import ChannelsIntegrated component to display active communication channels
import ChannelsIntegrated from "@/components/ChannelsIntegrated";
// Import useQuery hook from TanStack Query for data fetching with caching
import { useQuery } from "@tanstack/react-query";
// Import ImpactMetric TypeScript type from shared schema for type safety
import type { ImpactMetric } from "@shared/schema";

// Export the ImpactTracker component as default export
export default function ImpactTracker() {
  /**
   * Fetch Impact Metrics
   * Retrieves before/after comparison data showing improvement results
   * Used to display success metrics in card format
   */
  // Destructure data (renamed to metricsData) and isLoading from useQuery hook
  const { data: metricsData, isLoading } = useQuery<ImpactMetric[]>({
    // Define the query key for the impact metrics API endpoint
    queryKey: ["/api/impact-metrics"],
  }); // Close useQuery call

  // Return the JSX to render the impact tracker page
  return (
    // Main container div with top padding, responsive horizontal padding, and bottom padding
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      {/* Max-width container centered on page */}
      <div className="max-w-7xl mx-auto">
        {/* Page Header - title and description */}
        <div className="mb-8">
          {/* Page title heading with responsive font sizes and bottom margin */}
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Impact Tracker</h1>
          {/* Page description with muted text color */}
          <p className="text-muted-foreground">
            {/* Description text */}
            Measure the success of your customer experience initiatives
          </p>
        </div>

        {/* Impact Comparison Cards Section - Shows loading skeleton or actual data */}
        {/* Conditional rendering based on loading state */}
        {isLoading ? (
          // Loading state: Display skeleton cards while data is being fetched
          // Grid container: 1 column on mobile, 3 on tablet/desktop with gap and bottom margin
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Map over array of 3 items to create skeleton cards */}
            {[1, 2, 3].map((i) => (
              // Skeleton card div with fixed height, rounded corners, card background, border, and pulse animation
              <div key={i} className="h-40 rounded-lg bg-card border animate-pulse" />
            ))} {/* Close map function */}
          </div> // Close skeleton grid container
        ) : (
          // Loaded state: Display actual impact metrics with real data
          // Grid container: 1 column on mobile, 3 on tablet/desktop with gap and bottom margin
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Map over metricsData array to create ImpactComparison cards */}
            {metricsData?.map((metric) => (
              // Render ImpactComparison component for each metric
              <ImpactComparison
                key={metric.id} // Unique key for React list rendering
                title={metric.metricName} // Metric name (e.g., "Time to Resolution")
                beforeValue={metric.beforeValue} // Value before improvement
                afterValue={metric.afterValue} // Value after improvement
                improvement={metric.improvement} // Percentage improvement
                unit={metric.unit || ""} // Unit (e.g., "hours", "/10") or empty string if undefined
                testId={`comparison-${metric.metricName.toLowerCase().replace(/\s+/g, "-")}`} // Test ID with kebab-case
              />
            ))} {/* Close map function */}
          </div> // Close metrics grid container
        )} {/* Close conditional rendering */}

        {/* Usage Metrics Chart Section */}
        {/* Container div with bottom margin */}
        <div className="mb-6">
          {/* Render the UsageMetricsChart component */}
          {/* Line chart showing: */}
          {/* - Daily Active Users (DAU) growth over time */}
          {/* - Customer Satisfaction Score trends */}
          {/* Demonstrates engagement improvement */}
          <UsageMetricsChart />
        </div>

        {/* Integrated Channels Section */}
        {/* Container div (no bottom margin as it's the last section) */}
        <div>
          {/* Render the ChannelsIntegrated component */}
          {/* Displays all active communication channels */}
          {/* Shows message counts and connection status */}
          {/* TODO: Add Twitter API integration */}
          {/* TODO: Add Instagram API integration */}
          {/* TODO: Add Facebook API integration */}
          <ChannelsIntegrated />
        </div>
      </div> // Close max-width container
    </div> // Close main container
  ); // Close return statement
} // Close ImpactTracker component function
