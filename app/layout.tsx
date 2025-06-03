import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import {
  ClerkProvider
} from '@clerk/nextjs'
import Footer from "@/components/common/Footer";
import CreateEventDrawer from "@/components/ui/creat-event";

export const metadata: Metadata = {
  title: "TimelyMeet",
  description: "Smart meeting scheduler",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
        >
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>
          <Footer />
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
