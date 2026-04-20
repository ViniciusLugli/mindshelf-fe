function HomeHeroSkeleton() {
  return (
    <header className="home-paper app-border-soft overflow-hidden rounded-[2.5rem] border p-5 sm:p-6 lg:p-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(24rem,0.9fr)] xl:gap-8">
        <div className="space-y-6">
          <div className="h-7 w-24 animate-pulse rounded-full bg-base-200/80" />

          <div className="max-w-3xl space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-base-200/70" />
            <div className="h-12 w-[70%] animate-pulse rounded bg-base-200/80 sm:h-14" />
            <div className="h-5 w-[88%] animate-pulse rounded bg-base-200/70" />
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="h-11 w-32 animate-pulse rounded-full bg-base-200/75" />
            <div className="h-11 w-28 animate-pulse rounded-full bg-base-200/70" />
            <div className="h-11 w-30 animate-pulse rounded-full bg-base-200/70" />
          </div>
        </div>

        <aside className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.92fr)] xl:items-stretch">
          <div className="app-surface-2 rounded-4xl border p-4 sm:p-5">
            <div className="h-13 animate-pulse rounded-2xl bg-base-200/70" />
            <div className="mt-4 space-y-3">
              <div className="h-16 animate-pulse rounded-2xl bg-base-200/70" />
              <div className="h-16 animate-pulse rounded-2xl bg-base-200/70" />
              <div className="h-16 animate-pulse rounded-2xl bg-base-200/70" />
            </div>
          </div>

          <div className="app-surface-1 rounded-[2.25rem] border p-5">
            <div className="h-28 animate-pulse rounded-2xl bg-base-200/75" />
            <div className="mt-4 h-16 animate-pulse rounded-2xl bg-base-200/75" />
            <div className="mt-4 h-24 animate-pulse rounded-2xl bg-base-200/70" />
          </div>
        </aside>
      </div>
    </header>
  );
}

export default HomeHeroSkeleton;
