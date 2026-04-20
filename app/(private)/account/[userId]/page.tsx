"use client";

import RelationshipActions from "@/app/components/social/RelationshipActions";
import UserAvatar from "@/app/components/UI/UserAvatar";
import { useRealtimeSocial } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { useUserProfileQuery } from "@/lib/api";
import { normalizeRouteParam } from "@/lib/utils/route-params";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function AccountProfilePage() {
  const params = useParams<{ userId?: string | string[] }>();
  const userId = normalizeRouteParam(params.userId);
  const { currentUser } = useSession();
  const { friends, pendingInvites, outgoingInviteIds } = useRealtimeSocial();
  const profileQuery = useUserProfileQuery(userId);
  const profile = profileQuery.data ?? null;
  const isLoading = profileQuery.isLoading;
  const error =
    profileQuery.error instanceof Error
      ? profileQuery.error.message
      : profileQuery.error
        ? "Could not load this profile."
        : null;

  const relationship = useMemo(() => {
    return {
      isSelf: currentUser?.id === profile?.id,
      isFriend: friends.some((friend) => friend.id === profile?.id),
      hasIncomingInvite: pendingInvites.some(
        (invite) => invite.requester.id === profile?.id,
      ),
      hasOutgoingInvite: profile
        ? outgoingInviteIds.includes(profile.id)
        : false,
    };
  }, [currentUser?.id, friends, outgoingInviteIds, pendingInvites, profile]);

  if (isLoading) {
    return (
      <section className="px-5 py-10">
        <div className="app-surface-1 rounded-4xl border px-6 py-20 text-center text-sm app-subtle">
          Loading profile...
        </div>
      </section>
    );
  }

  if (!userId) {
    return (
      <section className="px-5 py-10">
        <div className="app-state-error rounded-4xl border px-6 py-20 text-center text-sm">
          The profile identifier is invalid.
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="px-5 py-10">
        <div className="app-state-error rounded-4xl border px-6 py-20 text-center text-sm">
          {error || "Profile not found."}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 px-5 py-6">
      <div className="app-surface-1 overflow-hidden rounded-[2.2rem] border">
        <div className="app-profile-banner h-28 rounded-t-[2.2rem]" />

        <div className="px-6 pb-8">
          <div className="-mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <UserAvatar
                name={profile.name}
                avatarUrl={profile.avatar_url}
                size="xl"
              />
              <div className="space-y-2">
                <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
                  Profile
                </p>
                <h1 className="text-4xl font-bold text-base-content">
                  {profile.name}
                </h1>
                <p className="app-subtle text-sm">{profile.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {relationship.isSelf ? (
                <Link href="/account" className="btn btn-primary rounded-full">
                  Edit my account
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="app-surface-2 space-y-5 rounded-[1.8rem] border p-6">
              <div>
                <p className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
                  Connection
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-base-content">
                  Connect with {profile.name}
                </h2>
                <p className="app-subtle mt-2 text-sm leading-relaxed">
                  Send an invite, respond to requests, or open a direct chat
                  when you&apos;re already connected.
                </p>
              </div>

              <RelationshipActions
                userId={profile.id}
                isSelf={relationship.isSelf}
                isFriend={relationship.isFriend}
                hasIncomingInvite={relationship.hasIncomingInvite}
                hasOutgoingInvite={relationship.hasOutgoingInvite}
              />
            </div>

            <aside className="app-surface-2 space-y-4 rounded-[1.8rem] border p-6">
              <p className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
                Shortcuts
              </p>
              <Link
                href="/account"
                className="btn btn-ghost w-full rounded-full justify-start"
              >
                Back to my account
              </Link>
              <Link
                href="/chat"
                className="btn btn-ghost w-full rounded-full justify-start"
              >
                View chat
              </Link>
              <Link
                href="/contacts/pending"
                className="btn btn-ghost w-full rounded-full justify-start"
              >
                Pending invites
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
