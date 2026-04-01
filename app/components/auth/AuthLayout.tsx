import Link from "next/link";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  leftPanelContent: ReactNode;
  children: ReactNode;
  footerContent?: ReactNode;
};

export default function AuthLayout({
  leftPanelContent,
  children,
  footerContent,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-neutral p-14 text-neutral-content lg:flex lg:w-[52%]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full border border-neutral-content/10" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-52 w-52 rounded-full border border-neutral-content/10" />
        <div className="pointer-events-none absolute left-0 top-0 h-1 w-32 bg-primary" />

        <div className="relative">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-neutral-content/40">
            MindShelf
          </span>
        </div>

        <div className="relative max-w-105">{leftPanelContent}</div>

        <div className="relative">
          <p className="text-[11px] tracking-wide text-neutral-content/30">
            © {new Date().getFullYear()} MindShelf. All rights reserved.
          </p>
        </div>
      </aside>

      <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-base-100 px-6 py-14 sm:px-12">
        <div className="w-full max-w-95 space-y-8">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-base-content/40 transition-colors hover:text-base-content lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-3 w-3"
            >
              <path
                fillRule="evenodd"
                d="M9.78 4.22a.75.75 0 0 1 0 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L5.47 8.53a.75.75 0 0 1 0-1.06l3.25-3.25a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </Link>

          {children}

          {footerContent ? (
            <p className="text-center text-[11px] leading-relaxed text-base-content/30">
              {footerContent}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
