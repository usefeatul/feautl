import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "JStack App",
  description: "Created using JStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Seline analytics */}

        <Script
          src="https://cdn.seline.com/seline.js"
          data-token="1eadc8582cdf3ff"
          strategy="afterInteractive"
        />
      </head>
      <body className="">{children}</body>
    </html>
  );
}
