import SearchField from "@/app/components/UI/SearchField";
import TaskCard from "@/app/(private)/tasks/components/TaskCard";
import type { TaskResponse } from "@/lib/api";
import { stripHtml } from "@/lib/utils/text";

type ShareTaskModalProps = {
  open: boolean;
  selectedFriendName?: string;
  taskSearch: string;
  isLoadingTasks: boolean;
  isSubmitting: boolean;
  tasks: TaskResponse[];
  onTaskSearchChange: (value: string) => void;
  onShareTask: (taskId: string) => void;
  onClose: () => void;
};

export default function ShareTaskModal({
  open,
  selectedFriendName,
  taskSearch,
  isLoadingTasks,
  isSubmitting,
  tasks,
  onTaskSearchChange,
  onShareTask,
  onClose,
}: ShareTaskModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="app-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="app-modal-surface relative z-10 w-full max-w-3xl rounded-4xl border">
        <div className="app-border-soft space-y-2 border-b px-6 py-5">
          <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
            Share note
          </p>
          <h2 className="text-2xl font-semibold text-base-content">
            Send a note to {selectedFriendName}
          </h2>
        </div>

        <div className="space-y-5 px-6 py-6">
          <SearchField
            value={taskSearch}
            onChange={onTaskSearchChange}
            placeholder="Search a note by title"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {isLoadingTasks ? (
              <div className="app-empty-state col-span-full rounded-3xl border border-dashed px-4 py-10 text-center text-sm">
                Loading notes...
              </div>
            ) : tasks.length ? (
              tasks.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  className="text-left"
                  onClick={() => onShareTask(task.id)}
                  disabled={isSubmitting}
                >
                  <TaskCard
                    id={task.id}
                    title={task.title}
                    notes={stripHtml(task.notes)}
                    groupName={task.group_name}
                    groupColor={task.group_color}
                  />
                </button>
              ))
            ) : (
              <div className="app-empty-state col-span-full rounded-3xl border border-dashed px-4 py-10 text-center text-sm">
                No notes found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
