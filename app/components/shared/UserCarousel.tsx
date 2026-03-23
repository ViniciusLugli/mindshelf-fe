"use client";

import { useDragScroll } from "@/app/hooks/useDragScroll";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
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
  const { scrollRef, onMouseDown, onMouseMove, onMouseUp } = useDragScroll();

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  if (!users.length) return null;

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-3 px-1">{title}</h2>

      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="btn btn-circle btn-sm btn-ghost absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-base-100 shadow"
        >
          <ChevronLeft fontSize="small" />
        </button>

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 select-none"
          style={{ scrollbarWidth: "none", cursor: "grab" }}
        >
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="btn btn-circle btn-sm btn-ghost absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-base-100 shadow"
        >
          <ChevronRight fontSize="small" />
        </button>
      </div>
    </div>
  );
}
