import type { Metadata } from "next";
import { Dancing_Script, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GSAPProvider } from "@/components/gsap-provider";

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maria's Mexican Grill | Authentic Jalisco Flavors",
  description:
    "Welcome to Maria's Mexican Grill on Johns Island, SC. Experience authentic Jalisco flavors, crafted fresh every day. Traditional Mexican cuisine with a fresh twist.",
  keywords: [
    "Mexican restaurant",
    "Johns Island",
    "Jalisco",
    "authentic Mexican food",
    "margaritas",
    "tacos",
    "South Carolina",
  ],
  openGraph: {
    title: "Maria's Mexican Grill | Authentic Jalisco Flavors",
    description:
      "Experience authentic Jalisco flavors, crafted fresh every day at Maria's Mexican Grill.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${dancingScript.variable} bg-white`}
    >
      <body className="font-sans antialiased min-h-screen flex flex-col text-[#1c0301]">
        <GSAPProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </GSAPProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
