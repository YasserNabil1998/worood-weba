import { ErrorCode, ErrorContext } from "./errorTypes";

export interface AppErrorOptions {
  code?: ErrorCode;
  context?: ErrorContext;
  isRetryable?: boolean;
  cause?: Error;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly context?: ErrorContext;
  public readonly isRetryable: boolean;
  public readonly timestamp: Date;
  public readonly cause?: Error;

  constructor(
    message: string,
    codeOrOptions?: ErrorCode | AppErrorOptions,
    context?: ErrorContext,
    isRetryable?: boolean
  ) {
    super(message);

    // Support both old and new API for backward compatibility
    if (typeof codeOrOptions === "string" || codeOrOptions === undefined) {
      // Old API: (message, code?, context?, isRetryable?)
      this.code = (codeOrOptions as ErrorCode) ?? ErrorCode.UNKNOWN_ERROR;
      this.context = context;
      this.isRetryable = isRetryable ?? false;
      this.cause = undefined;
    } else {
      // New API: (message, options)
      const options = codeOrOptions as AppErrorOptions;
      this.code = options.code ?? ErrorCode.UNKNOWN_ERROR;
      this.context = options.context;
      this.isRetryable = options.isRetryable ?? false;
      this.cause = options.cause;
    }

    this.name = "AppError";
    this.timestamp = new Date();

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    // Ensure the prototype chain is correct
    Object.setPrototypeOf(this, AppError.prototype);
  }

  /**
   * Convert error to JSON for logging/serialization
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      isRetryable: this.isRetryable,
      timestamp: this.timestamp.toISOString(),
      stack: this.stack,
      ...(this.cause && { cause: this.cause.message }),
    };
  }

  /**
   * Convert error to string representation
   */
  toString(): string {
    const contextStr = this.context ? ` (${JSON.stringify(this.context)})` : "";
    return `[${this.code}] ${this.message}${contextStr}`;
  }
}
