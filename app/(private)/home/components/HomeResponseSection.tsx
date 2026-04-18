import Link from "next/link";
import HomeDeskHeading from "./HomeDeskHeading";
import HomeEmptyState from "./HomeEmptyState";
import HomeConversationCard from "./HomeConversationCard";
import HomeInviteCard from "./HomeInviteCard";
import type { ConversationItem, HomeInvite } from "../types/home.types";

type HomeResponseSectionProps = {
  unreadCount: number;
  conversations: ConversationItem[];
  invites: HomeInvite[];
  busyInviteId: string | null;
  onInviteAction: (userId: string, action: "accept" | "reject") => void;
};

export default function HomeResponseSection({
  unreadCount,
  conversations,
  invites,
  busyInviteId,
  onInviteAction,
}: HomeResponseSectionProps) {
  return (
    <section className="home-paper home-rise rounded-[2.25rem] border border-base-300/70 p-5 shadow-sm sm:p-6">
      <HomeDeskHeading
        eyebrow="O que pede resposta"
        title="Convites e conversas ficam na mesma mesa"
        description="A prioridade desta tela e simples: quem esta esperando uma resposta aparece antes de qualquer outra coisa."
        action={
          <Link href="/contacts/pending" className="btn btn-ghost rounded-full">
            Gerenciar convites
          </Link>
        }
      />

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.12fr)_320px]">
        <div className="space-y-3">
          <div className="rounded-[1.6rem] border border-base-300/60 bg-base-100/75 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-ui-mono text-[11px] uppercase text-base-content/38">
                  Conversas recentes
                </p>
                <p className="mt-2 text-sm leading-relaxed text-base-content/58">
                  Entre direto nos dialogos que estao vivos, com destaque para o
                  que ainda nao foi lido.
                </p>
              </div>
              <span className="font-ui-mono rounded-full border border-base-300/70 bg-base-100 px-3 py-1.5 text-[11px] uppercase text-base-content/48">
                {unreadCount} nao lida(s)
              </span>
            </div>
          </div>

          {conversations.length ? (
            conversations.map((item) => (
              <HomeConversationCard key={item.id} item={item} />
            ))
          ) : (
            <HomeEmptyState message="Suas conversas vao aparecer aqui quando o fluxo comecar." />
          )}
        </div>

        <div className="space-y-3">
          <div className="rounded-[1.75rem] border border-base-300/60 bg-base-200/30 p-4">
            <p className="font-ui-mono text-[11px] uppercase text-base-content/38">
              Pedidos pendentes
            </p>
            <p className="mt-3 font-editorial text-3xl leading-none text-base-content">
              {invites.length}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-base-content/58">
              Convites que desbloqueiam novas conversas e ampliam sua estante de
              contexto.
            </p>
          </div>

          {invites.length ? (
            invites
              .slice(0, 3)
              .map((invite) => (
                <HomeInviteCard
                  key={invite.requester.id}
                  invite={invite}
                  busy={busyInviteId === invite.requester.id}
                  onAction={onInviteAction}
                />
              ))
          ) : (
            <HomeEmptyState message="Nenhum pedido pendente agora." />
          )}
        </div>
      </div>
    </section>
  );
}
