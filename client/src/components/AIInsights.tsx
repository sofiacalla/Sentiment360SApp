import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { AIInsight } from "@shared/schema";

export default function AIInsights() {
  // Fetch data from API
  const { data: insightsData, isLoading } = useQuery<AIInsight[]>({
    queryKey: ["/api/ai-insights"],
  });

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent" data-testid="card-ai-insights">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-card/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {insightsData?.map((insight) => (
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
      )}
    </Card>
  );
}
