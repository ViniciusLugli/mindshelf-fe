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
    <section className="home-paper home-rise app-border-soft w-full min-w-0 rounded-[2.25rem] border p-5 sm:p-6 xl:h-full">
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
              className="app-surface-2 flex w-full min-w-0 items-center gap-3 rounded-3xl border px-3 py-3 transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/35"
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
                <p className="app-faint truncate text-sm">
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
