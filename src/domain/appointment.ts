import { assertRequired } from '../utils';
import { AppointmentDetails } from './appointment-details';

export class Appointment {
  constructor(
    public dateTime: string,
  ) {
    assertRequired('Appointment.DateTime', dateTime);
  }

  static deserialise(input: AppointmentDetails): Appointment {
    if (!input) {
      return input;
    }
    return new Appointment(
      input.DateTime,
    );
  }
}
