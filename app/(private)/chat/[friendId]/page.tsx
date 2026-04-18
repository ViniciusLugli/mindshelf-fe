"use client";

import ChatWorkspace from "@/app/(private)/chat/components/ChatWorkspace";
import { normalizeRouteParam } from "@/lib/utils/route-params";
import { useParams } from "next/navigation";

export default function ChatFriendPage() {
  const params = useParams<{ friendId?: string | string[] }>();
  const friendId = normalizeRouteParam(params.friendId);

  return <ChatWorkspace initialFriendId={friendId} />;
}
