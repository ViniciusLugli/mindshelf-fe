import { memo } from "react";
import UserAvatar from "@/app/components/UI/UserAvatar";
import { formatDateTime } from "@/lib/utils/date";
import type { HomeInvite } from "../types/home.types";

type HomeInviteCardProps = {
  invite: HomeInvite;
  busy: boolean;
  onAction: (userId: string, action: "accept" | "reject") => void;
};

function HomeInviteCard({
  invite,
  busy,
  onAction,
}: HomeInviteCardProps) {
  return (
    <article className="app-surface-2 rounded-[1.75rem] border p-4">
      <div className="flex items-center gap-3">
        <UserAvatar
          name={invite.requester.name}
          avatarUrl={invite.requester.avatar_url}
          size="md"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-base-content">
            {invite.requester.name}
          </p>
          <p className="app-faint truncate text-sm">
            {invite.requester.email}
          </p>
        </div>
      </div>

      <p className="app-faint mt-4 font-ui-mono text-[11px] uppercase">
        Received {formatDateTime(invite.created_at)}
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="btn btn-primary btn-sm flex-1 rounded-full"
          disabled={busy}
          onClick={() => onAction(invite.requester.id, "accept")}
        >
          Accept
        </button>
        <button
          type="button"
          className="btn btn-ghost btn-sm flex-1 rounded-full"
          disabled={busy}
          onClick={() => onAction(invite.requester.id, "reject")}
        >
          Decline
        </button>
      </div>
    </article>
  );
}

export default memo(HomeInviteCard, (prevProps, nextProps) => {
  const previous = prevProps.invite;
  const next = nextProps.invite;

  return (
    prevProps.busy === nextProps.busy &&
    prevProps.onAction === nextProps.onAction &&
    previous.requester.id === next.requester.id &&
    previous.requester.name === next.requester.name &&
    previous.requester.email === next.requester.email &&
    previous.requester.avatar_url === next.requester.avatar_url &&
    previous.created_at === next.created_at
  );
});
