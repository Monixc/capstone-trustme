"use client";

import React, { useState } from "react";
import { Camera, Image as ImageIcon, Plus, X } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  url: string;
  date: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: GalleryImage = {
          id: Date.now().toString(),
          url: e.target?.result as string,
          date: new Date().toISOString(),
        };
        setImages((prevImages) => [...prevImages, newImage]);
      };
      reader.readAsDataURL(file);
    }
    setIsModalOpen(false);
  };

  const groupedImages = images.reduce((acc, image) => {
    const date = new Date(image.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(image);
    return acc;
  }, {} as Record<string, GalleryImage[]>);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return `${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <main className="p-4 bg-gray-100 min-h-screen relative pb-20">
      {Object.entries(groupedImages).length > 0 ? (
        Object.entries(groupedImages).map(([date, dateImages]) => (
          <div key={date} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{date}</h2>
            <div className="grid grid-cols-3 gap-2">
              {dateImages.map((image) => (
                <div
                  key={image.id}
                  className="aspect-square relative cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => handleImageClick(image)}>
                  <Image
                    src={image.url}
                    alt="갤러리 이미지"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-0 left-0 w-full p-2 bg-gradient-to-b from-black to-transparent">
                    <p className="text-white text-sm font-semibold">
                      {formatDateTime(image.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
          <p className="text-gray-500">아직 업로드된 이미지가 없습니다.</p>
        </div>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-sky-500 text-white rounded-full shadow-lg flex items-center justify-center">
        <Plus size={24} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
          <div className="bg-white w-full max-w-[480px] rounded-t-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">이미지 업로드</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <label
                htmlFor="galleryUpload"
                className="flex items-center justify-center w-full py-3 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-150 ease-in-out">
                <ImageIcon size={20} className="mr-2" />
                갤러리에서 선택
              </label>
              <input
                id="galleryUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button className="flex items-center justify-center w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out">
                <Camera size={20} className="mr-2" />
                카메라로 촬영
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}>
          <div className="relative w-full h-full max-w-[480px] max-h-[80vh]">
            <Image
              src={selectedImage.url}
              alt="확대된 이미지"
              layout="fill"
              objectFit="contain"
            />
            <div className="absolute top-0 left-0 w-full p-4 bg-gradient-to-b from-black to-transparent">
              <p className="text-white text-lg font-semibold">
                {formatDateTime(selectedImage.date)}
              </p>
            </div>
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setSelectedImage(null)}>
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
