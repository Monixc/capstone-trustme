import Image from "next/image";
import googleLogo from "/public/images/google.svg";
import kakaoLogo from "/public/images/kakao.png";

export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-4 text-center">
        <h1 className="font-black text-[30px] text-center">TrustMe</h1>
        <hr className="border-dashed border-gray-300 my-6" />
        <form className="flex flex-col items-center gap-2">
          <button
            type="submit"
            className="relative flex items-center justify-center w-[328px] h-11 border-2 rounded-full">
            <Image
              src={googleLogo}
              alt="구글 로그인"
              width={40}
              height={40}
              className="absolute left-2"
            />{" "}
            <span className="text-[16px] font-semibold">구글 로그인</span>
          </button>
        </form>{" "}
        <form className="flex flex-col items-center gap-2">
          <button
            type="submit"
            className="relative flex items-center justify-center w-[328px] h-11 bg-[#FAE300] rounded-full">
            <Image
              src={kakaoLogo}
              alt="카카오 로그인"
              width={40}
              height={40}
              className="absolute left-2"
            />{" "}
            <span className="text-[16px] font-semibold">카카오 로그인</span>
          </button>
        </form>
      </main>
    </>
  );
}
