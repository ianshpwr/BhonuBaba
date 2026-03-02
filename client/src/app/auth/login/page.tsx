"use client";

import Link from "next/link";
import Button from "@/components/Button";

export default function LoginPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 sm:p-12 rounded-[2.5rem] soft-shadow border border-peach-100 relative overflow-hidden">
        {/* Decorative corner blur */}
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
        <form className="mt-8 space-y-6 relative">
          <div className="space-y-5">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-foreground mb-2">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
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
                className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-peach-200 placeholder-gray-400 text-foreground focus:outline-none focus:ring-2 focus:ring-peach-400 focus:border-transparent transition-all shadow-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="button" fullWidth size="lg" className="text-lg">
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
