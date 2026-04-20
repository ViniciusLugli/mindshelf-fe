import { memo } from "react";
import Link from "next/link";
import HomeDeskHeading from "./HomeDeskHeading";
import HomeEmptyState from "./HomeEmptyState";
import HomeConversationCard from "./HomeConversationCard";
import HomeInviteCard from "./HomeInviteCard";
import type { ConversationItem, HomeInvite } from "../types/home.types";

type HomeResponseSectionProps = {
  unreadCount: number;
  conversations: ConversationItem[];
  invites: HomeInvite[];
  busyInviteId: string | null;
  onInviteAction: (userId: string, action: "accept" | "reject") => void;
};

function HomeResponseSection({
  unreadCount,
  conversations,
  invites,
  busyInviteId,
  onInviteAction,
}: HomeResponseSectionProps) {
  return (
    <section className="home-paper home-rise app-border-soft rounded-[2.25rem] border p-5 sm:p-6">
      <HomeDeskHeading
        eyebrow="Needs your reply"
        title="Invites and conversations"
        description="The first things you see are the ones waiting on you."
        action={
          <Link href="/contacts/pending" className="btn btn-ghost rounded-full">
            Manage invites
          </Link>
        }
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.12fr)_320px]">
        <div className="space-y-3">
          <div className="app-surface-2 rounded-[1.6rem] border px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="app-faint font-ui-mono text-[11px] uppercase">
                  Recent conversations
                </p>
                <p className="app-subtle mt-2 text-sm leading-relaxed">
                  Open the threads that are active now, with unread messages highlighted first.
                </p>
              </div>
              <span className="app-chip-subtle font-ui-mono rounded-full border px-3 py-1.5 text-[11px] uppercase">
                {unreadCount} unread
              </span>
            </div>
          </div>

          {conversations.length ? (
            conversations.map((item) => (
              <HomeConversationCard key={item.id} item={item} />
            ))
          ) : (
            <HomeEmptyState message="Your conversations will show up here once things start moving." />
          )}
        </div>

        <div className="space-y-3">
          <div className="app-surface-2 rounded-[1.75rem] border p-4">
            <p className="app-faint font-ui-mono text-[11px] uppercase">
              Pending invites
            </p>
            <p className="mt-3 font-editorial text-3xl leading-none text-base-content">
              {invites.length}
            </p>
            <p className="app-subtle mt-2 text-sm leading-relaxed">
              New connections that can unlock more conversations and shared work.
            </p>
          </div>

          {invites.length ? (
            invites
              .slice(0, 3)
              .map((invite) => (
                <HomeInviteCard
                  key={invite.requester.id}
                  invite={invite}
                  busy={busyInviteId === invite.requester.id}
                  onAction={onInviteAction}
                />
              ))
          ) : (
            <HomeEmptyState message="No pending invites right now." />
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(HomeResponseSection);
