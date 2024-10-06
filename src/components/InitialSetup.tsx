"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera } from "lucide-react";

export default function InitialSetup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState(
    "/images/default-profile.png"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 프로필 정보를 서버에 저장하는 로직 구현
    console.log("프로필 저장:", {
      name,
      nickname,
      email,
      phoneNumber,
      birthDate,
      profileImage,
    });
    // 저장 성공 후 홈 페이지로 리다이렉트
    router.push("/home");
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
      <h1 className="text-2xl font-bold mb-6 text-center">프로필 설정</h1>
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="mb-6 mt-10 flex flex-col items-center">
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
            required
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
            required
          />
        </div>
        <div className="mb-4">
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
            required
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
            required
          />
        </div>
        <div className="mb-6">
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
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition duration-150 ease-in-out">
          시작하기
        </button>
      </form>
    </main>
  );
}
