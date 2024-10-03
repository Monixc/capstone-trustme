"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Image, Target, Book, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "홈", href: "/home" },
  { icon: Image, label: "갤러리", href: "/gallery" },
  { icon: Target, label: "퀘스트", href: "/quest" },
  { icon: Book, label: "다이어리", href: "/diary" },
  { icon: User, label: "마이페이지", href: "/mypage" },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] h-[54px] bg-white border-t border-gray-200">
      <ul className="flex justify-around items-center h-full">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="flex flex-col items-center">
              <item.icon
                className={`w-6 h-6 ${
                  pathname === item.href ? "text-sky-500" : "text-gray-500"
                }`}
              />
              <span
                className={`text-xs ${
                  pathname === item.href ? "text-sky-500" : "text-gray-500"
                }`}>
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
