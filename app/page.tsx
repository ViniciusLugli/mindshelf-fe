import Link from "next/link";

const pillars = [
  {
    title: "Grupos com contexto real",
    description:
      "Crie espacos para times, estudos, projetos pessoais ou qualquer frente que precise de ordem e identidade propria.",
  },
  {
    title: "Tasks com notas completas",
    description:
      "Trabalhe em tarefas que tambem funcionam como documentos vivos, com espaco para texto rico, refinamento e historico.",
  },
  {
    title: "Conversa ligada ao trabalho",
    description:
      "Troque mensagens, acompanhe nao lidas e compartilhe tasks direto no chat para manter a colaboracao no mesmo fluxo.",
  },
] as const;

const workflow = [
  "Crie um grupo para organizar um assunto ou projeto.",
  "Adicione tasks e desenvolva as notas com profundidade.",
  "Conecte-se com amigos e compartilhe o que esta avancando.",
] as const;

export default function LandingPage() {
  return (
    <div className="bg-base-100 text-base-content">
      <section className="relative overflow-hidden border-b border-base-300/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(231,111,81,0.18),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(42,157,143,0.15),transparent_26%),radial-gradient(circle_at_70%_80%,rgba(244,162,97,0.12),transparent_28%)]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center gap-12 px-6 py-14 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center lg:px-10">
          <div className="space-y-8">
            <div className="space-y-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-base-content/35">
                MindShelf
              </p>
              <h1
                className="max-w-4xl text-5xl font-bold leading-[0.94] text-base-content sm:text-6xl xl:text-7xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Um lugar para organizar ideias, evoluir tasks e colaborar sem perder o contexto.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-base-content/60 sm:text-lg">
                O MindShelf junta grupos, notas ricas e conversa em tempo real numa
                interface feita para transformar pensamento solto em trabalho claro,
                compartilhado e vivo.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className="btn btn-primary btn-lg rounded-full px-8">
                Entrar
              </Link>
              <Link href="/register" className="btn btn-outline btn-lg rounded-full px-8">
                Criar conta
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.4rem] border border-base-300/60 bg-base-100/80 px-4 py-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Organize
                </p>
                <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                  Estruture por grupos e mantenha cada assunto no seu devido lugar.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-base-300/60 bg-base-100/80 px-4 py-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Desenvolva
                </p>
                <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                  Escreva tarefas como documentos completos, com espaco para profundidade.
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-base-300/60 bg-base-100/80 px-4 py-4 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                  Compartilhe
                </p>
                <p className="mt-2 text-sm leading-relaxed text-base-content/60">
                  Converse com amigos e envie tasks no mesmo fluxo de colaboracao.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -left-6 top-8 hidden h-28 w-28 rounded-full border border-base-300/60 bg-base-100/40 lg:block" />
            <div className="absolute -right-6 bottom-10 hidden h-20 w-20 rounded-full border border-base-300/60 bg-base-100/40 lg:block" />

            <div className="relative overflow-hidden rounded-[2.2rem] border border-base-300/70 bg-base-100/95 shadow-2xl shadow-base-content/10">
              <div className="border-b border-base-300/60 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-base-content/35">
                      Preview da experiencia
                    </p>
                    <p className="mt-1 text-lg font-semibold text-base-content">
                      Planejamento com conversa e contexto
                    </p>
                  </div>
                  <span className="badge badge-primary badge-lg rounded-full px-4">
                    MindShelf
                  </span>
                </div>
              </div>

              <div className="grid gap-4 p-5 lg:grid-cols-3">
                <article className="rounded-[1.7rem] border border-base-300/60 bg-base-200/35 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                    Grupos
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[1.2rem] border border-base-300/60 bg-base-100 px-3 py-3">
                      <p className="text-sm font-semibold text-base-content">Product Strategy</p>
                      <p className="mt-1 text-xs text-base-content/45">Roadmap e backlog</p>
                    </div>
                    <div className="rounded-[1.2rem] border border-base-300/60 bg-base-100 px-3 py-3">
                      <p className="text-sm font-semibold text-base-content">Research Vault</p>
                      <p className="mt-1 text-xs text-base-content/45">Aprendizados e entrevistas</p>
                    </div>
                    <p className="text-sm leading-relaxed text-base-content/55">
                      Cada grupo concentra tasks, notas e o contexto de um assunto.
                    </p>
                  </div>
                </article>

                <article className="rounded-[1.7rem] border border-base-300/60 bg-base-100 p-4 lg:col-span-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                        Task em foco
                      </p>
                      <h2 className="mt-2 text-xl font-semibold text-base-content xl:text-2xl">
                        Refinar onboarding da squad nova
                      </h2>
                    </div>
                    <span className="badge border-0 bg-primary/10 text-primary">
                      editor rico
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 rounded-[1.4rem] border border-base-300/60 bg-base-200/30 p-4 text-sm leading-relaxed text-base-content/60">
                    <p>
                      A task funciona como documento vivo: ideias, decisoes, destaques e proximo passo no mesmo lugar.
                    </p>
                    <div className="flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                      <span className="rounded-full bg-base-100 px-3 py-2">Titulos</span>
                      <span className="rounded-full bg-base-100 px-3 py-2">Listas</span>
                      <span className="rounded-full bg-base-100 px-3 py-2">Links</span>
                    </div>
                  </div>
                </article>

                <article className="rounded-[1.7rem] border border-base-300/60 bg-base-100 p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                    Colaboracao
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[1.2rem] border border-base-300/60 bg-base-200/30 p-3">
                      <p className="text-sm font-semibold text-base-content">
                        Chat integrado
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-base-content/55">
                        Compartilhe uma task no meio da conversa sem perder o fio.
                      </p>
                    </div>
                    <div className="rounded-[1.2rem] border border-base-300/60 bg-base-200/30 p-3">
                      <p className="text-sm font-semibold text-base-content">
                        Fluxo claro
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-base-content/55">
                        Menos troca de aba, menos perda de contexto e mais continuidade.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            O que o MindShelf resolve
          </p>
          <h2
            className="text-4xl font-bold leading-tight text-base-content sm:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Menos fragmentacao entre organizar, escrever e conversar.
          </h2>
          <p className="text-base leading-relaxed text-base-content/60 sm:text-lg">
            O projeto nasce para quem pensa melhor quando o contexto continua presente: grupos para estruturar, tasks para desenvolver e chat para decidir sem soltar o fio da meada.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-[1.9rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Pilar
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-base-content">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-base-content/60">
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-base-300/60 bg-base-200/25">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-18 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-10">
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
              Como funciona
            </p>
            <h2
              className="text-4xl font-bold leading-tight text-base-content sm:text-5xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Um fluxo simples para ideias que precisam continuar crescendo.
            </h2>
          </div>

          <div className="space-y-4">
            {workflow.map((step, index) => (
              <div
                key={step}
                className="flex gap-4 rounded-[1.8rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-content text-lg font-bold">
                  {index + 1}
                </div>
                <p className="pt-1 text-base leading-relaxed text-base-content/65">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="overflow-hidden rounded-[2.4rem] border border-base-300/70 bg-neutral text-neutral-content shadow-2xl shadow-base-content/10">
          <div className="grid gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-content/35">
                Pronto para entrar?
              </p>
              <h2
                className="max-w-3xl text-4xl font-bold leading-tight text-neutral-content sm:text-5xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Organize melhor, escreva com profundidade e compartilhe sem perder o contexto.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-content/60">
                Se a sua rotina mistura planejamento, escrita e troca com outras pessoas, o MindShelf foi pensado para esse tipo de trabalho.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/login" className="btn btn-primary btn-lg rounded-full px-8">
                Entrar agora
              </Link>
              <Link href="/register" className="btn btn-outline btn-lg rounded-full border-neutral-content/20 text-neutral-content hover:bg-neutral-content hover:text-neutral">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
