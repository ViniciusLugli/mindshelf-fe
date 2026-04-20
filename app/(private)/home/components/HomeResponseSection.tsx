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
    <section className="home-paper home-rise rounded-[2.25rem] border border-base-300/70 p-5 shadow-sm sm:p-6">
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
          <div className="rounded-[1.6rem] border border-base-300/60 bg-base-100/75 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-ui-mono text-[11px] uppercase text-base-content/38">
                  Recent conversations
                </p>
                <p className="mt-2 text-sm leading-relaxed text-base-content/58">
                  Open the threads that are active now, with unread messages highlighted first.
                </p>
              </div>
              <span className="font-ui-mono rounded-full border border-base-300/70 bg-base-100 px-3 py-1.5 text-[11px] uppercase text-base-content/48">
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
          <div className="rounded-[1.75rem] border border-base-300/60 bg-base-200/30 p-4">
            <p className="font-ui-mono text-[11px] uppercase text-base-content/38">
              Pending invites
            </p>
            <p className="mt-3 font-editorial text-3xl leading-none text-base-content">
              {invites.length}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-base-content/58">
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
