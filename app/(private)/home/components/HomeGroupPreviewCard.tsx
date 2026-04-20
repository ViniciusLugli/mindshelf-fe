import { memo } from "react";
import Link from "next/link";
import type { GroupResponse } from "@/lib/api";
import { getContrastTextColor } from "@/lib/utils/color-contrast";

type HomeGroupPreviewCardProps = {
  group: GroupResponse;
};

function HomeGroupPreviewCard({ group }: HomeGroupPreviewCardProps) {
  const badgeTextColor = getContrastTextColor(group.color);

  return (
    <Link
      href={`/groups/${group.id}`}
      className="app-surface-2 flex items-center gap-4 rounded-[1.7rem] border px-4 py-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-primary/35"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] text-lg font-semibold shadow-lg"
        style={{ backgroundColor: group.color, color: badgeTextColor }}
      >
        {group.name.charAt(0).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <p className="app-faint font-ui-mono text-[11px] uppercase">Recent group</p>
        <p className="mt-1 truncate font-semibold text-base-content">{group.name}</p>
        <p className="app-subtle mt-1 text-sm leading-relaxed">
          Reopen the group to review notes and keep the main thread clear.
        </p>
      </div>
    </Link>
  );
}

export default memo(HomeGroupPreviewCard, (prevProps, nextProps) => {
  const previous = prevProps.group;
  const next = nextProps.group;

  return (
    previous.id === next.id &&
    previous.name === next.name &&
    previous.color === next.color
  );
});
