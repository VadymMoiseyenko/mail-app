import { z } from "zod";

// Zod schemas for validation
export const createMailBodySchema = z.object({
  to: z.email(),
  cc: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.email().optional()
  ),
  bcc: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.email().optional()
  ),
  subject: z.string().min(1),
  body: z.string().min(1),
});

export const updateMailBodySchema = z.object({
  //   id: z.number(),
  ...createMailBodySchema.shape,
});

export const paramsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

// Type exports from Zod schemas
export type CreateMailRequest = z.infer<typeof createMailBodySchema>;
export type UpdateMailRequest = z.infer<typeof updateMailBodySchema>;
export type MailParams = z.infer<typeof paramsSchema>;

export type Mail = CreateMailRequest & {
  id: number;
  created_at: string;
  updated_at: string;
};

export interface SearchParams {
  search?: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  error?: string;
  details?: string;
}

// API endpoints configuration
export const API_ENDPOINTS = {
  MAIL: {
    LIST: "/mail",
    CREATE: "/mail",
    GET: (id: number) => `/mail/${id}`,
    UPDATE: (id: number) => `/mail/${id}`,
    DELETE: (id: number) => `/mail/${id}`,
  },
} as const;
