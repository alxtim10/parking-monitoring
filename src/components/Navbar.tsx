"use client";
import { User } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState<string>();

  const GetPlace = useCallback(async () => {
    const response = await fetch(
      `https://valet-production.up.railway.app/api/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "Imam07n@gmail.com",
          password: "imam123@@",
        }),
      }
    );

    const data = await response.json();
    if (data) {
      setToken(data.data.session.access_token);
    }
  }, []);

  useEffect(() => {
      GetPlace();
  }, [GetPlace]);

  useEffect(() => {
    if (typeof window !== "undefined" && token) {
      localStorage.setItem("bokirToken", token);
    }
  }, [token]);

  return (
    <nav>
      <div className="flex items-center gap-2">
        <User className="w-10 h-10 bg-mainColor text-white rounded-full p-2" />
        <div className="flex flex-col">
          <h1 className="text-md font-bold">Hi, Alex</h1>
          <h1 className="text-sm">Where you wanna park today?</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
