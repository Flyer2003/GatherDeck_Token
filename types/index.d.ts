/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Male" | "Female" | "Other";
  declare type Status = "pending" | "scheduled" | "cancelled";
  
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }
  declare interface User extends CreateUserParams {
    $id: string;
  }
  
  declare interface RegisterUserParams extends CreateUserParams {
    userId: string;
    birthDate: Date;
    gender: Gender;
    address: string;
    nationality: string;
    eventType: string;
    requirements: string;
    eventCordinator: string;
    preferences: string | undefined;
    avoidances: string | undefined;
    eventSources: string | undefined;
    eventImages: FormData | undefined;
    privacyConsent: boolean;
  }
  
  declare type CreateBookingParams = {
    userId: string | undefined;
    event: string;
    eventManager: any;
    catering: any;
    venue: any;
    description: string;
    schedule: Date;
    status: Status;
    note: string | undefined;
  };
  
  declare type UpdateBookingParams = {
    bookingId: string;
    userId: string;
    booking: Booking;
    type: string;
  };