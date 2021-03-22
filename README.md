# SARAS API stub service

Stub API mirroring SARAS API for testing purposes

## Endpoints

### Bookings
```
POST Bookings/{appointmentId}
```

`appointmentId`: any string ID*

*Use the following appointment IDs to trigger mock error responses:
- `400-duplicate-create`: duplicate appointment error
- `401-create`: unauthorised error
- `404-create`: resource not found error
- `429-create`: too many requests error
- `500-create`: internal server error

There is very basic validation implemented. Required fields are verified as present, and enum codes are validated. `400` will be returned if validation fails.

```
PUT Bookings/{appointmentId}
```

`appointmentId`: any string ID*

*Use the following appointment IDs to trigger mock error responses:
- `401-update`: unauthorised error
- `404-update`: resource not found error
- `404-notfound-update`: Appointment not found
- `429-update`: too many requests error
- `500-update`: internal server error

There is very basic validation implemented. Required fields are verified as present, and enum codes are validated. `400` will be returned if validation fails.

```
DELETE Bookings/{appointmentId}
```

`appointmentId`: any string ID*

*Use the following appointment IDs to trigger mock error responses:
- `401-delete`: unauthorised error
- `404-delete`: resource not found error
- `404-notfound-delete`: Appointment not found
- `429-delete`: too many requests error
- `500-delete`: internal server error

## Config

N/A

## Run locally

Since this function app just houses http trigger functions, we can easily run it locally:
```bash
npm run build
npm run start
```

You'll need `azure-functions-core-tools` installed globally.

Watch for changes:
```bash
npm run watch
```

### Debug

Debug locally via the VSCode 'Attach to Node Functions' launcher.
