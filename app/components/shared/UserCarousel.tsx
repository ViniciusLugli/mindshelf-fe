"use client";

import { useDragScroll } from "@/app/hooks/useDragScroll";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

export type CarouselUser = {
  id: string;
  name: string;
  avatarUrl?: string;
  unreadMessages: number;
  status: "online" | "offline";
};

type UserCarouselProps = {
  users: CarouselUser[];
  title?: string;
};

export default function UserCarousel({
  users,
  title = "Your Contacts",
}: UserCarouselProps) {
  const [instanceKey, setInstanceKey] = useState(0);
  const {
    scrollRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  } = useDragScroll();

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setInstanceKey((current) => current + 1);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  if (!users.length) return null;

  return (
    <div className="w-full px-5 py-4">
      <h2 className="my-4 px-2 text-lg font-bold text-base-content sm:text-3xl">
        {title}
      </h2>

      <div className="group/carousel relative px-12">
        <button
          type="button"
          onClick={() => scroll("left")}
          className="btn btn-circle btn-sm absolute left-0 top-1/2 z-10 -translate-y-1/2 border border-base-300/70 bg-base-100/90 text-base-content shadow-md shadow-base-content/10 backdrop-blur transition-all duration-200 hover:bg-base-100 md:opacity-0 md:group-hover/carousel:opacity-100"
        >
          <ChevronLeft fontSize="small" />
        </button>

        <div
          key={instanceKey}
          ref={scrollRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onPointerLeave={onPointerCancel}
          className="flex gap-4 overflow-x-auto px-1 pb-3 pt-1 select-none"
          style={{
            scrollbarWidth: "none",
            cursor: "grab",
            touchAction: "pan-y",
          }}
          role="region"
          aria-label={title}
        >
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scroll("right")}
          className="btn btn-circle btn-sm absolute right-0 top-1/2 z-10 -translate-y-1/2 border border-base-300/70 bg-base-100/90 text-base-content shadow-md shadow-base-content/10 backdrop-blur transition-all duration-200 hover:bg-base-100 md:opacity-0 md:group-hover/carousel:opacity-100"
        >
          <ChevronRight fontSize="small" />
        </button>
      </div>
    </div>
  );
}
