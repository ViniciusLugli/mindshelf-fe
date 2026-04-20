import type { GroupResponse } from "@/lib/api";
import { getContrastTextColor } from "@/lib/utils/color-contrast";

type GroupWorkspaceHeaderProps = {
  group: GroupResponse;
  onConfigureGroup: () => void;
  onCreateTask: () => void;
  onDeleteGroup: () => void;
};

export default function GroupWorkspaceHeader({
  group,
  onConfigureGroup,
  onCreateTask,
  onDeleteGroup,
}: GroupWorkspaceHeaderProps) {
  const badgeTextColor = getContrastTextColor(group.color);

  return (
    <div
      className="app-surface-1 overflow-hidden rounded-[2.2rem] border"
      style={{
        backgroundImage: `radial-gradient(circle at top left, color-mix(in srgb, ${group.color} 18%, transparent), transparent 32%)`,
      }}
    >
      <div className="px-6 py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-3xl text-2xl font-bold shadow-lg"
              style={{ backgroundColor: group.color, color: badgeTextColor }}
            >
              {group.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
                Group
              </p>
              <h1 className="mt-2 text-4xl font-bold text-base-content">
                {group.name}
              </h1>
              <p className="app-subtle mt-2 text-sm">
                Review the group&apos;s notes, create something new, and keep
                the space organized.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-ghost rounded-full text-error"
              onClick={onDeleteGroup}
            >
              Delete group
            </button>
            <button
              type="button"
              className="btn btn-ghost rounded-full"
              onClick={onConfigureGroup}
            >
              Edit group
            </button>
            <button
              type="button"
              className="btn btn-primary rounded-full"
              onClick={onCreateTask}
            >
              Create note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
