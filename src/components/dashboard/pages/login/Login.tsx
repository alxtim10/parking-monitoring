"use client";
import { LoginRequestType } from "@/types/login";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [request, setRequest] = useState<LoginRequestType>({
    email: "",
    password: "",
  });

  const login = async () => {
    try {
      const response = await fetch(
        `https://valet-production.up.railway.app/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      const data = await response.json();
      localStorage.setItem("bokirToken", data.data.session.access_token);
      setTimeout(() => {
        router.push("/dashboard/place");
      }, 2000);
    } catch {
      console.log("error");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center p-2">
      <div className="w-[350px] shadow-md bg-white px-5 py-7 rounded-lg">
        <h1 className="text-md font-bold text-center">Sign in to BOKIR</h1>
        <h1 className="text-xs text-gray-500 text-center mt-1">
          Welcome back! Please sign in to continue
        </h1>
        <div className="flex flex-col mt-5">
          <label htmlFor="" className="text-xs font-bold">
            Email Address
          </label>
          <input
            type="email"
            value={request.email}
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
            className="border rounded-lg outline-0 ring-0 p-2 text-sm mt-1"
          />
        </div>
        <div className="flex flex-col mt-3">
          <label htmlFor="" className="text-xs font-bold">
            Password
          </label>
          <input
            type="password"
            value={request.password}
            onChange={(e) => {
              setRequest((prev) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
            className="border rounded-lg outline-0 ring-0 p-2 text-sm mt-1"
          />
        </div>
        <button
          onClick={login}
          className="bg-black shadow-sm text-sm p-2 text-white w-full rounded-lg mt-5"
        >
          Continue
        </button>
        <button
          onClick={() => {
            router.push("/dashboard/sign-up");
          }}
          className="text-xs text-gray-600 text-center mt-3 w-full"
        >
          Sign up
        </button>
      </div>
    </section>
  );
};

export default Login;
