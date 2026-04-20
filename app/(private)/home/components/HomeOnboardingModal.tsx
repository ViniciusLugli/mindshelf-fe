import AppModal from "@/app/components/UI/AppModal";

type HomeOnboardingModalProps = {
  open: boolean;
  isSaving: boolean;
  onClose: () => void;
  onComplete: () => void;
};

const steps = [
  {
    title: "Create a group",
    description: "Give each topic, client, or project its own place.",
  },
  {
    title: "Write a note",
    description: "Capture context, ideas, and next steps in one document.",
  },
  {
    title: "Share it in chat",
    description:
      "Bring the right note into the conversation when you need feedback.",
  },
] as const;

export default function HomeOnboardingModal({
  open,
  isSaving,
  onClose,
  onComplete,
}: HomeOnboardingModalProps) {
  return (
    <AppModal
      open={open}
      title="Welcome to MindShelf"
      description="Here is the fastest way to get value from the app."
      onClose={onClose}
    >
      <div className="space-y-5">
        <div className="grid gap-3 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-base-300/70 bg-base-100/90 p-4"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
                Step {index + 1}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-base-content">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/58">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="btn btn-ghost rounded-full"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary rounded-full"
            onClick={onComplete}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Got it"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}
