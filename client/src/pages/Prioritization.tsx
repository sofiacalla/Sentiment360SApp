/**
 * PRIORITIZATION ENGINE PAGE
 * 
 * Helps teams decide which customer experience initiatives to tackle first
 * 
 * SECTIONS:
 * 1. Priority List: Ranked list of all priority items with impact/effort scores
 *    - Sortable by impact or effort (buttons currently non-functional)
 *    - Shows category, rank, and description for each item
 * 
 * 2. Impact vs Effort Matrix: Scatter plot visualization
 *    - X-axis: Effort (1-10) - how hard is it to implement?
 *    - Y-axis: Impact (1-10) - how much value does it provide?
 *    - Four quadrants identify initiative types:
 *      * Quick Wins (high impact, low effort) - prioritize these!
 *      * Major Projects (high impact, high effort) - plan carefully
 *      * Fill Ins (low impact, low effort) - nice to have
 *      * Hard Slogs (low impact, high effort) - avoid these
 * 
 * 3. AI Insights: AI-generated recommendations based on customer feedback
 *    - TODO: Replace with OpenAI API for dynamic generation
 *    - Currently shows pre-generated insights from database
 * 
 * DATA FLOW:
 * - Matrix and list both fetch from /api/priority-items
 * - AI insights fetch from /api/ai-insights
 */

import PriorityList from "@/components/PriorityList";
import PrioritizationMatrix from "@/components/PrioritizationMatrix";
import AIInsights from "@/components/AIInsights";

export default function Prioritization() {
  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        
        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Prioritization Engine</h1>
          <p className="text-muted-foreground">
            Data-driven recommendations for maximum customer impact
          </p>
        </div>

        {/* PRIORITY LIST: Full list of all priority items with details */}
        <div className="mb-6">
          <PriorityList />
        </div>

        {/* TWO-COLUMN LAYOUT: Matrix visualization and AI insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PrioritizationMatrix />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
