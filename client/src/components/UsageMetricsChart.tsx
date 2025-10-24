import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import type { UsageMetric } from "@shared/schema";

Chart.register(...registerables);

export default function UsageMetricsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Fetch data from API
  const { data: usageData, isLoading } = useQuery<UsageMetric[]>({
    queryKey: ["/api/usage-metrics"],
  });

  useEffect(() => {
    if (!chartRef.current || !usageData || usageData.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const labels = usageData.map((m) => m.week);
    const dauData = usageData.map((m) => m.dailyActiveUsers);
    const satisfactionData = usageData.map((m) => parseFloat(m.satisfactionScore));

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Daily Active Users",
            data: dauData,
            borderColor: "hsl(221, 83%, 53%)",
            backgroundColor: "hsla(221, 83%, 53%, 0.1)",
            yAxisID: "y",
            tension: 0.4,
          },
          {
            label: "Satisfaction Score",
            data: satisfactionData,
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
  }, [usageData]);

  return (
    <Card className="p-6" data-testid="chart-usage-metrics">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Usage & Satisfaction Trends</h3>
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
