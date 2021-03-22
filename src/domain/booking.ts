import { TestCentre } from './test-centre';
import { Candidate } from './candidate';
import { Appointment } from './appointment';
import {
  DeliveryModeID, deserialiseDeliveryModeID,
  TestLanguage, deserialiseTestLanguage,
  TestType, deserialiseTestType,
  Organisation, deserialiseOrganisation,
  VoiceOverLanguage, deserialiseVoiceOverLanguage,
  TestAccommodation, deserialiseTestAccommodation, deserialisePreviousPassedExams,
} from '../enums';
import { assertRequired } from '../utils';

/**
 * New booking to be distributed to test center for admissions and delivery.
 */
export class Booking {
  constructor(
    public appointment: Appointment,
    public candidate: Candidate,
    public deliveryMode: DeliveryModeID,
    public testCentre: TestCentre,
    public testLanguage: TestLanguage,
    public testType: TestType,
    public organisation: Organisation,
    public voiceOverLanguage?: VoiceOverLanguage,
    public testAccommodation?: TestAccommodation[],
    public previousPassedExams?: TestType[],
  ) {
    assertRequired('Appointment', appointment);
    assertRequired('Candidate', candidate);
    assertRequired('DeliveryModeID', deliveryMode);
    assertRequired('Testcentre', testCentre);
    assertRequired('TestLanguage', testLanguage);
    assertRequired('TestType', testType);
    assertRequired('Organisation', organisation);
  }

  // deserialisation can be from any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static deserialise(input: any): Booking {
    if (!input) {
      return input;
    }

    // required
    const appointment: Appointment = Appointment.deserialise(input.Appointment);
    const candidate: Candidate = Candidate.deserialise(input.Candidate);
    const deliveryMode: DeliveryModeID = deserialiseDeliveryModeID(input.DeliveryModeID);
    const testCentre: TestCentre = TestCentre.deserialise(input.Testcentre);
    const testLanguage: TestLanguage = deserialiseTestLanguage(input.TestLanguage);
    const testType: TestType = deserialiseTestType(input.TestType) as TestType;
    const organisation = deserialiseOrganisation(input.Organisation);
    // optional:
    const voiceOverLanguage = deserialiseVoiceOverLanguage(input.VoiceOverLanguage);
    const testAccommodation = deserialiseTestAccommodation(input.TestAccommodation || []) as TestAccommodation[];
    const previousPassedExams = deserialisePreviousPassedExams(input.PreviousPassedExams) as TestType[];

    return new Booking(
      appointment,
      candidate,
      deliveryMode,
      testCentre,
      testLanguage,
      testType,
      organisation,
      voiceOverLanguage,
      testAccommodation,
      previousPassedExams,
    );
  }
}
