import { createContext, useContext } from "react";

export const SidePanelContext = createContext<
  | {
      isContained: boolean;
    }
  | undefined
>(undefined);

export function useSidePanelContext() {
  const context = useContext(SidePanelContext);
  if (context === undefined) {
    throw new Error(
      "useSidePanelContext must be within SidePanelContext Provider",
    );
  }

  return context;
}
