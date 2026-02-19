import Image from "next/image";
import RegistrationForm from "@/components/forms/RegistrationForm";
import ImageGrid from "@/components/imagegrid";

export const metadata = {
  title: "Start Booking – GatherDeck",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex h-screen max-h-screen">

      {/* LEFT */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">

          <Image
            src="/assets/icons/gatherdecklogo.svg"
            height={1000}
            width={1000}
            alt="GatherDeck logo"
            className="mb-8 h-10 w-fit"
          />

          {/* EXISTING LOGIN FORM – UNCHANGED */}
          <RegistrationForm />

          <p className="mt-20 text-dark-600">
            © 2025 GatherDeck
          </p>
        </div>
      </section>

      {/* RIGHT */}
      <ImageGrid
        className="hidden md:flex side-img max-w-[50%]"
        image1="/assets/images/p1.png"
        image2="/assets/images/p2.png"
        image3="/assets/images/p3.png"
      />
    </div>
  );
}
