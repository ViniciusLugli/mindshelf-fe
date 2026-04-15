import Link from "next/link";

const featureBlocks = [
  {
    title: "Grupos para separar contexto",
    description:
      "Cada frente ganha seu proprio espaco. Isso funciona para times, estudos, pesquisas ou projetos pessoais sem misturar tudo no mesmo lugar.",
  },
  {
    title: "Tasks que guardam raciocinio",
    description:
      "As tasks podem ser desenvolvidas como notas vivas, com texto rico, listas, links e o contexto necessario para continuar depois.",
  },
  {
    title: "Chat que continua o trabalho",
    description:
      "Quando algo precisa de resposta rapida, voce conversa e compartilha a task no mesmo fluxo, sem perder a historia do que estava sendo feito.",
  },
] as const;

const productFlow = [
  {
    step: "01",
    title: "Crie um grupo",
    description:
      "Abra um espaco para um assunto, time ou projeto e mantenha tudo sob o mesmo contexto.",
  },
  {
    step: "02",
    title: "Desenvolva a task",
    description:
      "Transforme uma ideia em algo concreto com uma task que aceita escrita completa e refinamento real.",
  },
  {
    step: "03",
    title: "Compartilhe no chat",
    description:
      "Leve a task para a conversa quando precisar alinhar, pedir feedback ou tomar uma decisao.",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="bg-base-100 text-base-content">
      <section className="relative overflow-hidden border-b border-base-300/60">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_18%,rgba(231,111,81,0.16),transparent_28%),radial-gradient(circle_at_84%_16%,rgba(42,157,143,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.3),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-10 lg:py-8">
          <header className="flex flex-col gap-4 border-b border-base-300/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-base-content/35">
                MindShelf
              </p>
              <p className="mt-2 text-sm text-base-content/52">
                Grupos, tasks e conversa no mesmo fluxo.
              </p>
            </div>

            <div className="flex gap-3">
              <Link href="/login" className="btn btn-ghost rounded-full px-6">
                Entrar
              </Link>
              <Link href="/register" className="btn btn-primary rounded-full px-6">
                Criar conta
              </Link>
            </div>
          </header>

          <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:py-16">
            <div className="space-y-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                Workspace social para conhecimento
              </p>
              <h1
                className="max-w-4xl text-4xl font-bold leading-[1.02] text-base-content sm:text-5xl xl:text-6xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Organize ideias, desenvolva tasks e alinhe conversas sem quebrar o contexto.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-base-content/60 sm:text-lg">
                O MindShelf existe para o momento em que uma ideia precisa virar trabalho real. Em vez de espalhar grupo, nota e conversa em lugares diferentes, voce continua tudo dentro do mesmo ambiente.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/register" className="btn btn-primary btn-lg rounded-full px-8">
                  Comecar agora
                </Link>
                <Link href="/login" className="btn btn-outline btn-lg rounded-full px-8">
                  Ja tenho conta
                </Link>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-base-300/70 bg-base-100/92 p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Em que tipo de rotina ele ajuda
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-[1.4rem] border border-base-300/60 bg-base-200/30 p-4">
                  <p className="font-semibold text-base-content">Times pequenos</p>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/55">
                    Para acompanhar ideias, backlog e conversas sem perder continuidade.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-base-300/60 bg-base-200/30 p-4">
                  <p className="font-semibold text-base-content">Pesquisa e estudo</p>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/55">
                    Para guardar aprendizado, desenvolver notas e compartilhar recortes importantes.
                  </p>
                </div>
                <div className="rounded-[1.4rem] border border-base-300/60 bg-base-200/30 p-4">
                  <p className="font-semibold text-base-content">Projetos pessoais</p>
                  <p className="mt-2 text-sm leading-relaxed text-base-content/55">
                    Para transformar pensamentos soltos em algo que pode evoluir com clareza.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="grid gap-4 pb-12 lg:grid-cols-[0.9fr_1.2fr_0.95fr] lg:pb-16">
            <article className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Grupo ativo
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-base-content">
                Product Design
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-base-content/55">
                Um espaco para discovery, backlog e alinhamento de decisoes sem misturar com outras frentes.
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-[1.3rem] border border-base-300/60 bg-base-200/25 px-4 py-3 text-sm text-base-content/60">
                  Refinar onboarding da squad nova
                </div>
                <div className="rounded-[1.3rem] border border-base-300/60 bg-base-200/25 px-4 py-3 text-sm text-base-content/60">
                  Consolidar aprendizados das entrevistas
                </div>
              </div>
            </article>

            <article className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                    Task aberta
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-base-content">
                    Refinar onboarding da squad nova
                  </h2>
                </div>
                <span className="badge rounded-full border-0 bg-primary/10 px-4 py-3 text-primary">
                  texto rico
                </span>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-base-300/60 bg-base-200/30 p-4 text-sm leading-relaxed text-base-content/58">
                A task funciona como documento vivo: contexto, decisoes, lista de proximos passos e referencias ficam no mesmo lugar para que o trabalho continue depois.
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-base-content/35">
                <span className="rounded-full bg-base-200 px-3 py-2">Titulos</span>
                <span className="rounded-full bg-base-200 px-3 py-2">Listas</span>
                <span className="rounded-full bg-base-200 px-3 py-2">Links</span>
                <span className="rounded-full bg-base-200 px-3 py-2">Notas longas</span>
              </div>
            </article>

            <article className="rounded-[2rem] border border-base-300/70 bg-base-100/95 p-5 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-base-content/35">
                Conversa recente
              </p>

              <div className="mt-5 space-y-3">
                <div className="rounded-[1.3rem] border border-base-300/60 bg-base-200/25 px-4 py-3 text-sm leading-relaxed text-base-content/60">
                  <span className="font-semibold text-base-content">Ana</span>: compartilha a task no chat para pedir feedback.
                </div>
                <div className="ml-auto max-w-[88%] rounded-[1.3rem] bg-primary px-4 py-3 text-sm leading-relaxed text-primary-content shadow-sm">
                  Quem recebe entende o contexto rapido e responde em cima do que ja estava sendo construido.
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-base-content/55">
                O chat complementa o trabalho, nao compete com ele.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            O que muda na pratica
          </p>
          <h2
            className="text-4xl font-bold leading-tight text-base-content sm:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Menos troca de contexto. Mais continuidade entre o que voce pensa, escreve e compartilha.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featureBlocks.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.9rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-base-content">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-base-content/58 sm:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-base-300/60 bg-base-200/20">
        <div className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
                Fluxo do produto
              </p>
              <h2
                className="text-4xl font-bold leading-tight text-base-content sm:text-5xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                O ciclo do MindShelf e bem direto: organizar, desenvolver e compartilhar.
              </h2>
            </div>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {productFlow.map((item) => (
              <article
                key={item.step}
                className="rounded-[1.9rem] border border-base-300/70 bg-base-100/95 p-6 shadow-sm"
              >
                <p className="text-sm font-bold text-primary">{item.step}</p>
                <h3 className="mt-4 text-2xl font-semibold text-base-content">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-base-content/58 sm:text-base">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="overflow-hidden rounded-[2.4rem] border border-base-300/70 bg-neutral text-neutral-content shadow-2xl shadow-base-content/10">
          <div className="grid gap-8 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-10">
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-content/35">
                Entrar no fluxo
              </p>
              <h2
                className="max-w-3xl text-4xl font-bold leading-tight text-neutral-content sm:text-5xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Se o seu trabalho mistura contexto, escrita e conversa, o MindShelf foi feito para esse tipo de rotina.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-content/60">
                Comece com um grupo, desenvolva a primeira task e convide quem precisa continuar a conversa com voce.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/register" className="btn btn-primary btn-lg rounded-full px-8">
                Criar conta
              </Link>
              <Link
                href="/login"
                className="btn btn-outline btn-lg rounded-full border-neutral-content/20 text-neutral-content hover:bg-neutral-content hover:text-neutral"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
