/**
 * Utility functions for common button styles
 * These functions return Tailwind CSS classes as strings
 * Note: Colors are used as inline styles because Tailwind needs static values at build time
 */

import { COLORS, SIZES } from "@/constants";

export const getButtonStyles = {
  /**
   * Primary button style (green background)
   */
  primary: () =>
    `w-[130px] h-[50px] px-4 rounded-[5px] text-white transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,

  /**
   * Secondary button style (outlined)
   */
  secondary: () =>
    `w-[130px] h-[50px] px-4 rounded-[5px] bg-transparent border hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,

  /**
   * Edit button style (small, gray-green)
   */
  edit: () =>
    `text-white cursor-pointer px-3 py-2 h-[41px] rounded-[5px] transition-all duration-200 hover:scale-105 flex items-center justify-center`,

  /**
   * Delete button style (small, red)
   */
  delete: () =>
    `text-white cursor-pointer px-3 py-2 h-[41px] rounded-[5px] transition-all duration-200 hover:scale-105 flex items-center justify-center`,
};

/**
 * Get inline styles for buttons (for colors that need to be dynamic)
 */
export const getButtonInlineStyles = {
  primary: () => ({ backgroundColor: COLORS.SECONDARY }),
  primaryHover: () => ({ backgroundColor: COLORS.SECONDARY_DARK }),
  secondary: () => ({ borderColor: COLORS.PRIMARY, color: COLORS.PRIMARY }),
  edit: () => ({ backgroundColor: COLORS.EDIT_BUTTON }),
  editHover: () => ({ backgroundColor: COLORS.SECONDARY_HOVER }),
  delete: () => ({ backgroundColor: COLORS.DANGER }),
  deleteHover: () => ({ backgroundColor: COLORS.DANGER_HOVER }),
};
