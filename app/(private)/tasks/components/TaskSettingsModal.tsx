import AppModal from "@/app/components/UI/AppModal";
import type { GroupResponse } from "@/lib/api";

type TaskSettingsModalProps = {
  open: boolean;
  title: string;
  selectedGroupId: string;
  groups: GroupResponse[];
  isSaving: boolean;
  onTitleChange: (value: string) => void;
  onGroupChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function TaskSettingsModal({
  open,
  title,
  selectedGroupId,
  groups,
  isSaving,
  onTitleChange,
  onGroupChange,
  onClose,
  onSave,
}: TaskSettingsModalProps) {
  return (
    <AppModal
      open={open}
      title="Note settings"
      description="Rename this note or move it to another group. Moving creates a new copy in the destination group with the same content."
      onClose={onClose}
    >
      <div className="space-y-5 flex flex-col">
        <div className="flex gap-3 w-full justify-between lg:items-center">
          <label className="form-control gap-2 flex flex-col w-1/2">
            <span className="text-sm font-medium text-base-content/70">
              Name
            </span>
            <input
              className="input input-bordered rounded-2xl border-base-300/70"
              value={title}
              onChange={(event) => onTitleChange(event.target.value)}
            />
          </label>

          <label className="form-control gap-2 flex flex-col w-1/2">
            <span className="text-sm font-medium text-base-content/70">
              Group
            </span>
            <select
              className="select select-bordered rounded-2xl border-base-300/70"
              value={selectedGroupId}
              onChange={(event) => onGroupChange(event.target.value)}
            >
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost rounded-full"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary rounded-full"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save settings"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
