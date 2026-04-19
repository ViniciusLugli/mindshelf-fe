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
      title="Apagar grupo"
      description="Essa acao remove o grupo permanentemente. Confirme apenas se tiver certeza."
      onClose={onClose}
    >
      <div className="space-y-5">
        <div className="rounded-3xl border border-error/20 bg-error/8 px-4 py-4 text-sm text-error">
          O grupo &quot;{groupName}&quot; sera apagado e nao podera ser
          recuperado.
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost rounded-full"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-error rounded-full"
            onClick={onDelete}
            disabled={isSaving}
          >
            {isSaving ? "Apagando..." : "Confirmar exclusao"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
