import { QueryProvider } from "@/lib/provider/query";
import type { ReactNode } from "react";

export const RootProvider = (props: { children: ReactNode }) => {
  return <QueryProvider>{props.children}</QueryProvider>;
};
