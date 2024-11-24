import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "@/components/navbar";
const inter = Nunito({ subsets: ["latin"] });
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/footer";
import { OpenPanelComponent } from "@openpanel/nextjs";

export const metadata: Metadata = {
  title: "AudioIntel",
  description: "Transform Audio into Actionable Intelligence",
  openGraph: {
    title: "AudioIntel",
    description: "Transform Audio into Actionable Intelligence",
    images: ["/audiointel-og.png"],
  },
  twitter: {
    title: "AudioIntel",
    description: "Transform Audio into Actionable Intelligence",
    images: ["/audiointel-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <OpenPanelComponent
          clientId="cbe01fd3-ed89-4a28-a297-85f052269233"
          trackScreenViews={true}
          trackAttributes={true}
        />
        <Navbar />
        {children}
        <Footer />
        <Toaster richColors position="bottom-center" />
      </body>
    </html>
  );
}
