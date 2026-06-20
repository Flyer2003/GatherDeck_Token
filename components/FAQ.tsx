"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

const faqPreview = [
  {
    question: "How does GatherDeck work?",
    answer:
      "Submit your event requirements and connect with trusted vendors for venues, catering, photography, decoration, and event management.",
  },
  {
    question: "Is GatherDeck free to use?",
    answer:
      "Yes. Customers can browse and submit event requirements completely free.",
  },
  {
    question: "Can I book multiple services together?",
    answer:
      "Yes. You can book multiple event services through a single request.",
  },
  {
    question: "Are vendors verified?",
    answer:
      "We review vendor profiles before they are listed on GatherDeck.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="container mx-auto max-w-4xl px-6 py-20">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">
          Frequently Asked Questions
        </h2>

        <p className="mt-3 text-dark-600">
          Quick answers to common questions.
        </p>
      </div>

      <div className="space-y-3">
        {faqPreview.map((faq, index) => (
          <div
            key={index}
            className="rounded-xl border border-[#2A2D31] bg-[#171A1D]"
          >
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <span className="font-medium">{faq.question}</span>

              <ChevronDown
                className={`h-4 w-4 transition-transform ${open === index ? "rotate-180" : ""
                  }`}
              />
            </button>

            {open === index && (
              <div className="px-5 pb-5 text-dark-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 font-medium text-primary transition-opacity hover:opacity-80"
        >
          View All FAQs
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}