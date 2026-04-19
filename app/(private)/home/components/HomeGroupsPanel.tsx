import { memo } from "react";
import Link from "next/link";
import type { GroupResponse } from "@/lib/api";
import HomeDeskHeading from "./HomeDeskHeading";
import HomeEmptyState from "./HomeEmptyState";
import HomeGroupPreviewCard from "./HomeGroupPreviewCard";

type HomeGroupsPanelProps = {
  isLoading: boolean;
  groups: GroupResponse[];
};

function HomeGroupsPanel({ isLoading, groups }: HomeGroupsPanelProps) {
  return (
    <section className="home-paper home-rise rounded-[2.25rem] border border-base-300/70 p-5 shadow-sm sm:p-6 xl:h-full">
      <HomeDeskHeading
        eyebrow="Prateleira de grupos"
        title="Espacos para reabrir contexto"
        description="Os grupos recentes aparecem como uma estante menor, pronta para recolocar voce no assunto certo."
        action={
          <Link href="/groups" className="btn btn-ghost rounded-full">
            Ver grupos
          </Link>
        }
      />

      <div className="mt-6 space-y-3">
        {isLoading ? (
          <HomeEmptyState message="Carregando grupos..." />
        ) : groups.length ? (
          groups.map((group) => <HomeGroupPreviewCard key={group.id} group={group} />)
        ) : (
          <HomeEmptyState message="Crie um grupo para comecar a organizar seus assuntos." />
        )}
      </div>
    </section>
  );
}

export default memo(HomeGroupsPanel);
