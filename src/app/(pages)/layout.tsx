import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AuthProvider from "@/hooks/auth";

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
        <AuthProvider>
          <Navbar />
          <div
            style={{
              minHeight: "calc(100vh - 5rem)",
              marginTop: "5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );

  /*
  NOTE: h-20 is 5 rem
  */
}
