import React, { createContext, useCallback, useContext, useState } from "react";
import { AccordionType } from "./types";

type AccordionContext = {
  toggle: (id: string) => void;
  openIds: Set<string>;
};

export const AccordionContext = createContext<AccordionContext | undefined>(
  undefined,
);

export const AccordionProvider = ({
  type,
  children,
  defaultOpenIds,
}: {
  type: AccordionType;
  children: React.ReactElement;
  defaultOpenIds: string[];
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggle = useCallback(
    (id: string) => {
      setOpenIds((prev) => {
        const newSet = new Set(prev);

        if (type === "single") {
          // In single mode, only one can be open at a time
          return newSet.has(id) ? new Set() : new Set([id]);
        } else {
          // In multi mode, toggle the clicked one
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          return newSet;
        }
      });
    },
    [type],
  );

  return (
    <AccordionContext.Provider value={{ toggle, openIds }}>
      {children}
    </AccordionContext.Provider>
  );
};

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (context === undefined) {
    throw new Error(
      "useAccordionContext must be within AccordionContext Provider",
    );
  }

  return context;
}
