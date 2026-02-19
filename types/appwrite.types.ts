import { Models } from "appwrite"

/* =========================
   EVENT DOCUMENT
========================= */

export interface Event extends Models.Document {
  userId: string

  /* Required */
  name: string
  email: string
  phone: string

  /* Optional Personal */
  address?: string
  nationality?: string

  /* Event Details */
  eventType?: string
  requirements?: string
  preferences?: string
  avoidances?: string

  /* Media */
  eventSources?: string
  eventImagesId?: string | null
  eventImagesUrl?: string | null

  /* Consent */
  privacyConsent?: boolean
}

/* =========================
   BOOKING DOCUMENT
========================= */

export interface Booking extends Models.Document {
  event: string | Event
  schedule: Date
  status: Status
  description: string
  note?: string
  userId: string
}
