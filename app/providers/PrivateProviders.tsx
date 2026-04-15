"use client";

import type { UserResponse } from "@/lib/api/types";
import { useSession } from "./SessionProvider";
import { RealtimeProvider } from "./RealtimeProvider";
import { SessionProvider } from "./SessionProvider";

function SessionScopedRealtime({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSession();

  return <RealtimeProvider key={currentUser?.id ?? "guest"}>{children}</RealtimeProvider>;
}

export default function PrivateProviders({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: UserResponse | null;
}) {
  return (
    <SessionProvider initialUser={initialUser}>
      <SessionScopedRealtime>{children}</SessionScopedRealtime>
    </SessionProvider>
  );
}
