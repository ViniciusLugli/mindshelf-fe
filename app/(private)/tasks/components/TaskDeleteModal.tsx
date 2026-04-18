import AppModal from "@/app/components/UI/AppModal";

type TaskDeleteModalProps = {
  open: boolean;
  taskTitle: string;
  isSaving: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export default function TaskDeleteModal({
  open,
  taskTitle,
  isSaving,
  onClose,
  onDelete,
}: TaskDeleteModalProps) {
  return (
    <AppModal
      open={open}
      title="Apagar task"
      description="Essa acao remove a task permanentemente. Confirme apenas se tiver certeza."
      onClose={onClose}
    >
      <div className="space-y-5">
        <div className="rounded-[1.5rem] border border-error/20 bg-error/8 px-4 py-4 text-sm text-error">
          A task &quot;{taskTitle}&quot; sera apagada e nao podera ser recuperada.
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost rounded-full" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn btn-error rounded-full" onClick={onDelete} disabled={isSaving}>
            {isSaving ? "Apagando..." : "Confirmar exclusao"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
