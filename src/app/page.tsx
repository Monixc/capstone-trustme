import Splash from "@/components/Splash";
import AuthLogin from "@/components/loginpage/AuthLogin";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-full max-w-[480px] min-h-screen bg-white shadow-md overflow-hidden flex flex-col">
        <Splash />
        <AuthLogin />
      </div>
    </div>
  );
}
