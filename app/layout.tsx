import type { Metadata } from "next";
import "./globals.css";
import { ThemeFunction } from "./context/ThemeContext";

export const metadata: Metadata = {
  title: "OpenNote",
  description: "Created with Next.JS, TailwindCSS, TypeScript & MongooDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="">
          <ThemeFunction>
            {children}
          </ThemeFunction>
        </main>
      </body>
    </html>
  );
}
