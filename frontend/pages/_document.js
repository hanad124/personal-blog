import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import ScrollIndicator from "@/components/ScrollIndicator";
import Footer from "@/components/Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="mx-auto w-full  relative">
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  );
}
