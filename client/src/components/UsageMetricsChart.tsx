import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const mockUsageData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
  dau: [1200, 1450, 1680, 1820, 2100, 2350, 2580, 2820],
  satisfaction: [7.2, 7.4, 7.6, 7.8, 8.0, 8.2, 8.3, 8.5],
};

export default function UsageMetricsChart() {
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
        labels: mockUsageData.labels,
        datasets: [
          {
            label: "Daily Active Users",
            data: mockUsageData.dau,
            borderColor: "hsl(221, 83%, 53%)",
            backgroundColor: "hsla(221, 83%, 53%, 0.1)",
            yAxisID: "y",
            tension: 0.4,
          },
          {
            label: "Satisfaction Score",
            data: mockUsageData.satisfaction,
            borderColor: "hsl(262, 83%, 58%)",
            backgroundColor: "hsla(262, 83%, 58%, 0.1)",
            yAxisID: "y1",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
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
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "Daily Active Users",
              color: "hsl(221, 6%, 40%)",
            },
            grid: {
              color: "hsl(0, 0%, 88%)",
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
            },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: {
              display: true,
              text: "Satisfaction Score",
              color: "hsl(221, 6%, 40%)",
            },
            grid: {
              drawOnChartArea: false,
            },
            ticks: {
              color: "hsl(221, 6%, 40%)",
            },
            min: 0,
            max: 10,
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
    <Card className="p-6" data-testid="chart-usage-metrics">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Usage & Satisfaction Trends</h3>
      </div>
      <div className="h-80">
        <canvas ref={chartRef} />
      </div>
    </Card>
  );
}
