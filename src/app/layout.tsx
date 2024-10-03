// app/layout.ts
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrustMe",
  description: "확인 강박을 위한 심리 관리 보조 PWA 어플리케이션",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  authors: [
    {
      name: "monicx",
      url: "https://velog.io/@monixc",
    },
  ],
  icons: [
    { rel: "icon", url: "/images/icon-192.png" },
    { rel: "apple-touch-icon", url: "/images/icon-192.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>{/* 기타 메타데이터 */}</head>
      <body className={inter.className}>
        <div className="flex justify-center items-center min-h-screen bg-gray-200">
          <div className="w-full max-w-[480px] min-h-screen bg-white shadow-md overflow-hidden flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
