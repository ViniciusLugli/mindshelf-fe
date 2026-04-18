import UserAvatar from "@/app/components/UI/UserAvatar";
import { formatDateTime } from "@/lib/utils/date";
import Link from "next/link";
import type { ConversationItem } from "./home.types";

type HomeConversationCardProps = {
  item: ConversationItem;
};

export default function HomeConversationCard({ item }: HomeConversationCardProps) {
  return (
    <Link
      href={`/chat/${item.friendId}`}
      className="block rounded-[1.75rem] border border-base-300/65 bg-base-100/88 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-base-content/5 sm:px-5"
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
              <p className="truncate text-sm text-base-content/45">{item.friendEmail}</p>
            </div>

            <div className="flex items-center gap-2">
              {item.unreadCount > 0 ? (
                <span className="font-ui-mono rounded-full bg-primary px-2.5 py-1 text-[10px] uppercase text-primary-content">
                  {item.unreadCount} nova(s)
                </span>
              ) : null}
              <span className="font-ui-mono text-[11px] uppercase text-base-content/38">
                {formatDateTime(item.createdAt)}
              </span>
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-base-content/60">{item.preview}</p>
        </div>
      </div>
    </Link>
  );
}
