import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PropTypes {
  title: string;
  data: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const Line = ({ data, categories, title }: PropTypes) => {
  const chartOptions: ApexOptions = {
    chart: {
      id: "line-chart",
      toolbar: { show: false },
    },
    xaxis: {
      categories,
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff",
        },
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    colors: ["#ffffff"],
    grid: {
      show: false,
    },
  };

  return (
    <div className="rounded-lg bg-green-600 p-6 shadow">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      <ApexChart
        options={chartOptions}
        series={data}
        type="line"
        height={150}
      />
    </div>
  );
};

export default Line;
