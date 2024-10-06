"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Camera } from "lucide-react";

export default function EditProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("사용자 이름");
  const [nickname, setNickname] = useState("닉네임");
  const [email, setEmail] = useState("user@example.com");
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [profileImage, setProfileImage] = useState(
    "/images/default-profile.png"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 프로필 업데이트 로직 구현
    console.log("프로필 업데이트:", {
      name,
      nickname,
      email,
      phoneNumber,
      birthDate,
      profileImage,
    });
    router.push("/mypage");
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex flex-col p-4 bg-white min-h-screen">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-600">
        <ArrowLeft className="mr-2 " />
        뒤로 가기
      </button>
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="mb-6 mt-20 flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <Image
              src={profileImage}
              alt="프로필 이미지"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
            <label
              htmlFor="profile-image"
              className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full cursor-pointer">
              <Camera size={20} />
            </label>
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-semibold mb-2">
            이름
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nickname"
            className="block text-gray-700 font-semibold mb-2">
            닉네임
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="birthdate"
            className="block text-gray-700 font-semibold mb-2">
            생년월일
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2">
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 font-semibold mb-2">
            전화번호
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition duration-150 ease-in-out">
          저장하기
        </button>
      </form>
    </main>
  );
}
