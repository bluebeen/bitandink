import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import KeyboardNavProvider from "@/components/common/KeyboardNavProvider";
import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";

import BeanEasterEgg from "@/components/common/BeanEasterEgg";
import BeanDrop from "@/components/common/BeanDrop";
import BeanFollower from "@/components/common/BeanFollower";

export const metadata: Metadata = {
  metadataBase: new URL("https://beanlog.site"),

  title: {
    default: "bitandink | Code & Stories",
    template: "%s | bitandink",
  },

  description:
    "개발과 글쓰기를 함께 기록하는 공간. writings, portfolio, bean web studio.",

  openGraph: {
    title: "bitandink | Code & Stories",
    description:
      "개발과 글쓰기를 함께 기록하는 공간. writings, portfolio, bean web studio.",
    images: ["/opengraph-image"],
  },

  twitter: {
    card: "summary_large_image",
    title: "bitandink | Code & Stories",
    description:
      "개발과 글쓰기를 함께 기록하는 공간. writings, portfolio, bean web studio.",
    images: ["/twitter-image"],
  },

  icons: {
    icon: "/icon.png",
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <BeanFollower />
        <BeanDrop />
        <BeanEasterEgg />
        <KeyboardNavProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <KeyboardShortcuts />
        </KeyboardNavProvider>
      </body>
    </html>
  );
}