import {
  API_ENDPOINTS,
  ApiResponse,
  Mail,
  SearchParams,
  CreateMailRequest,
  UpdateMailRequest,
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
   * Get a single mail by ID
   */
  static async getMail(mailId: number): Promise<Mail | null> {
    try {
      const response = await apiClient.get<ApiResponse<Mail>>(
        API_ENDPOINTS.MAIL.GET(mailId)
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      return null;
    } catch (error) {
      console.error("Error fetching mail:", error);
      return null;
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

  /**
   * Update a mail by ID
   */
  static async updateMail(mailId: number, mailData: UpdateMailRequest): Promise<Mail> {
    try {
      const response = await apiClient.put<ApiResponse<Mail>>(
        API_ENDPOINTS.MAIL.UPDATE(mailId),
        mailData
      );

      if (response.data.success && response.data.data) {
        return response.data.data;
      }

      throw new Error(response.data.error || "Failed to update mail");
    } catch (error) {
      console.error("Error updating mail:", error);
      throw error;
    }
  }

  /**
   * Delete a mail by ID
   */
  static async deleteMail(mailId: number): Promise<void> {
    try {
      const response = await apiClient.delete<ApiResponse<null>>(
        API_ENDPOINTS.MAIL.DELETE(mailId)
      );

      if (!response.data.success) {
        throw new Error(response.data.error || "Failed to delete mail");
      }
    } catch (error) {
      console.error("Error deleting mail:", error);
      throw error;
    }
  }
}

// Export individual methods for convenience
export const { getMails, getMail, createMail, updateMail, deleteMail } = MailService;
