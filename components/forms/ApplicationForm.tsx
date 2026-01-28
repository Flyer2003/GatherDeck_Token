"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { EventFormValidation, UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser, registerEvent } from "@/lib/actions/event.actions"
import { FormFieldType } from "./RegistrationForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { EventFormDefaultValues, GenderOptions, Managers } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"

 
const ApplicationForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const[isLoading, setIsLoading] =  useState(false);

  const form = useForm<z.infer<typeof EventFormValidation>>({
    resolver: zodResolver(EventFormValidation),
    defaultValues: {
      ...EventFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof EventFormValidation>) {
     setIsLoading(true);

     let formData;

     if (values.eventImages && values.eventImages.length > 0) {
      const blobFile = new Blob([values.eventImages[0]], { type: values.eventImages[0].type 
      })

      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.eventImages[0].name);
     }

     try {
       const eventData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        eventImages: formData,
       }

       // @ts-ignore
       const event = await registerEvent(eventData);

       if (event) router.push(`/events/${user.$id}/new-booking`);
     } catch (error) {
        console.log(error);
     }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-12">
        <section className="space-y-4">
            <h1 className="header">Welcome</h1>
            <p className="text-dark-700">Let us know more about what you need.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="Name"
            iconSrc="/assets/icons/user.svg"
            iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@gmail.com"
              iconSrc="/assets/icons/email.svg"
              iconAlt="email"
          />

          <CustomFormField 
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="9123234567"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birthDate"
                label="Date of Birth"
            />

            <CustomFormField 
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="gender"
                label="Gender"
                renderSkeleton={(field )=> (
                  <FormControl>
                    <RadioGroup className="flex h-11 gap-6 xl:justify-between" onValueChange={field.onChange} defaultValue={field.value}>
                         {GenderOptions.map((option) => (
                          <div key={option} className="radio-group">
                            <RadioGroupItem value={option} id={option}/>
                            <Label htmlFor={option} className="cursor-pointer">
                              {option}
                            </Label>
                          </div>
                         ))}
                    </RadioGroup>
                  </FormControl>
                )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="address"
                label="Address"
                placeholder="Trivandrum, Kerala"
            />

          <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="nationality"
                label="Nationality"
                placeholder="India"
            />
        </div>

      <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Event Details</h2>
          </div>
      </section>

        <div className="flex flex-col gap-6 xl:flex-row">

          <CustomFormField 
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="eventType"
              label="Event Type"
              placeholder="Marriage, Birthday, etc."
          />

          <CustomFormField 
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="requirements"
                label="Event Requirements"
                placeholder="Event Manager, Catering, etc."
          />
          
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">

          <CustomFormField 
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="preferences"
              label="Preferences"
              placeholder="Decoration, Theme, etc."
          />

          <CustomFormField 
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="avoidances"
                label="Anything to Avoid"
                placeholder="Decorative materials, Food items, etc."
          />    
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Media</h2>
          </div>
        </section>               
          
          <CustomFormField 
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="eventSources"
                  label="Event Media Sources"
                  placeholder="Image of previous events, mood boards, etc."
          />

          <CustomFormField 
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name="eventImages"
                label="Upload any Event Ideas or References"
                renderSkeleton={(field )=> (
                  <FormControl>
                    <FileUploader files={field.value} onChange={field.onChange}/>
                  </FormControl>
                )}
          />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I agree to the Privacy Policy and Terms of Service."
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}


export default ApplicationForm