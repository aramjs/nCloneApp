"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

type EditableTextCellProps = {
  initialText: string;
  onSave(newText: string): void;
};

export function EditableTextCell({
  initialText,
  onSave,
}: EditableTextCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleClick = () => setIsEditing(true);

  const handleBlur = () => {
    setIsEditing(false);
    onSave(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  if (isEditing) {
    return (
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    );
  }

  return (
    <span
      onClick={handleClick}
      className="w-full inline-block p-2 rounded cursor-pointer hover:bg-gray-100"
      role="button"
    >
      {text}
    </span>
  );
}
