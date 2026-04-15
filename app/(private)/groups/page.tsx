"use client";

import GroupCard from "@/app/components/shared/Cards/GroupCard";
import SearchField from "@/app/components/UI/SearchField";
import { groupApi } from "@/lib/api";
import type { GroupResponse } from "@/lib/api/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function GroupsPage() {
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState<GroupResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadGroups = async () => {
      setIsLoading(true);
      try {
        const response = search.trim()
          ? await groupApi.getByName(search.trim(), 1, 24)
          : await groupApi.getPaginated(1, 24);
        if (!cancelled) {
          setGroups(response.data);
          setFeedback(null);
        }
      } catch (error) {
        if (!cancelled) {
          setFeedback(
            error instanceof Error
              ? error.message
              : "Nao foi possivel carregar os grupos.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    const timeout = window.setTimeout(loadGroups, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [search]);

  return (
    <section className="space-y-6 px-5 py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            Grupos
          </p>
          <h1 className="text-3xl font-bold text-base-content">Todos os seus grupos</h1>
          <p className="text-sm text-base-content/55">
            Procure um grupo pelo nome, abra suas tasks e ajuste o espaco quando precisar.
          </p>
        </div>

        <Link href="/groups/new" className="btn btn-primary rounded-full">
          Criar grupo
        </Link>
      </div>

      <div className="max-w-xl">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Procure grupos pelo nome"
        />
      </div>

      {feedback ? (
        <div className="rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full rounded-[1.75rem] border border-dashed border-base-300/70 px-4 py-18 text-center text-sm text-base-content/45">
            Carregando grupos...
          </div>
        ) : groups.length ? (
          groups.map((group) => (
            <GroupCard
              key={group.id}
              title={group.name}
              color={group.color}
              href={`/groups/${group.id}`}
            />
          ))
        ) : (
          <div className="col-span-full rounded-[1.75rem] border border-dashed border-base-300/70 px-4 py-18 text-center text-sm text-base-content/45">
            Nenhum grupo encontrado.
          </div>
        )}
      </div>
    </section>
  );
}
