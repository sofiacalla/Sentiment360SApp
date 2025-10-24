import { Card } from "@/components/ui/card";

// TODO: API Integration Point - OpenAI API integration
// Use AI to automatically categorize and position improvement items based on impact and effort analysis
const mockMatrixItems = [
  { id: 1, label: "Mobile App UX", impact: 8, effort: 3 },
  { id: 2, label: "Response Time", impact: 9, effort: 6 },
  { id: 3, label: "Documentation", impact: 4, effort: 2 },
  { id: 4, label: "Premium Features", impact: 7, effort: 8 },
  { id: 5, label: "Bug Fixes", impact: 9, effort: 4 },
  { id: 6, label: "UI Refresh", impact: 5, effort: 7 },
];

export default function PrioritizationMatrix() {
  const getQuadrantLabel = (x: number, y: number) => {
    if (x > 5 && y > 5) return "Quick Wins";
    if (x <= 5 && y > 5) return "Major Projects";
    if (x > 5 && y <= 5) return "Fill Ins";
    return "Hard Slogs";
  };

  return (
    <Card className="p-6" data-testid="card-prioritization-matrix">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Impact vs. Effort Matrix</h3>
      </div>
      
      <div className="relative aspect-square bg-muted/20 rounded-lg border">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="border-r border-b p-4 flex items-start justify-start">
            <span className="text-xs font-medium text-muted-foreground">Fill Ins</span>
          </div>
          <div className="border-b p-4 flex items-start justify-start bg-green-500/5">
            <span className="text-xs font-medium text-green-700">Quick Wins</span>
          </div>
          <div className="border-r p-4 flex items-start justify-start bg-red-500/5">
            <span className="text-xs font-medium text-red-700">Hard Slogs</span>
          </div>
          <div className="p-4 flex items-start justify-start bg-yellow-500/5">
            <span className="text-xs font-medium text-yellow-700">Major Projects</span>
          </div>
        </div>
        
        {mockMatrixItems.map((item) => {
          const x = (item.effort / 10) * 100;
          const y = 100 - (item.impact / 10) * 100;
          
          return (
            <div
              key={item.id}
              className="absolute w-12 h-12 -ml-6 -mt-6 flex items-center justify-center bg-primary text-primary-foreground rounded-full text-xs font-medium cursor-pointer hover-elevate active-elevate-2 border-2 border-background"
              style={{ left: `${x}%`, top: `${y}%` }}
              data-testid={`matrix-item-${item.id}`}
              title={`${item.label} - Impact: ${item.impact}, Effort: ${item.effort}`}
            >
              {item.id}
            </div>
          );
        })}
        
        <div className="absolute -bottom-6 left-0 right-0 text-center">
          <span className="text-xs font-medium text-muted-foreground">Effort →</span>
        </div>
        
        <div className="absolute -left-12 top-0 bottom-0 flex items-center">
          <span className="text-xs font-medium text-muted-foreground transform -rotate-90">← Impact</span>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-2 gap-4">
        {mockMatrixItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 text-sm"
            data-testid={`matrix-legend-${item.id}`}
          >
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              {item.id}
            </div>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
