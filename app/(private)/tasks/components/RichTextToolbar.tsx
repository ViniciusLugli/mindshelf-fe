import type { RichTextToolbarAction } from "@/app/(private)/tasks/components/rich-text-toolbar.config";

type RichTextToolbarProps = {
  actions: RichTextToolbarAction[];
};

type ToolbarButtonProps = RichTextToolbarAction;

function ToolbarButton({
  active = false,
  disabled = false,
  onClick,
  label,
  icon,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      className={`btn btn-sm min-w-10 rounded-xl border-base-300/60 ${
        active ? "btn-primary" : "btn-ghost"
      }`}
    >
      {icon}
    </button>
  );
}

export default function RichTextToolbar({ actions }: RichTextToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-base-300/60 px-4 py-3">
      {actions.map((action) => (
        <ToolbarButton key={action.label} {...action} />
      ))}
    </div>
  );
}
