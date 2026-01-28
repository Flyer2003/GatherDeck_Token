export const GenderOptions = ["Male", "Female", "Other"];

export const EventFormDefaultValues = {
  firstName: "",
  lastName: "",
  name: "",
  email: "",
  phone: "",
  birthDate: new Date(),
  gender: "Male" as Gender,
  address: "",
  nationality: "",
  eventType: "",
  requirements: "",
  eventCordinator: "",
  preferences: "",
  avoidances: "",
  eventSources: "",
  eventImages: [],
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

// constants/index.ts
export const Managers = [
  {
    image: "",
    name: "None",
    value: "none",
  },
  {
    image: "/assets/images/catering1.png",
    name: "Catering 1",
    value: "catering_1",
  },
  {
    image: "/assets/images/catering2.png",
    name: "Catering 2",
    value: "catering_2",
  },
  {
    image: "/assets/images/catering3.png",
    name: "Catering 3",
    value: "catering_3",
  },
  {
    image: "/assets/images/event.png",
    name: "Event Manager 1",
    value: "event_manager_1",
  },
  {
    image: "/assets/images/event2.png",
    name: "Event Manager 2",
    value: "event_manager_2",
  },
  {
    image: "/assets/images/event3.png",
    name: "Event Manager 3",
    value: "event_manager_3",
  },
  {
    image: "/assets/images/auditorium1.png",
    name: "Venues 1",
    value: "venue_1",
  },
  {
    image: "/assets/images/auditorium2.png",
    name: "Venues 2",
    value: "venue_2",
  },
  {
    image: "/assets/images/auditorium3.png",
    name: "Venues 3",
    value: "venue_3",
  },
];


export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};