/**
 * AI Insights Component
 * 
 * Displays AI-generated recommendations based on customer feedback analysis
 * Each insight includes:
 * - Title and detailed description
 * - Priority level (high, medium, low)
 * - Expected impact statement
 * - View Details button opens modal with full information
 * 
 * TODO: Replace with OpenAI API integration for real-time, dynamic insights
 * Currently uses pre-generated insights from the database
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, ArrowRight, Target, TrendingUp, Clock } from "lucide-react";
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

  /**
   * Get priority color classes for badges
   */
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
                  className={`text-xs px-2 py-1 rounded-md border ${getPriorityColor(insight.priority)}`}
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
                
                {/* View Details Dialog */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" data-testid={`button-view-insight-${insight.id}`}>
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl" data-testid={`dialog-insight-${insight.id}`}>
                    <DialogHeader>
                      <div className="flex items-start justify-between mb-2">
                        <DialogTitle className="text-xl">{insight.title}</DialogTitle>
                        <span className={`text-xs px-3 py-1 rounded-md border ${getPriorityColor(insight.priority)}`}>
                          {insight.priority} priority
                        </span>
                      </div>
                      <DialogDescription className="text-base">
                        {insight.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    {/* Detailed Insight Information */}
                    <div className="space-y-6 mt-4">
                      {/* Expected Impact Section */}
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold text-sm">Expected Impact</h4>
                        </div>
                        <p className="text-sm">{insight.impact}</p>
                      </div>
                      
                      {/* Implementation Timeline */}
                      <div className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <h4 className="font-semibold text-sm">Recommended Timeline</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {insight.priority === "high" 
                            ? "Immediate action recommended within 1-2 weeks" 
                            : insight.priority === "medium"
                            ? "Implement within 1-2 months"
                            : "Schedule for next quarter"}
                        </p>
                      </div>
                      
                      {/* Key Metrics to Track */}
                      <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <h4 className="font-semibold text-sm">Key Metrics to Track</h4>
                        </div>
                        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                          <li>Customer satisfaction score (CSAT)</li>
                          <li>Net Promoter Score (NPS)</li>
                          <li>Average resolution time</li>
                          <li>Feature adoption rate</li>
                        </ul>
                      </div>
                      
                      {/* Action Button */}
                      <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" onClick={() => {}}>
                          Share Insight
                        </Button>
                        <Button onClick={() => {}}>
                          Create Action Plan
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
