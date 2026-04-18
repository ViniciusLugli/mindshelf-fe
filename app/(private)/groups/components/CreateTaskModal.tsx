import AppModal from "@/app/components/UI/AppModal";

type CreateTaskModalProps = {
  open: boolean;
  groupName: string;
  taskTitle: string;
  isSubmitting: boolean;
  onTaskTitleChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function CreateTaskModal({
  open,
  groupName,
  taskTitle,
  isSubmitting,
  onTaskTitleChange,
  onClose,
  onSubmit,
}: CreateTaskModalProps) {
  return (
    <AppModal
      open={open}
      title="Criar task"
      description={`Adicione uma nova task dentro de ${groupName}.`}
      onClose={onClose}
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <label className="form-control gap-2">
          <span className="text-sm font-medium text-base-content/70">Nome da task</span>
          <input
            className="input input-bordered rounded-2xl border-base-300/70"
            value={taskTitle}
            onChange={(event) => onTaskTitleChange(event.target.value)}
            placeholder="Ex: Refinar backlog de discovery"
          />
        </label>

        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost rounded-full" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary rounded-full" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar task"}
          </button>
        </div>
      </form>
    </AppModal>
  );
}
