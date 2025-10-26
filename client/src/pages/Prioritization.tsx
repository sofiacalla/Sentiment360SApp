/**
 * Prioritization Engine Page
 * 
 * Displays data-driven prioritization tools:
 * - Priority items list (ranked by importance)
 * - Impact vs Effort matrix (scatter plot visualization)
 * - AI-generated insights and recommendations
 * 
 * Helps teams decide which initiatives to tackle first
 */

import PriorityList from "@/components/PriorityList";
import PrioritizationMatrix from "@/components/PrioritizationMatrix";
import AIInsights from "@/components/AIInsights";

export default function Prioritization() {
  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Prioritization Engine</h1>
          <p className="text-muted-foreground">
            Data-driven recommendations for maximum customer impact
          </p>
        </div>

        {/* Priority List Section
            Displays all priority items ranked by importance
            Shows impact, effort, category, and description */}
        <div className="mb-6">
          <PriorityList />
        </div>

        {/* Two-Column Layout: Matrix and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Impact vs Effort Matrix
              Scatter plot visualization showing:
              - X-axis: Effort (1-10)
              - Y-axis: Impact (1-10)
              - Helps identify "quick wins" (high impact, low effort) */}
          <PrioritizationMatrix />
          
          {/* AI Insights
              Data-driven recommendations based on feedback analysis
              TODO: Replace with OpenAI API for dynamic insights */}
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
