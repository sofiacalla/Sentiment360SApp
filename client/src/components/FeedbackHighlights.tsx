import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Feedback } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function FeedbackHighlights() {
  // Fetch data from API
  const { data: feedbackData, isLoading } = useQuery<Feedback[]>({
    queryKey: ["/api/feedback"],
  });

  return (
    <Card className="p-6" data-testid="card-feedback-highlights">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Feedback Highlights</h3>
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {feedbackData?.slice(0, 3).map((feedback) => (
            <div
              key={feedback.id}
              className="p-4 rounded-lg border bg-card hover-elevate"
              data-testid={`feedback-${feedback.id}`}
            >
              <div className="flex items-start gap-3 mb-2">
                {feedback.sentiment === "positive" ? (
                  <ThumbsUp className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                ) : (
                  <ThumbsDown className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
                )}
                <p className="text-sm flex-1">{feedback.text}</p>
              </div>
              
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
