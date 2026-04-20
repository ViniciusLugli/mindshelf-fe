import Link from "next/link";
import Logo from "./components/shared/Logo";

const featureBlocks = [
  {
    title: "Groups keep context tidy",
    description:
      "Separate client work, research, and personal projects without mixing everything together.",
  },
  {
    title: "Notes stay editable",
    description:
      "Write rich text, lists, links, and long-form thinking in one place that feels easy to reopen.",
  },
  {
    title: "Chat keeps momentum",
    description:
      "Share a note right inside the conversation when you need feedback or a quick decision.",
  },
] as const;

const productFlow = [
  {
    step: "01",
    title: "Create a group",
    description: "Start with a space for a topic, team, or project.",
  },
  {
    step: "02",
    title: "Write a note",
    description: "Turn rough ideas into something clear and useful.",
  },
  {
    step: "03",
    title: "Share it in chat",
    description:
      "Keep discussion attached to the work, not scattered around it.",
  },
] as const;

export default function LandingPage() {
  return (
    <div className="bg-base-100 text-base-content">
      <section className="app-border-soft relative overflow-hidden border-b">
        <div className="landing-aurora pointer-events-none absolute inset-0" />

        <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-10 lg:py-8">
          <header className="app-border-soft flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="w-fit">
              <Logo size="sm" tone="light" />
            </Link>

            <div className="flex gap-3">
              <Link href="/login" className="btn btn-ghost rounded-full px-6">
                Sign in
              </Link>
              <Link
                href="/register"
                className="btn btn-primary rounded-full px-6"
              >
                Create account
              </Link>
            </div>
          </header>

          <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end lg:py-16">
            <div className="space-y-6">
              <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
                A social workspace for focused knowledge
              </p>
              <h1
                className="max-w-4xl text-4xl font-bold leading-[1.02] text-base-content sm:text-5xl xl:text-6xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Keep notes, groups, and conversations in one calm flow.
              </h1>
              <p className="app-subtle max-w-2xl text-base leading-relaxed sm:text-lg">
                MindShelf helps you organize the work around an idea without
                jumping between disconnected tools.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="btn btn-primary btn-lg rounded-full px-8"
                >
                  Start free
                </Link>
                <Link
                  href="/login"
                  className="btn btn-outline btn-lg rounded-full px-8"
                >
                  I already have an account
                </Link>
              </div>
            </div>

            <aside className="app-surface-1 rounded-4xl border p-5">
              <p className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
                Best for
              </p>

              <div className="mt-5 space-y-3">
                <div className="app-surface-2 rounded-[1.4rem] border p-4">
                  <p className="font-semibold text-base-content">Small teams</p>
                  <p className="app-subtle mt-2 text-sm leading-relaxed">
                    Plan, discuss, and share progress without losing the thread.
                  </p>
                </div>
                <div className="app-surface-2 rounded-[1.4rem] border p-4">
                  <p className="font-semibold text-base-content">
                    Research work
                  </p>
                  <p className="app-subtle mt-2 text-sm leading-relaxed">
                    Save findings, shape notes, and keep useful references
                    nearby.
                  </p>
                </div>
                <div className="app-surface-2 rounded-[1.4rem] border p-4">
                  <p className="font-semibold text-base-content">
                    Personal projects
                  </p>
                  <p className="app-subtle mt-2 text-sm leading-relaxed">
                    Move from a loose thought to a structured plan with less
                    friction.
                  </p>
                </div>
              </div>
            </aside>
          </div>

          <div className="grid gap-4 pb-12 lg:grid-cols-[0.9fr_1.2fr_0.95fr] lg:pb-16">
            <article className="app-surface-1 rounded-4xl border p-5">
              <p className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
                Active group
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-base-content">
                Product Design
              </h2>
              <p className="app-subtle mt-2 text-sm leading-relaxed">
                A dedicated space for discovery, backlog, and decisions.
              </p>

              <div className="mt-5 space-y-3">
                <div className="app-surface-2 app-subtle rounded-[1.3rem] border px-4 py-3 text-sm">
                  Refine the new squad onboarding
                </div>
                <div className="app-surface-2 app-subtle rounded-[1.3rem] border px-4 py-3 text-sm">
                  Summarize interview learnings
                </div>
              </div>
            </article>

            <article className="app-surface-1 rounded-4xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
                    Open note
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-base-content">
                    Refine the new squad onboarding
                  </h2>
                </div>
              </div>

              <div className="app-surface-2 app-subtle mt-5 rounded-3xl border p-4 text-sm leading-relaxed">
                Notes work like living documents: context, decisions, next
                steps, and references stay together.
              </div>
            </article>

            <article className="app-surface-1 rounded-4xl border p-5">
              <p className="app-faint text-[11px] font-bold uppercase tracking-[0.22em]">
                Recent chat
              </p>

              <div className="mt-5 space-y-3">
                <div className="app-surface-2 app-subtle rounded-[1.3rem] border px-4 py-3 text-sm leading-relaxed">
                  <span className="font-semibold text-base-content">Ana</span>:
                  share the note in chat so we can review it together.
                </div>
                <div className="ml-auto max-w-[88%] rounded-[1.3rem] bg-primary px-4 py-3 text-sm leading-relaxed text-primary-content shadow-sm">
                  The receiver gets the full context fast and can reply without
                  asking for a recap.
                </div>
              </div>

              <p className="app-subtle mt-5 text-sm leading-relaxed">
                Chat supports the work instead of splitting it.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
        <div className="max-w-3xl space-y-3">
          <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
            Why it feels simpler
          </p>
          <h2
            className="text-4xl font-bold leading-tight text-base-content sm:text-5xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Less context switching. More continuity.
          </h2>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featureBlocks.map((item) => (
            <article
              key={item.title}
              className="app-surface-1 rounded-[1.9rem] border p-6"
            >
              <h3 className="text-2xl font-semibold text-base-content">
                {item.title}
              </h3>
              <p className="app-subtle mt-4 text-sm leading-relaxed sm:text-base">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="app-border-soft border-y bg-base-200/20">
        <div className="mx-auto max-w-7xl px-6 py-18 lg:px-10">
          <div className="max-w-3xl space-y-3">
            <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
              How it works
            </p>
            <h2
              className="text-4xl font-bold leading-tight text-base-content sm:text-5xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              A simple loop: organize, write, share.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {productFlow.map((item) => (
              <article
                key={item.step}
                className="app-surface-1 rounded-[1.9rem] border p-6"
              >
                <p className="text-sm font-bold text-primary">{item.step}</p>
                <h3 className="mt-4 text-2xl font-semibold text-base-content">
                  {item.title}
                </h3>
                <p className="app-subtle mt-3 text-sm leading-relaxed sm:text-base">
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
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-content/50">
                Ready to begin
              </p>
              <h2
                className="max-w-3xl text-4xl font-bold leading-tight text-neutral-content sm:text-5xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                If your work mixes writing, context, and conversation, MindShelf
                gives it one home.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-neutral-content/72">
                Start with a group, create your first note, and bring the right
                people into the chat when you need them.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/register"
                className="btn btn-primary btn-lg rounded-full px-8"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="btn btn-outline btn-lg rounded-full border-neutral-content/20 text-neutral-content hover:bg-neutral-content hover:text-neutral"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
