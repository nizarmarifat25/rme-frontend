import PageHead from "@/components/commons/PageHead";
import { Button } from "@heroui/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <PageHead />
     <Button color="primary">Button</Button>
    </main>
  );
}
