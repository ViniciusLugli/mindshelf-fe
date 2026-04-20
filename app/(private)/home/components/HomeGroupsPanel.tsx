import { memo } from "react";
import Link from "next/link";
import type { GroupResponse } from "@/lib/api";
import HomeDeskHeading from "./HomeDeskHeading";
import HomeEmptyState from "./HomeEmptyState";
import HomeGroupPreviewCard from "./HomeGroupPreviewCard";

type HomeGroupsPanelProps = {
  isLoading: boolean;
  groups: GroupResponse[];
};

function HomeGroupsPanel({ isLoading, groups }: HomeGroupsPanelProps) {
  return (
    <section className="home-paper home-rise app-border-soft w-full min-w-0 rounded-[2.25rem] border p-5 sm:p-6 xl:h-full">
      <HomeDeskHeading
        eyebrow="Group shelf"
        title="Recently opened groups"
        description="Jump back into the right context with one click."
        action={
          <Link href="/groups" className="btn btn-ghost w-full rounded-full sm:w-auto">
            View groups
          </Link>
        }
      />

      <div className="mt-6 space-y-3">
        {isLoading ? (
          <HomeEmptyState message="Loading groups..." />
        ) : groups.length ? (
          groups.map((group) => <HomeGroupPreviewCard key={group.id} group={group} />)
        ) : (
          <HomeEmptyState message="Create a group to start organizing your work." />
        )}
      </div>
    </section>
  );
}

export default memo(HomeGroupsPanel);
