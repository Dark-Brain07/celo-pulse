import { AppError, NetworkError } from './errors';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Enhanced fetch wrapper with timeout and standardized error handling.
 */
export async function fetchWithTimeout(url: string, options: FetchOptions = {}): Promise<Response> {
  const { timeout = 8000, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal
    });
    
    clearTimeout(id);
    
    if (!response.ok) {
      throw new AppError(`HTTP Error: ${response.status}`, response.status);
    }
    
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error instanceof AppError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NetworkError('Request timed out');
    }
    throw new NetworkError('Failed to fetch data');
  }
}
