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
    <div className="w-full m-5">
      <h2 className="mb-4 px-1 text-lg font-bold text-base-content sm:text-2xl">
        {title}
      </h2>

      <div className="group/carousel relative">
        <button
          onClick={() => scroll("left")}
          className="btn btn-circle btn-sm absolute left-1 top-1/2 z-10 -translate-x-2 -translate-y-1/2 border border-base-300/70 bg-base-100/90 text-base-content opacity-0 shadow-md shadow-base-content/10 backdrop-blur transition-all duration-200 group-hover/carousel:opacity-100 hover:-translate-x-3 hover:bg-base-100"
        >
          <ChevronLeft fontSize="small" />
        </button>

        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          className="flex snap-x snap-proximity gap-4 overflow-x-auto px-1 pb-3 pt-1 select-none"
          style={{ scrollbarWidth: "none", cursor: "grab" }}
        >
          {users.map((user) => (
            <UserCard key={user.id} {...user} />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="btn btn-circle btn-sm absolute right-1 top-1/2 z-10 translate-x-2 -translate-y-1/2 border border-base-300/70 bg-base-100/90 text-base-content opacity-0 shadow-md shadow-base-content/10 backdrop-blur transition-all duration-200 group-hover/carousel:opacity-100 hover:translate-x-3 hover:bg-base-100"
        >
          <ChevronRight fontSize="small" />
        </button>
      </div>
    </div>
  );
}
