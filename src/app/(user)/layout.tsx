"use client";

import { Inter } from "next/font/google";
import "../../styles/globals.css";
import dynamic from "next/dynamic";

const TopNavbar = dynamic(() => import("@/components/TopNav"), { ssr: false });
const BottomNavbar = dynamic(() => import("@/components/BottomNav"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-gray-200 ${inter.className}`}>
      <div className="w-full max-w-[480px] min-h-screen bg-white shadow-md overflow-hidden flex flex-col">
        <TopNavbar />
        <div className="flex-grow pt-[54px] pb-[54px]">{children}</div>
        <BottomNavbar />
      </div>
    </div>
  );
}
