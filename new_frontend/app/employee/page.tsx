"use client"; // Add this at the top of your component

import { useState } from "react";
import Link from "next/link";
// import EmployeeDashboard from "./EmployeeDashboard";

export default function DashboardView() {
  const [loginType, setLoginType] = useState("client");

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Dashboard
            </h1>
          </div>
          {/* <EmployeeDashboard/> */}
        </div>
      </div>
    </section>
  );
}
