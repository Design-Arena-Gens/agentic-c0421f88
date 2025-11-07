import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mustafizur Chat",
  description: "WhatsApp Clone - Mustafizur Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-100">
        {children}
      </body>
    </html>
  );
}
