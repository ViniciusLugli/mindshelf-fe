type GroupCardProps = {
  title: string;
  color: string;
};

export default function GroupCard({ title, color }: GroupCardProps) {
  return (
    <article className="card group/group min-h-40 overflow-hidden border border-base-300/70 bg-base-100/95 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-base-content/10">
      <div
        className="h-3 w-full transition-all duration-300 group-hover/group:h-4"
        style={{ backgroundColor: color }}
      />

      <div className="card-body gap-5 p-5">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-base-100/70 text-lg font-bold text-white shadow-lg transition-transform duration-300 group-hover/group:scale-105"
          style={{ backgroundColor: color }}
        >
          {title.charAt(0).toUpperCase()}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-base-content/45">
            Group
          </p>
          <h3
            className="line-clamp-2 text-xl font-semibold leading-tight transition-colors"
            style={{ color }}
          >
            {title}
          </h3>
        </div>
      </div>
    </article>
  );
}
