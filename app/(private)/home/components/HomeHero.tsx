import { memo } from "react";
import AddCircleOutlineRounded from "@mui/icons-material/AddCircleOutlineRounded";
import ForumRounded from "@mui/icons-material/ForumRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import TableRows from "@mui/icons-material/TableRows";
import Link from "next/link";
import HomeRailMetric from "./HomeRailMetric";
import HomeProfileCard from "./HomeProfileCard";

type HomeHeroProps = {
  primaryName: string;
  unreadCount: number;
  pendingInviteCount: number;
  resumptionsCount: number;
  profileName?: string | null;
  profileEmail?: string | null;
  profileAvatarUrl?: string | null;
};

function HomeHero({
  primaryName,
  unreadCount,
  pendingInviteCount,
  resumptionsCount,
  profileName,
  profileEmail,
  profileAvatarUrl,
}: HomeHeroProps) {
  return (
    <header className="home-paper home-rise app-border-soft overflow-hidden rounded-[2.5rem] border p-5 sm:p-6 lg:p-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(24rem,0.9fr)] xl:gap-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="app-chip-subtle font-ui-mono rounded-full border px-3 py-1.5 text-[11px] uppercase">
              Today
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <p className="app-faint font-ui-mono text-[11px] uppercase">
              Focus lane
            </p>
            <h1 className="font-editorial text-5xl leading-[0.9] text-base-content sm:text-6xl lg:text-[4.3rem]">
              Welcome back, {primaryName}.
            </h1>
            <p className="app-subtle max-w-2xl text-sm leading-relaxed sm:text-base">
              Start with what needs attention, then jump into notes, groups, or
              conversations without hunting across the app.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/groups/new" className="btn btn-primary rounded-full">
              <AddCircleOutlineRounded fontSize="small" />
              New group
            </Link>
            <Link href="/chat" className="btn btn-ghost rounded-full">
              <ForumRounded fontSize="small" />
              Open chat
            </Link>
            <Link href="/groups" className="btn btn-ghost rounded-full">
              <TableRows fontSize="small" />
              View groups
            </Link>
          </div>
        </div>

        <aside className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,0.92fr)] xl:items-stretch">
          <div className="home-shelf-rail app-border-soft rounded-4xl border p-4 sm:p-5">
            <div className="app-border-soft flex items-center justify-between gap-3 border-b pb-3">
              <div>
                <p className="app-faint font-ui-mono text-[11px] uppercase">
                  Shelf rail
                </p>
                <p className="app-subtle mt-1 text-sm">
                  Small counts, quick clarity.
                </p>
              </div>
              <MenuBookRounded className="app-faint" fontSize="small" />
            </div>

            <div className="app-border-soft divide-y pt-2">
              <HomeRailMetric
                label="Messages"
                value={`${unreadCount}`}
                description="waiting for you"
              />
              <HomeRailMetric
                label="Invites"
                value={`${pendingInviteCount}`}
                description="ready to review"
              />
              <HomeRailMetric
                label="Catch-ups"
                value={`${resumptionsCount}`}
                description="notes and groups to reopen"
              />
            </div>
          </div>

          <HomeProfileCard
            name={profileName}
            email={profileEmail}
            avatarUrl={profileAvatarUrl}
          />
        </aside>
      </div>
    </header>
  );
}

export default memo(HomeHero);
