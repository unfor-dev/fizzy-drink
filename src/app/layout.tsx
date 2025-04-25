import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import localFont from "next/font/local";
import Header from "@/components/Header";

import "./app.css"

const alpino = localFont({
  src: "../../public/fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={alpino.variable}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
