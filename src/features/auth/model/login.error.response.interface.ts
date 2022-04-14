export interface LoginErrorResponse {
  data: {
    statusCode: number;
    message: string;
    error: string;
  };
  status: number;
}
