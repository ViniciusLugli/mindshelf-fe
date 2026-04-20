import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthForm from "@/app/components/auth/AuthForm";
import AuthLayout from "@/app/components/auth/AuthLayout";
import {
  AUTH_TOKEN_COOKIE_KEY,
  PERSISTENT_LOGIN_COOKIE_KEY,
} from "@/lib/api/http";

const mockPost = {
  quote:
    "MindShelf changed how our team works. Ideas finally have a place to grow.",
  author: "Ana Bennett",
  role: "Head of Product - Nimbus",
};

export default async function LoginPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_COOKIE_KEY)?.value;
  const persistentLogin = cookieStore.get(PERSISTENT_LOGIN_COOKIE_KEY)?.value;

  if (token?.trim() && persistentLogin === "1") {
    redirect("/home");
  }

  return (
    <AuthLayout
      leftPanelContent={
        <div className="max-w-105 space-y-8">
          <p
            className="text-[2.6rem] font-bold leading-[1.1] text-neutral-content"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Pick up where you left off.
          </p>

          <div className="h-0.5 w-12 bg-primary/70" />

          <figure className="space-y-4">
            <blockquote className="text-base leading-relaxed text-neutral-content/55 italic">
              &ldquo;{mockPost.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {mockPost.author.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-neutral-content/70">
                  {mockPost.author}
                </p>
                <p className="text-[11px] text-neutral-content/35">
                  {mockPost.role}
                </p>
              </div>
            </figcaption>
          </figure>
        </div>
      }
      footerContent={
        <>
          Trouble signing in?{" "}
          <a href="#" className="underline hover:text-base-content/50">
            Contact support
          </a>
          .
        </>
      }
    >
      <AuthForm mode="login" embedded />
    </AuthLayout>
  );
}
