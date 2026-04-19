import { memo } from "react";
import Link from "next/link";
import type { TaskResponse } from "@/lib/api";
import HomeDeskHeading from "./HomeDeskHeading";
import HomeEmptyState from "./HomeEmptyState";
import HomeTaskPreviewCard from "./HomeTaskPreviewCard";

type HomeTasksPanelProps = {
  isLoading: boolean;
  tasks: TaskResponse[];
};

function HomeTasksPanel({ isLoading, tasks }: HomeTasksPanelProps) {
  return (
    <section className="home-paper home-rise rounded-[2.25rem] border border-base-300/70 p-5 shadow-sm sm:p-6 xl:row-span-2">
      <HomeDeskHeading
        eyebrow="Retome o trabalho"
        title="Tasks abertas como material de leitura"
        description="Os rascunhos recentes ficam com mais espaco para voce voltar ao raciocinio sem procurar em varias telas."
        action={
          <Link href="/tasks" className="btn btn-ghost rounded-full">
            Ver todas
          </Link>
        }
      />

      <div className="mt-6 grid gap-4">
        {isLoading ? (
          <HomeEmptyState message="Carregando tasks..." />
        ) : tasks.length ? (
          tasks.map((task) => <HomeTaskPreviewCard key={task.id} task={task} />)
        ) : (
          <HomeEmptyState message="Nenhuma task recente por aqui." />
        )}
      </div>
    </section>
  );
}

export default memo(HomeTasksPanel);
