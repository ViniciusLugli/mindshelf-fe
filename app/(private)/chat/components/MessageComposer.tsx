import { formatDateTime } from "@/lib/utils/date";

type MessageComposerProps = {
  draft: string;
  friendName: string;
  unreadCount: number;
  lastMessageAt?: string;
  feedback: string | null;
  isSubmitting: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function MessageComposer({
  draft,
  friendName,
  unreadCount,
  lastMessageAt,
  feedback,
  isSubmitting,
  onDraftChange,
  onSubmit,
}: MessageComposerProps) {
  return (
    <div className="border-t border-base-300/60 px-5 py-4">
      <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-base-content/35">
        <span>{unreadCount ? `${unreadCount} nao lidas` : "Tudo em dia"}</span>
        <span>
          {lastMessageAt
            ? `Ultima atividade ${formatDateTime(lastMessageAt)}`
            : "Nova conversa"}
        </span>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder={`Escreva uma mensagem para ${friendName}`}
          className="textarea textarea-bordered min-h-24 flex-1 rounded-[1.5rem] border-base-300/70 bg-base-100 px-4 py-3"
        />
        <button
          type="submit"
          disabled={isSubmitting || !draft.trim()}
          className="btn btn-primary min-h-24 rounded-[1.5rem] px-6"
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {feedback ? (
        <div className="mt-3 rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
          {feedback}
        </div>
      ) : null}
    </div>
  );
}
