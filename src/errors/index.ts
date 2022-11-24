/* eslint-disable max-classes-per-file */

import { ApplicationErrorResponse } from './application-error-response';

export class ApplicationError extends Error {
  status: number; // HTTP status code

  code?: number; // SARAS error code

  protected constructor(status: number, message: string, code?: number) {
    super(message);
    this.status = status;
    this.code = code;
  }

  toResponse(): ApplicationErrorResponse {
    return {
      code: this.code,
      reason: this.message,
    };
  }
}

export class BadRequestError extends ApplicationError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class DuplicateAppointmentError extends ApplicationError {
  constructor(message = 'Appointment already exists') {
    super(400, message, 1025);
  }
}

export class AppointmentNotFoundError extends ApplicationError {
  constructor(message = 'Appointment not found') {
    super(404, message, 1029);
  }
}

export class InvalidAppointmentIdError extends ApplicationError {
  constructor() {
    super(400, 'Invalid Appointment ID');
  }
}

export class UnauthorisedError extends ApplicationError {
  constructor() {
    super(401, 'Unauthorised');
  }
}

export class NotFoundError extends ApplicationError {
  constructor() {
    super(404, '404 Not Found');
  }
}

export class TooManyRequestsError extends ApplicationError {
  constructor() {
    super(429, 'Too many requests');
  }
}

export class InternalServerError extends ApplicationError {
  constructor() {
    super(500, 'Internal Server Error');
  }
}
