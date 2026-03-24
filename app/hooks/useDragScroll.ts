import React from "react";

export function useDragScroll() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef({
    isDragging: false,
    pointerId: -1,
    startX: 0,
    scrollLeft: 0,
  });

  const stopDragging = React.useCallback(() => {
    dragState.current.isDragging = false;
    dragState.current.pointerId = -1;

    if (scrollRef.current) {
      scrollRef.current.style.cursor = "grab";
    }
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    dragState.current.isDragging = true;
    dragState.current.pointerId = e.pointerId;
    dragState.current.startX = e.clientX;
    dragState.current.scrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
    scrollRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current || !dragState.current.isDragging) return;
    if (dragState.current.pointerId !== e.pointerId) return;

    e.preventDefault();
    const walk = (e.clientX - dragState.current.startX) * 1.1;
    scrollRef.current.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;

    if (scrollRef.current.hasPointerCapture(e.pointerId)) {
      scrollRef.current.releasePointerCapture(e.pointerId);
    }

    stopDragging();
  };

  React.useEffect(() => {
    window.addEventListener("pagehide", stopDragging);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("pointerup", stopDragging);

    return () => {
      window.removeEventListener("pagehide", stopDragging);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, [stopDragging]);

  return {
    scrollRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: stopDragging,
  };
}
