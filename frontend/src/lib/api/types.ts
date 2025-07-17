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

export interface SearchParams {
  search?: string;
}

export const API_ENDPOINTS = {
  MAIL: {
    LIST: "/mail",
  },
} as const;
