import { z } from "zod"

/* =========================================================
   REGISTRATION FORM (LOGIN / SIGNUP)
========================================================= */

export const UserFormValidation = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
})

/* =========================================================
   APPLICATION FORM (PERSONAL INFO)
========================================================= */

export const EventFormValidation = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),

  address: z.string().optional(),
  nationality: z.string().optional(),
})

/* =========================================================
   EVENT DETAILS (BOOKING PAGE)
========================================================= */

export const EventDetailsSchema = z.object({
  eventType: z.string().min(1, "Event type is required"),
  requirements: z.string().optional(),

  eventSources: z.string().optional(),
  eventImages: z.any().optional(),
})

/* =========================================================
   DATE & BOOKING DETAILS
========================================================= */

export const BookingCreateSchema = z.object({
  schedule: z.date(), // ✅ FIXED (no preprocess)
  description: z.string().min(1, "Description is required"),
  note: z.string().optional(),
})

/* =========================================================
   CONSENT
========================================================= */

export const ConsentSchema = z.object({
  privacyConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "You must accept the privacy policy",
    }),
})

/* =========================================================
   FINAL BOOKING FORM
========================================================= */

export const BookingWithEventSchema =
  EventDetailsSchema
    .merge(BookingCreateSchema)
    .merge(ConsentSchema)
