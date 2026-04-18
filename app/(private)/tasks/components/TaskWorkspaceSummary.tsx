import { stripHtml } from "@/lib/utils/text";
import Link from "next/link";

type TaskWorkspaceSummaryProps = {
  notes: string;
  groupId: string;
};

export default function TaskWorkspaceSummary({
  notes,
  groupId,
}: TaskWorkspaceSummaryProps) {
  return (
    <div className="rounded-[1.8rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
        Resumo rapido
      </p>
      <p className="mt-3 text-sm leading-relaxed text-base-content/55">
        {stripHtml(notes) || "Sua nota ainda esta vazia."}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href={`/groups/${groupId}`} className="btn btn-ghost rounded-full">
          Voltar para o grupo
        </Link>
        <Link href="/tasks" className="btn btn-ghost rounded-full">
          Buscar outras tasks
        </Link>
      </div>
    </div>
  );
}
