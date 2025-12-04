type LogLevel = "error" | "warn" | "info" | "debug";

interface LogContext {
  [key: string]: unknown;
}

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

function formatMessage(level: LogLevel, message: string, context?: LogContext): string {
  const timestamp = new Date().toISOString();
  const contextStr = context ? ` ${JSON.stringify(context)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextStr}`;
}

export function logError(message: string, error?: Error | unknown, context?: LogContext): void {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  if (isDevelopment) {
    console.error(formatMessage("error", message, context), error || "");
    if (errorStack) {
      console.error("Stack:", errorStack);
    }
  } else {
    console.error(formatMessage("error", message, context));
  }
}

export function logWarn(message: string, context?: LogContext): void {
  if (isDevelopment || isProduction) {
    console.warn(formatMessage("warn", message, context));
  }
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
