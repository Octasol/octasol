"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ImageResize from "tiptap-extension-resize-image";
import ToolBar from "./ToolBar";
import { uploadImage } from "@/lib/utils";
import { useSelector } from "react-redux";

export default function RichTextEditor({ content, onChange }: any) {
  const user = useSelector((state: any) => state.user);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal ml-3" },
      }),
      BulletList.configure({
        HTMLAttributes: { class: "list-disc ml-3" },
      }),
      Highlight,
      Image.configure({
        HTMLAttributes: {
          class: "max-height: 70%; width: auto;",
        },
      }),
      ImageResize,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px]  bg-transparent py-2 px-3 focus:outline-none focus:ring-0",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const insertImage = (src: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src }).run();
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      const uploadedImageUrl = await uploadImage(file, user.accessToken);
      if (uploadedImageUrl) {
        insertImage(uploadedImageUrl);
      }
    }
  };

  return (
    <div>
      <ToolBar editor={editor} />
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border p-2 rounded-md"
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
