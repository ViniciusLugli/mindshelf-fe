import AppModal from "@/app/components/UI/AppModal";

type GroupDeleteModalProps = {
  open: boolean;
  groupName: string;
  isSaving: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function GroupDeleteModal({
  open,
  groupName,
  isSaving,
  onClose,
  onDelete,
}: GroupDeleteModalProps) {
  return (
    <AppModal
      open={open}
      title="Delete group"
      description="This action removes the group permanently. Only continue if you're sure."
      onClose={onClose}
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-error/20 bg-error/8 px-4 py-4 text-sm text-error">
          The group &quot;{groupName}&quot; will be deleted and cannot be recovered.
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost rounded-full"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error rounded-full"
            onClick={onDelete}
            disabled={isSaving}
          >
            {isSaving ? "Deleting..." : "Confirm delete"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
