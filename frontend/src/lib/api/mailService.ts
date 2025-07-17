import apiClient from "./client";
import { Mail, SearchParams, API_ENDPOINTS } from "./types";

interface ApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
}

export class MailService {
  /**
   * Get all mails with optional search and pagination
   */
  static async getMails(params?: SearchParams): Promise<Mail[]> {
    try {
      const response = await apiClient.get<ApiResponse<Mail[]>>(
        API_ENDPOINTS.MAIL.LIST,
        {
          params,
        }
      );

      // Extract data from the wrapped response
      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      return [];
    } catch (error) {
      console.error("Error fetching mails:", error);
      return []; // Return empty array instead of undefined
    }
  }
}

// Export individual methods for convenience
export const { getMails } = MailService;
