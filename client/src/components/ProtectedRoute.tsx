"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!user && !userInfo) {
      router.push("/auth/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#2a2a2a] border-t-[#ff9a8b] rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
