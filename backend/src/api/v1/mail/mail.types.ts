export interface Mail {
  id: number;
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
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
