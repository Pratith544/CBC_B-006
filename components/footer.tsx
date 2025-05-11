"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const footerLinks = [
    {
      title: "Product",
      links: ["Features", "How it works", "Pricing", "FAQ"],
    },
    {
      title: "Resources",
      links: ["Blog", "Guides", "Support", "API"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Contact", "Partners"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Security", "Accessibility"],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
    { icon: <Youtube className="h-5 w-5" />, label: "YouTube" },
  ];

  return (
    <footer
      className={cn(
        "py-12 px-6 md:px-12",
        isDark ? "bg-[#121F2F]" : "bg-[#FFF9E6]"
      )}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div
              className={cn(
                "font-bold text-xl flex items-center mb-4",
                isDark ? "text-[#FF8F00]" : "text-[#D35400]"
              )}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4ZM8 16C8 11.582 11.582 8 16 8V24C11.582 24 8 20.418 8 16Z"
                  fill={isDark ? "#FF8F00" : "#D35400"}
                />
                <path
                  d="M20 12C18.895 12 18 12.895 18 14V18C18 19.105 18.895 20 20 20C21.105 20 22 19.105 22 18V14C22 12.895 21.105 12 20 12Z"
                  fill={isDark ? "#66BB6A" : "#2E8B57"}
                />
              </svg>
              Gram Net
            </div>
            <p
              className={cn(
                "mb-6 max-w-md",
                isDark ? "text-[#F5F5F5]/70" : "text-[#333333]/70"
              )}
            >
              Empowering rural communities with voice-based technology that
              bridges the digital divide and provides access to essential
              information.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    isDark
                      ? "text-[#F5F5F5]/70 hover:text-[#FF8F00] hover:bg-[#1A2A3A]"
                      : "text-[#333333]/70 hover:text-[#D35400] hover:bg-white"
                  )}
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3
                className={cn(
                  "font-semibold mb-4",
                  isDark ? "text-[#F5F5F5]" : "text-[#333333]"
                )}
              >
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className={cn(
                        "transition-colors",
                        isDark
                          ? "text-[#F5F5F5]/70 hover:text-[#FF8F00]"
                          : "text-[#333333]/70 hover:text-[#D35400]"
                      )}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4",
            isDark ? "border-[#1A2A3A]" : "border-[#D35400]/10"
          )}
        >
          <p
            className={cn(
              "text-sm",
              isDark ? "text-[#F5F5F5]/50" : "text-[#333333]/50"
            )}
          >
            © 2025 Gram Net. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className={cn(
                "text-sm transition-colors",
                isDark
                  ? "text-[#F5F5F5]/50 hover:text-[#FF8F00]"
                  : "text-[#333333]/50 hover:text-[#D35400]"
              )}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className={cn(
                "text-sm transition-colors",
                isDark
                  ? "text-[#F5F5F5]/50 hover:text-[#FF8F00]"
                  : "text-[#333333]/50 hover:text-[#D35400]"
              )}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
