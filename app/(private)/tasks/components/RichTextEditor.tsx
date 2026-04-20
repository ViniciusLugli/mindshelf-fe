"use client";

import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import RichTextToolbar from "./RichTextToolbar";
import { buildRichTextToolbarActions } from "./rich-text-toolbar.config";

type RichTextEditorProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  value,
  placeholder = "Start writing...",
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
        Loading editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter the link URL", previousUrl ?? "https://");

    if (url === null) {
      return;
    }

    if (!url) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const toolbarActions = buildRichTextToolbarActions(editor, setLink);

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-base-300/70 bg-base-100 shadow-sm">
      <RichTextToolbar actions={toolbarActions} />

      <EditorContent editor={editor} />
    </div>
  );
}
