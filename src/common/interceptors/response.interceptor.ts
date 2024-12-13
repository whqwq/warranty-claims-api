import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from './ApiResponse';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        statusCode: 200,
        success: true,
        message: 'Request successful',
        data: data,
      })),
      catchError((error) => {
        return throwError(() => ({
          statusCode: error.status || 500,
          success: false,
          message: error.message || 'An error occurred',
          error: error,
        }));
      }),
    );
  }
}
