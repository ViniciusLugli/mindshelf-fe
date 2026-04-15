"use client";

import ChatWorkspace from "@/app/components/chat/ChatWorkspace";
import { useParams } from "next/navigation";

export default function ChatFriendPage() {
  const params = useParams<{ friendId: string }>();

  return <ChatWorkspace initialFriendId={params.friendId} />;
}
