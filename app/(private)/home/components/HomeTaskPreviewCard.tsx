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
      className="block rounded-[1.75rem] border border-base-300/65 bg-base-100/88 px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-base-content/5"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: task.group_color }} />
          <span className="font-ui-mono text-[11px] uppercase text-base-content/45">
            {task.group_name}
          </span>
        </div>
        <NorthEastRounded className="text-base-content/25" fontSize="small" />
      </div>

      <h3 className="mt-4 font-editorial text-[2rem] leading-[0.95] text-base-content sm:text-[2.2rem]">
        {task.title}
      </h3>

      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-base-content/60">
        {truncateText(
          stripHtml(task.notes) || "Abra a task para continuar o raciocinio.",
          180,
        )}
      </p>
    </Link>
  );
}
