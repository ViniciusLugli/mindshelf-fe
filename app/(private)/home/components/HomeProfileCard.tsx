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
      className={`home-paper home-rise overflow-hidden rounded-[2.25rem] border border-base-300/70 shadow-sm xl:h-full ${className ?? ""}`}
    >
      <div className="h-28 bg-[radial-gradient(circle_at_top_left,rgba(231,111,81,0.24),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(42,157,143,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent)]" />

        <div className="px-5 pb-5">
          <div className="-mt-12 flex items-end gap-4">
          <UserAvatar name={name || "User"} avatarUrl={avatarUrl ?? undefined} size="lg" />

          <div className="min-w-0 pb-1">
            <p className="truncate text-lg font-semibold text-base-content">
              {name || "Your account"}
            </p>
            <p className="truncate text-sm text-base-content/48">
              {email || "No email loaded"}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-[1.6rem] border border-base-300/60 bg-base-100/78 p-4">
          <p className="font-ui-mono text-[11px] uppercase text-base-content/38">Quick note</p>
          <p className="mt-3 text-sm leading-relaxed text-base-content/60">
            Update your profile, open a fresh chat, or head back to the full group list whenever you need it.
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/account" className="btn btn-ghost rounded-full">
            My account
          </Link>
          <Link href="/chat" className="btn btn-ghost rounded-full">
            Chat
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(HomeProfileCard);
