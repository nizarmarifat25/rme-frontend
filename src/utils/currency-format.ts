export const formatRupiah = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  export const formatRupiahTanpaSimbol = (value: number): string => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  export const formatInputRupiah = (value: string): string => {
    const numberValue = Number(value.replace(/\D/g, "")); // Hanya angka
    return numberValue ? `Rp${numberValue.toLocaleString("id-ID")}` : "";
  };
  