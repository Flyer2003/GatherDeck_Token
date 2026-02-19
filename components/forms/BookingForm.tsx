"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { BookingWithEventSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { FormFieldType } from "./RegistrationForm"
import FileUploader from "../FileUploader"
import { createBooking } from "@/lib/actions/booking.actions"

const BookingForm = ({
  userId,
  eventId,
}: {
  userId: string
  eventId: string
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof BookingWithEventSchema>>({
    resolver: zodResolver(BookingWithEventSchema),
    defaultValues: {
      eventType: "",
      requirements: "",
      eventSources: "",
      eventImages: [],
      schedule: new Date(),
      description: "",
      note: "",
      privacyConsent: false,
    },
  })

  async function onSubmit(values: z.infer<typeof BookingWithEventSchema>) {
    setIsLoading(true)

    let formData: FormData | undefined

    if (values.eventImages?.length > 0) {
      const file = values.eventImages[0]
      const blobFile = new Blob([file], { type: file.type })

      formData = new FormData()
      formData.append("blobFile", blobFile)
      formData.append("fileName", file.name)
    }

    try {
      const booking = await createBooking({
        userId,
        event: eventId,
        status: "pending",

        eventType: values.eventType,
        requirements: values.requirements,
        eventSources: values.eventSources,
        eventImages: formData,

        schedule: values.schedule,
        description: values.description,
        note: values.note,

        privacyConsent: values.privacyConsent,
      })

      if (booking) {
        router.push(
          `/events/${userId}/new-booking/success?bookingId=${booking.$id}`
        )
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">

        {/* EVENT */}
        <section className="space-y-6">
          <h2 className="sub-header">Event Details</h2>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="eventType"
            label="Event Type *"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="requirements"
            label="Requirements"
          />
        </section>

        {/* MEDIA */}
        <section className="space-y-6">
          <h2 className="sub-header">Media</h2>

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="eventSources"
            label="Reference Links"
          />

          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="eventImages"
            label="Upload Images"
            renderSkeleton={(field) => (
              <FileUploader files={field.value} onChange={field.onChange} />
            )}
          />
        </section>

        {/* DATE */}
        <section className="space-y-6">
          <h2 className="sub-header">Date & Details</h2>

          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="schedule"
            label="Preferred Event Date *"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label="Description *"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="note"
            label="Additional Notes"
          />
        </section>

        {/* CONSENT */}
        <section className="space-y-6">
          <h2 className="sub-header">Consent & Privacy</h2>

          <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I agree to the Privacy Policy *"
          />
        </section>

        <SubmitButton isLoading={isLoading}>
          Create Booking
        </SubmitButton>
      </form>
    </Form>
  )
}

export default BookingForm
