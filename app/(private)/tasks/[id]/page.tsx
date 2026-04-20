"use client";

import TaskWorkspace from "@/app/(private)/tasks/components/TaskWorkspace";
import { isUuidLike, normalizeRouteParam } from "@/lib/utils/route-params";
import { useParams } from "next/navigation";

export default function TaskPage() {
  const params = useParams<{ id?: string | string[] }>();
  const taskId = normalizeRouteParam(params.id);

  if (!isUuidLike(taskId)) {
    return (
      <section className="px-5 py-8">
        <div className="rounded-4xl border border-error/20 bg-error/8 px-6 py-20 text-center text-sm text-error shadow-sm">
          The note identifier is invalid.
        </div>
      </section>
    );
  }

  return <TaskWorkspace taskId={taskId} />;
}
