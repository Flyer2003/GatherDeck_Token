'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import BookingForm from './forms/BookingForm'
import { Booking } from '@/types/appwrite.types'

const BookingModel = ({ 
    type,
    eventId,
    userId,
    booking
    }: {
    type: 'schedule' | 'cancel'
    eventId: string
    userId: string
    booking?: Booking
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="ghost" className={`capitalize ${type === 'schedule' && 'text-green-500' }`}>
                {type} 
            </Button>
        </DialogTrigger>
        <DialogContent className='shad-dialog sm:max-w-md'>
            <DialogHeader className='mb-4 space-y-3'>
            <DialogTitle className='capitalize'>{type} booking</DialogTitle>
            <DialogDescription>
                Please fill the following details to {type} an booking.
            </DialogDescription>
            </DialogHeader>

            <BookingForm 
                userId={userId}
                eventId={eventId}
                type={type}
                booking={booking}
                setOpen={setOpen}
            />
        </DialogContent>
    </Dialog>
  )
}

export default BookingModel