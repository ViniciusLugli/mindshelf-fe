import { NorthEastRounded } from "@mui/icons-material";
import Link from "next/link";
import { stripHtml, truncateText } from "@/lib/utils/text";
import type { TaskResponse } from "@/lib/api";

type HomeTaskPreviewCardProps = {
  task: TaskResponse;
};

export default function HomeTaskPreviewCard({ task }: HomeTaskPreviewCardProps) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="app-surface-2 block rounded-[1.75rem] border px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-lg hover:shadow-base-content/8"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: task.group_color }} />
          <span className="app-faint font-ui-mono text-[11px] uppercase">
            {task.group_name}
          </span>
        </div>
        <NorthEastRounded className="app-faint" fontSize="small" />
      </div>

        <h3 className="mt-4 font-editorial text-[2rem] leading-[0.95] text-base-content sm:text-[2.2rem]">
          {task.title}
        </h3>

      <p className="app-subtle mt-3 max-w-2xl text-sm leading-relaxed">
        {truncateText(
          stripHtml(task.notes) || "Open the note to continue writing.",
          180,
        )}
      </p>
    </Link>
  );
}
