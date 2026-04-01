import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "../components/shared/Navbar/Navbar";

const AUTH_TOKEN_COOKIE_KEY = "mindshelf_token";

export default async function PrivatePageNavbar({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value;

  if (!token || !token.trim()) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
