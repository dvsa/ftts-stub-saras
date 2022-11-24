import { Region, deserialiseRegion } from '../enums';
import { assertRequired } from '../utils';
import { TestCentreDetails } from './test-centre-details';

export class TestCentre {
  constructor(public region: Region, public code: string) {
    assertRequired('Testcentre.Region', region);
    assertRequired('Testcentre.TestcentreCode', code);
  }

  static deserialise(input: TestCentreDetails): TestCentre {
    if (!input) {
      return input;
    }
    return new TestCentre(
      deserialiseRegion(input.Region),
      input.TestcentreCode,
    );
  }
}
