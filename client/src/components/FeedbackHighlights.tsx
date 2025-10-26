/**
 * FEEDBACK HIGHLIGHTS COMPONENT
 * 
 * Displays the 3 most recent customer feedback entries with:
 * - Sentiment indicator (thumbs up/down icon)
 * - Feedback text
 * - Source channel (Twitter, Facebook, Email, etc.)
 * - Geographic region
 * - Relative timestamp (e.g., "3 hours ago")
 * 
 * USAGE: Dashboard page - provides quick view of latest customer sentiment
 * 
 * VISUAL DESIGN:
 * - Positive feedback: green thumbs up icon
 * - Negative feedback: red thumbs down icon
 * - Hover elevation effect for better UX
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Feedback } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function FeedbackHighlights() {
  // Fetch recent feedback from API (sorted by timestamp, newest first)
  const { data: feedbackData, isLoading } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

  return (
    <Card className="p-6" data-testid="card-feedback-highlights">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Feedback Highlights</h3>
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
      </div>
      
      {isLoading ? (
        // Loading State: Skeleton cards
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        // Loaded State: Show top 3 feedback items
        <div className="space-y-4">
          {feedbackData?.slice(0, 3).map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-lg border bg-card hover-elevate"
              data-testid={`feedback-${feedback.id}`}
            >
              {/* Feedback Content with Sentiment Icon */}
              <div className="flex items-start gap-3 mb-2">
                {/* Sentiment Indicator */}
                {feedback.sentiment === "positive" ? (
                  <ThumbsUp className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                ) : (
                  <ThumbsDown className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                )}
                
                {/* Feedback Text */}
                <p className="text-sm flex-1">{feedback.text}</p>
              </div>
              
              {/* Metadata: Source, Region, Timestamp */}
              <div className="flex items-center gap-2 ml-7">
                <Badge variant="secondary" className="text-xs">
                  {feedback.source}
                </Badge>
                <span className="text-xs text-muted-foreground">{feedback.region}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(feedback.timestamp), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
