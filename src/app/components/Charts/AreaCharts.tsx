import React, { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  number.toString();

export function AreaCharts() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchCallOutcomeData = async () => {
      try {
        const response = await fetch("/api/dashboard/callOutcomeGraph");
        if (response.ok) {
          const result = await response.json();
          setChartData([
            {
              date: "Mon",
              Sale: result.weeklySales.Monday.Sale,
              NoSale: result.weeklySales.Monday.NoSale,
            },
            {
              date: "Tue",
              Sale: result.weeklySales.Tuesday.Sale,
              NoSale: result.weeklySales.Tuesday.NoSale,
            },
            {
              date: "Wed",
              Sale: result.weeklySales.Wednesday.Sale,
              NoSale: result.weeklySales.Wednesday.NoSale,
            },
            {
              date: "Thu",
              Sale: result.weeklySales.Thursday.Sale,
              NoSale: result.weeklySales.Thursday.NoSale,
            },
            {
              date: "Fri",
              Sale: result.weeklySales.Friday.Sale,
              NoSale: result.weeklySales.Friday.NoSale,
            },
            {
              date: "Sat",
              Sale: result.weeklySales.Saturday.Sale,
              NoSale: result.weeklySales.Saturday.NoSale,
            },
            {
              date: "Sun",
              Sale: result.weeklySales.Sunday.Sale,
              NoSale: result.weeklySales.Sunday.NoSale,
            },
          ]);
        } else {
          console.error(
            "Failed to fetch call outcome summary:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching call outcome summary:", error);
      }
    };

    fetchCallOutcomeData();
  }, []);

  return (
    <AreaChart
      className="h-80"
      data={chartData}
      index="date"
      categories={["Sale", "NoSale"]}
      colors={["indigo", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
    />
  );
}
