import { memo } from "react";
import UserAvatar from "@/app/components/UI/UserAvatar";
import Link from "next/link";
import HomeDeskHeading from "./HomeDeskHeading";
import HomeEmptyState from "./HomeEmptyState";
import type { HomeFriend } from "../types/home.types";

type HomeFriendsPanelProps = {
  friends: HomeFriend[];
};

function HomeFriendsPanel({ friends }: HomeFriendsPanelProps) {
  return (
    <section className="home-paper home-rise rounded-[2.25rem] border border-base-300/70 p-5 shadow-sm sm:p-6 xl:h-full">
      <HomeDeskHeading
        eyebrow="People nearby"
        title="Your network stays close"
        description="Recent connections are easy to reach when you need a quick conversation."
      />

      <div className="mt-6 space-y-3">
        {friends.length ? (
          friends.map((friend) => (
            <Link
              key={friend.id}
              href={`/chat/${friend.id}`}
              className="flex items-center gap-3 rounded-3xl border border-base-300/60 bg-base-100/85 px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-base-content/5"
            >
              <UserAvatar
                name={friend.name}
                avatarUrl={friend.avatar_url ?? undefined}
                size="md"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-base-content">
                  {friend.name}
                </p>
                <p className="truncate text-sm text-base-content/48">
                  {friend.email}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <HomeEmptyState message="Your people will show up here once invites are accepted." />
        )}
      </div>
    </section>
  );
}

export default memo(HomeFriendsPanel);
