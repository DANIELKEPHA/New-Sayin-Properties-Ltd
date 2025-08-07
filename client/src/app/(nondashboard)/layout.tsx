"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    const userRole = authUser?.userRole?.toLowerCase();

    if (
        userRole === "manager" &&
        (pathname.startsWith("/search") || pathname === "/")
    ) {
      router.push("/managers/properties", { scroll: false });
    } else {
      setIsLoading(false);
    }
  }, [authUser, authLoading, router, pathname]);

  if (authLoading || isLoading) {
    return (
        <div className="flex h-screen items-center justify-center">
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
    );
  }

  return (
      <div className="h-full w-full">
        <Navbar />
        <main
            className="h-full flex w-full flex-col"
            style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
        >
          {children}
        </main>
      </div>
  );
};

export default Layout;
