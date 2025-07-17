// Common types for mail functionality shared between frontend and backend

export interface Mail {
  id: number;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateMailRequest {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
}

export interface UpdateMailRequest {
  to?: string;
  cc?: string;
  bcc?: string;
  subject?: string;
  body?: string;
}

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
