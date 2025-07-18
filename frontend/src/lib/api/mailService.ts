import {
  API_ENDPOINTS,
  ApiResponse,
  Mail,
  SearchParams,
  CreateMailRequest,
} from "@common/types/mail";
import apiClient from "./client";

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

  /**
   * Create a new mail
   */
  static async createMail(mailData: CreateMailRequest): Promise<Mail> {
    try {
      const response = await apiClient.post<ApiResponse<Mail>>(
        API_ENDPOINTS.MAIL.CREATE,
        mailData
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to create mail");
    } catch (error) {
      console.error("Error creating mail:", error);
      throw error;
    }
  }
}

// Export individual methods for convenience
export const { getMails, createMail } = MailService;
