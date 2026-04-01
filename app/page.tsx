import Link from "next/link";

export default function HomePage() {
  return (
    <section className="relative flex min-h-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-base-content">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(251,146,60,0.16),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.14),transparent_38%)]" />

      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-base-content/55">
          MindShelf
        </p>
        <h1 className="mt-3 text-center text-4xl font-bold sm:text-5xl">
          Your knowledge, curated and shared
        </h1>
        <p className="mt-4 max-w-2xl text-center text-base text-base-content/70 sm:text-lg">
          Create groups, add notes, and keep conversations in one focused space.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
          <Link href="/login" className="btn btn-primary flex-1">
            Sign in
          </Link>
          <Link href="/register" className="btn btn-outline flex-1">
            Create account
          </Link>
        </div>
      </div>
    </section>
  );
}
