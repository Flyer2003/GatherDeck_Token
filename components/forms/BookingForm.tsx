"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getBookingSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./RegistrationForm"
import { SelectItem } from "../ui/select"
import { Managers } from "@/constants"
import Image from "next/image"
import { createBooking, updateBooking } from "@/lib/actions/booking.actions"
import { Booking } from "@/types/appwrite.types"

const BookingForm = ({
  userId,
  eventId,
  type,
  booking,
  setOpen,
}: {
  userId?: string
  eventId?: string
  type: "create" | "cancel" | "schedule"
  booking?: Booking
  setOpen?: (open: boolean) => void
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const BookingFormValidation = getBookingSchema(type)

  const form = useForm<z.infer<typeof BookingFormValidation>>({
    resolver: zodResolver(BookingFormValidation),
    defaultValues: {
      eventManager: booking?.eventManager ?? "none",
      catering: booking?.catering ?? "none",
      venue: booking?.venue ?? "none",
      schedule: booking?.schedule
        ? new Date(booking.schedule)
        : new Date(),
      description: booking?.description ?? "",
      note: booking?.note ?? "",
      cancellationReason: booking?.cancellationReason ?? "",
    },
  })

  async function onSubmit(values: z.infer<typeof BookingFormValidation>) {
    setIsLoading(true)

    let status: Status
    switch (type) {
      case "schedule":
        status = "scheduled"
        break
      case "cancel":
        status = "cancelled"
        break
      default:
        status = "pending"
        break
    }

    try {
      if (type === "create" && eventId) {
        const bookingData = {
          userId,
          event: eventId,
          eventManager:
            values.eventManager === "none"
              ? undefined
              : values.eventManager,
          catering:
            values.catering === "none" ? undefined : values.catering,
          venue: values.venue === "none" ? undefined : values.venue,
          schedule: new Date(values.schedule),
          description: values.description || "",
          note: values.note || undefined,
          status,
        }

        const booking = await createBooking(bookingData)

        if (booking) {
          form.reset()
          router.push(
            `/events/${userId}/new-booking/success?bookingId=${booking.$id}`
          )
        }
      } else {
        const bookingToUpdate = {
          userId: userId!,
          bookingId: booking?.$id!,
          booking: {
            eventManager:
              values.eventManager === "none"
                ? undefined
                : values.eventManager,
            catering:
              values.catering === "none" ? undefined : values.catering,
            venue:
              values.venue === "none" ? undefined : values.venue,
            schedule: new Date(values.schedule),
            status,
            cancellationReason:
              values.cancellationReason || "No reason provided",
          },
          type,
        }

        const updatedBooking = await updateBooking(bookingToUpdate)

        if (updatedBooking) {
          setOpen?.(false)
          form.reset()
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonLabel =
    type === "cancel"
      ? "Cancel Booking"
      : type === "schedule"
      ? "Schedule Booking"
      : "Create Booking"

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-6"
      >
        {type === "create" && (
          <section className="mb-8 space-y-2">
            <h1 className="header">Event Booking</h1>
            <p className="text-dark-700">
              Get your events booked in mere seconds.
            </p>
          </section>
        )}

        {type !== "cancel" && (
          <>
            {(["eventManager", "catering", "venue"] as const).map(
              (field) => (
                <CustomFormField
                  key={field}
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name={field}
                  label={
                    field === "eventManager"
                      ? "Event Managers"
                      : field === "catering"
                      ? "Catering"
                      : "Venue"
                  }
                  placeholder={`Select ${
                    field === "eventManager"
                      ? "an Event Manager"
                      : field
                  }`}
                >
                  {Managers.map((manager) => (
                    <SelectItem
                      key={manager.value}
                      value={manager.value}
                    >
                      <div className="flex items-center gap-2">
                        {manager.image && (
                          <Image
                            src={manager.image}
                            width={32}
                            height={32}
                            alt={manager.name}
                            className="rounded-full border border-dark-500"
                          />
                        )}
                        <p>{manager.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>
              )
            )}

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Event Date"
              dateFormat="dd/MM/yyyy"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="description"
                label="Description"
                placeholder="Any more details about the event"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Notes"
                placeholder="Additional requirements"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for Cancellation"
            placeholder="Enter a reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel"
              ? "shad-danger-btn"
              : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default BookingForm
