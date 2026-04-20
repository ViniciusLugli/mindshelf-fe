type LogoSize = "sm" | "md" | "lg";
type LogoTone = "dark" | "light";

type LogoProps = {
  size?: LogoSize;
  tone?: LogoTone;
};

const sizeStyles: Record<
  LogoSize,
  {
    container: string;
    mark: string;
    title: string;
    subtitle: string;
     svg: string;
  }
> = {
  sm: {
    container: "gap-2 sm:gap-3 lg:gap-4",
    mark: "h-10 w-10 rounded-lg border-2 sm:h-12 sm:w-12 sm:rounded-xl lg:h-14 lg:w-14",
    title: "text-[1.75rem] sm:text-[2.25rem] lg:text-4xl",
    subtitle: "text-[10px] sm:text-[11px] lg:text-xs",
    svg: "h-6 w-6 sm:h-7 sm:w-7 lg:h-[34px] lg:w-[34px]",
  },
  md: {
    container: "gap-4 sm:gap-6 lg:gap-10",
    mark: "h-12 w-12 rounded-xl border-[2.5px] sm:h-14 sm:w-14 sm:rounded-2xl lg:h-18 lg:w-18",
    title: "text-[2rem] sm:text-[2.5rem] lg:text-[52px]",
    subtitle: "text-[11px] sm:text-xs lg:text-[14px]",
    svg: "h-7 w-7 sm:h-9 sm:w-9 lg:h-[44px] lg:w-[44px]",
  },
  lg: {
    container: "gap-5 sm:gap-7 lg:gap-12",
    mark: "h-14 w-14 rounded-xl border-[2.5px] sm:h-16 sm:w-16 sm:rounded-2xl lg:h-20 lg:w-20",
    title: "text-[2.25rem] sm:text-[2.875rem] lg:text-[58px]",
    subtitle: "text-xs sm:text-sm lg:text-base",
    svg: "h-8 w-8 sm:h-10 sm:w-10 lg:h-[48px] lg:w-[48px]",
  },
};

const toneStyles: Record<
  LogoTone,
  {
    title: string;
    subtitle: string;
  }
> = {
  dark: {
    title: "text-[#FAF7F0]",
    subtitle: "text-[#A89E94]",
  },
  light: {
    title: "text-[#1E1A17]",
    subtitle: "text-[#6B625C]",
  },
};

export default function Logo({ size = "md", tone = "dark" }: LogoProps) {
  const styles = sizeStyles[size];
  const palette = toneStyles[tone];

  return (
    <div className={`flex items-center ${styles.container}`}>
      <div
        className={`relative flex shrink-0 items-center justify-center overflow-hidden border-[#C4601A] ${styles.mark}`}
      >
        <svg
          className={styles.svg}
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
          className={`mb-1 font-serif font-semibold leading-[1.1] tracking-[-0.5px] ${palette.title} ${styles.title}`}
        >
          Mind<span className="text-[#C4601A]">Shelf</span>
        </h1>
        <div
          className={`font-sans font-light tracking-[0.05em] ${palette.subtitle} ${styles.subtitle}`}
        >
          Your knowledge, curated and shared
        </div>
      </div>
    </div>
  );
}
