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

// Import PriorityList component to display ranked priority items
import PriorityList from "@/components/PriorityList";
// Import PrioritizationMatrix component to display impact vs effort scatter plot
import PrioritizationMatrix from "@/components/PrioritizationMatrix";
// Import AIInsights component to display AI-generated recommendations
import AIInsights from "@/components/AIInsights";

// Export the Prioritization component as default export
export default function Prioritization() {
  // Return the JSX to render the prioritization page
  return (
    // Main container div with top padding, responsive horizontal padding, and bottom padding
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      {/* Max-width container centered on page */}
      <div className="max-w-7xl mx-auto">
        {/* Page Header - title and description */}
        <div className="mb-8">
          {/* Page title heading with responsive font sizes and bottom margin */}
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Prioritization Engine</h1>
          {/* Page description with muted text color */}
          <p className="text-muted-foreground">
            {/* Description text */}
            Data-driven recommendations for maximum customer impact
          </p>
        </div>

        {/* Priority List Section */}
        {/* Container div with bottom margin */}
        <div className="mb-6">
          {/* Render the PriorityList component - displays all priority items ranked by importance */}
          {/* Shows impact, effort, category, and description for each item */}
          <PriorityList />
        </div>

        {/* Two-Column Layout: Matrix and Insights */}
        {/* Grid container: 1 column on mobile, 2 on large screens with gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Impact vs Effort Matrix - left column */}
          {/* Scatter plot visualization showing: */}
          {/* - X-axis: Effort (1-10) */}
          {/* - Y-axis: Impact (1-10) */}
          {/* - Helps identify "quick wins" (high impact, low effort) */}
          <PrioritizationMatrix />
          
          {/* AI Insights - right column */}
          {/* Data-driven recommendations based on feedback analysis */}
          {/* TODO: Replace with OpenAI API for dynamic insights */}
          <AIInsights />
        </div> // Close two-column grid
      </div> // Close max-width container
    </div> // Close main container
  ); // Close return statement
} // Close Prioritization component function
