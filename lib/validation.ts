import { z } from "zod";

/* =========================================================
   COMMON VALIDATION RULES
========================================================= */

const nameSchema = z
  .string()
  .min(1, "Full name is required")
  .max(100, "Name must be under 100 characters");

const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(150);

const phoneSchema = z
  .string()
  .regex(/^\+?[0-9]{10,15}$/, "Phone number must contain 10–15 digits");

const textShort = z
  .string()
  .max(500, "Maximum 500 characters allowed")
  .optional();

const textLong = z
  .string()
  .max(2000, "Maximum 2000 characters allowed")
  .optional();

/* =========================================================
   REGISTRATION FORM (LOGIN / SIGNUP)
========================================================= */

export const UserFormValidation = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

/* =========================================================
   APPLICATION FORM (PERSONAL INFO)
========================================================= */

export const EventFormValidation = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,

  address: z
    .string()
    .max(200, "Address too long")
    .optional(),

  nationality: z
    .string()
    .max(100, "Nationality too long")
    .optional(),
});

/* =========================================================
   EVENT DETAILS (BOOKING PAGE)
========================================================= */

export const EventDetailsSchema = z.object({
  eventType: z.string().min(1),

  requirements: textLong,

  eventSources: textShort,

  eventImages: z
  .array(z.instanceof(File))
  .optional()
  .refine(
    (files) =>
      !files || files.every((file) => file.size <= 5 * 1024 * 1024),
    "Each file must be under 5MB"
  ),
});

/* =========================================================
   DATE & BOOKING DETAILS
========================================================= */

export const BookingCreateSchema = z.object({
  schedule: z
  .date()
  .refine((date) => date > new Date(), {
    message: "Event must be scheduled in the future",
  }),

  description: z
    .string()
    .min(1, "Description is required")
    .max(1000, "Description too long"),

  note: z
    .string()
    .max(500, "Note must be under 500 characters")
    .optional(),
});

/* =========================================================
   CONSENT
========================================================= */

export const ConsentSchema = z.object({
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy",
  }),
});

/* =========================================================
   FINAL BOOKING FORM
========================================================= */

export const BookingWithEventSchema =
  EventDetailsSchema
    .merge(BookingCreateSchema)
    .merge(ConsentSchema);