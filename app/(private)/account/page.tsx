"use client";

import SearchField from "@/app/components/UI/SearchField";
import UserAvatar from "@/app/components/UI/UserAvatar";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { ThemeSelector } from "@/app/components/shared/ThemeSelector";
import RelationshipActions from "@/app/components/social/RelationshipActions";
import { useRealtimeSocial } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import {
  authApi,
  useUpdateCurrentUserMutation,
  useUserSearchQuery,
} from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useSession();
  const { friends, pendingInvites, outgoingInviteIds } = useRealtimeSocial();
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
  } | null>(null);
  const [search, setSearch] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const debouncedSearch = useDebouncedValue(search, 280);
  const updateUserMutation = useUpdateCurrentUserMutation();
  const userSearchQuery = useUserSearchQuery(debouncedSearch, 1, 12);

  const results = userSearchQuery.data?.data ?? [];
  const isSearching = userSearchQuery.isLoading;
  const isSaving = updateUserMutation.isPending;

  const resolvedForm = form ?? {
    name: currentUser?.name ?? "",
    email: currentUser?.email ?? "",
    password: "",
  };

  const pendingCount = pendingInvites.length;

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    try {
      await updateUserMutation.mutateAsync({
        name: resolvedForm.name.trim() || undefined,
        email: resolvedForm.email.trim() || undefined,
        password: resolvedForm.password.trim() || undefined,
      });

      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          name: resolvedForm.name.trim() || currentUser.name,
          email: resolvedForm.email.trim() || currentUser.email,
        });
      }

      setForm({
        name: resolvedForm.name,
        email: resolvedForm.email,
        password: "",
      });
      setFeedback("Your settings have been updated.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Could not save your account.",
      );
    }
  };

  const highlightedFriends = useMemo(() => friends.slice(0, 4), [friends]);

  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <section className="space-y-8 px-5 py-6">
      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="app-surface-1 rounded-4xl border p-6">
          <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
            My account
          </p>

          <div className="mt-5 flex items-center gap-4">
            <UserAvatar
              name={currentUser?.name || "User"}
              avatarUrl={currentUser?.avatar_url}
              size="xl"
            />
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                {currentUser?.name || "Your account"}
              </h1>
              <p className="app-subtle mt-1 text-sm">
                {currentUser?.email || "Loading account details..."}
              </p>
            </div>
          </div>

          <div className="app-surface-2 mt-8 space-y-4 rounded-[1.75rem] border p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-base-content">
                  Pending invites
                </p>
                <p className="app-subtle text-sm">
                  See who wants to connect with you.
                </p>
              </div>
              <span className="badge badge-primary badge-lg">
                {pendingCount}
              </span>
            </div>
            <Link
              href="/contacts/pending"
              className="btn btn-primary w-full rounded-full"
            >
              Open invites
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-base-content">Friends</h2>
              <Link href="/chat" className="text-sm font-medium text-primary">
                Open chat
              </Link>
            </div>
            <div className="space-y-3">
              {highlightedFriends.length ? (
                highlightedFriends.map((friend) => (
                  <Link
                    key={friend.id}
                    href={`/account/${friend.id}`}
                    className="app-surface-2 flex items-center gap-3 rounded-[1.3rem] border px-3 py-3 transition-colors hover:border-primary/35"
                  >
                    <UserAvatar
                      name={friend.name}
                      avatarUrl={friend.avatar_url}
                      size="md"
                    />
                    <div>
                      <p className="font-semibold text-base-content">
                        {friend.name}
                      </p>
                      <p className="app-faint text-xs">
                        {friend.email}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="app-empty-state rounded-[1.3rem] border border-dashed px-4 py-6 text-sm">
                  Your friends will show up here.
                </div>
              )}
            </div>
          </div>

          <div className="app-state-error mt-6 rounded-[1.75rem] border p-5">
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-current/80">
                Session
              </p>
              <p className="app-subtle text-sm">
                Sign out of this device when you&apos;re done using your
                account.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-error mt-4 w-full rounded-full"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <form
            className="app-surface-1 rounded-4xl border p-6"
            onSubmit={handleSave}
          >
            <div className="app-elevated-gradient app-border-soft space-y-5 rounded-[1.75rem] border p-5 sm:p-6">
              <div className="space-y-2">
                <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
                  Settings
                </p>
                <h2 className="text-2xl font-semibold text-base-content">
                  Update your details
                </h2>
                <p className="app-subtle text-sm">
                  You can update your name, email, and password here.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-1">
                    <label
                      htmlFor="account-name"
                      className="app-muted block text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      id="account-name"
                      className="app-field-shell app-placeholder input input-bordered h-13 w-full rounded-2xl px-4"
                      value={resolvedForm.name}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...(current ?? resolvedForm),
                          name: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-1">
                    <label
                      htmlFor="account-email"
                      className="app-muted block text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      id="account-email"
                      type="email"
                      className="app-field-shell app-placeholder input input-bordered h-13 w-full rounded-2xl px-4"
                      value={resolvedForm.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...(current ?? resolvedForm),
                          email: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label
                      htmlFor="account-password"
                      className="app-muted block text-sm font-medium"
                    >
                      New password
                    </label>
                    <input
                      id="account-password"
                      type="password"
                      placeholder="Only fill this in if you want to change it"
                      className="app-field-shell app-placeholder input input-bordered h-13 w-full rounded-2xl px-4"
                      value={resolvedForm.password}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...(current ?? resolvedForm),
                          password: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="app-surface-2 rounded-3xl border p-4">
                  <div className="mb-3 space-y-1">
                    <p className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
                      Appearance
                    </p>
                    <p className="app-subtle text-sm">
                      Choose how the interface looks for you.
                    </p>
                  </div>
                  <ThemeSelector />
                </div>
              </div>
            </div>

            {feedback ? (
              <div className="app-state-info mt-5 rounded-2xl border px-4 py-3 text-sm">
                {feedback}
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <button
                className="btn btn-primary rounded-full px-6"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>

          <div className="app-surface-1 rounded-4xl border p-6">
            <div className="space-y-2">
              <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
                Find people
              </p>
              <h2 className="text-2xl font-semibold text-base-content">
                Search for collaborators
              </h2>
            </div>

            <div className="mt-5">
              <SearchField
                value={search}
                onChange={setSearch}
                placeholder="Search by a user's name"
              />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {isSearching ? (
                <div className="app-empty-state col-span-full rounded-3xl border border-dashed px-4 py-10 text-center text-sm">
                  Searching users...
                </div>
              ) : results.length ? (
                results.map((user) => {
                  const isFriend = friends.some(
                    (friend) => friend.id === user.id,
                  );
                  const hasIncomingInvite = pendingInvites.some(
                    (invite) => invite.requester.id === user.id,
                  );
                  const hasOutgoingInvite = outgoingInviteIds.includes(user.id);

                  return (
                    <article
                      key={user.id}
                      className="app-surface-2 space-y-4 rounded-[1.7rem] border p-5"
                    >
                      <div className="flex items-center gap-4">
                        <UserAvatar
                          name={user.name}
                          avatarUrl={user.avatar_url}
                          size="lg"
                        />
                        <div>
                          <Link
                            href={`/account/${user.id}`}
                            className="text-lg font-semibold text-base-content transition-colors hover:text-primary"
                          >
                            {user.name}
                          </Link>
                          <p className="app-faint text-sm">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <RelationshipActions
                        userId={user.id}
                        isSelf={currentUser?.id === user.id}
                        isFriend={isFriend}
                        hasIncomingInvite={hasIncomingInvite}
                        hasOutgoingInvite={hasOutgoingInvite}
                      />
                    </article>
                  );
                })
              ) : search.trim() ? (
                <div className="app-empty-state col-span-full rounded-3xl border border-dashed px-4 py-10 text-center text-sm">
                  No users found.
                </div>
              ) : (
                <div className="app-empty-state col-span-full rounded-3xl border border-dashed px-4 py-10 text-center text-sm">
                  Type a name to start searching.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
