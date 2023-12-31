import TheHeader from "@/components/TheHeader/TheHeader";

import "./globals.css";
import { Nunito } from "next/font/google";
import { ReduxProvider } from "@/store/provider";


const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Синий куб",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <ReduxProvider>
          <TheHeader />
          <main className="main">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
