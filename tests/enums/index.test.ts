import {
  DeliveryModeID, deserialiseDeliveryModeID,
  Gender, deserialiseGender,
  Organisation, deserialiseOrganisation, Region, deserialiseRegion, TestAccommodation, deserialiseTestAccommodation, TestLanguage, deserialiseTestLanguage, TestType, deserialiseTestType, VoiceOverLanguage, deserialiseVoiceOverLanguage, deserialisePreviousPassedExams,
} from '../../src/enums';

import { BadRequestError } from '../../src/errors';

describe('enums', () => {
  describe('DeliveryModeID', () => {
    Object.values(DeliveryModeID).forEach((deliveryMode) => {
      test(`${deliveryMode} deserialises`, () => {
        expect(deserialiseDeliveryModeID(deliveryMode)).toEqual(deliveryMode);
      });
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseDeliveryModeID(-1)).toThrow(BadRequestError);
    });
  });

  describe('Gender', () => {
    Object.values(Gender).forEach((gender) => {
      test(`${gender} deserialises`, () => {
        expect(deserialiseGender(gender)).toEqual(gender);
      });
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseGender(-1)).toThrow(BadRequestError);
    });
  });

  describe('Organisation', () => {
    Object.values(Organisation).forEach((organisation) => {
      test(`${organisation} deserialises`, () => {
        expect(deserialiseOrganisation(organisation)).toEqual(organisation);
      });
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseOrganisation(-1)).toThrow(BadRequestError);
    });
  });

  describe('Region', () => {
    Object.values(Region).forEach((region) => {
      test(`${region} deserialises`, () => {
        expect(deserialiseRegion(region)).toEqual(region);
      });
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseRegion(-1)).toThrow(BadRequestError);
    });
  });

  describe('TestAccommodation', () => {
    Object.values(TestAccommodation).forEach((testAccommodation) => {
      test(`${testAccommodation} deserialises`, () => {
        expect(deserialiseTestAccommodation(testAccommodation)).toEqual(testAccommodation);
      });
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseTestAccommodation(-1)).toThrow(BadRequestError);
    });

    describe('as an optional field', () => {
      test('can successfully be called with undefined', () => {
        expect(deserialiseTestAccommodation(undefined)).toBeUndefined();
      });
    });
  });

  describe('TestLanguage', () => {
    Object.values(TestLanguage).forEach((testLanguage) => {
      test(`${testLanguage} deserialises`, () => {
        expect(deserialiseTestLanguage(testLanguage)).toEqual(testLanguage);
      });
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseTestLanguage(-1)).toThrow(BadRequestError);
    });
  });

  describe('TestType', () => {
    Object.values(TestType).forEach((testType) => {
      test(`${testType} deserialises`, () => {
        expect(deserialiseTestType(testType)).toEqual(testType);
      });
    });

    test('1 throws an error', () => {
      expect(() => deserialiseTestType(1)).toThrow(BadRequestError);
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseTestType(-1)).toThrow(BadRequestError);
    });
  });

  describe('Previous passed exams', () => {
    test('calls deserialise test type with valid input', () => {
      const input = [0, 2];

      const result = deserialisePreviousPassedExams(input);

      expect(result).toEqual([TestType.Car, TestType.MotorCycle]);
    });

    test('can successfully be called with undefined', () => {
      expect(deserialisePreviousPassedExams(undefined)).toBeUndefined();
    });
  });

  describe('VoiceOverLanguage', () => {
    Object.values(VoiceOverLanguage).forEach((voiceOverLanguage) => {
      test(`${voiceOverLanguage} deserialises`, () => {
        expect(deserialiseVoiceOverLanguage(voiceOverLanguage)).toEqual(voiceOverLanguage);
      });
    });

    test('-1 throws an error', () => {
      expect(() => deserialiseVoiceOverLanguage(-1)).toThrow(BadRequestError);
    });

    describe('as an optional field', () => {
      test('can successfully be called with undefined', () => {
        expect(deserialiseVoiceOverLanguage(undefined)).toBeUndefined();
      });
    });
  });
});
