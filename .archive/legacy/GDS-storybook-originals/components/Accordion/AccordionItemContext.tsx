import React, { createContext, useContext } from "react";
import { useAccordionContext } from "./AccordionContext";

type AccordionItemContext = {
  id: string;
  isOpen: boolean;
};

export const AccordionItemContext = createContext<
  AccordionItemContext | undefined
>(undefined);

export const AccordionItemProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactElement;
}) => {
  const { openIds } = useAccordionContext();

  return (
    <AccordionItemContext.Provider value={{ isOpen: openIds.has(id), id }}>
      {children}
    </AccordionItemContext.Provider>
  );
};

export function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);

  if (context === undefined) {
    throw new Error(
      "useAccordionItemContext must be within AccordionItemContext Provider",
    );
  }

  return context;
}
