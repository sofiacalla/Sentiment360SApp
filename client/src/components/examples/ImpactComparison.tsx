import ImpactComparison from '../ImpactComparison';

export default function ImpactComparisonExample() {
  return (
    <div className="p-8 max-w-md">
      <ImpactComparison
        title="Time to Resolution"
        beforeValue="4.2"
        afterValue="1.5"
        improvement={64}
        unit="hours"
        testId="comparison-resolution"
      />
    </div>
  );
}
