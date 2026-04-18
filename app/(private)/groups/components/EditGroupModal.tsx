import AppModal from "@/app/components/UI/AppModal";
import ColorPicker from "@/app/components/UI/ColorPicker";

type EditGroupModalProps = {
  open: boolean;
  groupName: string;
  groupColor: string;
  isSubmitting: boolean;
  onGroupNameChange: (value: string) => void;
  onGroupColorChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function EditGroupModal({
  open,
  groupName,
  groupColor,
  isSubmitting,
  onGroupNameChange,
  onGroupColorChange,
  onClose,
  onSubmit,
}: EditGroupModalProps) {
  return (
    <AppModal
      open={open}
      title="Configurar grupo"
      description="Atualize o nome principal e a identidade visual do grupo."
      onClose={onClose}
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <label className="form-control gap-2">
          <span className="text-sm font-medium text-base-content/70">Nome do grupo</span>
          <input
            className="input input-bordered rounded-2xl border-base-300/70"
            value={groupName}
            onChange={(event) => onGroupNameChange(event.target.value)}
          />
        </label>

        <label className="form-control gap-2">
          <span className="text-sm font-medium text-base-content/70">Cor do grupo</span>
          <div className="rounded-[1.4rem] border border-base-300/60 bg-base-200/35 p-4">
            <div className="flex items-center gap-3 rounded-2xl border border-base-300/60 bg-base-100/80 px-4 py-3 text-sm text-base-content/60">
              <span
                className="h-5 w-5 rounded-full border border-base-100/70"
                style={{ backgroundColor: groupColor }}
              />
              {groupColor}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <ColorPicker value={groupColor} onChange={onGroupColorChange} />
              <span className="text-xs text-base-content/45">
                Escolha uma cor em hexadecimal para atualizar o destaque do grupo.
              </span>
            </div>
          </div>
        </label>

        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost rounded-full" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary rounded-full" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar grupo"}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
