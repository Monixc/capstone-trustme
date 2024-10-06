"use client";

import Image from "next/image";
import { useState } from "react";
import { Edit2, X } from "lucide-react";
import { useRouter } from "next/navigation";

const tissueImages = [
  "/images/Teru_basic.png",
  "/images/Teru_bear.png",
  "/images/Teru_dino_1.png",
  "/images/Teru_dino2.png",
  "/images/Teru_dino_3.png",
  "/images/Teru_halloween_1.png",
  "/images/Teru_umb.png",
  "/images/Teru_sky.png",
  "/images/Teru_lemon.png",
  "/images/Teru_red.png",
  "/images/Teru_rabbit.png",
  "/images/Teru_mouse.png",
];

export default function MyPage() {
  const router = useRouter();
  const [currentTissueImage, setCurrentTissueImage] = useState(tissueImages[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleProfileManage = () => {
    router.push("/mypage/edit");
  };

  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
          <h2 className="text-xl font-semibold">사용자 이름</h2>
        </div>
      </div>

      <div className="w-full max-w-md aspect-square relative rounded-2xl overflow-hidden mb-6">
        <Image
          src="/images/Background_night.png"
          alt="배경"
          layout="fill"
          objectFit="cover"
        />
        <Image
          src={currentTissueImage}
          alt="티슈"
          width={200}
          height={200}
          className="absolute bottom-8 right-10"
        />
      </div>

      <button
        onClick={openModal}
        className="w-full max-w-md bg-slate-900 text-white py-3 rounded-lg mb-6">
        도감
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[480px] rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">도감</h3>
              <button onClick={closeModal}>
                <X size={24} />
              </button>
            </div>
            <div
              className="overflow-y-auto scrollbar-hide"
              style={{ maxHeight: "40vh" }}>
              <div className="grid grid-cols-2 gap-4">
                {tissueImages.map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-lg p-4 flex items-center justify-center relative">
                    <div className="w-full h-full bg-gray-300 absolute rounded-lg"></div>
                    <Image
                      src={image}
                      alt={`티슈 ${index + 1}`}
                      width={100}
                      height={100}
                      className="cursor-pointer relative z-10"
                      onClick={() => {
                        setCurrentTissueImage(image);
                        closeModal();
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <ul className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">
        {[
          { label: "설정", action: () => console.log("설정") },
          { label: "프로필 관리", action: handleProfileManage },
          { label: "알림 설정", action: () => console.log("알림 설정") },
          { label: "로그아웃", action: () => console.log("로그아웃") },
        ].map((item, index) => (
          <li
            key={index}
            onClick={item.action}
            className="py-4 px-6 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer">
            {item.label}
          </li>
        ))}
      </ul>
    </main>
  );
}
