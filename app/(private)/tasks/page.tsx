"use client";

import SearchField from "@/app/components/UI/SearchField";
import TaskCard from "@/app/components/tasks/TaskCard";
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
    error instanceof Error ? error.message : error ? "Nao foi possivel carregar as tasks." : null;

  return (
    <section className="space-y-6 px-5 py-6">
      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
          Tasks
        </p>
        <h1 className="text-3xl font-bold text-base-content">Busque suas tasks</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-base-content/55">
          Encontre rapidamente o que precisa editar, revisar ou compartilhar com seus amigos.
        </p>
      </div>

      <div className="max-w-xl">
        <SearchField
          value={search}
          onChange={setSearch}
          placeholder="Procure tasks por titulo"
        />
      </div>

      {feedback ? (
        <div className="rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full rounded-[1.75rem] border border-dashed border-base-300/70 px-4 py-18 text-center text-sm text-base-content/45">
            Carregando tasks...
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
          <div className="col-span-full rounded-[1.75rem] border border-dashed border-base-300/70 px-4 py-18 text-center text-sm text-base-content/45">
            Nenhuma task encontrada.
          </div>
        )}
      </div>
    </section>
  );
}
