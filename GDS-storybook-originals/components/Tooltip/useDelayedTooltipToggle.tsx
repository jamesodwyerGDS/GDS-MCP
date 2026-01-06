import { useCallback, useEffect, useRef } from "react";

const POINTER_OVER_DELAY = 400;
const ESCAPE_KEY = "Escape";

export function useDelayedTooltipToggle(
  tooltipRef: React.MutableRefObject<HTMLDivElement | null>,
  showTooltip: boolean,
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const timeoutIDRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleHideTooltip = useCallback(() => {
    timeoutIDRef.current = setTimeout(() => {
      const isPointerOnTooltip = tooltipRef.current?.matches(":hover");

      if (!isPointerOnTooltip) {
        setShowTooltip(false);
      }
    }, POINTER_OVER_DELAY);
  }, [setShowTooltip, tooltipRef]);

  const handleShowTooltip = useCallback(() => {
    clearTimeout(timeoutIDRef.current);
    timeoutIDRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 100);
  }, [setShowTooltip]);

  const handleToggleTooltip = useCallback(() => {
    if (!showTooltip) {
      handleShowTooltip();
    } else {
      handleHideTooltip();
    }
  }, [handleHideTooltip, handleShowTooltip, showTooltip]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ESCAPE_KEY) {
        setShowTooltip(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowTooltip]);

  return {
    handleHideTooltip,
    handleShowTooltip,
    handleToggleTooltip,
  };
}
