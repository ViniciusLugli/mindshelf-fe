import Link from "next/link";

type GroupWorkspaceSidebarProps = {
  taskCount: number;
};

export default function GroupWorkspaceSidebar({
  taskCount,
}: GroupWorkspaceSidebarProps) {
  return (
    <aside className="space-y-4 rounded-[1.8rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
          Visao geral
        </p>
        <h2 className="mt-2 text-xl font-semibold text-base-content">
          {taskCount} tasks no grupo
        </h2>
      </div>
      <div className="rounded-[1.5rem] border border-base-300/60 bg-base-200/35 p-4 text-sm text-base-content/60">
        Agora voce pode ajustar o nome e a cor do grupo para refletir melhor o contexto do espaco.
      </div>
      <Link href="/groups" className="btn btn-ghost w-full justify-start rounded-full">
        Voltar para grupos
      </Link>
      <Link href="/tasks" className="btn btn-ghost w-full justify-start rounded-full">
        Buscar tasks
      </Link>
    </aside>
  );
}
