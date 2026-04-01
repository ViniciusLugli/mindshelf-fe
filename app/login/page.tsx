import AuthForm from "@/app/components/auth/AuthForm";
import AuthLayout from "@/app/components/auth/AuthLayout";

const testimonial = {
  quote:
    "MindShelf changed how our team works. Ideas finally have a place to grow.",
  author: "Ana Bennett",
  role: "Head of Product - Nimbus",
};

export default function LoginPage() {
  return (
    <AuthLayout
      leftPanelContent={
        <div className="max-w-105 space-y-8">
          <p
            className="text-[2.6rem] font-bold leading-[1.1] text-neutral-content"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your ideas are waiting for you.
          </p>

          <div className="h-0.5 w-12 bg-primary/70" />

          <figure className="space-y-4">
            <blockquote className="text-base leading-relaxed text-neutral-content/55 italic">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-semibold text-neutral-content/70">
                  {testimonial.author}
                </p>
                <p className="text-[11px] text-neutral-content/35">
                  {testimonial.role}
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
