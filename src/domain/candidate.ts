import { Gender, deserialiseGender } from '../enums';
import { assertRequired } from '../utils';
import { CandidateDetails } from './candidate-details';

export class Candidate {
  constructor(
    public id: string,
    public name: string,
    public surname: string,
    public dob: string,
    public gender: Gender,
    public drivingLicenseNumber: string,
    public personalReferenceNumber?: string,
    public entitlementConfirmation?: string,
    public address?: string,
  ) {
    assertRequired('Candidate.CandidateID', id);
    assertRequired('Candidate.Name', name);
    assertRequired('Candidate.Surname', surname);
    assertRequired('Candidate.DOB', dob);
    assertRequired('Candidate.Gender', gender);
    assertRequired('Candidate.DrivingLicenseNumber', drivingLicenseNumber);
  }

  static deserialise(input: CandidateDetails): Candidate {
    if (!input) {
      return input;
    }
    return new Candidate(
      input.CandidateID,
      input.Name,
      input.Surname,
      input.DOB,
      deserialiseGender(input.Gender),
      input.DrivingLicenseNumber,
      input.PersonalReferenceNumber,
      input.EntitlementConfirmation,
      input.Address as string,
    );
  }
}
