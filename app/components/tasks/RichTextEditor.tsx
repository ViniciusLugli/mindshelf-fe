"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
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
import { useEffect } from "react";

type RichTextEditorProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

type ToolbarButtonProps = {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
};

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

export default function RichTextEditor({
  value,
  placeholder = "Comece a escrever...",
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[360px] px-6 py-5 text-base-content",
      },
    },
    onUpdate({ editor: currentEditor }) {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (editor.getHTML() === value) {
      return;
    }

    editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="rounded-[1.75rem] border border-base-300/70 bg-base-100 p-6 text-sm text-base-content/45">
        Carregando editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Digite a URL do link", previousUrl ?? "https://");

    if (url === null) {
      return;
    }

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-base-300/70 bg-base-100 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-base-300/60 px-4 py-3">
        <ToolbarButton
          label="Titulo"
          icon={<Title fontSize="small" />}
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="Negrito"
          icon={<FormatBold fontSize="small" />}
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italico"
          icon={<FormatItalic fontSize="small" />}
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="Sublinhado"
          icon={<span className="text-sm font-semibold">U</span>}
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          label="Tachado"
          icon={<FormatStrikethrough fontSize="small" />}
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        />
        <ToolbarButton
          label="Lista"
          icon={<FormatListBulleted fontSize="small" />}
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          label="Lista numerada"
          icon={<FormatListNumbered fontSize="small" />}
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
        <ToolbarButton
          label="Cita"
          icon={<FormatQuote fontSize="small" />}
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="Link"
          icon={<LinkIcon fontSize="small" />}
          active={editor.isActive("link")}
          onClick={setLink}
        />
        <ToolbarButton
          label="Divisor"
          icon={<HorizontalRule fontSize="small" />}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <ToolbarButton
          label="Alinhar a esquerda"
          icon={<FormatAlignLeft fontSize="small" />}
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        />
        <ToolbarButton
          label="Centralizar"
          icon={<FormatAlignCenter fontSize="small" />}
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        />
        <ToolbarButton
          label="Alinhar a direita"
          icon={<FormatAlignRight fontSize="small" />}
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        />
        <ToolbarButton
          label="Desfazer"
          icon={<Undo fontSize="small" />}
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
        />
        <ToolbarButton
          label="Refazer"
          icon={<Redo fontSize="small" />}
          disabled={!editor.can().chain().focus().redo().run()}
          onClick={() => editor.chain().focus().redo().run()}
        />
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
