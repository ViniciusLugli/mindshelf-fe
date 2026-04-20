import type { ReactNode } from "react";

type HomeDeskHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export default function HomeDeskHeading({
  eyebrow,
  title,
  description,
  action,
}: HomeDeskHeadingProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <p className="app-faint font-ui-mono text-[11px] uppercase">{eyebrow}</p>
        <h2 className="font-editorial text-4xl leading-[0.92] text-base-content sm:text-[2.8rem]">
          {title}
        </h2>
        <p className="app-subtle max-w-2xl text-sm leading-relaxed sm:text-[15px]">
          {description}
        </p>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
