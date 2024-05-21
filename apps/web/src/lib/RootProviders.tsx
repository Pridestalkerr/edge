"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import QueryProvider from "./trpc/queryProvider";

// https://nextui.org/docs/customization/dark-mode#add-next-themes-provider
export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" forcedTheme="dark">
        <QueryProvider>{children}</QueryProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
