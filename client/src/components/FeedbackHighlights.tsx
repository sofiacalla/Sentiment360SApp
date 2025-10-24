import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, ThumbsDown } from "lucide-react";

// TODO: API Integration Point - Replace with Twitter/Instagram/Facebook API data
// This component will display recent customer feedback from social media channels
const mockFeedback = [
  {
    id: 1,
    text: "Amazing customer service! The support team resolved my issue within minutes. Highly recommend!",
    sentiment: "positive",
    source: "Twitter",
    region: "West",
    timestamp: "2h ago",
  },
  {
    id: 2,
    text: "The new update is confusing. Hard to find features I used to use daily. Please improve navigation.",
    sentiment: "negative",
    source: "Facebook",
    region: "Southeast",
    timestamp: "4h ago",
  },
  {
    id: 3,
    text: "Love the latest features! The app is getting better with each update. Keep up the great work!",
    sentiment: "positive",
    source: "Instagram",
    region: "Northeast",
    timestamp: "6h ago",
  },
];

export default function FeedbackHighlights() {
  return (
    <Card className="p-6" data-testid="card-feedback-highlights">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Recent Feedback Highlights</h3>
        <MessageCircle className="w-5 h-5 text-muted-foreground" />
      </div>
      
      <div className="space-y-4">
        {mockFeedback.map((feedback) => (
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
              <span className="text-xs text-muted-foreground">{feedback.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
