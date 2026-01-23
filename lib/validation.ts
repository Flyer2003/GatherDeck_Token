import * as z from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const EventFormValidation = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().nonempty("Phone is required"),
  birthDate: z.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  address: z.string().nonempty("Address is required"),
  nationality: z.string().nonempty("Nationality is required"),
  eventType: z.string().nonempty("Event type is required"),
  requirements: z.string().optional(),
  eventCordinator: z.string().optional(),
  preferences: z.string().optional(),
  avoidances: z.string().optional(),
  eventSources: z.string().optional(),
  eventImages: z.array(z.instanceof(File)).optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
  message: "You must accept the privacy policy",
}),
});

export const CreateBookingSchema = z.object({
  eventManager: z.string().optional().or(z.literal("")),
  catering: z.string().optional().or(z.literal("")),
  venue: z.string().optional().or(z.literal("")),
  schedule: z.date(),
  description: z
    .string()
    .min(2, "description must be at least 2 characters")
    .max(500, "description must be at most 500 characters"),
  note: z.string().optional().or(z.literal("")),
  cancellationReason: z.string().optional().or(z.literal("")),
});

export const ScheduleBookingSchema = z.object({
  eventManager: z.string().optional().or(z.literal("")),
  catering: z.string().optional().or(z.literal("")),
  venue: z.string().optional().or(z.literal("")),
  schedule: z.date(),
  description: z.string().optional().or(z.literal("")),
  note: z.string().optional().or(z.literal("")),
  cancellationReason: z.string().optional().or(z.literal("")),
});

export const CancelBookingSchema = z.object({
  eventManager: z.string().optional().or(z.literal("")),
  catering: z.string().optional().or(z.literal("")),
  venue: z.string().optional().or(z.literal("")),
  schedule: z.date(),
  description: z.string().optional().or(z.literal("")),
  note: z.string().optional().or(z.literal("")),
  cancellationReason: z
    .string()
    .min(2, "Reason must be at least 2 characters")
    .max(500, "Reason must be at most 500 characters"),
});

export function getBookingSchema(type: string) {
  switch (type) {
    case "create":
      return CreateBookingSchema;
    case "cancel":
      return CancelBookingSchema;
    default:
      return ScheduleBookingSchema;
  }
}