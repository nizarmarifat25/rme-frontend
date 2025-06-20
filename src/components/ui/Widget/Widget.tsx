import Image from "next/image";

interface PropTypes {
  title: string;
  img: string;
  value: string;
  bgColor: string;
}

const Widget = ({ title, img, value, bgColor }: PropTypes) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl sm:flex-row sm:items-start sm:justify-start lg:flex-col lg:items-center ${bgColor} p-4 `}
    >
      <Image src={img} alt={title} width={100} height={100} />
      <div className="text-center sm:text-left lg:text-center">
        <h3 className="text-sm font-medium text-white/80">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
};

export default Widget;
