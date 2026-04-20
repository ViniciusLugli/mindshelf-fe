import UserAvatar from "@/app/components/UI/UserAvatar";
import type { UserResponse } from "@/lib/api";
import Link from "next/link";

type ConversationHeaderProps = {
  friend: UserResponse;
  messageCount: number;
};

export default function ConversationHeader({
  friend,
  messageCount,
}: ConversationHeaderProps) {
  return (
    <div className="app-border-soft flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <UserAvatar
          name={friend.name}
          avatarUrl={friend.avatar_url}
          size="lg"
        />
        <div>
          <p className="text-xl font-semibold text-base-content">
            {friend.name}
          </p>
          <p className="app-faint mt-1 text-xs uppercase tracking-[0.22em]">
            {messageCount} messages loaded
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          href={`/account/${friend.id}`}
          className="btn btn-ghost rounded-full"
        >
          View profile
        </Link>
      </div>
    </div>
  );
}
