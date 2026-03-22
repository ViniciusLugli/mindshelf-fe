type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  size?: LogoSize;
};

const sizeStyles: Record<
  LogoSize,
  {
    container: string;
    mark: string;
    title: string;
    subtitle: string;
    svg: number;
  }
> = {
  sm: {
    container: "gap-4",
    mark: "h-14 w-14 rounded-xl border-2",
    title: "text-4xl",
    subtitle: "text-xs",
    svg: 34,
  },
  md: {
    container: "gap-10",
    mark: "h-18 w-18 rounded-2xl border-[2.5px]",
    title: "text-[52px]",
    subtitle: "text-[14px]",
    svg: 44,
  },
  lg: {
    container: "gap-12",
    mark: "h-20 w-20 rounded-2xl border-[2.5px]",
    title: "text-[58px]",
    subtitle: "text-base",
    svg: 48,
  },
};

export default function Logo({ size = "md" }: LogoProps) {
  const styles = sizeStyles[size];

  return (
    <div className={`flex items-center ${styles.container}`}>
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden border-[#C4601A] ${styles.mark}`}
      >
        <svg
          width={styles.svg}
          height={styles.svg}
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="14" width="5" height="22" rx="2" fill="#C4601A" />
          <rect x="16" y="10" width="5" height="26" rx="2" fill="#8A4A14" />
          <rect
            x="24"
            y="12"
            width="5"
            height="24"
            rx="2"
            fill="#C4601A"
            opacity=".7"
          />
          <rect
            x="32"
            y="16"
            width="5"
            height="20"
            rx="2"
            fill="#8A4A14"
            opacity=".5"
          />
          <rect x="6" y="36" width="33" height="2.5" rx="1.25" fill="#C4601A" />
          <path d="M20 8 L22 4 L24 8" fill="#FAF7F0" opacity=".6" />
        </svg>
      </div>
      <div>
        <h1
          className={`mb-1 font-serif font-semibold leading-[1.1] tracking-[-0.5px] text-[#FAF7F0] ${styles.title}`}
        >
          Mind<span className="text-[#C4601A]">Shelf</span>
        </h1>
        <div
          className={`font-sans font-light tracking-[0.05em] text-[#A89E94] ${styles.subtitle}`}
        >
          Your knowledge, curated and shared
        </div>
      </div>
    </div>
  );
}
