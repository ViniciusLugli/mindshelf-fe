import Link from "next/link";
import { getContrastTextColor } from "@/lib/utils/color-contrast";

type GroupCardProps = {
  title: string;
  color: string;
  href: string;
};

export default function GroupCard({ title, color, href }: GroupCardProps) {
  const badgeTextColor = getContrastTextColor(color);

  return (
    <Link href={href || "#"}>
      <article className="app-surface-1 card group/group min-h-40 overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-base-content/10">
        <div
          className="h-3 w-full transition-all duration-300 group-hover/group:h-4"
          style={{ backgroundColor: color }}
        />

        <div className="card-body gap-5 p-5">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl border border-base-100/70 text-lg font-bold shadow-lg transition-transform duration-300 group-hover/group:scale-105"
            style={{ backgroundColor: color, color: badgeTextColor }}
          >
            {title.charAt(0).toUpperCase()}
          </div>

          <div className="space-y-2">
            <p className="app-faint text-xs font-semibold uppercase tracking-[0.24em]">
              Group
            </p>
            <h3
              className="line-clamp-2 text-xl font-semibold leading-tight transition-colors"
              style={{ color }}
            >
              {title}
            </h3>
          </div>
        </div>
      </article>
    </Link>
  );
}
