import type { ContactInfo, FAQ, MessageData } from "@/stores/contactStore";
import { logError } from "@/lib/logger";

/**
 * Fetch contact info
 */
export async function fetchContactInfo(): Promise<ContactInfo> {
  try {
    // TODO: Replace with actual API call

    // Mock data for now
    return {
      address: undefined,
      phone: undefined,
      email: undefined,
      workingHours: undefined,
      socialMedia: undefined,
    };
  } catch (error) {
    logError("Error fetching contact info", error);
    throw error;
  }
}

/**
 * Fetch FAQs
 */
export async function fetchFAQs(): Promise<FAQ[]> {
  try {
    // TODO: Replace with actual API call

    // Mock data for now
    return [];
  } catch (error) {
    logError("Error fetching FAQs", error);
    throw error;
  }
}

/**
 * Send message
 */
export async function sendMessage(messageData: MessageData): Promise<void> {
  try {
    // TODO: Replace with actual API call
  } catch (error) {
    logError("Error sending message", error);
    throw error;
  }
}
