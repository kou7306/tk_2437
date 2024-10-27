import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import { getUser } from "@/lib/auth";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nazomate",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-base text-black`}>
        {user != null && <Header />}
        <Providers>
          <main className="pt-20 text-font">{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
