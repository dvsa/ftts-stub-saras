import { HttpRequest, Context } from '@azure/functions';
import * as Errors from '../../errors';
import { Booking } from '../../domain/booking';
import { BookingDetails } from '../../domain/booking-details';

type ExtraErrorTrigger = [string, Error];

function createBooking(context: Context, req: HttpRequest): void {
  if (typeof req.params.appointmentId !== 'string') {
    throw new Errors.InvalidAppointmentIdError();
  }

  const appointmentID: string = req.params.appointmentId;
  checkErrorTriggers(appointmentID, 'create', ['400-duplicate', new Errors.DuplicateAppointmentError()]);
  const logData = validate(req, context);
  context.log(`MOCK Booking_CREATE: ${logData}`);
}

function amendBooking(context: Context, req: HttpRequest): void {
  if (typeof req.params.appointmentId !== 'string') {
    throw new Errors.InvalidAppointmentIdError();
  }

  const appointmentID: string = req.params.appointmentId;
  checkErrorTriggers(appointmentID, 'update', ['404-notfound', new Errors.AppointmentNotFoundError()]);
  const logData = validate(req, context);
  context.log(`MOCK Booking_UPDATE: ${logData}`);
}

function deleteBooking(context: Context, req: HttpRequest): void {
  if (typeof req.params.appointmentId !== 'string') {
    throw new Errors.InvalidAppointmentIdError();
  }

  const appointmentID: string = req.params.appointmentId;
  checkErrorTriggers(appointmentID, 'delete', ['404-notfound', new Errors.AppointmentNotFoundError()]);
  context.log(`MOCK Booking_DELETE: ${appointmentID}`);
}

function validate(req: HttpRequest, context: Context): string {
  try {
    const booking: Booking = Booking.deserialise(req.body as BookingDetails);
    return JSON.stringify(booking);
  } catch (e) {
    context.log(e);
    throw e instanceof Errors.ApplicationError ? e : new Errors.BadRequestError();
  }
}

function checkErrorTriggers(appointmentID: string, operation: string, extra: ExtraErrorTrigger): void {
  switch (appointmentID) {
    case `401-${operation}`:
      throw new Errors.UnauthorisedError();
    case `404-${operation}`:
      throw new Errors.NotFoundError();
    case `429-${operation}`:
      throw new Errors.TooManyRequestsError();
    case `500-${operation}`:
      throw new Errors.InternalServerError();
    default: {
      if (appointmentID === `${extra[0]}-${operation}`) {
        throw extra[1];
      }
    }
  }
}

export default { createBooking, amendBooking, deleteBooking };
