import SearchField from "@/app/components/UI/SearchField";
import TaskCard from "@/app/(private)/tasks/components/TaskCard";
import type { TaskResponse } from "@/lib/api";
import { stripHtml } from "@/lib/utils/text";

type GroupTaskListProps = {
  search: string;
  onSearchChange: (value: string) => void;
  feedback: string | null;
  tasks: TaskResponse[];
};

export default function GroupTaskList({
  search,
  onSearchChange,
  feedback,
  tasks,
}: GroupTaskListProps) {
  return (
    <div className="space-y-5 rounded-[1.8rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
            Group notes
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-base-content">
            Browse what is active
          </h2>
        </div>

        <div className="w-full max-w-md">
          <SearchField
            value={search}
            onChange={onSearchChange}
            placeholder="Search by title or content"
          />
        </div>
      </div>

      {feedback ? (
        <div className="rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-sm text-base-content/75">
          {feedback}
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {tasks.length ? (
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
          <div className="col-span-full rounded-3xl border border-dashed border-base-300/70 px-4 py-16 text-center text-sm text-base-content/45">
            No notes match your search.
          </div>
        )}
      </div>
    </div>
  );
}
