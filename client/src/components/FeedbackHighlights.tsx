/**
 * Feedback Highlights Component
 * 
 * Displays the most recent customer feedback entries with:
 * - Sentiment indicator (thumbs up/down icon)
 * - Feedback text
 * - Source channel (Twitter, Facebook, etc.)
 * - Geographic region
 * - Relative timestamp (e.g., "3 hours ago")
 * 
 * Shows the top 3 most recent feedback items
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Feedback } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function FeedbackHighlights() {
  /**
   * Fetch Recent Feedback
   * Retrieves the latest customer feedback from the API
   * Results are automatically sorted by timestamp (newest first)
   */
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
        // Loading State: Display skeleton cards
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        // Loaded State: Display actual feedback
        <div className="space-y-4">
          {/* Show only the 3 most recent items */}
          {feedbackData?.slice(0, 3).map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-lg border bg-card hover-elevate"
              data-testid={`feedback-${feedback.id}`}
            >
              {/* Feedback Content with Sentiment Icon */}
              <div className="flex items-start gap-3 mb-2">
                {/* Sentiment Indicator Icon */}
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
                {/* Source Channel Badge */}
                <Badge variant="secondary" className="text-xs">
                  {feedback.source}
                </Badge>
                
                {/* Geographic Region */}
                <span className="text-xs text-muted-foreground">{feedback.region}</span>
                
                {/* Separator */}
                <span className="text-xs text-muted-foreground">•</span>
                
                {/* Relative Timestamp (e.g., "3 hours ago") */}
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
