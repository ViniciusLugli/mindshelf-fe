"use client";

import RelationshipActions from "@/app/components/social/RelationshipActions";
import UserAvatar from "@/app/components/UI/UserAvatar";
import { useRealtimeSocialCollections } from "@/app/providers/RealtimeProvider";
import { formatDateTime } from "@/lib/utils/date";
import Link from "next/link";

export default function PendingInvitesPage() {
  const { pendingInvites } = useRealtimeSocialCollections();

  return (
    <section className="space-y-6 px-5 py-6 mx-40 h-dvh">
      <div className="space-y-2">
        <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
          Pending invites
        </p>
        <h1 className="text-3xl font-bold text-base-content">
          Received friend requests
        </h1>
        <p className="app-subtle max-w-2xl text-sm leading-relaxed">
          Review new requests and decide who joins your network.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {pendingInvites.length ? (
          pendingInvites.map((invite) => (
            <article
              key={invite.requester.id}
              className="app-surface-1 space-y-4 rounded-[1.75rem] border p-5"
            >
              <div className="flex items-center gap-4">
                <UserAvatar
                  name={invite.requester.name}
                  avatarUrl={invite.requester.avatar_url}
                  size="lg"
                />
                <div>
                  <Link
                    href={`/account/${invite.requester.id}`}
                    className="text-lg font-semibold text-base-content transition-colors hover:text-primary"
                  >
                    {invite.requester.name}
                  </Link>
                  <p className="app-faint text-sm">{invite.requester.email}</p>
                  <p className="app-faint mt-1 text-xs uppercase tracking-[0.22em]">
                    Received {formatDateTime(invite.created_at)}
                  </p>
                </div>
              </div>

              <RelationshipActions
                userId={invite.requester.id}
                hasIncomingInvite
              />
            </article>
          ))
        ) : (
          <div className="app-empty-state col-span-full rounded-[1.75rem] border border-dashed px-5 py-18 text-center text-sm">
            No pending invites right now.
          </div>
        )}
      </div>
    </section>
  );
}
