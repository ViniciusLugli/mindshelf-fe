import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import PersonOutlineRounded from "@mui/icons-material/PersonOutlineRounded";
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
    <div className="app-border-soft flex items-center justify-between gap-3 border-b px-3 py-3 sm:px-5 sm:py-4">
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
        <Link href="/chat" className="btn btn-ghost btn-circle btn-sm lg:hidden" aria-label="Back to chats">
          <ArrowBackRounded fontSize="small" />
        </Link>
        <UserAvatar
          name={friend.name}
          avatarUrl={friend.avatar_url}
          size="md"
        />
        <div className="min-w-0">
          <p className="truncate text-base font-semibold text-base-content sm:text-xl">
            {friend.name}
          </p>
          <p className="app-faint mt-0.5 text-[10px] uppercase tracking-[0.2em] sm:mt-1 sm:text-xs sm:tracking-[0.22em]">
            {messageCount} messages loaded
          </p>
        </div>
      </div>

      <div className="flex shrink-0 gap-2 lg:justify-end">
        <Link
          href={`/account/${friend.id}`}
          className="btn btn-ghost btn-circle btn-sm sm:btn-sm"
          aria-label={`View ${friend.name}'s profile`}
        >
          <PersonOutlineRounded fontSize="small" />
        </Link>
      </div>
    </div>
  );
}
