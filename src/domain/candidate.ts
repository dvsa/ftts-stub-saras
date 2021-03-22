import { Gender, deserialiseGender } from '../enums';
import { assertRequired } from '../utils';

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

  // deserialisation can be from any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static deserialise(input: any): Candidate {
    if (!input) {
      return input;
    }
    return new Candidate(
      input.CandidateID as string,
      input.Name as string,
      input.Surname as string,
      input.DOB as string,
      deserialiseGender(input.Gender),
      input.DrivingLicenseNumber as string,
      input.PersonalReferenceNumber as string,
      input.EntitlementConfirmation as string,
      input.Address as string,
    );
  }
}
