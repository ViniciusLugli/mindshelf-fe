import AuthForm from "@/app/components/auth/AuthForm";
import AuthLayout from "@/app/components/auth/AuthLayout";

const features = [
  { label: "Capture ideas instantly, without friction" },
  { label: "Collaborate with your team in real time" },
  { label: "Organize intelligently and find what matters fast" },
];

export default function RegisterPage() {
  return (
    <AuthLayout
      leftPanelContent={
        <div className="max-w-105 space-y-6">
          <p
            className="text-[2.6rem] font-bold leading-[1.1] text-neutral-content"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your ideas deserve a better home.
          </p>
          <p className="text-base leading-relaxed text-neutral-content/55">
            Capture, organize, and evolve your thoughts with your team in one
            elegant, distraction-free space.
          </p>

          <div className="h-0.5 w-12 bg-primary/70" />

          <ul className="space-y-3 pt-1">
            {features.map((feat) => (
              <li
                key={feat.label}
                className="flex items-center gap-3 text-sm text-neutral-content/65"
              >
                <span className="mt-px h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {feat.label}
              </li>
            ))}
          </ul>
        </div>
      }
      footerContent={
        <>
          By creating an account you agree to our{" "}
          <a href="#" className="underline hover:text-base-content/50">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline hover:text-base-content/50">
            Privacy Policy
          </a>
          .
        </>
      }
    >
      <AuthForm mode="register" embedded />
    </AuthLayout>
  );
}
