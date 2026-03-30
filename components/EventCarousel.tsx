"use client";

import Image from "next/image";
import { useState, useRef } from "react";

const events = [
  {
    image: "/assets/events/event1.jpg",
    vendor: "Elite Weddings",
    title: "Luxury Beach Wedding",
  },
  {
    image: "/assets/events/event2.jpg",
    vendor: "Grand Caterers",
    title: "Corporate Gala Dinner",
  },
  {
    image: "/assets/events/event3.jpg",
    vendor: "Royal Venues",
    title: "Engagement Celebration",
  },
  {
    image: "/assets/events/event4.jpg",
    vendor: "Dream Events",
    title: "Luxury Reception",
  },
  {
    image: "/assets/events/event5.jpg",
    vendor: "Platinum Planners",
    title: "Destination Wedding",
  },
];

export default function EventCarousel() {
  const [index, setIndex] = useState(0);
  const visibleCards = 3;

  const startX = useRef<number | null>(null);

  const next = () => {
    if (index < events.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  /* ---------- MOBILE SWIPE ---------- */

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!startX.current) return;

    const diff = startX.current - e.changedTouches[0].clientX;

    if (diff > 50) next();
    if (diff < -50) prev();

    startX.current = null;
  };

  return (
    <div className="relative">

      {/* LEFT ARROW */}
      {index > 0 && (
        <button
          onClick={prev}
          className="absolute -left-6 top-1/2 -translate-y-1/2 bg-dark-300 p-3 rounded-full hover:bg-dark-400 transition"
        >
          ←
        </button>
      )}

      {/* CAROUSEL */}
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex gap-6 transition-transform duration-500"
          style={{ transform: `translateX(-${index * (100 / visibleCards)}%)` }}
        >
          {events.map((event, i) => (
            <div
              key={i}
              className="relative min-w-[33.333%] rounded-xl overflow-hidden group"
            >
              {/* IMAGE */}
              <Image
                src={event.image}
                alt={event.title}
                width={500}
                height={350}
                loading="lazy"
                className="w-full h-[22rem] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* GLASS OVERLAY */}
              <div className="absolute bottom-0 left-0 w-full p-5 backdrop-blur-md bg-black/60 border-t border-white/10 group-hover:bg-black/40 transition-colors duration-500">
                <h3 className="text-base font-bold text-white tracking-wide">{event.title}</h3>
                <p className="text-sm text-green-400 mt-1 font-medium">{event.vendor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      {index < events.length - visibleCards && (
        <button
          onClick={next}
          className="absolute -right-6 top-1/2 -translate-y-1/2 bg-dark-300 p-3 rounded-full hover:bg-dark-400 transition"
        >
          →
        </button>
      )}

    </div>
  );
}