import { memo } from "react";
import UserAvatar from "@/app/components/UI/UserAvatar";
import { formatDateTime } from "@/lib/utils/date";
import Link from "next/link";
import type { ConversationItem } from "../types/home.types";

type HomeConversationCardProps = {
  item: ConversationItem;
};

function HomeConversationCard({
  item,
}: HomeConversationCardProps) {
  return (
    <Link
      href={`/chat/${item.friendId}`}
      className="app-surface-2 block w-full min-w-0 rounded-[1.75rem] border px-4 py-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/35 sm:px-5"
    >
      <div className="flex items-start gap-4">
        <UserAvatar
          name={item.friendName}
          avatarUrl={item.friendAvatarUrl ?? undefined}
          size="md"
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-base-content">
                {item.friendName}
              </p>
              <p className="app-faint truncate text-sm">
                {item.friendEmail}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {item.unreadCount > 0 ? (
                <span className="font-ui-mono rounded-full bg-primary px-2.5 py-1 text-[10px] uppercase text-primary-content">
                  {item.unreadCount} new
                </span>
              ) : null}
              <span className="app-faint font-ui-mono text-[11px] uppercase">
                {formatDateTime(item.createdAt)}
              </span>
            </div>
          </div>

          <p className="app-preview-text app-subtle mt-3 text-sm leading-relaxed">
            {item.preview}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default memo(HomeConversationCard, (prevProps, nextProps) => {
  const previous = prevProps.item;
  const next = nextProps.item;

  return (
    previous.id === next.id &&
    previous.friendId === next.friendId &&
    previous.friendName === next.friendName &&
    previous.friendEmail === next.friendEmail &&
    previous.friendAvatarUrl === next.friendAvatarUrl &&
    previous.createdAt === next.createdAt &&
    previous.unreadCount === next.unreadCount &&
    previous.preview === next.preview
  );
});
