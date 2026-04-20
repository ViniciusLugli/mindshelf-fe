import { memo } from "react";
import UserAvatar from "@/app/components/UI/UserAvatar";
import Link from "next/link";

type HomeProfileCardProps = {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  className?: string;
};

function HomeProfileCard({
  name,
  email,
  avatarUrl,
  className,
}: HomeProfileCardProps) {
  return (
    <section
      className={`home-paper home-rise app-border-soft w-full min-w-0 overflow-hidden rounded-[2.25rem] border xl:h-full ${className ?? ""}`}
    >
      <div className="app-profile-banner h-28" />

      <div className="px-5 pb-5">
        <div className="-mt-12 flex min-w-0 items-end gap-4">
          <UserAvatar name={name || "User"} avatarUrl={avatarUrl ?? undefined} size="lg" />

          <div className="min-w-0 pb-1">
            <p className="truncate text-lg font-semibold text-base-content">
              {name || "Your account"}
            </p>
            <p className="app-faint truncate text-sm">
              {email || "No email loaded"}
            </p>
          </div>
        </div>

        <div className="app-surface-2 mt-5 rounded-[1.6rem] border p-4">
          <p className="app-faint font-ui-mono text-[11px] uppercase">Quick note</p>
          <p className="app-subtle mt-3 text-sm leading-relaxed">
            Update your profile, open a fresh chat, or head back to the full group list whenever you need it.
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/account" className="btn btn-ghost w-full rounded-full sm:w-auto">
            My account
          </Link>
          <Link href="/chat" className="btn btn-ghost w-full rounded-full sm:w-auto">
            Chat
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(HomeProfileCard);
