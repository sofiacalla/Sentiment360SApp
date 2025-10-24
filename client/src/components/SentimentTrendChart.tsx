import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// TODO: API Integration Point - Replace with Twitter/Instagram/Facebook API data
// This component will aggregate sentiment trends over time from social media platforms
const mockTrendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  data: [7.2, 7.4, 7.1, 7.6, 7.8, 7.9, 8.0, 7.7, 8.2, 8.3],
};

export default function SentimentTrendChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: mockTrendData.labels,
        datasets: [
          {
            label: "Sentiment Score",
            data: mockTrendData.data,
            borderColor: "hsl(221, 83%, 53%)",
            backgroundColor: "hsla(221, 83%, 53%, 0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
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
  }, []);

  return (
    <Card className="p-6" data-testid="chart-sentiment-trend">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Overall Sentiment Trend</h3>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1 rounded-md bg-primary text-primary-foreground" data-testid="button-period-30d">
            30D
          </button>
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-90d">
            90D
          </button>
          <button className="text-xs px-3 py-1 rounded-md hover-elevate active-elevate-2" data-testid="button-period-all">
            All
          </button>
        </div>
      </div>
      <div className="h-80">
        <canvas ref={chartRef} />
      </div>
    </Card>
  );
}
