import type { Editor } from "@tiptap/react";
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  FormatStrikethrough,
  HorizontalRule,
  Link as LinkIcon,
  Redo,
  Title,
  Undo,
} from "@mui/icons-material";

export type RichTextToolbarAction = {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function buildRichTextToolbarActions(
  editor: Editor,
  onSetLink: () => void,
): RichTextToolbarAction[] {
  return [
    {
      label: "Titulo",
      icon: <Title fontSize="small" />,
      active: editor.isActive("heading", { level: 2 }),
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Negrito",
      icon: <FormatBold fontSize="small" />,
      active: editor.isActive("bold"),
      onClick: () => editor.chain().focus().toggleBold().run(),
    },
    {
      label: "Italico",
      icon: <FormatItalic fontSize="small" />,
      active: editor.isActive("italic"),
      onClick: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      label: "Sublinhado",
      icon: <span className="text-sm font-semibold">U</span>,
      active: editor.isActive("underline"),
      onClick: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      label: "Tachado",
      icon: <FormatStrikethrough fontSize="small" />,
      active: editor.isActive("strike"),
      onClick: () => editor.chain().focus().toggleStrike().run(),
    },
    {
      label: "Lista",
      icon: <FormatListBulleted fontSize="small" />,
      active: editor.isActive("bulletList"),
      onClick: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Lista numerada",
      icon: <FormatListNumbered fontSize="small" />,
      active: editor.isActive("orderedList"),
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Cita",
      icon: <FormatQuote fontSize="small" />,
      active: editor.isActive("blockquote"),
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "Link",
      icon: <LinkIcon fontSize="small" />,
      active: editor.isActive("link"),
      onClick: onSetLink,
    },
    {
      label: "Divisor",
      icon: <HorizontalRule fontSize="small" />,
      onClick: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      label: "Alinhar a esquerda",
      icon: <FormatAlignLeft fontSize="small" />,
      active: editor.isActive({ textAlign: "left" }),
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
    },
    {
      label: "Centralizar",
      icon: <FormatAlignCenter fontSize="small" />,
      active: editor.isActive({ textAlign: "center" }),
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
    },
    {
      label: "Alinhar a direita",
      icon: <FormatAlignRight fontSize="small" />,
      active: editor.isActive({ textAlign: "right" }),
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
    },
    {
      label: "Desfazer",
      icon: <Undo fontSize="small" />,
      disabled: !editor.can().chain().focus().undo().run(),
      onClick: () => editor.chain().focus().undo().run(),
    },
    {
      label: "Refazer",
      icon: <Redo fontSize="small" />,
      disabled: !editor.can().chain().focus().redo().run(),
      onClick: () => editor.chain().focus().redo().run(),
    },
  ];
}
