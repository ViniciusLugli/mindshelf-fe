"use client";

import HomeFriendsPanel from "@/app/(private)/home/components/HomeFriendsPanel";
import HomeGroupsPanel from "@/app/(private)/home/components/HomeGroupsPanel";
import HomeHero from "@/app/(private)/home/components/HomeHero";
import HomeOnboardingModal from "@/app/(private)/home/components/HomeOnboardingModal";
import HomeResponseSection from "@/app/(private)/home/components/HomeResponseSection";
import HomeTasksPanel from "@/app/(private)/home/components/HomeTasksPanel";
import {
  useRealtimeRelationshipActions,
  useRealtimeSocial,
} from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { useHomeActivityQuery, useUpdateCurrentUserMutation } from "@/lib/api";
import { useCallback, useMemo, useState } from "react";
import { mapChatsToConversationItems } from "../utils/home.mappers";

export default function HomePageClient() {
  const { currentUser, setCurrentUser } = useSession();
  const { chats, friends, pendingInvites } = useRealtimeSocial();
  const { acceptFriendRequest, rejectFriendRequest } =
    useRealtimeRelationshipActions();
  const updateCurrentUserMutation = useUpdateCurrentUserMutation();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busyInviteId, setBusyInviteId] = useState<string | null>(null);
  const [dismissedOnboardingUserId, setDismissedOnboardingUserId] = useState<
    string | null
  >(null);
  const homeActivityQuery = useHomeActivityQuery();
  const homeData = homeActivityQuery.data ?? { groups: [], tasks: [] };
  const isLoading = homeActivityQuery.isLoading;
  const queryFeedback =
    homeActivityQuery.error instanceof Error
      ? homeActivityQuery.error.message
      : homeActivityQuery.error
        ? "Could not load your latest activity."
        : null;

  const unreadCount = useMemo(
    () => chats.reduce((total, chat) => total + (chat.unread_count ?? 0), 0),
    [chats],
  );
  const recentFriends = useMemo(() => friends.slice(0, 5), [friends]);
  const primaryName = currentUser?.name?.trim().split(/\s+/)[0] || "there";
  const conversationItems = useMemo(
    () => mapChatsToConversationItems(chats),
    [chats],
  );
  const isOnboardingOpen = Boolean(
    currentUser &&
    !currentUser.onboarding_completed &&
    dismissedOnboardingUserId !== currentUser.id,
  );

  const handleInviteAction = useCallback(
    async (userId: string, action: "accept" | "reject") => {
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
            : "Could not update that invite.",
        );
      } finally {
        setBusyInviteId(null);
      }
    },
    [acceptFriendRequest, rejectFriendRequest],
  );

  const handleCompleteOnboarding = useCallback(async () => {
    try {
      await updateCurrentUserMutation.mutateAsync({
        onboarding_completed: true,
      });

      if (currentUser) {
        setCurrentUser({
          ...currentUser,
          onboarding_completed: true,
        });
      }

      setDismissedOnboardingUserId(null);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Could not save your onboarding status.",
      );
    }
  }, [currentUser, setCurrentUser, updateCurrentUserMutation]);

  return (
    <section className="home-reading-desk px-4 py-5 sm:px-5 sm:py-6">
      <div className="w-full space-y-6">
        <HomeOnboardingModal
          open={isOnboardingOpen}
          isSaving={updateCurrentUserMutation.isPending}
          onClose={() => setDismissedOnboardingUserId(currentUser?.id ?? null)}
          onComplete={() => void handleCompleteOnboarding()}
        />

        <HomeHero
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
            onInviteAction={handleInviteAction}
          />

          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.22fr)_minmax(0,0.9fr)_minmax(0,0.9fr)]">
            <HomeTasksPanel isLoading={isLoading} tasks={homeData.tasks} />
            <HomeGroupsPanel isLoading={isLoading} groups={homeData.groups} />
            <HomeFriendsPanel friends={recentFriends} />
          </section>
        </div>
      </div>
    </section>
  );
}
