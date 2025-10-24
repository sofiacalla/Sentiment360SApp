import MetricCard from "@/components/MetricCard";
import RegionalSentimentChart from "@/components/RegionalSentimentChart";
import SentimentTrendChart from "@/components/SentimentTrendChart";
import FeedbackHighlights from "@/components/FeedbackHighlights";
import { Heart, MessageSquare, TrendingUp, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface DashboardStats {
  avgSentiment: string;
  totalFeedback: string;
  responseRate: string;
  activeUsers: string;
  sentimentChange: number;
  feedbackChange: number;
  responseRateChange: number;
  activeUsersChange: number;
}

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard-stats"],
  });

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Customer Sentiment Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights from all customer touchpoints
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 rounded-lg bg-card border animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Average Sentiment"
              value={stats?.avgSentiment || "0"}
              change={stats?.sentimentChange || 0}
              icon={Heart}
              testId="metric-avg-sentiment"
            />
            <MetricCard
              title="Total Feedback"
              value={stats?.totalFeedback || "0"}
              change={stats?.feedbackChange || 0}
              icon={MessageSquare}
              testId="metric-total-feedback"
            />
            <MetricCard
              title="Response Rate"
              value={stats?.responseRate || "0%"}
              change={stats?.responseRateChange || 0}
              icon={TrendingUp}
              testId="metric-response-rate"
            />
            <MetricCard
              title="Active Users"
              value={stats?.activeUsers || "0"}
              change={stats?.activeUsersChange || 0}
              icon={Users}
              testId="metric-active-users"
            />
          </div>
        )}

        <div className="mb-6">
          <RegionalSentimentChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeedbackHighlights />
          <SentimentTrendChart />
        </div>
      </div>
    </div>
  );
}
