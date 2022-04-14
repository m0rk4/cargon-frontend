export interface AuthErrorResponse {
  data: {
    statusCode: number;
    message: string;
    error: string;
  };
  status: number;
}
