import UserAvatar from "@/app/components/UI/UserAvatar";
import type { ConversationEntry } from "@/app/(private)/chat/types/chat.types";
import { truncateText } from "@/lib/utils/text";
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
      className={`flex items-center gap-3 rounded-[1.5rem] border px-3 py-3 transition-all ${
        isSelected
          ? "border-primary/30 bg-primary/8"
          : "border-base-300/60 bg-base-100 hover:border-base-300"
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
            <p className="text-xs text-base-content/40">{entry.friend.email}</p>
          </div>
          {entry.unreadCount > 0 ? (
            <span className="badge badge-error border-0 text-white">
              {entry.unreadCount}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-base-content/55">
          {truncateText(entry.lastMessage || "Nenhuma mensagem ainda.", 46)}
        </p>
      </div>
    </Link>
  );
}
