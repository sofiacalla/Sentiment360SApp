import MetricCard from '../MetricCard';
import { Heart } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <MetricCard
        title="Average Sentiment"
        value="7.8"
        change={12}
        icon={Heart}
        testId="metric-sentiment"
      />
    </div>
  );
}
