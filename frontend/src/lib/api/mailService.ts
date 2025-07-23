"use server";

import {
  API_ENDPOINTS,
  ApiResponse,
  Mail,
  SearchParams,
  CreateMailRequest,
  UpdateMailRequest,
} from "@common/index";
import apiClient from "./client";
import { revalidatePath } from "next/cache";

async function deleteMail(mailId: number): Promise<void> {
  try {
    console.log("Deleting mail with ID:", mailId);
    const response = await apiClient.delete<ApiResponse<null>>(
      API_ENDPOINTS.MAIL.DELETE(mailId)
    );
    console.log("Delete response:", response.status);

    debugger;

    if (!response.status || response.status !== 200) {
      throw new Error(response.data.error || "Failed to delete mail");
    }

    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting mail:", error);
  }
}

async function getMails(params?: SearchParams): Promise<Mail[]> {
  try {
    const response = await apiClient.get<ApiResponse<Mail[]>>(
      API_ENDPOINTS.MAIL.LIST,
      {
        params,
      }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error("Error fetching mails:", error);
    return [];
  }
}

async function getMail(mailId: number): Promise<Mail | null> {
  try {
    const response = await apiClient.get<ApiResponse<Mail>>(
      API_ENDPOINTS.MAIL.GET(mailId)
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    return null;
  }
}

async function createMail(mailData: CreateMailRequest): Promise<Mail> {
  try {
    const response = await apiClient.post<ApiResponse<Mail>>(
      API_ENDPOINTS.MAIL.CREATE,
      mailData
    );

    if (response.data.success && response.data.data) {
      revalidatePath("/");
      return response.data.data;
    }

    throw new Error(response.data.error || "Failed to create mail");
  } catch (error) {
    console.error("Error creating mail:", error);
    throw error;
  }
}

async function updateMail(
  mailId: number,
  mailData: UpdateMailRequest
): Promise<Mail> {
  try {
    const response = await apiClient.put<ApiResponse<Mail>>(
      API_ENDPOINTS.MAIL.UPDATE(mailId),
      mailData
    );

    if (response.data.success && response.data.data) {
      revalidatePath("/");
      return response.data.data;
    }

    throw new Error(response.data.error || "Failed to update mail");
  } catch (error) {
    console.error("Error updating mail:", error);
    throw error;
  }
}

export { deleteMail, getMail, createMail, updateMail, getMails };
