"use client";

import SearchField from "@/app/components/UI/SearchField";
import UserAvatar from "@/app/components/UI/UserAvatar";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { ThemeSelector } from "@/app/components/shared/ThemeSelector";
import RelationshipActions from "@/app/components/social/RelationshipActions";
import { useRealtime } from "@/app/providers/RealtimeProvider";
import { useSession } from "@/app/providers/SessionProvider";
import { useUpdateCurrentUserMutation, useUserSearchQuery } from "@/lib/api";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function AccountPage() {
  const { currentUser, setCurrentUser } = useSession();
  const { friends, pendingInvites, outgoingInviteIds } = useRealtime();
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
      setFeedback("Suas configuracoes foram atualizadas.");
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Nao foi possivel salvar a conta.",
      );
    }
  };

  const highlightedFriends = useMemo(() => friends.slice(0, 4), [friends]);

  return (
    <section className="space-y-8 px-5 py-6">
      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            Minha conta
          </p>

          <div className="mt-5 flex items-center gap-4">
            <UserAvatar
              name={currentUser?.name || "Usuario"}
              avatarUrl={currentUser?.avatar_url}
              size="xl"
            />
            <div>
              <h1 className="text-3xl font-bold text-base-content">
                {currentUser?.name || "Sua conta"}
              </h1>
              <p className="mt-1 text-sm text-base-content/55">
                {currentUser?.email || "Carregando informacoes..."}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 rounded-[1.75rem] border border-base-300/60 bg-base-200/35 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-base-content">Convites pendentes</p>
                <p className="text-sm text-base-content/55">
                  Veja quem quer se conectar com voce.
                </p>
              </div>
              <span className="badge badge-primary badge-lg">{pendingCount}</span>
            </div>
            <Link href="/contacts/pending" className="btn btn-primary w-full rounded-full">
              Abrir convites
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-base-content">Amigos</h2>
              <Link href="/chat" className="text-sm font-medium text-primary">
                Abrir chat
              </Link>
            </div>
            <div className="space-y-3">
              {highlightedFriends.length ? (
                highlightedFriends.map((friend) => (
                  <Link
                    key={friend.id}
                    href={`/account/${friend.id}`}
                    className="flex items-center gap-3 rounded-[1.3rem] border border-base-300/60 bg-base-100 px-3 py-3 transition-colors hover:border-primary/30"
                  >
                    <UserAvatar
                      name={friend.name}
                      avatarUrl={friend.avatar_url}
                      size="md"
                    />
                    <div>
                      <p className="font-semibold text-base-content">{friend.name}</p>
                      <p className="text-xs text-base-content/45">{friend.email}</p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-[1.3rem] border border-dashed border-base-300/70 px-4 py-6 text-sm text-base-content/45">
                  Seus amigos vao aparecer aqui.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <form
            className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm"
            onSubmit={handleSave}
          >
            <div className="space-y-5 rounded-[1.75rem] border border-base-300/60 bg-[radial-gradient(circle_at_top_left,rgba(231,111,81,0.08),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.42),transparent)] p-5 sm:p-6">
              <div className="space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                  Configuracoes
                </p>
                <h2 className="text-2xl font-semibold text-base-content">
                  Ajuste seus dados principais
                </h2>
                <p className="text-sm text-base-content/55">
                  A API atual permite alterar nome, email e senha. O avatar segue vindo do backend.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-1">
                    <label
                      htmlFor="account-name"
                      className="block text-sm font-medium text-base-content/70"
                    >
                      Nome
                    </label>
                    <input
                      id="account-name"
                      className="input input-bordered h-13 w-full rounded-2xl border-base-300/70 bg-base-100 px-4"
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
                      className="block text-sm font-medium text-base-content/70"
                    >
                      Email
                    </label>
                    <input
                      id="account-email"
                      type="email"
                      className="input input-bordered h-13 w-full rounded-2xl border-base-300/70 bg-base-100 px-4"
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
                      className="block text-sm font-medium text-base-content/70"
                    >
                      Nova senha
                    </label>
                    <input
                      id="account-password"
                      type="password"
                      placeholder="Preencha apenas se quiser trocar"
                      className="input input-bordered h-13 w-full rounded-2xl border-base-300/70 bg-base-100 px-4"
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

                <div className="rounded-[1.5rem] border border-base-300/60 bg-base-100/80 p-4 shadow-sm">
                  <div className="mb-3 space-y-1">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                      Aparencia
                    </p>
                    <p className="text-sm text-base-content/55">
                      Escolha como a interface deve aparecer para voce.
                    </p>
                  </div>
                  <ThemeSelector />
                </div>
              </div>
            </div>

            {feedback ? (
              <div className="mt-5 rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-sm text-base-content/75">
                {feedback}
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <button className="btn btn-primary rounded-full px-6" disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar alteracoes"}
              </button>
            </div>
          </form>

          <div className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm">
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                Buscar usuarios
              </p>
              <h2 className="text-2xl font-semibold text-base-content">
                Encontre pessoas para colaborar
              </h2>
            </div>

            <div className="mt-5">
              <SearchField
                value={search}
                onChange={setSearch}
                placeholder="Procure pelo nome de um usuario"
              />
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {isSearching ? (
                <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                  Buscando usuarios...
                </div>
              ) : results.length ? (
                results.map((user) => {
                  const isFriend = friends.some((friend) => friend.id === user.id);
                  const hasIncomingInvite = pendingInvites.some(
                    (invite) => invite.requester.id === user.id,
                  );
                  const hasOutgoingInvite = outgoingInviteIds.includes(user.id);

                  return (
                    <article
                      key={user.id}
                      className="space-y-4 rounded-[1.7rem] border border-base-300/70 bg-base-100 p-5 shadow-sm"
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
                          <p className="text-sm text-base-content/50">{user.email}</p>
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
                <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                  Nenhum usuario encontrado.
                </div>
              ) : (
                <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                  Digite um nome para pesquisar usuarios.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
