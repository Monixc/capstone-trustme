"use client";

import { Inter } from "next/font/google";
import "../../styles/globals.css";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();
  const isEditProfilePage = pathname === "/mypage/edit";

  return (
    <div
      className={`flex justify-center items-center min-h-screen bg-white ${inter.className}`}>
      <div className="w-full max-w-[480px] min-h-screen bg-white shadow-md overflow-hidden flex flex-col">
        {!isEditProfilePage && <TopNavbar />}
        <div
          className={`flex-grow ${
            isEditProfilePage ? "" : "pt-[54px] pb-[54px]"
          }`}>
          {children}
        </div>
        {!isEditProfilePage && <BottomNavbar />}
      </div>
    </div>
  );
}
