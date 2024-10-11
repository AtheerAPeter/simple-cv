"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, X, Check } from "lucide-react";

interface EditableDocumentTitleProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
}

export function EditableDocumentTitleComponent({
  initialTitle,
  onSave,
}: EditableDocumentTitleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [editedTitle, setEditedTitle] = useState(initialTitle);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleSave = () => {
    setIsEditing(false);
    setTitle(editedTitle);
    onSave(editedTitle);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(title);
  };

  return (
    <div className="flex items-center space-x-2">
      {isEditing ? (
        <>
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-grow"
            autoFocus
          />
          <Button onClick={handleSave} size="icon" variant="ghost">
            <Check className="h-4 w-4" />
          </Button>
          <Button onClick={handleCancel} size="icon" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{title}</h1>
          <Button onClick={handleEdit} size="icon" variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
