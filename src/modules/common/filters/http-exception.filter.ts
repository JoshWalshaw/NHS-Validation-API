import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from '~modules/common/interceptors/transform.interceptor';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const exceptionData = exception.getResponse();

    let errors: Array<unknown> = [];
    if (exceptionData && exceptionData['message']?.length) {
      errors = exceptionData['message'];
    }

    const a: CustomResponse<unknown> = {
      statusCode: status,
      success: false,
      payload: null,
      errors: errors?.length ? errors : [exception.message],
    };

    response.status(status).json(a);
  }
}
