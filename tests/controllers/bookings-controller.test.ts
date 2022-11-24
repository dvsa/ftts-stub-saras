import { Context, HttpRequest } from '@azure/functions';
import controller from '../../src/controllers/bookings/bookings-controller';
import { BookingDetails } from '../../src/domain/booking-details';
import {
  DeliveryModeID, Gender, Region, TestLanguage, TestType, Organisation, VoiceOverLanguage, TestAccommodation,
} from '../../src/enums';
import {
  UnauthorisedError, NotFoundError, TooManyRequestsError, InternalServerError, InvalidAppointmentIdError, DuplicateAppointmentError, AppointmentNotFoundError,
} from '../../src/errors';

const context = {
  log: () => { },
} as Context;

describe('Bookings Controller', () => {
  let req: HttpRequest;
  let body: BookingDetails;

  beforeEach(() => {
    body = {
      Appointment: {
        DateTime: '2020-12-31',
      },
      Candidate: {
        CandidateID: 'candidate ID',
        Name: 'Wendy',
        Surname: 'Jones',
        DOB: '2002-11-10',
        Gender: Gender.Female,
        DrivingLicenseNumber: 'JONES061102W97YT',
      },
      DeliveryModeID: DeliveryModeID.Permanent,
      Testcentre: {
        Region: Region.A,
        TestcentreCode: 'test centre code',
      },
      TestLanguage: TestLanguage.English,
      TestType: TestType.Car,
      Organisation: Organisation.DVSA,
      VoiceOverLanguage: VoiceOverLanguage.Farsi,
      TestAccommodation: [TestAccommodation.SeparateRoom, TestAccommodation.LanguageTranslator],
      PreviousPassedExams: [TestType.Car, TestType.MotorCycle],
      PreviousPassedTestDate: '2019-05-28T18:30:00.000Z',
    };
    req = {
      params: {
        appointmentId: '123',
      },
      body,
    } as unknown as HttpRequest;
  });

  describe('create booking', () => {
    describe('error triggers', () => {
      test('throws DuplicateAppointmentError for appointment ID of 400-duplicate-create', () => {
        req.params.appointmentId = '400-duplicate-create';
        expect(() => controller.createBooking(context, req)).toThrow(new DuplicateAppointmentError());
      });

      test('throws UnauthorisedError for appointment ID of 401-create', () => {
        req.params.appointmentId = '401-create';
        expect(() => controller.createBooking(context, req)).toThrow(new UnauthorisedError());
      });

      test('throws NotFoundError for appointment ID of 404-create', () => {
        req.params.appointmentId = '404-create';
        expect(() => controller.createBooking(context, req)).toThrow(new NotFoundError());
      });

      test('throws TooManyRequestsError for appointment ID of 429-create', () => {
        req.params.appointmentId = '429-create';
        expect(() => controller.createBooking(context, req)).toThrow(new TooManyRequestsError());
      });

      test('throws InternalServerError for appointment ID of 500-create', () => {
        req.params.appointmentId = '500-create';
        expect(() => controller.createBooking(context, req)).toThrow(new InternalServerError());
      });
    });

    test('throws InvalidAppointmentIdError for invalid (non-string) appointment ID', () => {
      req.params.appointmentId = 244;
      expect(() => controller.createBooking(context, req)).toThrow(new InvalidAppointmentIdError());
    });

    test('throws Error for non-JSON body', () => {
      req.body = '#@notJson]}';
      expect(() => controller.createBooking(context, req)).toThrow();
    });

    test('accepts well-formed valid input', () => {
      expect(() => controller.createBooking(context, req)).not.toThrow();
    });
  });

  describe('update booking', () => {
    describe('error triggers', () => {
      test('throws UnauthorisedError for appointment ID of 401-update', () => {
        req.params.appointmentId = '401-update';
        expect(() => controller.amendBooking(context, req)).toThrow(new UnauthorisedError());
      });

      test('throws NotFoundError for appointment ID of 404-update', () => {
        req.params.appointmentId = '404-update';
        expect(() => controller.amendBooking(context, req)).toThrow(new NotFoundError());
      });

      test('throws AppointmentNotFoundError for appointment ID of 404-notfound-update', () => {
        req.params.appointmentId = '404-notfound-update';
        expect(() => controller.amendBooking(context, req)).toThrow(new AppointmentNotFoundError());
      });

      test('throws TooManyRequestsError for appointment ID of 429-update', () => {
        req.params.appointmentId = '429-update';
        expect(() => controller.amendBooking(context, req)).toThrow(new TooManyRequestsError());
      });

      test('throws InternalServerError for appointment ID of 500-update', () => {
        req.params.appointmentId = '500-update';
        expect(() => controller.amendBooking(context, req)).toThrow(new InternalServerError());
      });
    });

    test('throws InvalidAppointmentIdError for invalid (non-string) appointment ID', () => {
      req.params.appointmentId = 412441;
      expect(() => controller.amendBooking(context, req)).toThrow(new InvalidAppointmentIdError());
    });

    test('throws Error for non-JSON body', () => {
      req.body = '#@notJson]}';
      expect(() => controller.amendBooking(context, req)).toThrow();
    });

    test('accepts well-formed valid input', () => {
      expect(() => controller.amendBooking(context, req)).not.toThrow();
    });
  });

  describe('delete booking', () => {
    beforeEach(() => {
      req.body = undefined;
    });

    describe('error triggers', () => {
      test('throws UnauthorisedError for appointment ID of 401-delete', () => {
        req.params.appointmentId = '401-delete';
        expect(() => controller.deleteBooking(context, req)).toThrow(new UnauthorisedError());
      });

      test('throws AppointmentNotFoundError for appointment ID of 404-notfound-delete', () => {
        req.params.appointmentId = '404-notfound-delete';
        expect(() => controller.deleteBooking(context, req)).toThrow(new AppointmentNotFoundError());
      });

      test('throws NotFoundError for appointment ID of 404-delete', () => {
        req.params.appointmentId = '404-delete';
        expect(() => controller.deleteBooking(context, req)).toThrow(new NotFoundError());
      });

      test('throws TooManyRequestsError for appointment ID of 429-delete', () => {
        req.params.appointmentId = '429-delete';
        expect(() => controller.deleteBooking(context, req)).toThrow(new TooManyRequestsError());
      });

      test('throws InternalServerError for appointment ID of 500-delete', () => {
        req.params.appointmentId = '500-delete';
        expect(() => controller.deleteBooking(context, req)).toThrow(new InternalServerError());
      });
    });

    test('throws InvalidAppointmentIdError for invalid (non-string) appointment ID', () => {
      req.params.appointmentId = 463;
      expect(() => controller.deleteBooking(context, req)).toThrow(new InvalidAppointmentIdError());
    });

    test('accepts well-formed valid input', () => {
      expect(() => controller.deleteBooking(context, req)).not.toThrow();
    });
  });
});
