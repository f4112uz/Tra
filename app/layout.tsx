import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Support Trainer OS",
  description:
    "A trainer workspace for support training materials, attendance, assessments, and 90-day performance impact.",
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
