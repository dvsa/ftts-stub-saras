import {
  DeliveryModeID, TestLanguage, TestType, Organisation, VoiceOverLanguage, TestAccommodation,
} from '../enums';
import { AppointmentDetails } from './appointment-details';
import { CandidateDetails } from './candidate-details';
import { TestCentreDetails } from './test-centre-details';

export type BookingDetails = {
  Appointment: AppointmentDetails,
  Candidate: CandidateDetails,
  DeliveryModeID: DeliveryModeID,
  Testcentre: TestCentreDetails,
  TestLanguage: TestLanguage,
  TestType: TestType,
  Organisation: Organisation,
  VoiceOverLanguage?: VoiceOverLanguage,
  TestAccommodation?: TestAccommodation[],
  PreviousPassedExams?: TestType[],
  PreviousPassedTestDate?: string;
};
