import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ApexOptions } from "apexcharts";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface BarProps {
  labels: string[];
  data: number[];
}

const Bar = ({ labels, data }: BarProps) => {
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      xaxis: {
        categories: labels,
        labels: {
          style: { fontSize: "12px" },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: { fontSize: "12px" },
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          horizontal: true,
          barHeight: "60%",
        },
      },
      dataLabels: {
        enabled: true,
      },
      grid: {
        show: false,
      },
      colors: ["#4ade80"],
      tooltip: {
        enabled: true,
      },
    }),
    [labels],
  );

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-lg font-semibold text-gray-700">
        Top 5 Diagnosa Terbanyak Bulan Ini
      </h2>
      <ApexChart
        options={options}
        series={[{ name: "Jumlah", data }]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Bar;
