"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreateMailRequest } from "@common/types/mail";
import { createMail } from "@/lib/api/mailService";
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

export default function CreateNewEmailForm() {
  const router = useRouter();
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = async (data: CreateEmailFormData) => {
    try {
      setSubmitStatus({ type: null, message: "" });

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

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Error creating email:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to create email",
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Create New Email</h1>

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
              className={`${styles.input} ${errors.to ? styles.inputError : ""}`}
              placeholder="recipient@example.com"
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
              className={`${styles.input} ${errors.cc ? styles.inputError : ""}`}
              placeholder="cc@example.com"
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
              className={`${styles.input} ${errors.bcc ? styles.inputError : ""}`}
              placeholder="bcc@example.com"
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
              className={`${styles.input} ${errors.subject ? styles.inputError : ""}`}
              placeholder="Email subject"
            />
            {errors.subject && (
              <div className={styles.errorMessage}>{errors.subject.message}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Body *</label>
            <textarea
              {...register("body")}
              className={`${styles.input} ${styles.textarea} ${errors.body ? styles.inputError : ""}`}
              placeholder="Write your email message here..."
              rows={6}
            />
            {errors.body && (
              <div className={styles.errorMessage}>{errors.body.message}</div>
            )}
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              {isSubmitting ? "Creating..." : "Create Email"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              disabled={isSubmitting}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
