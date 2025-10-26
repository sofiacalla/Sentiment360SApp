/**
 * AI Insights Component
 * 
 * Displays AI-generated recommendations based on customer feedback analysis
 * Each insight includes:
 * - Title and detailed description
 * - Priority level (high, medium, low)
 * - Expected impact statement
 * 
 * TODO: Replace with OpenAI API integration for real-time, dynamic insights
 * Currently uses pre-generated insights from the database
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { AIInsight } from "@shared/schema";

export default function AIInsights() {
  /**
   * Fetch AI Insights Data
   * Retrieves all AI-generated insights from the API
   * TODO: Replace with OpenAI API calls for dynamic generation
   */
  const { data: insightsData, isLoading } = useQuery<AIInsight[]>({
    queryKey: ["/api/ai-insights"],
  });

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent" data-testid="card-ai-insights">
      {/* Header with AI Icon */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">AI-Generated Insights</h3>
      </div>
      
      {isLoading ? (
        // Loading State: Display skeleton cards
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-card/50 animate-pulse" />
          ))}
        </div>
      ) : (
        // Loaded State: Display actual insights
        <div className="space-y-4">
          {insightsData?.map((insight) => (
            <div
              key={insight.id}
              className="p-4 rounded-lg bg-card border hover-elevate"
              data-testid={`insight-${insight.id}`}
            >
              {/* Insight Header: Title and Priority Badge */}
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{insight.title}</h4>
                
                {/* Priority Badge - Color-coded by level */}
                <span
                  className={`text-xs px-2 py-1 rounded-md ${
                    insight.priority === "high"
                      ? "bg-red-100 text-red-700" // High priority: Red
                      : "bg-yellow-100 text-yellow-700" // Medium/Low: Yellow
                  }`}
                >
                  {insight.priority}
                </span>
              </div>
              
              {/* Insight Description - Data-driven recommendation */}
              <p className="text-sm text-muted-foreground mb-3">
                {insight.description}
              </p>
              
              {/* Footer: Expected Impact and Action Button */}
              <div className="flex items-center justify-between">
                {/* Expected Impact Statement */}
                <span className="text-xs font-medium text-primary">
                  {insight.impact}
                </span>
                
                {/* View Details Button (placeholder for future functionality) */}
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
