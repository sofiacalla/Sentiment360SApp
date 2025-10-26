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

import MetricCard from "@/components/MetricCard";
import RegionalSentimentChart from "@/components/RegionalSentimentChart";
import SentimentTrendChart from "@/components/SentimentTrendChart";
import FeedbackHighlights from "@/components/FeedbackHighlights";
import { Heart, MessageSquare, TrendingUp, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

/**
 * Dashboard Statistics Interface
 * Defines the structure of aggregated metrics from the backend
 */
interface DashboardStats {
  avgSentiment: string; // Average sentiment score (e.g., "7.8")
  totalFeedback: string; // Total feedback count (e.g., "1.2K")
  responseRate: string; // Response rate percentage (e.g., "94%")
  activeUsers: string; // Active users count (e.g., "2.8K")
  sentimentChange: number; // % change in sentiment (positive = improvement)
  feedbackChange: number; // % change in feedback volume
  responseRateChange: number; // % change in response rate
  activeUsersChange: number; // % change in active users
}

export default function Dashboard() {
  /**
   * Fetch Dashboard Statistics
   * Queries the /api/dashboard-stats endpoint for aggregated metrics
   * Data is automatically cached and refetched by React Query
   */
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard-stats"],
  });

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Customer Sentiment Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights from all customer touchpoints
          </p>
        </div>

        {/* Metric Cards Section - Shows loading skeleton or actual data */}
        {isLoading ? (
          // Loading state: Display skeleton cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-lg bg-card border animate-pulse" />
            ))}
          </div>
        ) : (
          // Loaded state: Display actual metric cards
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Average Sentiment Score */}
            <MetricCard
              title="Average Sentiment"
              value={stats?.avgSentiment || "0"}
              change={stats?.sentimentChange || 0}
              icon={Heart}
              testId="metric-avg-sentiment"
            />
            
            {/* Total Feedback Count */}
            <MetricCard
              title="Total Feedback"
              value={stats?.totalFeedback || "0"}
              change={stats?.feedbackChange || 0}
              icon={MessageSquare}
              testId="metric-total-feedback"
            />
            
            {/* Response Rate Percentage */}
            <MetricCard
              title="Response Rate"
              value={stats?.responseRate || "0%"}
              change={stats?.responseRateChange || 0}
              icon={TrendingUp}
              testId="metric-response-rate"
            />
            
            {/* Active Users Count */}
            <MetricCard
              title="Active Users"
              value={stats?.activeUsers || "0"}
              change={stats?.activeUsersChange || 0}
              icon={Users}
              testId="metric-active-users"
            />
          </div>
        )}

        {/* Regional Sentiment Chart - Bar chart showing sentiment by U.S. region */}
        <div className="mb-6">
          <RegionalSentimentChart />
        </div>

        {/* Two-Column Layout: Feedback and Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Feedback Highlights */}
          <FeedbackHighlights />
          
          {/* Sentiment Trend Line Chart */}
          <SentimentTrendChart />
        </div>
      </div>
    </div>
  );
}
