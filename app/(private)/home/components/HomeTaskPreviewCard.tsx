import { memo } from "react";
import { NorthEastRounded } from "@mui/icons-material";
import Link from "next/link";
import { stripHtml } from "@/lib/utils/text";
import type { TaskResponse } from "@/lib/api";

type HomeTaskPreviewCardProps = {
  task: TaskResponse;
};

function HomeTaskPreviewCard({ task }: HomeTaskPreviewCardProps) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="app-surface-2 block w-full min-w-0 rounded-[1.75rem] border px-5 py-5 transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/35"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: task.group_color }}
          />
          <span className="app-faint font-ui-mono text-[11px] uppercase">
            {task.group_name}
          </span>
        </div>
        <NorthEastRounded className="app-faint" fontSize="small" />
      </div>

      <h3 className="mt-4 font-editorial text-[2rem] leading-[0.95] text-base-content sm:text-[2.2rem]">
        {task.title}
      </h3>

      <p className="app-preview-text app-subtle mt-3 max-w-2xl text-sm leading-relaxed">
        {stripHtml(task.notes) || "Open the note to continue writing."}
      </p>
    </Link>
  );
}

export default memo(HomeTaskPreviewCard, (prevProps, nextProps) => {
  const previous = prevProps.task;
  const next = nextProps.task;

  return (
    previous.id === next.id &&
    previous.title === next.title &&
    previous.notes === next.notes &&
    previous.group_name === next.group_name &&
    previous.group_color === next.group_color
  );
});
