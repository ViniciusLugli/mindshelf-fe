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
    <aside className="app-surface-1 flex h-full min-h-0 flex-col gap-4 overflow-hidden rounded-[1.6rem] border p-3 sm:rounded-4xl sm:p-4">
      <div className="px-1 sm:hidden">
        <p className="app-faint text-[11px] font-bold uppercase tracking-[0.24em]">
          Inbox
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-base-content">Chats</h1>
        <p className="app-subtle mt-1 text-sm">
          Open a conversation or search for someone.
        </p>
      </div>

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
