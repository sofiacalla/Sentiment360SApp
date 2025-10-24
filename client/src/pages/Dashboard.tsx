import MetricCard from "@/components/MetricCard";
import RegionalSentimentChart from "@/components/RegionalSentimentChart";
import SentimentTrendChart from "@/components/SentimentTrendChart";
import FeedbackHighlights from "@/components/FeedbackHighlights";
import { Heart, MessageSquare, TrendingUp, Users } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Customer Sentiment Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time insights from all customer touchpoints
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Average Sentiment"
            value="7.8"
            change={12}
            icon={Heart}
            testId="metric-avg-sentiment"
          />
          <MetricCard
            title="Total Feedback"
            value="43.2K"
            change={8}
            icon={MessageSquare}
            testId="metric-total-feedback"
          />
          <MetricCard
            title="Response Rate"
            value="94%"
            change={5}
            icon={TrendingUp}
            testId="metric-response-rate"
          />
          <MetricCard
            title="Active Users"
            value="2.8K"
            change={15}
            icon={Users}
            testId="metric-active-users"
          />
        </div>

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
