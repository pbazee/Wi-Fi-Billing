import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Best Net WiFi Connect",
  description: "Futuristic SaaS WiFi billing platform prototype",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="grid-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
