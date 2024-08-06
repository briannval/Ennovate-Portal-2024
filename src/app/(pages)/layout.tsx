import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ennovate UBC",
  description: "Official website of Ennovate UBC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div style={{ minHeight: "calc(100% - 5rem)", marginTop: "5rem" }}>
          {children}
        </div>
      </body>
    </html>
  );

  /*
  NOTE: h-20 is 5 rem
  */
}
