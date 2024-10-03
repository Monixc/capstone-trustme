// app/layout.ts
import { Inter } from "next/font/google";
import "../../styles/globals.css";
import BottomNavbar from "@/components/BottomNav";
import TopNavbar from "@/components/TopNav";

const inter = Inter({ subsets: ["latin"] });

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* 기타 메타데이터 */}</head>
      <body className={inter.className}>
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
          <TopNavbar />
          <div className="w-full max-w-[480px] min-h-screen bg-white shadow-md overflow-hidden flex flex-col items-center justify-center">
            {children}
          </div>
          <BottomNavbar />
        </div>
      </body>
    </html>
  );
}
