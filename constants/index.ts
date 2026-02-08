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
// constants/index.ts

export const Managers = [
  {
    image: "",
    name: "No",
    value: "none",
  },
  {
    image: "/assets/icons/check.svg", // optional
    name: "Yes",
    value: "yes",
  },
];


export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};