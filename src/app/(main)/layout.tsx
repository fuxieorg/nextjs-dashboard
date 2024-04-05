import { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="grid h-full flex-1 grid-rows-[auto,1fr] gap-4 p-4 md:p-8 lg:gap-6">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
