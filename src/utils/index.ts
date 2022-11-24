import { BadRequestError } from '../errors';

export function assertRequired<T>(label: string, field: T): void {
  if (field === undefined || field === null || (typeof field === 'string' && field.length === 0)) {
    throw new BadRequestError(`Missing required field: ${label}`);
  }
}
