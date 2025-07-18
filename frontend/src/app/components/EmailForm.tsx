"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateMailRequest, UpdateMailRequest, Mail } from "@common/types/mail";
import { createMail, updateMail } from "@/lib/api/mailService";
import styles from "./CreateEmailForm.module.css";

// Zod validation schema based on backend API requirements
const createEmailSchema = z.object({
  to: z
    .string()
    .min(1, "To field is required")
    .email("Must be a valid email address"),
  cc: z
    .string()
    .email("Must be a valid email address")
    .optional()
    .or(z.literal("")),
  bcc: z
    .string()
    .email("Must be a valid email address")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
});

type CreateEmailFormData = z.infer<typeof createEmailSchema>;

interface EmailFormProps {
  initialData?: Mail;
  isReadOnly?: boolean;
  title?: string;
  showActions?: boolean;
  mode?: "create" | "view";
}

export default function EmailForm({
  initialData,
  isReadOnly = false,
  title,
  showActions = true,
  mode = "create",
}: EmailFormProps) {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Set default title based on mode
  const defaultTitle = mode === "create" ? "Create New Email" : "Email Details";
  const finalTitle =
    title ||
    (initialData ? `${defaultTitle} - ${initialData.subject}` : defaultTitle);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<CreateEmailFormData>({
    resolver: zodResolver(createEmailSchema),
    defaultValues: {
      to: "",
      cc: "",
      bcc: "",
      subject: "",
      body: "",
    },
  });

  // Update form values when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        to: initialData.to,
        cc: initialData.cc || "",
        bcc: initialData.bcc || "",
        subject: initialData.subject,
        body: initialData.body,
      });
    }
  }, [initialData, reset]);

  // Enable editing when any field changes in view mode
  useEffect(() => {
    if (mode === "view" && isDirty) {
      setIsEditing(true);
    }
  }, [mode, isDirty]);

  const onSubmit = async (data: CreateEmailFormData) => {
    if (isReadOnly && !isEditing) return;

    try {
      setSubmitStatus({ type: null, message: "" });

      if (mode === "create") {
        // Create new email
        const emailData: CreateMailRequest = {
          ...data,
          cc: data.cc || undefined,
          bcc: data.bcc || undefined,
        };

        await createMail(emailData);

        setSubmitStatus({
          type: "success",
          message: "Email created successfully!",
        });
      } else if (mode === "view" && isEditing && initialData) {
        // Update existing email
        const updateData: UpdateMailRequest = {
          to: data.to,
          cc: data.cc || undefined,
          bcc: data.bcc || undefined,
          subject: data.subject,
          body: data.body,
        };

        await updateMail(initialData.id, updateData);

        setSubmitStatus({
          type: "success",
          message: "Email updated successfully!",
        });

        setIsEditing(false);

        // Reset form with new data to clear dirty state
        reset(data);
      }

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error saving email:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : `Failed to ${mode === "create" ? "create" : "update"} email`,
      });
    }
  };

  const handleCancel = () => {
    if (isEditing) {
      // Reset form to original values
      if (initialData) {
        reset({
          to: initialData.to,
          cc: initialData.cc || "",
          bcc: initialData.bcc || "",
          subject: initialData.subject,
          body: initialData.body,
        });
      }
      setIsEditing(false);
    } else {
      router.push("/");
    }
  };

  const fieldsReadOnly = isReadOnly && !isEditing;

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>{finalTitle}</h1>

        {submitStatus.type && (
          <div className={`${styles.alert} ${styles[submitStatus.type]}`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>To *</label>
            <input
              {...register("to")}
              type="email"
              className={`${styles.input} ${
                errors.to ? styles.inputError : ""
              }`}
              placeholder="recipient@example.com"
              readOnly={fieldsReadOnly}
            />
            {errors.to && (
              <div className={styles.errorMessage}>{errors.to.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>CC</label>
            <input
              {...register("cc")}
              type="email"
              className={`${styles.input} ${
                errors.cc ? styles.inputError : ""
              }`}
              placeholder="cc@example.com"
              readOnly={fieldsReadOnly}
            />
            {errors.cc && (
              <div className={styles.errorMessage}>{errors.cc.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>BCC</label>
            <input
              {...register("bcc")}
              type="email"
              className={`${styles.input} ${
                errors.bcc ? styles.inputError : ""
              }`}
              placeholder="bcc@example.com"
              readOnly={fieldsReadOnly}
            />
            {errors.bcc && (
              <div className={styles.errorMessage}>{errors.bcc.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Subject *</label>
            <input
              {...register("subject")}
              type="text"
              className={`${styles.input} ${
                errors.subject ? styles.inputError : ""
              }`}
              placeholder="Email subject"
              readOnly={fieldsReadOnly}
            />
            {errors.subject && (
              <div className={styles.errorMessage}>
                {errors.subject.message}
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Body *</label>
            <textarea
              {...register("body")}
              className={`${styles.input} ${styles.textarea} ${
                errors.body ? styles.inputError : ""
              }`}
              placeholder="Write your email message here..."
              rows={6}
              readOnly={fieldsReadOnly}
            />
            {errors.body && (
              <div className={styles.errorMessage}>{errors.body.message}</div>
            )}
          </div>

          {showActions && (
            <div className={styles.buttonGroup}>
              {(mode === "create" || (mode === "view" && isEditing)) && (
                <button
                  type="submit"
                  disabled={isSubmitting || (mode === "view" && !isDirty)}
                  className={`${styles.button} ${styles.primaryButton}`}
                >
                  {isSubmitting
                    ? mode === "create"
                      ? "Creating..."
                      : "Updating..."
                    : mode === "create"
                    ? "Create Email"
                    : "Update Email"}
                </button>
              )}

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                className={`${styles.button} ${styles.secondaryButton}`}
              >
                {isEditing
                  ? "Cancel Changes"
                  : mode === "view"
                  ? "Back to List"
                  : "Cancel"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
