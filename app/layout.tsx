import type { Metadata } from "next";
import  {Nunito} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/Modals/RegisterModal";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

const font = Nunito({
  subsets:["latin"]
});

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={font.className}
      >
        <ClientOnly>
          <RegisterModal/>
        <Navbar/>
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
