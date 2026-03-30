"use client";

import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Anita Sharma",
    text: "GatherDeck helped us organize our wedding effortlessly.",
    rating: 5,
  },
  {
    name: "Rahul Nair",
    text: "Amazing vendors and smooth booking process.",
    rating: 5,
  },
  {
    name: "Priya Kapoor",
    text: "Perfect platform for corporate event planning.",
    rating: 5,
  },
  {
    name: "Vikram Patel",
    text: "Found a great venue and catering service within minutes.",
    rating: 4,
  },
  {
    name: "Sneha Iyer",
    text: "Highly recommended for anyone planning an event.",
    rating: 5,
  },
  {
    name: "Aditya Verma",
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
      className="py-28 container mx-auto px-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      <h2 className="text-3xl font-bold text-center mb-20">
        Loved by Event Planners
      </h2>

      <div className="relative flex items-center justify-center">

        {/* Gradient spotlight */}
        <div className="absolute w-[420px] h-[420px] bg-green-500/20 blur-[120px] rounded-full"></div>

        {/* Left Arrow */}
        <button
          onClick={prev}
          className="absolute left-0 z-10 bg-dark-300 border border-dark-400 p-3 rounded-full hover:bg-dark-400 transition"
        >
          ←
        </button>

        <div className="flex items-center gap-8 z-10">

          {/* LEFT CARD */}
          <TestimonialCard
            testimonial={testimonials[prevIndex]}
            size="small"
          />

          {/* CENTER CARD */}
          <TestimonialCard
            testimonial={testimonials[index]}
            size="large"
          />

          {/* RIGHT CARD */}
          <TestimonialCard
            testimonial={testimonials[nextIndex]}
            size="small"
          />

        </div>

        {/* Right Arrow */}
        <button
          onClick={next}
          className="absolute right-0 z-10 bg-dark-300 border border-dark-400 p-3 rounded-full hover:bg-dark-400 transition"
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
      transition-all duration-500 ease-out
      bg-[#1A1D21] border border-[#363A3D] rounded-3xl
      ${size === "large"
        ? "scale-110 w-[380px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-green-500/20 z-20"
        : "scale-90 w-[300px] p-8 opacity-60 z-10"}
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