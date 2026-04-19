import TaskCard from "@/app/(private)/tasks/components/TaskCard";
import type { MessageResponse } from "@/lib/api";
import { formatTime } from "@/lib/utils/date";
import { stripHtml } from "@/lib/utils/text";

type ChatMessageProps = {
  isMine: boolean;
  message: MessageResponse;
  onSharedTaskClick?: (message: MessageResponse) => void;
};

export default function ChatMessage({
  isMine,
  message,
  onSharedTaskClick,
}: ChatMessageProps) {
  const canOpenSharedTask = Boolean(
    message.shared_task?.imported_task_id || (!isMine && onSharedTaskClick),
  );

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-[1.6rem] px-4 py-3 shadow-sm ${
          isMine
            ? "bg-primary text-primary-content"
            : "border border-base-300/70 bg-base-100 text-base-content"
        }`}
      >
        {message.type === "shared_task" && message.shared_task ? (
          <div className="space-y-3">
            <p
              className={`text-[11px] font-bold uppercase tracking-[0.22em] ${
                isMine ? "text-primary-content/70" : "text-base-content/35"
              }`}
            >
              Task compartilhada
            </p>
            <button
              type="button"
              className={`block w-full text-left ${canOpenSharedTask ? "cursor-pointer" : "cursor-default"}`}
              onClick={() => {
                if (!canOpenSharedTask || !onSharedTaskClick) {
                  return;
                }

                onSharedTaskClick(message);
              }}
              disabled={!canOpenSharedTask}
            >
              <TaskCard
                title={message.shared_task.title || "Task compartilhada"}
                notes={stripHtml(message.shared_task.notes)}
                groupName={message.shared_task.group_name || "Grupo"}
                groupColor={message.shared_task.group_color || "#E76F51"}
              />
            </button>
            <p
              className={`text-xs ${
                isMine ? "text-primary-content/70" : "text-base-content/45"
              }`}
            >
              {message.shared_task.imported_task_id
                ? "Abrir sua copia salva dessa task."
                : isMine
                  ? "Snapshot enviado para o destinatario importar no proprio grupo."
                  : "Escolha um grupo seu para importar essa task compartilhada."}
            </p>
            {message.content ? (
              <p
                className={`text-sm leading-relaxed ${
                  isMine ? "text-primary-content/85" : "text-base-content/70"
                }`}
              >
                {message.content}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{message.content}</p>
        )}

        <div
          className={`mt-3 flex items-center justify-end gap-2 text-[11px] ${
            isMine ? "text-primary-content/70" : "text-base-content/40"
          }`}
        >
          <span>{formatTime(message.created_at)}</span>
          {isMine ? <span>{message.read_at ? "Lida" : "Enviada"}</span> : null}
        </div>
      </div>
    </div>
  );
}
