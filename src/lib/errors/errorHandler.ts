import { AppError } from "./AppError";
import { ErrorCode } from "./errorTypes";
import { logError } from "../logger";

export function handleError(error: unknown, defaultMessage: string, code?: ErrorCode, context?: Record<string, unknown>): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    let errorCode = code || ErrorCode.UNKNOWN_ERROR;
    let isRetryable = false;

    if (error.message.includes("fetch") || error.message.includes("network")) {
      errorCode = ErrorCode.API_NETWORK_ERROR;
      isRetryable = true;
    }

    if (error.message.includes("timeout")) {
      errorCode = ErrorCode.API_TIMEOUT;
      isRetryable = true;
    }

    if (error.message.includes("localStorage") || error.message.includes("storage")) {
      if (error.message.includes("quota")) {
        errorCode = ErrorCode.STORAGE_QUOTA_EXCEEDED;
      } else {
        errorCode = ErrorCode.STORAGE_READ_ERROR;
      }
    }

    return new AppError(error.message || defaultMessage, errorCode, context, isRetryable);
  }

  return new AppError(defaultMessage, code || ErrorCode.UNKNOWN_ERROR, context, false);
}

export function handleAndLogError(
  error: unknown,
  defaultMessage: string,
  code?: ErrorCode,
  context?: Record<string, unknown>
): AppError {
  const appError = handleError(error, defaultMessage, code, context);
  logError(appError.message, appError, { code: appError.code, ...appError.context });
  return appError;
}

export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000,
  errorCode?: ErrorCode
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      const appError = handleError(error, "Operation failed", errorCode);

      if (!appError.isRetryable || attempt === maxRetries) {
        throw appError;
      }

      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw handleError(lastError, "Operation failed after retries", errorCode);
}

