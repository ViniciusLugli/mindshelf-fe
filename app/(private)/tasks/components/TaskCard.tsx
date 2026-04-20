import Link from "next/link";
import { truncateText } from "@/lib/utils/text";

type TaskCardProps = {
  id?: string;
  title: string;
  notes?: string;
  groupName: string;
  groupColor: string;
  href?: string;
};

export default function TaskCard({
  title,
  notes,
  groupName,
  groupColor,
  href,
}: TaskCardProps) {
  const content = (
    <article className="group/task h-full rounded-[1.75rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-base-content/10">
      <div className="flex items-start justify-between gap-4">
        <div
          className="badge badge-outline border px-3 py-3 text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{
            color: groupColor,
            borderColor: groupColor,
            backgroundColor: `color-mix(in srgb, ${groupColor} 12%, transparent)`,
          }}
        >
          {groupName}
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/30">
          Note
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="text-xl font-semibold leading-tight text-base-content transition-colors group-hover/task:text-primary">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-base-content/55">
          {truncateText(notes || "Open the note to start writing.", 140)}
        </p>
      </div>
    </article>
  );

  if (!href) {
    return content;
  }

  return <Link href={href}>{content}</Link>;
}
