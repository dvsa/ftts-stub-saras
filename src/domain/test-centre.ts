import { Region, deserialiseRegion } from '../enums';
import { assertRequired } from '../utils';

export class TestCentre {
  constructor(
    public region: Region,
    public code: string,
  ) {
    assertRequired('Testcentre.Region', region);
    assertRequired('Testcentre.TestcentreCode', code);
  }

  // deserialisation can be from any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static deserialise(input: any): TestCentre {
    if (!input) {
      return input;
    }
    return new TestCentre(
      deserialiseRegion(input.Region),
      input.TestcentreCode as string,
    );
  }
}
