import UserAvatar from "@/app/components/UI/UserAvatar";
import type { ConversationEntry } from "@/app/(private)/chat/types/chat.types";
import Link from "next/link";

type ConversationListItemProps = {
  entry: ConversationEntry;
  isSelected: boolean;
};

export default function ConversationListItem({
  entry,
  isSelected,
}: ConversationListItemProps) {
  return (
    <Link
      href={`/chat/${entry.friend.id}`}
      className={`flex items-center gap-3 rounded-3xl border px-3 py-3 transition-colors transition-transform ${
        isSelected
          ? "border-primary/35 bg-primary/14"
          : "app-surface-2 hover:border-primary/20"
      }`}
    >
      <UserAvatar
        name={entry.friend.name}
        avatarUrl={entry.friend.avatar_url}
        size="md"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-base-content">
              {entry.friend.name}
            </p>
          </div>
          {entry.unreadCount > 0 ? (
            <span className="badge badge-error border-0 text-white">
              {entry.unreadCount}
            </span>
          ) : null}
        </div>
        <p className="app-preview-text app-subtle mt-2 text-sm leading-relaxed">
          {entry.lastMessage || "No messages yet."}
        </p>
      </div>
    </Link>
  );
}
