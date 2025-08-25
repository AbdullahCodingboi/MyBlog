// app/layout.jsx
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
  <head>
    {/* Preconnect for faster font loading */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
    <title>Abdullah Khalid</title>
    {/* Noto Sans import */}
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
      rel="stylesheet"
    />

    {/* Favicon */}
    <link rel="icon" href="/lumiHead.svg" sizes="any" type="image/svg+xml"/>
    {/* If you also have a PNG for higher res: */}
    {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" /> */}
    {/* <link rel="apple-touch-icon" href="/apple-touch-icon.png" /> */}
  </head>
  <body className="antialiased">
    {children}
  </body>
</html>

  );
}
