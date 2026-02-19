"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { EventFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { registerEvent } from "@/lib/actions/event.actions"
import { FormFieldType } from "./RegistrationForm"
import { EventFormDefaultValues } from "@/constants"

const ApplicationForm = ({ user }: { user: User }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof EventFormValidation>>({
    resolver: zodResolver(EventFormValidation),
    defaultValues: EventFormDefaultValues,
  })

  async function onSubmit(values: z.infer<typeof EventFormValidation>) {
    setIsLoading(true)

    try {
      const event = await registerEvent({
        ...values,
        userId: user.$id,
      })

      if (event) router.push(`/events/${user.$id}/new-booking`)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="header">Personal Details</h1>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name *"
          placeholder="John Doe"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email *"
          placeholder="john@email.com"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone *"
          placeholder="9876543210"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="address"
          label="Address (optional)"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="nationality"
          label="Nationality (optional)"
        />

        <SubmitButton isLoading={isLoading}>
          Continue to Booking
        </SubmitButton>
      </form>
    </Form>
  )
}

export default ApplicationForm
