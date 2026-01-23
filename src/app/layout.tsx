import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/global/header";
import BackgroundImage from "@/components/global/bggroundImage";
import WhatsAppFloatingButton from "@/components/global/whatsappButton";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <BackgroundImage />
        <Header />
        {children}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
