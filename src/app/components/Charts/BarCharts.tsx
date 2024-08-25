import React, { useEffect, useState } from "react";
import { BarChart } from "@tremor/react";

const dataFormatter = (number: number) =>
  Intl.NumberFormat("us").format(number).toString();

export const BarCharts = () => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await fetch("/api/dashboard/sentimentGraph");
        if (response.ok) {
          const result = await response.json();
          setChartData([
            {
              name: "Positive",
              "Sentiment Count": result.sentimentCounts.Positive,
            },
            {
              name: "Negative",
              "Sentiment Count": result.sentimentCounts.Negative,
            },
            {
              name: "Neutral",
              "Sentiment Count": result.sentimentCounts.Neutral,
            },
          ]);
        } else {
          console.error(
            "Failed to fetch sentiment analysis summary:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching sentiment analysis summary:", error);
      }
    };

    fetchSentimentData();
  }, []);

  return (
    <BarChart
      data={chartData}
      index="name"
      categories={["Sentiment Count"]}
      colors={["purple"]}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
    />
  );
};
