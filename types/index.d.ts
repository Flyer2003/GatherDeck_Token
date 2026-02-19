/* eslint-disable no-unused-vars */

/* =========================================================
   GENERIC PAGE TYPES
========================================================= */

declare type SearchParamProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

/* =========================================================
   STATUS ENUM
========================================================= */

declare type Status = "pending" | "scheduled" | "cancelled"

/* =========================================================
   USER
========================================================= */

declare interface CreateUserParams {
  name: string
  email: string
  phone: string
}

declare interface User extends CreateUserParams {
  $id: string
}

/* =========================================================
   EVENT (Personal Info Only)
========================================================= */

declare interface RegisterUserParams extends CreateUserParams {
  userId: string

  // Optional additional personal info
  address?: string
  nationality?: string
}

/* =========================================================
   BOOKING (Stores Full Event Request)
========================================================= */

declare type CreateBookingParams = {
  userId: string
  event: string
  status: Status

  /* Event Details */
  eventType: string
  requirements?: string

  /* Media */
  eventSources?: string
  eventImages?: FormData

  /* Date & Details */
  schedule: Date
  description: string
  note?: string

  /* Consent */
  privacyConsent: boolean
}

/* =========================================================
   UPDATE BOOKING
========================================================= */

declare type UpdateBookingParams = {
  bookingId: string
  booking: Partial<CreateBookingParams>
}
