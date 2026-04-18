import type { TaskResponse } from "@/lib/api";

type TaskWorkspaceHeaderProps = {
  task: TaskResponse;
  title: string;
  isSaving: boolean;
  hasChanges: boolean;
  onTitleChange: (value: string) => void;
  onOpenSettings: () => void;
  onOpenDelete: () => void;
  onSave: () => void;
};

export default function TaskWorkspaceHeader({
  task,
  title,
  isSaving,
  hasChanges,
  onTitleChange,
  onOpenSettings,
  onOpenDelete,
  onSave,
}: TaskWorkspaceHeaderProps) {
  return (
    <div className="rounded-[2.2rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div
            className="badge badge-outline border px-3 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{
              color: task.group_color,
              borderColor: task.group_color,
              backgroundColor: `color-mix(in srgb, ${task.group_color} 12%, transparent)`,
            }}
          >
            {task.group_name}
          </div>
          <input
            className="w-full bg-transparent text-4xl font-bold tracking-tight text-base-content outline-none"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
          />
          <p className="text-sm text-base-content/55">
            Edite a nota completa com um editor rico e ajuste as configuracoes da task quando precisar.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" className="btn btn-ghost rounded-full" onClick={onOpenSettings}>
            Configurar task
          </button>
          <button
            type="button"
            className="btn btn-ghost rounded-full text-error"
            onClick={onOpenDelete}
          >
            Apagar task
          </button>
          <button
            type="button"
            className="btn btn-primary rounded-full"
            disabled={!hasChanges || isSaving}
            onClick={onSave}
          >
            {isSaving ? "Salvando..." : "Salvar nota"}
          </button>
        </div>
      </div>
    </div>
  );
}
