import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ApplicationForm from '@/components/forms/ApplicationForm'
import { getUser } from '@/lib/actions/event.actions'
import * as Sentry from "@sentry/nextjs";

const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId);

    Sentry.metrics.count('user_view_registration', user.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
          
          <Image
            src="/assets/icons/GatherDeck.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <ApplicationForm user={user}/> 
            <p className="copyright py-12">
              © 2025 GatherDeck
            </p>

        </div>
      </section>

      <Image 
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="register image"
        className='side-img max-w-[390px]'
      />
    </div>
  )
}

export default Register