import { Share, SendRounded } from "@mui/icons-material";
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
    <div className="app-border-soft border-t px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-5 sm:py-4">
      <div className="app-faint mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] sm:mb-3 sm:flex-row sm:text-xs sm:tracking-[0.22em]">
        <span>{unreadCount ? `${unreadCount} unread` : "All caught up"}</span>
        <span className="max-w-[52%] truncate text-right sm:max-w-none sm:text-left">
          {lastMessageAt
            ? `Last activity ${formatDateTime(lastMessageAt)}`
            : "New conversation"}
        </span>
      </div>

      <form className="flex items-end gap-2 sm:flex-row sm:items-end sm:gap-3" onSubmit={onSubmit}>
        <button
          type="button"
          className="btn btn-outline btn-square h-12 w-12 shrink-0 rounded-2xl sm:h-14 sm:w-14 sm:rounded-3xl"
          onClick={onOpenShareModal}
          disabled={isShareSubmitting}
          aria-label={isShareSubmitting ? "Sharing note" : "Share note"}
        >
          <Share fontSize="small" />
        </button>

        <textarea
          value={draft}
          onChange={(event) => onDraftChange(event.target.value)}
          placeholder={`Write a message to ${friendName}`}
          className="app-field-shell app-placeholder textarea textarea-bordered min-h-12 max-h-32 flex-1 rounded-[1.3rem] px-4 py-3 text-sm leading-relaxed sm:min-h-20 sm:max-h-40 sm:rounded-[1.6rem]"
        />

        <button
          type="submit"
          disabled={isSubmitting || !draft.trim()}
          className="btn btn-primary btn-square h-12 w-12 shrink-0 rounded-2xl sm:h-14 sm:w-14 sm:rounded-3xl"
          aria-label={isSubmitting ? "Sending message" : "Send message"}
        >
          {isSubmitting ? <span className="loading loading-spinner loading-xs" /> : <SendRounded fontSize="small" />}
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
