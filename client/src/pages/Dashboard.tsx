/**
 * Customer Sentiment Dashboard Page
 * 
 * Main dashboard displaying:
 * - Key metrics (average sentiment, feedback count, response rate, active users)
 * - Regional sentiment breakdown chart
 * - Recent feedback highlights
 * - Sentiment trend over time
 * 
 * All data is fetched in real-time from the backend API
 */

// Import MetricCard component to display KPI metrics
import MetricCard from "@/components/MetricCard";
// Import RegionalSentimentChart component to display bar chart of sentiment by region
import RegionalSentimentChart from "@/components/RegionalSentimentChart";
// Import SentimentTrendChart component to display line chart of sentiment over time
import SentimentTrendChart from "@/components/SentimentTrendChart";
// Import FeedbackHighlights component to display recent customer feedback
import FeedbackHighlights from "@/components/FeedbackHighlights";
// Import icons from lucide-react for the metric cards
import { Heart, MessageSquare, TrendingUp, Users } from "lucide-react";
// Import useQuery hook from TanStack Query for data fetching with caching
import { useQuery } from "@tanstack/react-query";

/**
 * Dashboard Statistics Interface
 * Defines the structure of aggregated metrics from the backend
 */
// Define TypeScript interface for dashboard stats
interface DashboardStats {
  // Average sentiment score as formatted string (e.g., "7.8")
  avgSentiment: string; // Average sentiment score (e.g., "7.8")
  // Total feedback count as formatted string (e.g., "1.2K")
  totalFeedback: string; // Total feedback count (e.g., "1.2K")
  // Response rate as percentage string (e.g., "94%")
  responseRate: string; // Response rate percentage (e.g., "94%")
  // Active users count as formatted string (e.g., "2.8K")
  activeUsers: string; // Active users count (e.g., "2.8K")
  // Percentage change in sentiment (positive = improvement)
  sentimentChange: number; // % change in sentiment (positive = improvement)
  // Percentage change in feedback volume
  feedbackChange: number; // % change in feedback volume
  // Percentage change in response rate
  responseRateChange: number; // % change in response rate
  // Percentage change in active users
  activeUsersChange: number; // % change in active users
} // Close interface

// Export the Dashboard component as default export
export default function Dashboard() {
  /**
   * Fetch Dashboard Statistics
   * Queries the /api/dashboard-stats endpoint for aggregated metrics
   * Data is automatically cached and refetched by React Query
   */
  // Destructure data (renamed to stats) and isLoading from useQuery hook
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    // Define the query key for the dashboard stats API endpoint
    queryKey: ["/api/dashboard-stats"],
  }); // Close useQuery call

  // Return the JSX to render the dashboard
  return (
    // Main container div with top padding, responsive horizontal padding, and bottom padding
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      {/* Max-width container centered on page */}
      <div className="max-w-7xl mx-auto">
        {/* Page Header - title and description */}
        <div className="mb-8">
          {/* Page title heading with responsive font sizes and bottom margin */}
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Customer Sentiment Dashboard</h1>
          {/* Page description with muted text color */}
          <p className="text-muted-foreground">
            {/* Description text */}
            Real-time insights from all customer touchpoints
          </p>
        </div>

        {/* Metric Cards Section - Shows loading skeleton or actual data */}
        {/* Conditional rendering based on loading state */}
        {isLoading ? (
          // Loading state: Display skeleton cards while data is being fetched
          // Grid container: 1 column on mobile, 2 on tablet, 4 on desktop with gap
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Map over array of 4 items to create skeleton cards */}
            {[1, 2, 3, 4].map((i) => (
              // Skeleton card div with fixed height, rounded corners, card background, border, and pulse animation
              <div key={i} className="h-32 rounded-lg bg-card border animate-pulse" />
            ))} {/* Close map function */}
          </div> // Close skeleton grid container
        ) : (
          // Loaded state: Display actual metric cards with real data
          // Grid container: 1 column on mobile, 2 on tablet, 4 on desktop with gap
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Average Sentiment Score Card */}
            <MetricCard
              title="Average Sentiment" // Card title
              value={stats?.avgSentiment || "0"} // Display sentiment value or "0" if undefined
              change={stats?.sentimentChange || 0} // Display percentage change or 0 if undefined
              icon={Heart} // Heart icon to represent sentiment
              testId="metric-avg-sentiment" // Test ID for automated testing
            />
            
            {/* Total Feedback Count Card */}
            <MetricCard
              title="Total Feedback" // Card title
              value={stats?.totalFeedback || "0"} // Display feedback count or "0" if undefined
              change={stats?.feedbackChange || 0} // Display percentage change or 0 if undefined
              icon={MessageSquare} // Message icon to represent feedback
              testId="metric-total-feedback" // Test ID for automated testing
            />
            
            {/* Response Rate Percentage Card */}
            <MetricCard
              title="Response Rate" // Card title
              value={stats?.responseRate || "0%"} // Display response rate or "0%" if undefined
              change={stats?.responseRateChange || 0} // Display percentage change or 0 if undefined
              icon={TrendingUp} // Trending up icon to represent growth
              testId="metric-response-rate" // Test ID for automated testing
            />
            
            {/* Active Users Count Card */}
            <MetricCard
              title="Active Users" // Card title
              value={stats?.activeUsers || "0"} // Display active users or "0" if undefined
              change={stats?.activeUsersChange || 0} // Display percentage change or 0 if undefined
              icon={Users} // Users icon to represent user count
              testId="metric-active-users" // Test ID for automated testing
            />
          </div> // Close metric cards grid container
        )} {/* Close conditional rendering */}

        {/* Regional Sentiment Chart - Bar chart showing sentiment by U.S. region */}
        <div className="mb-6">
          {/* Render the RegionalSentimentChart component */}
          <RegionalSentimentChart />
        </div>

        {/* Two-Column Layout: Feedback and Trends */}
        {/* Grid container: 1 column on mobile, 2 on large screens with gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Feedback Highlights - left column */}
          <FeedbackHighlights />
          
          {/* Sentiment Trend Line Chart - right column */}
          <SentimentTrendChart />
        </div> // Close two-column grid
      </div> // Close max-width container
    </div> // Close main container
  ); // Close return statement
} // Close Dashboard component function
