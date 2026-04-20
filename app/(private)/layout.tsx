import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { UserResponse } from "@/lib/api/types";
import {
  AUTH_USER_COOKIE_KEY,
  deserializeSessionUser,
} from "@/lib/auth/session";
import Navbar from "../components/shared/Navbar/Navbar";
import PrivateProviders from "../providers/PrivateProviders";

const AUTH_TOKEN_COOKIE_KEY = "mindshelf_token";

export default async function PrivatePageNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value;
  const initialUser = deserializeSessionUser(
    cookieStore.get(AUTH_USER_COOKIE_KEY)?.value,
  ) as UserResponse | null;

  if (!token || !token.trim()) {
    redirect("/login");
  }

  return (
    <PrivateProviders initialUser={initialUser}>
      <Navbar />
      {children}
    </PrivateProviders>
  );
}
