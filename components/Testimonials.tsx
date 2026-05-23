"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Archana",
    text: "GatherDeck helped us organize our wedding effortlessly.",
    rating: 5,
  },
  {
    name: "Gokul",
    text: "Amazing vendors and smooth booking process.",
    rating: 5,
  },
  {
    name: "Arun Kumar",
    text: "Perfect platform for corporate event planning.",
    rating: 5,
  },
  {
    name: "Adithyan",
    text: "Found a great venue and catering service within minutes.",
    rating: 4,
  },
  {
    name: "Sneha",
    text: "Highly recommended for anyone planning an event.",
    rating: 5,
  },
  {
    name: "Athul",
    text: "The booking experience was simple and fast.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (hovered) return;

    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [hovered]);

  const prevIndex =
    (index - 1 + testimonials.length) % testimonials.length;
  const nextIndex =
    (index + 1) % testimonials.length;

  return (
    <section
      className="py-16 md:py-28 container mx-auto px-4 md:px-6 relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-20">
        Loved by Event Planners
      </h2>

      <div className="relative flex items-center justify-center w-full max-w-6xl mx-auto py-8">

        {/* Gradient spotlight */}
        <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-0 md:left-4 z-30 bg-dark-300 border border-dark-400 p-3 rounded-full hover:bg-dark-400 transition shadow-lg"
        >
          ←
        </button>

        <div className="flex items-center justify-center gap-4 md:gap-8 z-10 w-full px-12 md:px-20 lg:px-24">

          {/* LEFT CARD */}
          <div className="hidden lg:block flex-1 max-w-[320px]">
            <TestimonialCard
              testimonial={testimonials[prevIndex]}
              size="small"
            />
          </div>

          {/* CENTER CARD */}
          <div className="z-20 w-full max-w-[380px]">
            <TestimonialCard
              testimonial={testimonials[index]}
              size="large"
            />
          </div>

          {/* RIGHT CARD */}
          <div className="hidden lg:block flex-1 max-w-[320px]">
            <TestimonialCard
              testimonial={testimonials[nextIndex]}
              size="small"
            />
          </div>

        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-0 md:right-4 z-30 bg-dark-300 border border-dark-400 p-3 rounded-full hover:bg-dark-400 transition shadow-lg"
        >
          →
        </button>

      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  size,
}: {
  testimonial: any;
  size: "large" | "small";
}) {
  return (
    <div
      className={`
      transition-all duration-500 ease-out flex flex-col justify-center w-full
      bg-[#1A1D21] border border-[#363A3D] rounded-3xl
      ${size === "large"
          ? "scale-100 lg:scale-[1.05] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] border-green-500/30 z-20"
          : "scale-95 p-6 md:p-8 opacity-50 z-10"}
      `}
    >
      <Quote className="text-green-400 mb-4" size={28} />

      <p className="text-dark-600 leading-relaxed">
        “{testimonial.text}”
      </p>

      <div className="flex gap-1 mt-5">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className="text-yellow-400 fill-yellow-400"
          />
        ))}
      </div>

      <p className="mt-4 font-semibold text-white">
        {testimonial.name}
      </p>
    </div>
  );
}