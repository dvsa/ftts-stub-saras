import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import controller from './bookings-controller';
import { ApplicationError } from '../../errors';

const httpTrigger: AzureFunction = (context: Context, req: HttpRequest): void => {
  if (context.res) {
    context.res.headers = { 'Content-Type': 'application/json' };
  }

  switch (req.method) {
    case 'POST':
      handleRequest(context, req, controller.createBooking);
      break;
    case 'PUT':
      handleRequest(context, req, controller.amendBooking);
      break;
    case 'DELETE':
      handleRequest(context, req, controller.deleteBooking);
      break;
    default:
      // unsupported method
  }
};

type Invocation = (context: Context, req: HttpRequest) => void;
const handleRequest = (context: Context, req: HttpRequest, invocation: Invocation): void => {
  try {
    invocation(context, req);
  } catch (error) {
    if (error instanceof ApplicationError) {
      context.res = {
        ...context.res,
        status: error.status,
        body: error.status === 400 || error.status === 404 ? error.toResponse() : undefined,
        // This error was disabled because context.res is of type any.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        headers: {
          ...(context.res ? context.res.headers : undefined),
          'Retry-After': error.status === 429 ? 5 : undefined,
        },
      };
      context.done();
    }
    throw error;
  }

  context.res = {
    ...context.res,
    status: 200,
  };
  context.done();
};

export default httpTrigger;
