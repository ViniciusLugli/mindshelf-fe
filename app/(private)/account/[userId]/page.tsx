"use client";

import RelationshipActions from "@/app/components/social/RelationshipActions";
import UserAvatar from "@/app/components/UI/UserAvatar";
import { useRealtime } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { userApi } from "@/lib/api";
import type { UserResponse } from "@/lib/api/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function AccountProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;
  const { currentUser } = useSession();
  const { friends, pendingInvites, outgoingInviteIds } = useRealtime();
  const [profile, setProfile] = useState<UserResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await userApi.getByIdOrEmail({ id: userId });
        if (!cancelled) {
          setProfile(response);
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Nao foi possivel carregar esse perfil.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const relationship = useMemo(() => {
    return {
      isSelf: currentUser?.id === profile?.id,
      isFriend: friends.some((friend) => friend.id === profile?.id),
      hasIncomingInvite: pendingInvites.some(
        (invite) => invite.requester.id === profile?.id,
      ),
      hasOutgoingInvite: profile ? outgoingInviteIds.includes(profile.id) : false,
    };
  }, [currentUser?.id, friends, outgoingInviteIds, pendingInvites, profile]);

  if (isLoading) {
    return (
      <section className="px-5 py-10">
        <div className="rounded-[2rem] border border-base-300/70 bg-base-100/90 px-6 py-20 text-center text-sm text-base-content/45 shadow-sm">
          Carregando perfil...
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="px-5 py-10">
        <div className="rounded-[2rem] border border-error/20 bg-error/8 px-6 py-20 text-center text-sm text-error shadow-sm">
          {error || "Perfil nao encontrado."}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 px-5 py-6">
      <div className="rounded-[2.2rem] border border-base-300/70 bg-base-100/95 shadow-sm">
        <div className="h-28 rounded-t-[2.2rem] bg-[radial-gradient(circle_at_top_left,rgba(231,111,81,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(42,157,143,0.18),transparent_36%)]" />

        <div className="px-6 pb-8">
          <div className="-mt-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <UserAvatar name={profile.name} avatarUrl={profile.avatar_url} size="xl" />
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                  Perfil
                </p>
                <h1 className="text-4xl font-bold text-base-content">{profile.name}</h1>
                <p className="text-sm text-base-content/55">{profile.email}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {relationship.isSelf ? (
                <Link href="/account" className="btn btn-primary rounded-full">
                  Editar minha conta
                </Link>
              ) : null}
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-5 rounded-[1.8rem] border border-base-300/60 bg-base-100 p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Relacao
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-base-content">
                  Conecte-se com {profile.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-base-content/55">
                  Envie convites, responda pedidos recebidos ou abra uma conversa direta quando ja forem amigos.
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

            <aside className="space-y-4 rounded-[1.8rem] border border-base-300/60 bg-base-200/35 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Atalhos
              </p>
              <Link href="/account" className="btn btn-ghost w-full rounded-full justify-start">
                Voltar para minha conta
              </Link>
              <Link href="/chat" className="btn btn-ghost w-full rounded-full justify-start">
                Ver conversas
              </Link>
              <Link href="/contacts/pending" className="btn btn-ghost w-full rounded-full justify-start">
                Convites pendentes
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
