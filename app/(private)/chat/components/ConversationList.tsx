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
    <aside className="app-surface-1 flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-4xl border p-4">
      <SearchField
        value={search}
        onChange={onSearchChange}
        placeholder="Search for a friend"
      />

      <div className="min-h-0 space-y-2 overflow-y-auto pr-1">
        {entries.length ? (
          entries.map((entry) => (
            <ConversationListItem
              key={entry.friend.id}
              entry={entry}
              isSelected={selectedFriendId === entry.friend.id}
            />
          ))
        ) : (
          <div className="app-empty-state rounded-3xl border border-dashed px-4 py-8 text-center text-sm">
            No conversations found.
          </div>
        )}
      </div>
    </aside>
  );
}
