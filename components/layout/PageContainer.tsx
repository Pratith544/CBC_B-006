"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageContainerProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export default function PageContainer({
  children,
  fullWidth = false,
}: PageContainerProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main
        className={`flex-grow pt-16 ${
          fullWidth ? "" : "max-w-7xl mx-auto px-4 md:px-8"
        }`}
      >
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
}
