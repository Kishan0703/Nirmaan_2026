import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nirmaan | Hackathon Hosting",
  description: "Design-led hackathon hosting for colleges, clubs, communities, and sponsors."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className="theme-light">
      <body>{children}</body>
    </html>
  );
}
