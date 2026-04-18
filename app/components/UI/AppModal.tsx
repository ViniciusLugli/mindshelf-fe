type AppModalProps = {
  open: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
};

export default function AppModal({
  open,
  title,
  description,
  children,
  onClose,
}: AppModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral/35 p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-2xl rounded-4xl border border-base-300/70 bg-base-100 shadow-2xl">
        <div className="space-y-2 border-b border-base-300/60 px-6 py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-base-content/35">
            MindShelf
          </p>
          <h2 className="text-2xl font-semibold text-base-content">{title}</h2>
          {description ? (
            <p className="text-sm leading-relaxed text-base-content/55">
              {description}
            </p>
          ) : null}
        </div>

        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
