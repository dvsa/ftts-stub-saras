import { assertRequired } from '../../src/utils';

describe('assertRequired', () => {
  describe('should throw error', () => {
    test('when null', () => {
      expect(() => assertRequired('NullThrowsError', null)).toThrowError('Missing required field: NullThrowsError');
    });

    test('when undefined', () => {
      expect(() => assertRequired('UndefinedThrowsError', null)).toThrowError('Missing required field: UndefinedThrowsError');
    });

    test('when empty string', () => {
      expect(() => assertRequired('EmptyStringThrowsError', '')).toThrowError('Missing required field: EmptyStringThrowsError');
    });
  });

  describe('should be accepted', () => {
    test('when empty object', () => {
      expect(() => assertRequired('EmptyObject', {})).not.toThrowError();
    });

    test('when non-empty string', () => {
      expect(() => assertRequired('NonEmptyString', 'Mock SARAS API')).not.toThrowError();
    });
  });
});
