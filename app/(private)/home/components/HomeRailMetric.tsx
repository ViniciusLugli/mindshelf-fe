import { memo } from "react";

type HomeRailMetricProps = {
  label: string;
  value: string;
  description: string;
};

function HomeRailMetric({
  label,
  value,
  description,
}: HomeRailMetricProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 py-3 first:pt-0 last:pb-0">
      <div>
        <p className="app-faint font-ui-mono text-[11px] uppercase">{label}</p>
        <p className="app-subtle mt-1 text-sm">{description}</p>
      </div>

      <p className="font-editorial text-4xl leading-none text-base-content">{value}</p>
    </div>
  );
}

export default memo(HomeRailMetric);
