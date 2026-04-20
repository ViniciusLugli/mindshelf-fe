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
    <div className="app-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />

      <div className="app-modal-surface relative z-10 w-full max-w-2xl rounded-4xl border">
        <div className="app-border-soft space-y-2 border-b px-6 py-5">
          <p className="app-faint text-[11px] font-bold uppercase tracking-[0.28em]">
            MindShelf
          </p>
          <h2 className="text-2xl font-semibold text-base-content">{title}</h2>
          {description ? (
            <p className="app-subtle text-sm leading-relaxed">{description}</p>
          ) : null}
        </div>

        <div className="px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
