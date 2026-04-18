"use client";

import GroupWorkspace from "@/app/components/groups/GroupWorkspace";
import { isUuidLike, normalizeRouteParam } from "@/lib/utils/route-params";
import { useParams } from "next/navigation";

export default function GroupDetailsPage() {
  const params = useParams<{ id?: string | string[] }>();
  const groupId = normalizeRouteParam(params.id);

  if (!isUuidLike(groupId)) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-[2rem] border border-error/20 bg-error/8 px-6 py-20 text-center text-sm text-error shadow-sm">
          O identificador do grupo e invalido.
        </div>
      </section>
    );
  }

  return <GroupWorkspace groupId={groupId} />;
}
