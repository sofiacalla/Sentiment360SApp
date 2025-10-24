import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

// TODO: API Integration Point - OpenAI API integration
// Replace with real-time AI-generated insights using OpenAI GPT-4 based on sentiment data
const mockInsights = [
  {
    id: 1,
    title: "Improve Mobile App Navigation",
    description: "33% of negative feedback mentions difficulty finding features in the mobile app. Consider adding a search function and reorganizing the main menu.",
    priority: "high",
    impact: "Potential 15% reduction in support tickets",
  },
  {
    id: 2,
    title: "Expand Customer Support Hours",
    description: "Response time complaints peak between 6-9 PM EST. Adding evening support could significantly improve satisfaction scores in the Southeast region.",
    priority: "medium",
    impact: "Expected 20% improvement in response time ratings",
  },
  {
    id: 3,
    title: "Launch Feature Tutorial Series",
    description: "Users who complete onboarding have 2.5x higher satisfaction. Creating video tutorials for advanced features could drive engagement.",
    priority: "medium",
    impact: "Estimated 25% increase in feature adoption",
  },
];

export default function AIInsights() {
  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent" data-testid="card-ai-insights">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
      </div>
      
      <div className="space-y-4">
        {mockInsights.map((insight) => (
          <div
            key={insight.id}
            className="p-4 rounded-lg bg-card border hover-elevate"
            data-testid={`insight-${insight.id}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium">{insight.title}</h4>
              <span
                className={`text-xs px-2 py-1 rounded-md ${
                  insight.priority === "high"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {insight.priority}
              </span>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {insight.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-primary">
                {insight.impact}
              </span>
              <Button variant="ghost" size="sm" data-testid={`button-view-insight-${insight.id}`}>
                View Details
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
