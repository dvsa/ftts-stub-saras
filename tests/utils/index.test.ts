import { assertRequired } from '../../src/utils';

describe('assertRequired', () => {
  describe('should throw error', () => {
    test('when null', () => {
      expect(() => assertRequired('NullThrowsError', null)).toThrow('Missing required field: NullThrowsError');
    });

    test('when undefined', () => {
      expect(() => assertRequired('UndefinedThrowsError', null)).toThrow('Missing required field: UndefinedThrowsError');
    });

    test('when empty string', () => {
      expect(() => assertRequired('EmptyStringThrowsError', '')).toThrow('Missing required field: EmptyStringThrowsError');
    });
  });

  describe('should be accepted', () => {
    test('when empty object', () => {
      expect(() => assertRequired('EmptyObject', {})).not.toThrow();
    });

    test('when non-empty string', () => {
      expect(() => assertRequired('NonEmptyString', 'Mock SARAS API')).not.toThrow();
    });
  });
});
