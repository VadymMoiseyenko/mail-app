"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Container,
} from "@mui/material";
import { Send, Cancel, Edit, ArrowBack } from "@mui/icons-material";
import { createMail, updateMail } from "@/lib/api/mailService";
import {
  createMailBodySchema,
  updateMailBodySchema,
  CreateMailRequest,
  Mail,
  UpdateMailRequest,
} from "@common/index";

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
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(
      mode === "create" ? createMailBodySchema : updateMailBodySchema
    ),
    defaultValues: {
      to: initialData?.to || "",
      cc: initialData?.cc || "",
      bcc: initialData?.bcc || "",
      subject: initialData?.subject || "",
      body: initialData?.body || "",
    },
  });

  // Update form values when initialData changes
  // useEffect(() => {
  //   if (initialData) {
  //     reset({
  //       to: initialData.to,
  //       cc: initialData.cc,
  //       bcc: initialData.bcc,
  //       subject: initialData.subject,
  //       body: initialData.body,
  //     });
  //   }
  // }, [initialData, reset]);

  // Enable editing when any field changes in view mode
  useEffect(() => {
    if (mode === "view" && isDirty) {
      setIsEditing(true);
    }
  }, [mode, isDirty]);

  const onSubmit = async (data: CreateMailRequest | UpdateMailRequest) => {
    debugger;
    if (isReadOnly && !isEditing) return;

    try {
      setSubmitStatus({ type: null, message: "" });

      if (mode === "create") {
        await createMail(data);

        setSubmitStatus({
          type: "success",
          message: "Email created successfully!",
        });
      } else if (mode === "view" && isEditing && initialData) {
        // Update existing email

        await updateMail(initialData.id, {
          // id: initialData.id,
          ...data,
        });

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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card
        elevation={3}
        sx={{
          backgroundColor: "#2a2a2a",
          color: "#ededed",
          border: "1px solid #444",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#fff" }}
          >
            {finalTitle}
          </Typography>

          {submitStatus.type && (
            <Alert
              severity={submitStatus.type === "success" ? "success" : "error"}
              sx={{
                mb: 3,
                backgroundColor:
                  submitStatus.type === "success"
                    ? "rgba(76, 175, 80, 0.1)"
                    : "rgba(244, 67, 54, 0.1)",
                color: submitStatus.type === "success" ? "#4caf50" : "#f44336",
                border: `1px solid ${
                  submitStatus.type === "success" ? "#4caf50" : "#f44336"
                }`,
                "& .MuiAlert-icon": {
                  color:
                    submitStatus.type === "success" ? "#4caf50" : "#f44336",
                },
              }}
            >
              {submitStatus.message}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="To"
                    type="email"
                    required
                    fullWidth
                    placeholder="recipient@example.com"
                    error={!!errors.to}
                    helperText={errors.to?.message}
                    InputProps={{
                      readOnly: fieldsReadOnly,
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#ccc",
                        "&.Mui-focused": {
                          color: "#007acc",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#1a1a1a",
                        color: "#ededed",
                        "& fieldset": {
                          borderColor: "#444",
                        },
                        "&:hover fieldset": {
                          borderColor: "#007acc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#007acc",
                        },
                        "& input::placeholder": {
                          color: "#999",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#ccc",
                        "&.Mui-error": {
                          color: "#f44336",
                        },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="cc"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="CC"
                    type="email"
                    fullWidth
                    placeholder="cc@example.com"
                    error={!!errors.cc}
                    helperText={errors.cc?.message}
                    InputProps={{
                      readOnly: fieldsReadOnly,
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#ccc",
                        "&.Mui-focused": {
                          color: "#007acc",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#1a1a1a",
                        color: "#ededed",
                        "& fieldset": {
                          borderColor: "#444",
                        },
                        "&:hover fieldset": {
                          borderColor: "#007acc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#007acc",
                        },
                        "& input::placeholder": {
                          color: "#999",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#ccc",
                        "&.Mui-error": {
                          color: "#f44336",
                        },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="bcc"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="BCC"
                    type="email"
                    fullWidth
                    placeholder="bcc@example.com"
                    error={!!errors.bcc}
                    helperText={errors.bcc?.message}
                    InputProps={{
                      readOnly: fieldsReadOnly,
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#ccc",
                        "&.Mui-focused": {
                          color: "#007acc",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#1a1a1a",
                        color: "#ededed",
                        "& fieldset": {
                          borderColor: "#444",
                        },
                        "&:hover fieldset": {
                          borderColor: "#007acc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#007acc",
                        },
                        "& input::placeholder": {
                          color: "#999",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#ccc",
                        "&.Mui-error": {
                          color: "#f44336",
                        },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Subject"
                    required
                    fullWidth
                    placeholder="Email subject"
                    error={!!errors.subject}
                    helperText={errors.subject?.message}
                    InputProps={{
                      readOnly: fieldsReadOnly,
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#ccc",
                        "&.Mui-focused": {
                          color: "#007acc",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#1a1a1a",
                        color: "#ededed",
                        "& fieldset": {
                          borderColor: "#444",
                        },
                        "&:hover fieldset": {
                          borderColor: "#007acc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#007acc",
                        },
                        "& input::placeholder": {
                          color: "#999",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#ccc",
                        "&.Mui-error": {
                          color: "#f44336",
                        },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Body"
                    required
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Write your email message here..."
                    error={!!errors.body}
                    helperText={errors.body?.message}
                    InputProps={{
                      readOnly: fieldsReadOnly,
                    }}
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "#ccc",
                        "&.Mui-focused": {
                          color: "#007acc",
                        },
                      },
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "#1a1a1a",
                        color: "#ededed",
                        "& fieldset": {
                          borderColor: "#444",
                        },
                        "&:hover fieldset": {
                          borderColor: "#007acc",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#007acc",
                        },
                        "& textarea::placeholder": {
                          color: "#999",
                          opacity: 1,
                        },
                      },
                      "& .MuiFormHelperText-root": {
                        color: "#ccc",
                        "&.Mui-error": {
                          color: "#f44336",
                        },
                      },
                    }}
                  />
                )}
              />

              {showActions && (
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  {(mode === "create" || (mode === "view" && isEditing)) && (
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || (mode === "view" && !isDirty)}
                      startIcon={mode === "create" ? <Send /> : <Edit />}
                      size="large"
                      sx={{
                        backgroundColor: "#007acc",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#005a9e",
                        },
                        "&:disabled": {
                          backgroundColor: "#444",
                          color: "#999",
                        },
                      }}
                    >
                      {isSubmitting
                        ? mode === "create"
                          ? "Creating..."
                          : "Updating..."
                        : mode === "create"
                        ? "Create Email"
                        : "Update Email"}
                    </Button>
                  )}

                  <Button
                    type="button"
                    variant="outlined"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    startIcon={isEditing ? <Cancel /> : <ArrowBack />}
                    size="large"
                    sx={{
                      borderColor: "#444",
                      color: "#ccc",
                      "&:hover": {
                        borderColor: "#007acc",
                        backgroundColor: "rgba(0, 122, 204, 0.04)",
                      },
                      "&:disabled": {
                        borderColor: "#333",
                        color: "#666",
                      },
                    }}
                  >
                    {isEditing
                      ? "Cancel Changes"
                      : mode === "view"
                      ? "Back to List"
                      : "Cancel"}
                  </Button>
                </Stack>
              )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
