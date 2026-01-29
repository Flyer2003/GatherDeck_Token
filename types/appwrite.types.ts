import { Models } from "node-appwrite";

export interface Event extends Models.Document {
  userId: string;

  /* Personal Information */
  name: string;
  email: string;
  phone: string;
  birthDate?: Date;
  gender?: Gender;
  address?: string;
  nationality?: string;

  /* Event Details */
  eventType?: string;
  requirements?: string;
  preferences?: string;
  avoidances?: string;

  /* Media */
  eventSources?: string;
  eventImagesId?: string | null;
  eventImagesUrl?: string | null;

  /* Consent */
  privacyConsent: boolean;
}


export interface Booking extends Models.Document {
  event: string | Event;
  schedule: Date;
  status: Status;
  eventManager: string;
  catering: string;
  venue: string;
  description: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}