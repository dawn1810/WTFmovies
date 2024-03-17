import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "WTF movies",
  description: "Nơi thoả sức đam mê phim ảnh",
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
