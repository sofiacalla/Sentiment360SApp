import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import type { RegionalSentiment } from "@shared/schema";

Chart.register(...registerables);

export default function RegionalSentimentChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Fetch data from API
  const { data: regionalData, isLoading } = useQuery<RegionalSentiment[]>({
    queryKey: ["/api/regional-sentiment"],
  });

  useEffect(() => {
    if (!chartRef.current || !regionalData || regionalData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = regionalData.map((r) => r.region);
    const data = regionalData.map((r) => parseFloat(r.sentimentScore));

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Average Sentiment Score",
            data,
            backgroundColor: "hsl(221, 83%, 53%)",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "hsl(0, 0%, 12%)",
            padding: 12,
            titleColor: "hsl(0, 0%, 98%)",
            bodyColor: "hsl(0, 0%, 98%)",
            borderColor: "hsl(0, 0%, 18%)",
            borderWidth: 1,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
            grid: {
              color: "hsl(0, 0%, 88%)",
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [regionalData]);

  return (
    <Card className="p-6" data-testid="chart-regional-sentiment">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Sentiment by U.S. Region</h3>
        <span className="text-xs text-muted-foreground">Last 30 days</span>
      </div>
      <div className="h-80">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-muted-foreground">Loading chart data...</div>
          </div>
        ) : (
          <canvas ref={chartRef} />
        )}
      </div>
    </Card>
  );
}
