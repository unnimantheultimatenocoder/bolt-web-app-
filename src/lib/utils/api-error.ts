export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return { message: error.message, statusCode: error.statusCode };
  }
  
  console.error('Unhandled error:', error);
  return { message: 'Internal Server Error', statusCode: 500 };
}