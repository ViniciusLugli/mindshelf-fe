import SearchField from "@/app/components/UI/SearchField";
import type { ConversationEntry } from "@/app/(private)/chat/types/chat.types";
import ConversationListItem from "./ConversationListItem";

type ConversationListProps = {
  search: string;
  onSearchChange: (value: string) => void;
  entries: ConversationEntry[];
  selectedFriendId: string | null;
};

export default function ConversationList({
  search,
  onSearchChange,
  entries,
  selectedFriendId,
}: ConversationListProps) {
  return (
    <aside className="space-y-4 rounded-4xl border border-base-300/70 bg-base-100/90 p-4 shadow-sm">
      <SearchField
        value={search}
        onChange={onSearchChange}
        placeholder="Search for a friend"
      />

      <div className="space-y-2">
        {entries.length ? (
          entries.map((entry) => (
            <ConversationListItem
              key={entry.friend.id}
              entry={entry}
              isSelected={selectedFriendId === entry.friend.id}
            />
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-base-300/70 px-4 py-8 text-center text-sm text-base-content/50">
            No conversations found.
          </div>
        )}
      </div>
    </aside>
  );
}
