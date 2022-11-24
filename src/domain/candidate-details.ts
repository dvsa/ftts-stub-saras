import { Gender } from '../enums';

export type CandidateDetails = {
  CandidateID: string,
  Name: string,
  Surname: string,
  DOB: string,
  Gender: Gender,
  DrivingLicenseNumber: string,
  PersonalReferenceNumber?: string,
  EntitlementConfirmation?: string,
  Address?: string,
};
