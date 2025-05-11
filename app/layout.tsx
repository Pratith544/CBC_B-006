import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ChatModal } from "@/components/chat/chat-modal";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gram Net - AI Assistant for Rural Communities",
  description:
    "Voice-based AI assistant for farmers and small business owners in rural India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          {children}
          <ChatModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
