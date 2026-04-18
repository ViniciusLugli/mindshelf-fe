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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/35 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-3xl rounded-[2rem] border border-base-300/70 bg-base-100 shadow-2xl">
        <div className="space-y-2 border-b border-base-300/60 px-6 py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            Compartilhar task
          </p>
          <h2 className="text-2xl font-semibold text-base-content">
            Envie uma task para {selectedFriendName}
          </h2>
        </div>

        <div className="space-y-5 px-6 py-6">
          <SearchField
            value={taskSearch}
            onChange={onTaskSearchChange}
            placeholder="Procure uma task pelo titulo"
          />

          <div className="grid gap-4 md:grid-cols-2">
            {isLoadingTasks ? (
              <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                Carregando tasks...
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
              <div className="col-span-full rounded-[1.5rem] border border-dashed border-base-300/70 px-4 py-10 text-center text-sm text-base-content/45">
                Nenhuma task encontrada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
