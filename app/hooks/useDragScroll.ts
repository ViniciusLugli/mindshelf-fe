import React from "react";

export function useDragScroll() {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);
  const scrollLeft = React.useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;

    isDragging.current = true;
    startX.current = e.clientX;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;

    e.preventDefault();
    const walk = (e.clientX - startX.current) * 1.1;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  React.useEffect(() => {
    const stopDragging = () => {
      isDragging.current = false;
      if (scrollRef.current) {
        scrollRef.current.style.cursor = "grab";
      }
    };

    window.addEventListener("mouseup", stopDragging);

    return () => {
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  return { scrollRef, onMouseDown, onMouseMove, onMouseUp };
}
