import { Models } from "node-appwrite";

export interface Event extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
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