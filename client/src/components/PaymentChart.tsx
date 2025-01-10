import { Bar } from "react-chartjs-2";
import "chart.js/auto";

type PaymentChartProps = {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }[];
  };
};

const PaymentChart = ({ chartData }: PaymentChartProps) => {
  return (
    <Bar
      data={chartData}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Amount",
            },
            ticks: {
              callback: (value: any) => (Number.isInteger(value) ? value : ""),
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
      }}
    />
  );
};

export default PaymentChart;
