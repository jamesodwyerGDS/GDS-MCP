import { createContext, useContext } from "react";
import { Size, Variant } from "./types";

export const ModalContext = createContext<
  | {
      size: Size;
      variant: Variant;
      hasImage: boolean;
      hasScroll: boolean;
      setHasScroll: React.Dispatch<React.SetStateAction<boolean>>;
      mobileMaxViewportWidth: string;
    }
  | undefined
>(undefined);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be within ModalContext Provider");
  }

  return context;
}
