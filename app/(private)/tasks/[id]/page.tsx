"use client";

import TaskWorkspace from "@/app/components/tasks/TaskWorkspace";
import { useParams } from "next/navigation";

export default function TaskPage() {
  const params = useParams<{ id: string }>();

  return <TaskWorkspace taskId={params.id} />;
}
