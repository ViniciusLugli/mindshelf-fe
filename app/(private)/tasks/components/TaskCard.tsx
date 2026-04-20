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
    <article className="app-surface-1 group/task h-full rounded-[1.75rem] border p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-base-content/10">
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

        <span className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
          Note
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <h3 className="text-xl font-semibold leading-tight text-base-content transition-colors group-hover/task:text-primary">
          {title}
        </h3>
        <p className="app-subtle text-sm leading-relaxed">
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
