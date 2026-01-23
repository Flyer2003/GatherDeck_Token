"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import {  getBookingSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/event.actions"
import { FormFieldType } from "./RegistrationForm"
import { SelectItem } from "../ui/select"
import { Managers } from "@/constants"
import Image from "next/image"
import { createBooking, updateBooking } from "@/lib/actions/booking.actions"
import { Booking } from "@/types/appwrite.types"
 
const BookingForm = ({
    userId, eventId, type, booking, setOpen
}: {
    userId?: string;
    eventId?: string;
    type: "create" | "cancel" | "schedule";
    booking?: Booking;
    setOpen?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const[isLoading, setIsLoading] =  useState(false);

  const BookingFormValidation = getBookingSchema(type);

  const form = useForm<z.infer<typeof BookingFormValidation>>({
    resolver: zodResolver(BookingFormValidation),
    defaultValues: {
    eventManager: booking?.eventManager ?? "",
    catering: booking?.catering ?? "",
    venue: booking?.venue ?? "",
    schedule: booking?.schedule ? new Date(booking.schedule) : new Date(),
    description: booking?.description ?? "",
    note: booking?.note ?? "",
    cancellationReason: booking?.cancellationReason ?? "",
  },
  });
 
  async function onSubmit( values: z.infer<typeof BookingFormValidation>) {
     setIsLoading(true);

     let status;
     switch (type) {
        case 'schedule':
            status = 'scheduled';
            break;
        case 'cancel':
            status = 'cancelled';
            break;   
        default:
            status = 'pending';
            break;
     }

     try {
       if(type === 'create' && eventId){
        const bookingData = {
          userId,
          event: eventId,
          eventManager: values.eventManager || undefined, // Set to undefined if not provided
          catering: values.catering || undefined, // Set to undefined if not provided
          venue: values.venue || undefined, // Set to undefined if not provided
          schedule: new Date(values.schedule),
          description: values.description || "", // Provide a default value if undefined
          note: values.note || undefined, // Set to undefined if not provided
          status: status as Status,
        };
       const booking = await createBooking(bookingData);

       if(booking) {
        form.reset();
        router.push(`/events/${userId}/new-booking/success?bookingId=${booking.$id}`)
       }
    } else{
      const bookingToUpdate = {
        userId: userId!,
        bookingId: booking?.$id!,
        booking: {
          eventManager: values?.eventManager,
          catering: values?.catering,
          venue: values?.venue,
          schedule: new Date(values?.schedule),
          status: status as Status,
          cancellationReason: values?.cancellationReason || "No reason provided",
        },
        type
      }

      const updatedBooking = await updateBooking(bookingToUpdate);

      if(updatedBooking){
        setOpen && setOpen(false);
        form.reset();
      }
    }
     } catch (error) {
        console.log(error);
     }
 
        setIsLoading(false);
    }

   let buttonLabel;
   
   switch (type) {
    case 'cancel':
        buttonLabel = 'Cancel Booking'
        break;
    case 'create':
        buttonLabel = 'Create Booking'
        break;
    case 'schedule':
        buttonLabel = 'Schedule Booking'
        break;
    default:
        break;
   }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === 'create' && <section className="mb-8 space-y-2">
            <h1 className="header">Event Booking</h1>
            <p className="text-dark-700">Get your Events booked in mere seconds.</p>
        </section>}

        {type !== "cancel" && (
            <>
                <CustomFormField 
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="eventManager"
                label="Event Managers"
                placeholder="Select a Event Manager">
                  {Managers.map((manager) => (
                    <SelectItem key={manager.name} value={manager.name}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                          src={manager.image}
                          width={32}
                          height={32}
                          alt={manager.name}
                          className="rounded-full border border-dark-500"
                        />
                        <p>{manager.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>

                <CustomFormField 
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="catering"
                label="Catering"
                placeholder="Select a Catering team">
                  {Managers.map((manager) => (
                    <SelectItem key={manager.name} value={manager.name}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                          src={manager.image}
                          width={32}
                          height={32}
                          alt={manager.name}
                          className="rounded-full border border-dark-500"
                        />
                        <p>{manager.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>

                <CustomFormField 
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="venue"
                label="Venue"
                placeholder="Select a Venue">
                  {Managers.map((manager) => (
                    <SelectItem key={manager.name} value={manager.name}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                          src={manager.image}
                          width={32}
                          height={32}
                          alt={manager.name}
                          className="rounded-full border border-dark-500"
                        />
                        <p>{manager.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>


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
                        placeholder="Any More Details of the Event"
                    />
                    <CustomFormField 
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name="note"
                        label="Notes"
                        placeholder="Additional Requirements"
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
       
        <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}>{buttonLabel}</SubmitButton>
      </form>
    </Form>
  )
}


export default BookingForm