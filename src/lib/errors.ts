/**
 * Base custom error class for the application.
 * Extends the built-in Error object to include custom status codes or context.
 */
export class AppError extends Error {
  public readonly statusCode?: number;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, statusCode?: number, context?: Record<string, unknown>) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.context = context;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when a network request fails or API is unreachable.
 */
export class NetworkError extends AppError {
  constructor(message: string = 'Network request failed', context?: Record<string, unknown>) {
    super(message, 503, context);
  }
}

/**
 * Thrown when validation of input data fails.
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', context?: Record<string, unknown>) {
    super(message, 400, context);
  }
}
