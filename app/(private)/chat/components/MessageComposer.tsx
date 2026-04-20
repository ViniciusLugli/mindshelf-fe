import { Share } from "@mui/icons-material";
import { formatDateTime } from "@/lib/utils/date";

type MessageComposerProps = {
  draft: string;
  friendName: string;
  unreadCount: number;
  lastMessageAt?: string;
  feedback: string | null;
  isSubmitting: boolean;
  isShareSubmitting: boolean;
  onDraftChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onOpenShareModal: () => void;
};

export default function MessageComposer({
  draft,
  friendName,
  unreadCount,
  lastMessageAt,
  feedback,
  isSubmitting,
  isShareSubmitting,
  onDraftChange,
  onSubmit,
  onOpenShareModal,
}: MessageComposerProps) {
  return (
    <div className="app-border-soft border-t px-5 py-4">
      <div className="app-faint mb-3 flex items-center justify-between text-xs uppercase tracking-[0.22em]">
        <span>{unreadCount ? `${unreadCount} unread` : "All caught up"}</span>
        <span>
          {lastMessageAt
            ? `Last activity ${formatDateTime(lastMessageAt)}`
            : "New conversation"}
        </span>
      </div>

      <div className="mb-3 flex justify-end">
        <button
          type="button"
          className="btn btn-outline rounded-full"
          onClick={onOpenShareModal}
          disabled={isShareSubmitting}
        >
          <Share fontSize="small" />
          {isShareSubmitting ? "Sharing..." : "Share note"}
        </button>
      </div>

      <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSubmit}>
        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder={`Write a message to ${friendName}`}
          className="app-field-shell app-placeholder textarea textarea-bordered min-h-24 flex-1 rounded-3xl px-4 py-3"
        />
        <button
          type="submit"
          disabled={isSubmitting || !draft.trim()}
          className="btn btn-primary min-h-24 rounded-3xl px-6"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>

      {feedback ? (
        <div className="app-state-error mt-3 rounded-2xl border px-4 py-3 text-sm">
          {feedback}
        </div>
      ) : null}
    </div>
  );
}
