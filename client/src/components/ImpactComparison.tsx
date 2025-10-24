import { Card } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";

interface ImpactComparisonProps {
  title: string;
  beforeValue: string;
  afterValue: string;
  improvement: number;
  unit?: string;
  testId?: string;
}

export default function ImpactComparison({
  title,
  beforeValue,
  afterValue,
  improvement,
  unit = "",
  testId,
}: ImpactComparisonProps) {
  return (
    <Card className="p-6" data-testid={testId}>
      <h3 className="text-sm text-muted-foreground mb-6">{title}</h3>
      
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div>
          <div className="text-xs text-muted-foreground mb-2">Before</div>
          <div className="text-3xl font-bold" data-testid={`${testId}-before`}>
            {beforeValue}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground mb-2">After</div>
          <div className="text-3xl font-bold text-green-600" data-testid={`${testId}-after`}>
            {afterValue}
            <span className="text-sm text-muted-foreground ml-1">{unit}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
        <ArrowDown className="w-5 h-5 text-green-600" />
        <span className="text-sm font-medium text-green-700" data-testid={`${testId}-improvement`}>
          {improvement}% improvement
        </span>
      </div>
    </Card>
  );
}
