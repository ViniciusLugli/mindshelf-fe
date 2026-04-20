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
    <section className="home-paper home-rise app-border-soft w-full min-w-0 rounded-[2.25rem] border p-5 sm:p-6 xl:row-span-2">
      <HomeDeskHeading
        eyebrow="Keep writing"
        title="Recent notes"
        description="Open drafts stay close so you can continue thinking without extra clicks."
        action={
          <Link href="/tasks" className="btn btn-ghost w-full rounded-full sm:w-auto">
            View all
          </Link>
        }
      />

      <div className="mt-6 grid gap-4">
        {isLoading ? (
          <HomeEmptyState message="Loading notes..." />
        ) : tasks.length ? (
          tasks.map((task) => <HomeTaskPreviewCard key={task.id} task={task} />)
        ) : (
          <HomeEmptyState message="No recent notes yet." />
        )}
      </div>
    </section>
  );
}

export default memo(HomeTasksPanel);
