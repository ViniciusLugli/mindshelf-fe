"use client";

import SearchField from "@/app/components/UI/SearchField";
import TaskCard from "@/app/(private)/tasks/components/TaskCard";
import { useDebouncedValue } from "@/app/hooks/useDebouncedValue";
import { useTasksQuery } from "@/lib/api";
import { stripHtml } from "@/lib/utils/text";
import { useState } from "react";

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);
  const { data, isLoading, error } = useTasksQuery(debouncedSearch, 1, 24);
  const tasks = data?.data ?? [];
  const feedback =
    error instanceof Error
      ? error.message
      : error
        ? "Could not load your notes."
        : null;

  return (
    <section className="space-y-6 px-5 py-6 mx-40 h-dvh">
      <div className="space-y-2">
        <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
          Notes
        </p>
        <h1 className="text-3xl font-bold text-base-content">
          Find your notes
        </h1>
        <p className="app-subtle max-w-2xl text-sm leading-relaxed">
          Search for something to edit, review, or share.
        </p>
      </div>

      <div className="max-w-xl">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Search notes by title"
        />
      </div>

      {feedback ? (
        <div className="app-state-error rounded-2xl border px-4 py-3 text-sm">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="app-empty-state col-span-full rounded-[1.75rem] border border-dashed px-4 py-18 text-center text-sm">
            Loading notes...
          </div>
        ) : tasks.length ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              notes={stripHtml(task.notes)}
              groupName={task.group_name}
              groupColor={task.group_color}
              href={`/tasks/${task.id}`}
            />
          ))
        ) : (
          <div className="app-empty-state col-span-full rounded-[1.75rem] border border-dashed px-4 py-18 text-center text-sm">
            No notes found.
          </div>
        )}
      </div>
    </section>
  );
}
