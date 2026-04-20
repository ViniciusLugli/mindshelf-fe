"use client";

import GroupCard from "@/app/components/shared/Cards/GroupCard";
import SearchField from "@/app/components/UI/SearchField";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { useGroupsQuery } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

export default function GroupsPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);
  const { data, isLoading, error } = useGroupsQuery(debouncedSearch, 1, 24);
  const groups = data?.data ?? [];
  const feedback =
    error instanceof Error ? error.message : error ? "Could not load your groups." : null;

  return (
    <section className="space-y-6 px-5 py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            Groups
          </p>
          <h1 className="text-3xl font-bold text-base-content">All your groups</h1>
          <p className="text-sm text-base-content/55">
            Search by name, open your notes, and adjust each space when needed.
          </p>
        </div>

        <Link href="/groups/new" className="btn btn-primary rounded-full">
          Create group
        </Link>
      </div>

      <div className="max-w-xl">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search groups by name"
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
            Loading groups...
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
            No groups found.
          </div>
        )}
      </div>
    </section>
  );
}
