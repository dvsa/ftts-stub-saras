import { assertRequired } from '../utils';

export class Appointment {
  constructor(
    public dateTime: string,
  ) {
    assertRequired('Appointment.DateTime', dateTime);
  }

  // deserialisation can be from any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static deserialise(input: any): Appointment {
    if (!input) {
      return input;
    }
    return new Appointment(
      input.DateTime as string,
    );
  }
}
