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
    error instanceof Error
      ? error.message
      : error
        ? "Could not load your groups."
        : null;

  return (
    <section className="mx-auto min-h-[calc(100dvh-4rem)] w-full max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
            Groups
          </p>
          <h1 className="text-3xl font-bold text-base-content">
            All your groups
          </h1>
          <p className="app-subtle text-sm">
            Search by name, open your notes, and adjust each space when needed.
          </p>
        </div>

        <Link
          href="/groups/new"
          className="btn btn-primary w-full rounded-full sm:w-auto"
        >
          Create group
        </Link>
      </div>

      <div className="w-full max-w-xl">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search groups by name"
        />
      </div>

      {feedback ? (
        <div className="app-state-error rounded-2xl border px-4 py-3 text-sm">
          {feedback}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="app-empty-state col-span-full rounded-[1.75rem] border border-dashed px-4 py-18 text-center text-sm">
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
          <div className="app-empty-state col-span-full rounded-[1.75rem] border border-dashed px-4 py-18 text-center text-sm">
            No groups found.
          </div>
        )}
      </div>
    </section>
  );
}
