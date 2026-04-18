type HomeRailMetricProps = {
  label: string;
  value: string;
  description: string;
};

export default function HomeRailMetric({
  label,
  value,
  description,
}: HomeRailMetricProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 py-3 first:pt-0 last:pb-0">
      <div>
        <p className="font-ui-mono text-[11px] uppercase text-base-content/38">{label}</p>
        <p className="mt-1 text-sm text-base-content/55">{description}</p>
      </div>

      <p className="font-editorial text-4xl leading-none text-base-content">{value}</p>
    </div>
  );
}
