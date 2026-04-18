import type { GroupResponse } from "@/lib/api";

type GroupWorkspaceHeaderProps = {
  group: GroupResponse;
  onConfigureGroup: () => void;
  onCreateTask: () => void;
};

export default function GroupWorkspaceHeader({
  group,
  onConfigureGroup,
  onCreateTask,
}: GroupWorkspaceHeaderProps) {
  return (
    <div
      className="overflow-hidden rounded-[2.2rem] border border-base-300/70 bg-base-100/95 shadow-sm"
      style={{
        backgroundImage: `radial-gradient(circle at top left, color-mix(in srgb, ${group.color} 18%, transparent), transparent 32%)`,
      }}
    >
      <div className="px-6 py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-3xl text-2xl font-bold text-white shadow-lg"
              style={{ backgroundColor: group.color }}
            >
              {group.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                Grupo
              </p>
              <h1 className="mt-2 text-4xl font-bold text-base-content">
                {group.name}
              </h1>
              <p className="mt-2 text-sm text-base-content/55">
                Explore as tasks do grupo, crie novas ideias e ajuste a
                identidade principal do espaco.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-ghost rounded-full"
              onClick={onConfigureGroup}
            >
              Configurar grupo
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-full"
              onClick={onCreateTask}
            >
              Criar task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
