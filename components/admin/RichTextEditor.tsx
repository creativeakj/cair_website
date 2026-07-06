"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Underline } from "@tiptap/extension-underline";
import { Image as ImageExtension } from "@tiptap/extension-image";
import { Link as LinkExtension } from "@tiptap/extension-link";
import { FontFamily } from "@tiptap/extension-font-family";
import { TextAlign } from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Link2,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FONTS = [
  { label: "Default", value: "" },
  { label: "Serif (Fraunces)", value: "Fraunces, ui-serif, Georgia, serif" },
  { label: "Sans (Outfit)", value: "Outfit, ui-sans-serif, system-ui, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Arial", value: "Arial, sans-serif" },
];

const COLORS = ["#18213b", "#0f7a7a", "#b08a2e", "#7a1f1f", "#1f7a3a", "#000000"];

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-sm border border-transparent text-foreground/70 transition-colors hover:border-border hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
        active && "border-border bg-accent text-foreground",
      )}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  uploadFolder = "news-images",
  placeholder = "Start writing…",
}: {
  value: string;
  onChange: (html: string) => void;
  uploadFolder?: string;
  placeholder?: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [linkEditorOpen, setLinkEditorOpen] = useState(false);
  const [linkDraft, setLinkDraft] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      FontFamily,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      LinkExtension.configure({ openOnClick: false, autolink: true }),
      ImageExtension.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose-cair prose-editor min-h-[200px] max-w-none rounded-b-md border border-t-0 border-input bg-transparent px-3 py-2 text-sm focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Keep editor content in sync if the form resets the value externally (e.g. edit mode load).
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  async function handleImageFile(file: File) {
    if (!editor) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", uploadFolder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (res.ok && data.success) {
      editor.chain().focus().setImage({ src: data.data.url }).run();
    }
  }

  if (!editor) {
    return (
      <div className="min-h-[240px] animate-pulse rounded-md border border-input bg-muted/30" />
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-input bg-[var(--secondary)] p-1.5">
        <ToolbarButton label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton label="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton label="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Align center" active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-border" />

        <ToolbarButton
          label="Link"
          active={editor.isActive("link") || linkEditorOpen}
          onClick={() => {
            setLinkDraft(editor.getAttributes("link").href ?? "");
            setLinkEditorOpen((open) => !open);
          }}
        >
          <Link2 className="h-4 w-4" />
        </ToolbarButton>

        <ToolbarButton label="Insert image" onClick={() => fileInputRef.current?.click()}>
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageFile(file);
            e.target.value = "";
          }}
        />

        <span className="mx-1 h-5 w-px bg-border" />

        <select
          aria-label="Font family"
          className="h-8 rounded-sm border border-transparent bg-transparent px-1 text-xs text-foreground/70 hover:border-border"
          onChange={(e) => {
            const val = e.target.value;
            if (val) editor.chain().focus().setFontFamily(val).run();
            else editor.chain().focus().unsetFontFamily().run();
          }}
          defaultValue=""
        >
          {FONTS.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Text color ${c}`}
              onClick={() => editor.chain().focus().setColor(c).run()}
              className="h-5 w-5 rounded-full border border-border"
              style={{ backgroundColor: c }}
            />
          ))}
          <button
            type="button"
            aria-label="Reset color"
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="h-8 rounded-sm px-1.5 text-[10px] uppercase tracking-wide text-foreground/60 hover:bg-accent"
          >
            Reset
          </button>
        </div>
      </div>

      {linkEditorOpen && (
        <div className="flex items-center gap-2 border-x border-b border-input bg-[var(--secondary)] p-2">
          <input
            type="url"
            autoFocus
            value={linkDraft}
            onChange={(e) => setLinkDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                applyLink();
              } else if (e.key === "Escape") {
                setLinkEditorOpen(false);
              }
            }}
            placeholder="https://example.com"
            className="h-8 flex-1 rounded-sm border border-input bg-background px-2 text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <button
            type="button"
            onClick={applyLink}
            className="h-8 rounded-sm bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Apply
          </button>
          {editor.isActive("link") && (
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setLinkEditorOpen(false);
              }}
              className="h-8 rounded-sm border border-input px-3 text-xs text-foreground/70 hover:bg-accent"
            >
              Remove
            </button>
          )}
          <button
            type="button"
            onClick={() => setLinkEditorOpen(false)}
            className="h-8 rounded-sm px-3 text-xs text-foreground/60 hover:bg-accent"
          >
            Cancel
          </button>
        </div>
      )}

      <EditorContent editor={editor} />
    </div>
  );

  function applyLink() {
    if (linkDraft.trim()) {
      editor?.chain().focus().extendMarkRange("link").setLink({ href: linkDraft.trim() }).run();
    } else {
      editor?.chain().focus().unsetLink().run();
    }
    setLinkEditorOpen(false);
  }
}
