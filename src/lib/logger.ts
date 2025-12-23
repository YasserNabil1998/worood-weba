type LogLevel = "error" | "warn" | "info" | "debug";

interface LogContext {
  [key: string]: unknown;
}

/**
 * Interface for future error tracking service integration
 * @example
 * // Future implementation with Sentry:
 * if (window.Sentry) {
 *   window.Sentry.captureException(error, { extra: context });
 * }
 */
interface ErrorTrackingService {
  captureException?: (error: Error | unknown, options?: { extra?: LogContext }) => void;
  captureMessage?: (message: string, level?: LogLevel, context?: LogContext) => void;
}

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

function formatMessage(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
}

/**
 * Logs errors with full details in development, silent in production
 *
 * @param message - Error message
 * @param error - Error object or unknown value
 * @param context - Additional context data
 *
 * @remarks
 * In production, errors are not logged to console to avoid:
 * - Performance issues
 * - Exposing sensitive information
 * - Cluttering browser console
 *
 * Future: Integrate with error tracking service (e.g., Sentry, LogRocket)
 * @example
 * // Future implementation:
 * if (isProduction && typeof window !== "undefined" && window.Sentry) {
 *   window.Sentry.captureException(error, { extra: context });
 * }
 */
export function logError(message: string, error?: Error | unknown, context?: LogContext): void {
  if (isDevelopment) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;

    console.error(formatMessage("error", message, context), error || "");
    if (errorStack) {
      console.error("Stack:", errorStack);
    }
  }
  // In production: silent (no console output)
  // TODO: Integrate with error tracking service (e.g., Sentry, LogRocket)
  // Example: if (typeof window !== "undefined" && window.Sentry) {
  //   window.Sentry.captureException(error, { extra: context });
  // }
}

/**
 * Logs warnings in development only, silent in production
 *
 * @param message - Warning message
 * @param context - Additional context data
 *
 * @remarks
 * Warnings are only shown in development to avoid console clutter in production.
 * For production warnings, consider using error tracking service.
 */
export function logWarn(message: string, context?: LogContext): void {
  if (isDevelopment) {
    console.warn(formatMessage("warn", message, context));
  }
  // In production: silent (no console output)
  // TODO: For critical warnings in production, integrate with error tracking service
}

export function logInfo(message: string, context?: LogContext): void {
  if (isDevelopment) {
    console.info(formatMessage("info", message, context));
  }
}

export function logDebug(message: string, context?: LogContext): void {
  if (isDevelopment) {
    console.debug(formatMessage("debug", message, context));
  }
}

export const logger = {
  error: logError,
  warn: logWarn,
  info: logInfo,
  debug: logDebug,
};

export default logger;
