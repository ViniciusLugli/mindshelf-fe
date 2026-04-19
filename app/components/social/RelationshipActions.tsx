"use client";

import { useRealtimeRelationshipActions } from "@/app/providers/RealtimeProvider";
import Link from "next/link";
import { useState } from "react";

type RelationshipActionsProps = {
  userId: string;
  isSelf?: boolean;
  isFriend?: boolean;
  hasIncomingInvite?: boolean;
  hasOutgoingInvite?: boolean;
};

export default function RelationshipActions({
  userId,
  isSelf = false,
  isFriend = false,
  hasIncomingInvite = false,
  hasOutgoingInvite = false,
}: RelationshipActionsProps) {
  const {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
  } = useRealtimeRelationshipActions();
  const [isBusy, setIsBusy] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (isSelf) {
    return null;
  }

  const runAction = async (callback: () => Promise<unknown>) => {
    setIsBusy(true);
    setFeedback(null);
    try {
      await callback();
    } catch (error) {
      setFeedback(
        error instanceof Error ? error.message : "Nao foi possivel concluir a acao.",
      );
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {hasIncomingInvite ? (
          <>
            <button
              type="button"
              className="btn btn-primary rounded-full"
              disabled={isBusy}
              onClick={() =>
                runAction(() => acceptFriendRequest({ friend_id: userId }))
              }
            >
              Aceitar pedido
            </button>
            <button
              type="button"
              className="btn btn-ghost rounded-full"
              disabled={isBusy}
              onClick={() =>
                runAction(() => rejectFriendRequest({ friend_id: userId }))
              }
            >
              Recusar
            </button>
          </>
        ) : isFriend ? (
          <>
            <Link href={`/chat/${userId}`} className="btn btn-primary rounded-full">
              Enviar mensagem
            </Link>
            <button
              type="button"
              className="btn btn-ghost rounded-full"
              disabled={isBusy}
              onClick={() => runAction(() => removeFriend({ friend_id: userId }))}
            >
              Remover amizade
            </button>
          </>
        ) : hasOutgoingInvite ? (
          <button type="button" className="btn rounded-full" disabled>
            Convite enviado
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-primary rounded-full"
            disabled={isBusy}
            onClick={() => runAction(() => sendFriendRequest({ friend_id: userId }))}
          >
            Enviar convite
          </button>
        )}
      </div>

      {feedback ? (
        <div className="rounded-2xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error">
          {feedback}
        </div>
      ) : null}
    </div>
  );
}
