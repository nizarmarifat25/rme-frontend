import Bar from "@/components/ui/Chart/Bar";
import Line from "@/components/ui/Chart/Line";
import Widget from "@/components/ui/Widget";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Widget
          title="Jumlah Pasien"
          img="/images/illustration/jumlah-pasien.png"
          value="1.200"
          bgColor="bg-green-300"
        />

        <Widget
          title="Kunjungan Hari Ini"
          img="/images/illustration/kunjungan.png"
          value="85"
          bgColor="bg-blue-300"
        />

        <Widget
          title="Rekam Medis"
          img="/images/illustration/rekam-medis.png"
          value="5.320"
          bgColor="bg-purple-300"
        />

        <Widget
          title="Laporan Bulanan"
          img="/images/illustration/laporan-bulanan.png"
          value="8"
          bgColor="bg-yellow-300"
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
        <Bar
          labels={["ISPA", "Diare", "Hipertensi", "Demam", "Diabetes"]}
          data={[120, 95, 80, 65, 50]}
        />

        <div className="flex flex-col gap-6">
          <div className="relative overflow-hidden rounded-lg  bg-green-600/10 p-6 backdrop-blur-sm">
            <img
              src="/images/illustration/revenue.png"
              alt="Revenue Illustration"
              className="absolute right-4 top-1/2 w-44 -translate-y-1/2 opacity-30"
            />

            <h3 className="mb-2 text-lg font-semibold tracking-wide text-green-700">
              Revenue Bulan Ini
            </h3>
            <p className="text-3xl font-bold leading-snug tracking-tight text-green-700">
              Rp 25.000.000
            </p>
            <span className="text-sm leading-relaxed tracking-normal text-green-700/80">
              Periode: Jan - Jun 2024
            </span>
          </div>

          <Line
            title="Jumlah Pasien Bulanan"
            categories={["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"]}
            data={[
              {
                name: "Jumlah Pasien",
                data: [80, 90, 100, 120, 110, 130],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
