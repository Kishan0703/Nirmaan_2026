import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Units | Unique Student Homes",
  description: "All-inclusive student accommodation with everything you need to live, study and connect."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className="theme-light">
      <body>{children}</body>
    </html>
  );
}
