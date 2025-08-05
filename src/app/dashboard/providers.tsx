"use client";

import DefaultLayout from "@/components/layouts/DefaultLayout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const isDashboardRoute = pathname?.startsWith("/dashboard");
  const isLoginRoute = pathname === "/dashboard/login";
  const isSignUpRoute = pathname ===  "/dashboard/sign-up";

  useEffect(() => {
    if (!isDashboardRoute || isLoginRoute) {
      setCheckingAuth(false); // No need to check token for non-dashboard or login route
      return;
    }

    const token = localStorage.getItem("bokirToken");

    if (!token) {
      router.replace("/dashboard/login");
    } else {
      setCheckingAuth(false); // Token exists, allow rendering
    }
  }, [pathname, isDashboardRoute, isLoginRoute, isSignUpRoute, router]);

  if (checkingAuth) {
    return <div>Loading...</div>; // Optional loader
  }

  if (isLoginRoute || isSignUpRoute) {
    return <>{children}</>;
  }

  return isDashboardRoute ? (
    <DefaultLayout>{children}</DefaultLayout>
  ) : (
    <>{children}</>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
