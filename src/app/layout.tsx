import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BMW Internal Names Quiz",
  description: "Learn BMW chassis codes through an interactive quiz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night">
      <body className="min-h-screen bg-base-100">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {children}
        </div>
      </body>
    </html>
  );
}
