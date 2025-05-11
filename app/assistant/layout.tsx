import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatModal } from "@/components/chat/chat-modal";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rural Digital Empowerment",
  description: "Digital assistant for rural communities",
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
          {children}
          <ChatModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
