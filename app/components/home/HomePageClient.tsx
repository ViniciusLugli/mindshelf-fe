"use client";

import HomeFriendsPanel from "@/app/components/home/HomeFriendsPanel";
import HomeGroupsPanel from "@/app/components/home/HomeGroupsPanel";
import HomeHero from "@/app/components/home/HomeHero";
import HomeQuickActionsPanel from "@/app/components/home/HomeQuickActionsPanel";
import HomeResponseSection from "@/app/components/home/HomeResponseSection";
import HomeTasksPanel from "@/app/components/home/HomeTasksPanel";
import { mapChatsToConversationItems } from "@/app/components/home/home.mappers";
import { useRealtime } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { useHomeActivityQuery } from "@/lib/api";
import { useMemo, useState } from "react";

export default function HomePageClient() {
  const { currentUser } = useSession();
  const {
    chats,
    friends,
    pendingInvites,
    connectionStatus,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useRealtime();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busyInviteId, setBusyInviteId] = useState<string | null>(null);
  const homeActivityQuery = useHomeActivityQuery();
  const homeData = homeActivityQuery.data ?? { groups: [], tasks: [] };
  const isLoading = homeActivityQuery.isLoading;
  const queryFeedback =
    homeActivityQuery.error instanceof Error
      ? homeActivityQuery.error.message
      : homeActivityQuery.error
        ? "Nao foi possivel carregar suas atividades recentes."
        : null;

  const unreadCount = useMemo(
    () => chats.reduce((total, chat) => total + (chat.unread_count ?? 0), 0),
    [chats],
  );
  const recentFriends = useMemo(() => friends.slice(0, 5), [friends]);
  const primaryName = currentUser?.name?.trim().split(/\s+/)[0] || "usuario";
  const conversationItems = useMemo(
    () => mapChatsToConversationItems(chats),
    [chats],
  );

  async function handleInviteAction(
    userId: string,
    action: "accept" | "reject",
  ) {
    setBusyInviteId(userId);
    setFeedback(null);

    try {
      if (action === "accept") {
        await acceptFriendRequest({ friend_id: userId });
      } else {
        await rejectFriendRequest({ friend_id: userId });
      }
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Nao foi possivel responder ao pedido de amizade.",
      );
    } finally {
      setBusyInviteId(null);
    }
  }

  return (
    <section className="home-reading-desk px-4 py-5 sm:px-5 sm:py-6">
      <div className="w-full space-y-6">
        <HomeHero
          connectionStatus={connectionStatus}
          primaryName={primaryName}
          unreadCount={unreadCount}
          pendingInviteCount={pendingInvites.length}
          resumptionsCount={homeData.tasks.length + homeData.groups.length}
          profileName={currentUser?.name}
          profileEmail={currentUser?.email}
          profileAvatarUrl={currentUser?.avatar_url}
        />

        {feedback || queryFeedback ? (
          <div className="home-rise rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
            {feedback || queryFeedback}
          </div>
        ) : null}

        <div className="space-y-6">
          <HomeResponseSection
            unreadCount={unreadCount}
            conversations={conversationItems}
            invites={pendingInvites}
            busyInviteId={busyInviteId}
            onInviteAction={(userId, action) =>
              void handleInviteAction(userId, action)
            }
          />

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.22fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
            <HomeTasksPanel isLoading={isLoading} tasks={homeData.tasks} />
            <HomeGroupsPanel isLoading={isLoading} groups={homeData.groups} />
            <HomeQuickActionsPanel pendingInviteCount={pendingInvites.length} />
            <HomeFriendsPanel friends={recentFriends} />
          </section>
        </div>
      </div>
    </section>
  );
}
