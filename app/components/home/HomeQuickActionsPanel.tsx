import { GroupRounded, MenuBookRounded, PersonAddAltRounded } from "@mui/icons-material";
import Link from "next/link";
import HomeDeskHeading from "./HomeDeskHeading";

type HomeQuickActionsPanelProps = {
  pendingInviteCount: number;
};

export default function HomeQuickActionsPanel({
  pendingInviteCount,
}: HomeQuickActionsPanelProps) {
  return (
    <section className="home-paper home-rise rounded-[2.25rem] border border-base-300/70 p-5 shadow-sm sm:p-6 xl:h-full">
      <HomeDeskHeading
        eyebrow="Atalhos de mesa"
        title="Trocas rapidas entre contexto e acao"
        description="Quando quiser mudar de assunto, estes atalhos cortam caminho sem reabrir a navegacao inteira."
      />

      <div className="mt-6 space-y-3">
        <Link
          href="/groups"
          className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-base-300/60 bg-base-100/85 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-base-content/5"
        >
          <div>
            <p className="font-ui-mono text-[11px] uppercase text-base-content/38">Grupos</p>
            <p className="mt-1 font-semibold text-base-content">Ver todos os espacos</p>
          </div>
          <GroupRounded className="text-base-content/25" fontSize="small" />
        </Link>

        <Link
          href="/tasks"
          className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-base-300/60 bg-base-100/85 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-base-content/5"
        >
          <div>
            <p className="font-ui-mono text-[11px] uppercase text-base-content/38">Tasks</p>
            <p className="mt-1 font-semibold text-base-content">Retomar escritas recentes</p>
          </div>
          <MenuBookRounded className="text-base-content/25" fontSize="small" />
        </Link>

        <Link
          href="/contacts/pending"
          className="flex items-center justify-between gap-3 rounded-[1.5rem] border border-base-300/60 bg-base-100/85 px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-lg hover:shadow-base-content/5"
        >
          <div>
            <p className="font-ui-mono text-[11px] uppercase text-base-content/38">Convites</p>
            <p className="mt-1 font-semibold text-base-content">
              {pendingInviteCount} pendente(s) para responder
            </p>
          </div>
          <PersonAddAltRounded className="text-base-content/25" fontSize="small" />
        </Link>
      </div>
    </section>
  );
}
