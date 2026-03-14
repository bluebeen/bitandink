"use client";

import { ReactNode } from "react";
import useKeyboardNav from "@/lib/useKeyboardNav";

type KeyboardNavProviderProps = {
  children: ReactNode;
};

export default function KeyboardNavProvider({
  children,
}: KeyboardNavProviderProps) {
  useKeyboardNav();

  return <>{children}</>;
}