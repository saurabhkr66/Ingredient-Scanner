import { ReactNode } from "react";
import { HydrationBoundary } from "@tanstack/react-query";
type Props = {
  children: ReactNode;
  state: unknown;
};
export default function HydrateClient({ children, state }: Props) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
