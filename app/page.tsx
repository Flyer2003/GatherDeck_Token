import Image from "next/image";
import RegistrationForm from "@/components/forms/RegistrationForm";
import ImageGrid from "@/components/imagegrid";
import Link from "next/link";
import PasskeyModel from "@/components/PasskeyModel";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModel />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] ">
          
          <Image
            src="/assets/icons/gatherdecklogo.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="-mt-4 mb-8 h-10 w-fit"
          />

          <RegistrationForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2025 GatherDeck
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>

        </div>
      </section>

      {/* RIGHT — Fixed */}
      <ImageGrid
        className="hidden md:flex side-img max-w-[50%]"
        image1="/assets/images/p1.png"
        image2="/assets/images/p2.png"
        image3="/assets/images/p3.png"
      />

    </div>
  );
}
