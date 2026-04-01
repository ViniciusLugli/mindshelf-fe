export default function EmptyCard({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="mx-2 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-base-300 bg-base-200/40 px-6 py-12 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-base-200 text-base-content/30">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-base-content/60">{title}</p>
        <p className="text-xs text-base-content/35">{description}</p>
      </div>
    </div>
  );
}
