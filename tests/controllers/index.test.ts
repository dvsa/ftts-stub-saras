import { Context } from '@azure/functions';

import mockController from '../../src/controllers/bookings/bookings-controller';
import httpTrigger from '../../src/controllers/bookings/index';
import { BadRequestError } from '../../src/errors';

jest.mock('../../src/controllers/bookings/bookings-controller');

describe('httpTrigger', () => {
  const context = {} as Context;
  let req;

  beforeEach(() => {
    context.res = {};
    context.done = jest.fn();
    mockController.createBooking = jest.fn();
    mockController.amendBooking = jest.fn();
    mockController.deleteBooking = jest.fn();
  });

  test('injects Content-Type header', async () => {
    req = {};
    await httpTrigger(context, req);
    expect(context.res.headers).toHaveProperty('Content-Type', 'application/json');
  });

  describe('POST', () => {
    beforeEach(() => {
      req = {
        method: 'POST',
        params: { appointmentId: 1 },
      };
    });

    test('invokes createBooking', async () => {
      await httpTrigger(context, req);

      expect(mockController.createBooking).toHaveBeenCalled();
      expect(mockController.amendBooking).not.toHaveBeenCalled();
      expect(mockController.deleteBooking).not.toHaveBeenCalled();
    });

    test('propagates errors', () => {
      mockController.createBooking = jest.fn().mockImplementation(() => {
        throw new BadRequestError();
      });
      expect(() => httpTrigger(context, req)).toThrow(BadRequestError);
    });
  });

  describe('PUT', () => {
    beforeEach(() => {
      req = {
        method: 'PUT',
      };
    });

    test('invokes amendBooking', async () => {
      await httpTrigger(context, req);
      expect(mockController.amendBooking).toHaveBeenCalled();
      expect(mockController.createBooking).not.toHaveBeenCalled();
      expect(mockController.deleteBooking).not.toHaveBeenCalled();
    });

    test('propagates errors', () => {
      mockController.amendBooking = jest.fn().mockImplementation(() => {
        throw new BadRequestError();
      });
      expect(() => httpTrigger(context, req)).toThrow(BadRequestError);
    });
  });

  describe('DELETE', () => {
    beforeEach(() => {
      req = {
        method: 'DELETE',
      };
    });

    test('invokes deleteBooking', async () => {
      await httpTrigger(context, req);
      expect(mockController.deleteBooking).toHaveBeenCalled();
      expect(mockController.createBooking).not.toHaveBeenCalled();
      expect(mockController.amendBooking).not.toHaveBeenCalled();
    });

    test('propagates errors', () => {
      mockController.deleteBooking = jest.fn().mockImplementation(() => {
        throw new BadRequestError();
      });
      expect(() => httpTrigger(context, req)).toThrow(BadRequestError);
    });
  });
});
