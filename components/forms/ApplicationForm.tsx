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
import { FormFieldType } from "../CustomFormField"
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

      if (event) router.push("/bookings/new")
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-xl font-bold text-green-400 mb-4 tracking-wide border-b border-dark-400 pb-2">Personal Details</h2>

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

        <SubmitButton 
          isLoading={isLoading}
          className="w-full rounded-xl bg-green-500 px-5 py-3.5 text-base font-bold text-black hover:bg-green-400 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] mt-8"
        >
          Continue to Booking
        </SubmitButton>
      </form>
    </Form>
  )
}

export default ApplicationForm