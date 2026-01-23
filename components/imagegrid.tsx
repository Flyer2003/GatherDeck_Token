import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils"; // shadcn utility (safe class merge)

interface ImageGridProps {
  image1?: string | StaticImageData;
  image2?: string | StaticImageData;
  image3?: string | StaticImageData;
  className?: string;
}

export default function ImageGrid({
  image1,
  image2,
  image3,
  className,
}: ImageGridProps) {
  return (
    <div
      className={cn(
        "relative w-full h-screen overflow-hidden flex items-center justify-center",
        className
      )}
    >
      {/* Grid Container */}
      <div
        className="relative"
        style={{
          width: "694px",
          height: "1050px",
          transform: "scale(0.85)",
          transformOrigin: "center",
        }}
      >
        {/* Column 1 - Left */}
        <div className="absolute bg-[#18181c] h-[239.486px] left-0 rounded-[20px] top-[116.18px] w-[210.952px]" />
        <div className="absolute h-[239.486px] left-0 rounded-[20px] top-[386.23px] w-[210.952px] overflow-hidden">
          {image1 && (
            <Image
              alt="Grid image 1"
              className="object-cover rounded-[20px]"
              src={image1}
              fill
              sizes="211px"
            />
          )}
        </div>
        <div className="absolute bg-[#18181c] h-[239.486px] left-0 rounded-[20px] top-[656.29px] w-[210.952px]" />
        <div className="absolute bg-[#18181c] h-[239.486px] left-0 rounded-[20px] top-[926.35px] w-[210.952px]" />

        {/* Column 2 - Middle */}
        <div className="absolute bg-[#18181c] h-[239.486px] left-[241.52px] rounded-[20px] top-0 w-[210.952px]" />
        <div className="absolute bg-[#18181c] h-[239.486px] left-[241.52px] rounded-[20px] top-[270.06px] w-[210.952px]" />
        <div className="absolute h-[239.486px] left-[241.52px] rounded-[20px] top-[540.12px] w-[210.952px] overflow-hidden">
          {image3 && (
            <Image
              alt="Grid image 3"
              className="object-cover rounded-[20px]"
              src={image3}
              fill
              sizes="211px"
            />
          )}
        </div>
        <div className="absolute bg-[#18181c] h-[239.486px] left-[241.52px] rounded-[20px] top-[810.18px] w-[210.952px]" />

        {/* Column 3 - Right */}
        <div className="absolute bg-[#18181c] h-[239.486px] left-[483.05px] rounded-[20px] top-[116.18px] w-[210.952px]" />
        <div className="absolute h-[239.486px] left-[483.05px] rounded-[20px] top-[386.23px] w-[210.952px] overflow-hidden">
          {image2 && (
            <Image
              alt="Grid image 2"
              className="object-cover rounded-[20px]"
              src={image2}
              fill
              sizes="211px"
            />
          )}
        </div>
        <div className="absolute bg-[#18181c] h-[239.486px] left-[483.05px] rounded-[20px] top-[656.29px] w-[210.952px]" />
        <div className="absolute bg-[#18181c] h-[239.486px] left-[483.05px] rounded-[20px] top-[926.35px] w-[210.952px]" />
      </div>
    </div>
  );
}
