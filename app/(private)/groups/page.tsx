import GroupCard from "@/app/components/shared/Cards/GroupCard";
import Link from "next/link";

const groups = [
  { id: "1", title: "Product Design", color: "#E76F51" },
  { id: "2", title: "Marketing Sprint", color: "#2A9D8F" },
  { id: "3", title: "Book Club", color: "#264653" },
  { id: "4", title: "Weekend Ideas", color: "#F4A261" },
];

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
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            title={group.title}
            color={group.color}
            href={`/groups/${group.id}`}
          />
        ))}
      </div>
    </section>
  );
}
