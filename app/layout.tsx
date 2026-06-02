import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amber Supplier Survey",
  description: "Amber Enterprises Supplier Satisfaction Survey",
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
