import type { Metadata } from "next";
import Head from 'next/head';

import "./globals.scss";
export const metadata: Metadata = {
  title: "WTFmovies",
  description: "Nơi thoả sức đam mê phim ảnh",
  applicationName: "WTFmovies",
  authors: { name: "WTF dev", url: "https://wtfdev.com" },
  icons: "/favicon.svg"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
