"use client";

import GroupWorkspace from "@/app/components/groups/GroupWorkspace";
import { useParams } from "next/navigation";

export default function GroupDetailsPage() {
  const params = useParams<{ id: string }>();

  return <GroupWorkspace groupId={params.id} />;
}
