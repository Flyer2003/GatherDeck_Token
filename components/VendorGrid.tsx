"use client";

import Image from "next/image";
import { Star } from "lucide-react";

const vendors = [
  {
    name: "Royal Wedding Planners",
    category: "Wedding Planner",
    rating: 4.9,
    location: "Mumbai",
    price: "₹50,000",
    image: "/assets/vendors/vendor1.jpg",
  },
  {
    name: "Grand Palace Venue",
    category: "Event Venue",
    rating: 4.8,
    location: "Delhi",
    price: "₹1,20,000",
    image: "/assets/vendors/vendor2.jpg",
  },
  {
    name: "Taste Catering Co.",
    category: "Catering",
    rating: 4.7,
    location: "Bangalore",
    price: "₹1,200 / plate",
    image: "/assets/vendors/vendor3.jpg",
  },
  {
    name: "Elegant Events",
    category: "Event Manager",
    rating: 4.9,
    location: "Hyderabad",
    price: "₹40,000",
    image: "/assets/vendors/vendor4.jpg",
  },
  {
    name: "Luxury Banquets",
    category: "Venue",
    rating: 4.8,
    location: "Chennai",
    price: "₹90,000",
    image: "/assets/vendors/vendor5.jpg",
  },
  {
    name: "Delight Catering",
    category: "Catering",
    rating: 4.6,
    location: "Kochi",
    price: "₹900 / plate",
    image: "/assets/vendors/vendor6.jpg",
  },
];

export default function VendorGrid() {
  return (
    <section className="container mx-auto px-6 py-24">

      <h2 className="text-3xl font-bold text-center mb-16">
        Popular Event Vendors
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {vendors.map((vendor, i) => (
          <div
            key={i}
            className="bg-dark-300 rounded-xl overflow-hidden hover:scale-[1.02] transition"
          >

            {/* IMAGE */}
            <div className="relative h-56">
              <Image
                src={vendor.image}
                alt={vendor.name}
                fill
                className="object-cover"
                loading="lazy"
              />

              {/* CATEGORY BADGE */}
              <span className="absolute top-3 left-3 bg-black/70 px-3 py-1 text-xs rounded">
                {vendor.category}
              </span>
            </div>

            {/* DETAILS */}
            <div className="p-5">

              <h3 className="font-semibold text-lg">
                {vendor.name}
              </h3>

              <div className="flex items-center gap-1 mt-2 text-sm">

                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span>{vendor.rating}</span>

                <span className="text-dark-600 ml-2">
                  • {vendor.location}
                </span>

              </div>

              <p className="mt-3 font-semibold text-green-400">
                {vendor.price}
              </p>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}