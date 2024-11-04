import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalState from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev School Management Dashboard",
  description: "Next.js School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          {children}
        </GlobalState>
      </body>
    </html>
  );
}
