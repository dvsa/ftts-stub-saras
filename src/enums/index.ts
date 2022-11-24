// deserialisation can be from any type
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArray } from 'util';
import { BadRequestError } from '../errors';

/**
 * Test delivery mode set for the booking
 */
export enum DeliveryModeID {
  IHTTC = 0,
  Permanent,
  Occasional,
  Home,
}

export function deserialiseDeliveryModeID(input: DeliveryModeID): DeliveryModeID {
  if (Object.values(DeliveryModeID).includes(input)) {
    return input;
  }
  throw new BadRequestError('Invalid Delivery Mode');
}

export enum Gender {
  Female = 0,
  Male,
  Other,
  Unknown,
}

export function deserialiseGender(input: Gender): Gender {
  if (Object.values(Gender).includes(input)) {
    return input;
  }
  throw new BadRequestError('Invalid Gender');
}

/**
 * Flag to differentiate users based on their organisation
 */
export enum Organisation {
  DVA = 0,
  DVSA,
}

export function deserialiseOrganisation(input: Organisation): Organisation {
  if (Object.values(Organisation).includes(input)) {
    return input;
  }
  throw new BadRequestError('Invalid Organisation');
}

export enum Region {
  NA = 0,
  A,
  B,
  C,
}

export function deserialiseRegion(input: Region): Region {
  if (Object.values(Region).includes(input)) {
    return input;
  }
  throw new BadRequestError('Invalid Region');
}

export enum TestAccommodation {
  ExtraLength = 0,
  VoiceOverLanguage,
  BSL,
  PauseHPT,
  OLM,
  Reader,
  Recorder,
  BSLTranslator,
  LipSpeaker,
  ListeningAid,
  SeparateRoom,
  AtHomeTesting,
  LanguageTranslator,
}

export function deserialiseTestAccommodation(input: any | any[]): TestAccommodation | TestAccommodation[] | undefined {
  // optional field
  if (input === undefined || input === null) {
    return undefined;
  }
  if (isArray(input)) {
    return input.map((entry) => deserialiseTestAccommodation(entry) as TestAccommodation);
  }
  if (Object.values(TestAccommodation).includes(input as TestAccommodation)) {
    return input as TestAccommodation;
  }
  throw new BadRequestError('Invalid Test Accommodation');
}

/**
 * Language of the Test
 */
export enum TestLanguage {
  English = 0,
  Welsh,
}

export function deserialiseTestLanguage(input: TestLanguage): TestLanguage {
  if (Object.values(TestLanguage).includes(input)) {
    return input;
  }
  throw new BadRequestError('Invalid Test Language');
}

export enum TestType {
  Car = 0,
  MotorCycle = 2,
  LGVMC,
  LGVHPT,
  LGVCPC,
  LGVCPCC,
  PCVMC,
  PCVHPT,
  PCVCPC,
  PCVCPCC,
  ADI1,
  ADIHPT,
  ERS,
  AMI1,
  Taxi,
  ExaminerCar,
}

export function deserialiseTestType(input: string | TestType | string[] | TestType[]): TestType | TestType[] {
  if (Array.isArray(input)) {
    return input.map((entry) => deserialiseTestType(entry)) as TestType[];
  }
  if (Object.values(TestType).includes(input)) {
    return input as TestType;
  }
  throw new BadRequestError('Invalid Test Type');
}

export function deserialisePreviousPassedExams(input: string | TestType | string[] | TestType[] | undefined): TestType | TestType[] | undefined {
  // optional field
  if (input === undefined || input === null) {
    return undefined;
  }
  return deserialiseTestType(input);
}

export function deserialisePreviousPassedTestDate(input: any | any[]): string | undefined {
  // optional field
  if (input === undefined || input === null) {
    return undefined;
  }
  return input as string;
}

export enum VoiceOverLanguage {
  English = 0,
  Welsh,
  Arabic,
  Farsi,
  Cantonese,
  Turkish,
  Polish,
  Portuguese,
}

export function deserialiseVoiceOverLanguage(input: VoiceOverLanguage | undefined): VoiceOverLanguage | undefined {
  // optional field
  if (input === undefined || input === null) {
    return undefined;
  }
  if (Object.values(VoiceOverLanguage).includes(input)) {
    return input;
  }
  throw new BadRequestError('Invalid Voice Over Language');
}
