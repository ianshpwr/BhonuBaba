"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Attempting to log in user with email:", formData.email);

    try {
      console.log("Fetching POST http://localhost:5000/api/auth/login");
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login response payload:", res.status, data);

      if (res.ok) {
        console.log("User logged in successfully! Redirecting...");
        localStorage.setItem("userInfo", JSON.stringify(data));
        router.push("/");
      } else {
        console.error("Login failed:", data.message);
        setError(data.message || "Invalid credentials");
      }
    } catch (err: any) {
      console.error("Network or server error during login request:", err);
      setError("Something went wrong with the server. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 sm:p-12 rounded-[2.5rem] soft-shadow border border-peach-100 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-peach-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-peach-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <div className="relative">
          <h2 className="text-center text-4xl font-extrabold text-foreground tracking-tight">
            Welcome back 🍑
          </h2>
          <p className="mt-4 text-center text-foreground/70">
            Or{" "}
            <Link href="/auth/register" className="font-semibold text-peach-500 hover:text-peach-400 transition-colors">
              create a new account
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-100 relative z-10 text-center">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6 relative" onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-foreground mb-2">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-peach-200 placeholder-gray-400 text-foreground focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all shadow-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-peach-200 placeholder-gray-400 text-foreground focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" fullWidth size="lg" className="text-lg" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
