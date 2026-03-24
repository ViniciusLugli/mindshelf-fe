import Link from "next/link";
import GroupCard from "./Cards/GroupCard";

export type Group = {
  id: string;
  title: string;
  color: string;
};

type LatestGroupsProps = {
  groups: Group[];
  title?: string;
};

export default function LatestGroups({
  groups,
  title = "Latest Groups",
}: LatestGroupsProps) {
  return (
    <div className="w-full px-5 mb-5">
      <h2 className="my-4 px-2 text-lg font-bold text-base-content sm:text-3xl">
        {title}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}`}>
            <GroupCard key={group.id} title={group.title} color={group.color} />
          </Link>
        ))}
      </div>
    </div>
  );
}
