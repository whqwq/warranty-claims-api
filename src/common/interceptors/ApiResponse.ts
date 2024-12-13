export class ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
