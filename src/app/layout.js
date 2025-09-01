import { Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased ${notoSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
