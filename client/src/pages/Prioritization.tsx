import PriorityList from "@/components/PriorityList";
import PrioritizationMatrix from "@/components/PrioritizationMatrix";
import AIInsights from "@/components/AIInsights";

export default function Prioritization() {
  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Prioritization Engine</h1>
          <p className="text-muted-foreground">
            Data-driven recommendations for maximum customer impact
          </p>
        </div>

        <div className="mb-6">
          <PriorityList />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PrioritizationMatrix />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}
