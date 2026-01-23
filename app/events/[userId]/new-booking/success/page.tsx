import { Button } from '@/components/ui/button';
import { Managers } from '@/constants';
import { getBooking } from '@/lib/actions/booking.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import * as Sentry from "@sentry/nextjs";
import { getUser } from '@/lib/actions/event.actions';

const Success = async ({ params: { userId }, searchParams}: SearchParamProps) => {
    const bookingId = (searchParams?.bookingId as string) || '';
    const booking = await getBooking(bookingId);

    const manager = Managers.find((doc) => doc.name === booking?.eventManager);
    const user = await getUser(userId);

    Sentry.metrics.count('user_view_booking-success', user.name);
    

  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
        <div className='success-img'>
            <Link href='/'>
                <Image 
                    src="/assets/icons/GatherDeck.svg"
                    height={1000}
                    width={1000}
                    alt="logo"
                    className='h-12 w-fit'
                />
            </Link>

            <section className='flex flex-col items-center'>
                <Image 
                    src="/assets/gifs/success.gif"
                    height={300}
                    width={280}
                    alt="success"
                    unoptimized
                />
                <h2 className='header mb-6 max-w-[640px] text-center'>
                Your <span className='text-green-500'>booking request</span> has been successfully submitted!
                </h2>
                <p>We will contact you shortly.</p>
            </section>
            
            <section className='request-details'>
                <p>Requested Booking Details:</p>
                <div className='flex items-center gap-3'>
                <Image
                    src={manager?.image ?? "/assets/icons/user.svg"}
                    width={100}
                    height={100}
                    alt={manager?.name ?? "manager"}
                    className="size-6 rounded-full"
                />


                    <p className='whitespace-nowrap'>{manager?.name}</p>
                </div>
                <div className='flex gap-2'>
                <Image 
                        src="/assets/icons/calendar.svg"
                        width={24}
                        height={24}
                        alt="calendar"
                    />
                    <p>{formatDateTime(booking.schedule).dateTime}</p>
                </div>
            </section>

            <Button variant="outline" className='shad-primary-btn' asChild>
                <Link href={`/events/${userId}/new-booking`}>
                    New Bookings
                </Link>
            </Button>

            <p className='copyright'>© 2025 GatherDeck</p>
        </div>
    </div>
  )
}

export default Success