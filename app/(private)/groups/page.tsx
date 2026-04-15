import GroupCard from "@/app/components/shared/Cards/GroupCard";
import { groupApi } from "@/lib/api";
import Link from "next/link";

const groups = await groupApi.getPaginated(1, 20);

export default function GroupsPage() {
  return (
    <section className="space-y-6 px-5 py-6">
      <div className="space-y-2 flex items-center justify-between sm:flex-row">
        <div>
          <h1 className="text-lg font-bold text-base-content sm:text-3xl">
            Your Groups
          </h1>
          <p className="text-sm text-base-content/65 sm:text-base">
            Organize your spaces with a visual identity for each group.
          </p>
        </div>

        <Link href="/groups/new" className="btn btn-primary">
          Create Group
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {groups.data.map((group) => (
          <GroupCard
            key={group.id}
            title={group.name}
            color={group.color}
            href={`/groups/${group.id}`}
          />
        ))}
      </div>
    </section>
  );
}
