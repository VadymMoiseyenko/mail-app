"use client";

import { useState } from "react";
import { deleteMail } from "@/lib/api";
import styles from "./MailList.module.css";

interface DeleteButtonProps {
  mailId: number;
  onDelete?: (mailId: number) => void;
}

export default function DeleteButton({ mailId, onDelete }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling

    if (isDeleting) return;

    setIsDeleting(true);

    try {
      await deleteMail(mailId);

      // Call onDelete callback if provided
      if (onDelete) {
        onDelete(mailId);
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
      // You could add toast notification here for error feedback
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={styles.deleteButton}
      aria-label="Delete email"
    >
      {isDeleting ? "⏳" : "✕"}
    </button>
  );
}
