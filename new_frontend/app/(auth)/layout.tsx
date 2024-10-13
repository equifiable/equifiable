"use client"; // Make this a client component

import { useState } from "react";
import Link from "next/link";
import PageIllustration from "@/components/page-illustration";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [signupType, setSignupType] = useState("employee");

  return (
    <main className="relative flex grow flex-col">
      {/* Background illustration */}
      <PageIllustration multiple />

      <section className="flex justify-center items-center grow">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Create Your Account
            </h1>
          </div>

          {/* Signup Type Toggle */}
          <div className="flex justify-center mb-8">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                signupType === "employee"
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSignupType("employee")}
            >
              Employee Sign Up
            </button>
            <button
              className={`ml-4 px-4 py-2 text-sm font-medium ${
                signupType === "company"
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "text-gray-500"
              }`}
              onClick={() => setSignupType("company")}
            >
              Company Sign Up
            </button>
          </div>

          {/* Card */}
          <div className="bg-blue-900 rounded-lg shadow-lg p-8 max-w-[400px] mx-auto">
            <form>
              <div className="space-y-5">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full bg-white text-black"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full bg-white text-black"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full bg-white text-black"
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-5">
                <button className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]">
                  {signupType === "employee"
                    ? "Sign up as Employee"
                    : "Sign up as Company"}
                </button>
                <div className="flex items-center gap-3 text-center text-sm italic text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                  or
                </div>
                <button className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                  Sign Up with Google
                </button>
              </div>
            </form>

            {/* Bottom link */}
            <div className="mt-6 text-center text-sm text-indigo-200/65">
              Already have an account?{" "}
              <Link className="font-medium text-indigo-500" href="/signin">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {children}
    </main>
  );
}
