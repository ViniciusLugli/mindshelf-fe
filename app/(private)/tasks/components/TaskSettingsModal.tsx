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
      title="Configurar task"
      description="Atualize o nome da task e, se quiser, mova para outro grupo. Ao mover, uma nova task e criada no grupo de destino com o mesmo conteudo."
      onClose={onClose}
    >
      <div className="space-y-5 flex flex-col">
        <div className="flex gap-3 w-full justify-between lg:items-center">
          <label className="form-control gap-2 flex flex-col w-1/2">
            <span className="text-sm font-medium text-base-content/70">
              Nome
            </span>
            <input
              className="input input-bordered rounded-2xl border-base-300/70"
              value={title}
              onChange={(event) => onTitleChange(event.target.value)}
            />
          </label>

          <label className="form-control gap-2 flex flex-col w-1/2">
            <span className="text-sm font-medium text-base-content/70">
              Grupo
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
            Fechar
          </button>
          <button
            type="button"
            className="btn btn-primary rounded-full"
            onClick={onSave}
            disabled={isSaving}
          >
            {isSaving ? "Salvando..." : "Salvar configuracoes"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
