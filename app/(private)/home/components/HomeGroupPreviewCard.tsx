import Link from "next/link";
import type { GroupResponse } from "@/lib/api";

type HomeGroupPreviewCardProps = {
  group: GroupResponse;
};

export default function HomeGroupPreviewCard({ group }: HomeGroupPreviewCardProps) {
  return (
    <Link
      href={`/groups/${group.id}`}
      className="flex items-center gap-4 rounded-[1.7rem] border border-base-300/65 bg-base-100/88 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-base-content/5"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] text-lg font-semibold text-white shadow-lg"
        style={{ backgroundColor: group.color }}
      >
        {group.name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="font-ui-mono text-[11px] uppercase text-base-content/38">Recent group</p>
        <p className="mt-1 truncate font-semibold text-base-content">{group.name}</p>
        <p className="mt-1 text-sm leading-relaxed text-base-content/56">
          Reopen the group to review notes and keep the main thread clear.
        </p>
      </div>
    </Link>
  );
}
