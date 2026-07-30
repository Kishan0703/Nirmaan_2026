import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirmaan | Hackathon 2026",
  description: "A design-led hackathon for builders, mentors, sponsors, and campus communities."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className="theme-light">
      <body>{children}</body>
    </html>
  );
}
