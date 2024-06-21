import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { createClient } from "@/prismicio";


const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat',
})

export async function generateMetadata(): Promise<Metadata> {
  // fetch data from prismic
  const client = createClient();
  const page  = await client.getSingle("settings");
 
  return {
    title: page.data.site_title || "O2DIS | Homepage",
    description: page.data.meta_description || "O2DIS meta description",
    openGraph: {
      images: ['/some-specific-page-image.jpg'],
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.variable}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
