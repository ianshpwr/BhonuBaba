"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/Button";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back to BhonuBaba!");
        login(data);
        router.push(redirect);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-500">
      <div className="max-w-md w-full space-y-8 glass-card p-10 sm:p-12 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#ff9a8b] rounded-full filter blur-[80px] opacity-10"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ff6a88] rounded-full filter blur-[80px] opacity-10"></div>

        <div className="relative">
          <h2 className="text-center text-4xl font-extrabold text-white tracking-tight">
            Welcome back
          </h2>
          <p className="mt-4 text-center text-[#b3b3b3]">
            Or{" "}
            <Link href="/auth/register" className="font-semibold bhonu-gradient-text hover:opacity-80 transition-opacity">
              create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6 relative" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-white mb-2">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 bg-[#1a1a1a] border border-[#2a2a2a] placeholder-[#b3b3b3] text-white focus:outline-none focus:border-[#ff9a8b] transition-all focus:shadow-[0_0_15px_rgba(255,154,139,0.2)]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 bg-[#1a1a1a] border border-[#2a2a2a] placeholder-[#b3b3b3] text-white focus:outline-none focus:border-[#ff9a8b] transition-all focus:shadow-[0_0_15px_rgba(255,154,139,0.2)]"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" fullWidth size="lg" className="text-lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
