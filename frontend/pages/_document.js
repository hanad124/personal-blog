import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import ScrollIndicator from "@/components/ScrollIndicator";

export default function Document() {
  return (
    <Html lang="en">
      {/* <ScrollIndicator /> */}
      <Head />
      <body className="mx-auto w-full  relative">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
