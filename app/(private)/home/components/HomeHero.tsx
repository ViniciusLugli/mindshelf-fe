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
    <header className="home-paper home-rise overflow-hidden rounded-[2.5rem] border border-base-300/70 p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(24rem,0.9fr)] xl:gap-8">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-ui-mono rounded-full border border-base-300/70 bg-base-100/75 px-3 py-1.5 text-[11px] uppercase text-base-content/55">
              Today
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <p className="font-ui-mono text-[11px] uppercase text-base-content/38">
              Focus lane
            </p>
            <h1 className="font-editorial text-5xl leading-[0.9] text-base-content sm:text-6xl lg:text-[4.3rem]">
              Welcome back, {primaryName}.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-base-content/58 sm:text-base">
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
          <div className="home-shelf-rail rounded-4xl border border-base-300/70 bg-base-100/72 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-base-300/60 pb-3">
              <div>
                <p className="font-ui-mono text-[11px] uppercase text-base-content/38">
                  Shelf rail
                </p>
                <p className="mt-1 text-sm text-base-content/58">
                  Small counts, quick clarity.
                </p>
              </div>
              <MenuBookRounded
                className="text-base-content/35"
                fontSize="small"
              />
            </div>

            <div className="divide-y divide-base-300/60 pt-2">
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
