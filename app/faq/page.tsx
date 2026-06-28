"use client";

import Navbar from "@/components/Navbar";
import { useMemo, useState } from "react";
import Script from "next/script";
import {
    ChevronDown,
    Search,
    HelpCircle,
    Send,
    Loader2,
    CheckCircle2
} from "lucide-react";

type FAQ = {
    category: string;
    question: string;
    answer: string;
};

const faqs: FAQ[] = [
    // Booking
    {
        category: "Booking",
        question: "How does gatherdeck work?",
        answer: "gatherdeck helps you discover and connect with trusted event vendors including venues, caterers, photographers, decorators, production teams, and event managers. Simply submit your requirements and vendors will connect with you.",
    },
    {
        category: "Booking",
        question: "Is gatherdeck free to use?",
        answer: "Yes. Browsing vendors and submitting booking requests is completely free for customers. You only pay for the services you decide to hire.",
    },
    {
        category: "Booking",
        question: "Can I book multiple services together?",
        answer: "Absolutely. You can request venues, catering, decoration, photography, and event management all within a single smooth booking flow.",
    },
    {
        category: "Booking",
        question: "How early should I book my event?",
        answer: "For large events like weddings, we recommend booking 3 to 6 months in advance. For smaller setups, a few weeks is typically sufficient, but subject to vendor availability.",
    },

    // Vendors
    {
        category: "Vendors",
        question: "Are the vendors verified?",
        answer: "Yes. Every vendor undergoes a strict manual review process before their profile is listed. We verify their portfolios, track record, and business details to maintain quality and reliability.",
    },
    {
        category: "Vendors",
        question: "Can I compare multiple vendors?",
        answer: "Yes. Our platform allows you to review services, read customer feedback, check pricing packages, and assess availability before deciding to proceed with a booking.",
    },
    {
        category: "Vendors",
        question: "Can I contact the vendor before booking?",
        answer: "Once you submit a request, the chosen vendors will contact you directly. You'll be able to discuss details, negotiate, and finalize everything seamlessly.",
    },

    // Events
    {
        category: "Events",
        question: "What types of events do you support?",
        answer: "We support a wide range of functions including weddings, engagements, birthdays, corporate gatherings, college fests, destination weddings, and private celebrations.",
    },
    {
        category: "Events",
        question: "Do you offer full event planning services?",
        answer: "While gatherdeck primarily connects you to individual vendors, we also host highly-rated Event Management tracking companies who can handle your entire event end-to-end.",
    },
    {
        category: "Events",
        question: "Can you help me find a venue for a corporate event?",
        answer: "Yes, we have an extensive list of conference halls, auditoriums, and business centers equipped with A/V facilities tailored for corporate requirements.",
    },

    // Payments
    {
        category: "Payments",
        question: "Does gatherdeck collect payments?",
        answer: "No. Payment terms, advances, and final settlements are handled directly between you and the vendor. gatherdeck is purely a discovery and connection platform.",
    },
    {
        category: "Payments",
        question: "Are there any hidden charges?",
        answer: "gatherdeck takes no commission from customers out-of-pocket. The pricing quoted by the vendor is what you pay them directly.",
    },
    {
        category: "Payments",
        question: "What is the standard cancellation policy?",
        answer: "Cancellation policies vary fundamentally depending on the individual vendor's contract. We recommend discussing this thoroughly before paying any advances.",
    },

    // General
    {
        category: "General",
        question: "How do I create an account?",
        answer: "Click the 'Login' or 'Start Booking' button on the top right of the navigation bar. You can sign up rapidly using your Google account or a standard email/password.",
    },
    {
        category: "General",
        question: "Is my personal data safe?",
        answer: "Yes. We use enterprise-grade encryption to protect your data. Your contact details are only shared securely with the specific vendors you requested to connect with.",
    },
];

const categories = [
    "All",
    "Booking",
    "Vendors",
    "Events",
    "Payments",
    "General",
];

export default function FAQPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [open, setOpen] = useState<string | null>(faqs[0]?.question ?? null);

    // Form states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormError(null);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name");
        const email = formData.get("email");
        const question = formData.get("question");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, question }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to send message");
            }

            setIsSuccess(true);
        } catch (err: any) {
            setFormError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredFaqs = useMemo(() => {
        return faqs.filter((faq) => {
            const matchesSearch =
                faq.question.toLowerCase().includes(search.toLowerCase()) ||
                faq.answer.toLowerCase().includes(search.toLowerCase());

            const matchesCategory =
                selectedCategory === "All" || faq.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [search, selectedCategory]);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#0F1113] selection:bg-green-500/30">
                <section className="container mx-auto max-w-6xl px-6 py-20 lg:py-32">

                    {/* Hero */}
                    <div className="text-center mb-14 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-64 bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-500 font-medium tracking-wide">
                                <HelpCircle className="h-4 w-4" />
                                Support Center
                            </div>

                            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                                Frequently Asked Questions
                            </h1>

                            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                                Find answers about bookings, vendors, events, payments and
                                everything related to planning your perfect event with gatherdeck.
                            </p>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative mx-auto mb-10 max-w-2xl">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search for a question..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setOpen(null); // Reset open accordion on search
                            }}
                            className="h-14 w-full rounded-2xl border border-[#2A2D31] bg-[#171A1D] pl-12 pr-4 text-white placeholder-gray-500 outline-none transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500 shadow-sm"
                        />
                    </div>

                    {/* Categories */}
                    <div className="mb-12 flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setOpen(null); // Reset open accordion on category change
                                }}
                                className={`rounded-full px-5 py-2.5 text-sm transition-all duration-200 ${selectedCategory === category
                                    ? "bg-green-500 text-black font-semibold shadow-[0_0_15px_rgba(34,197,94,0.2)]"
                                    : "border border-[#2A2D31] bg-[#171A1D] text-gray-400 hover:text-white hover:border-gray-500"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* FAQ Accordion */}
                    <div className="mx-auto max-w-3xl space-y-4">
                        {filteredFaqs.length === 0 ? (
                            <div className="rounded-2xl border border-[#2A2D31] bg-[#171A1D] p-12 text-center text-gray-400 shadow-sm">
                                <Search className="h-8 w-8 mx-auto mb-4 text-gray-600 opacity-50" />
                                No matching questions found.
                            </div>
                        ) : (
                            filteredFaqs.map((faq) => {
                                const isOpen = open === faq.question;
                                return (
                                    <div
                                        key={faq.question}
                                        className={`overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen ? "border-green-500/30 bg-[#1A1D21]" : "border-[#2A2D31] bg-[#171A1D] hover:border-gray-600"
                                            }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpen(isOpen ? null : faq.question)}
                                            className="flex w-full items-center justify-between p-5 md:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                                        >
                                            <div className="pr-6">
                                                <div className="mb-2 text-xs uppercase tracking-wider text-green-500 font-semibold">
                                                    {faq.category}
                                                </div>
                                                <h3 className={`font-semibold md:text-lg transition-colors ${isOpen ? "text-white" : "text-gray-200"}`}>
                                                    {faq.question}
                                                </h3>
                                            </div>

                                            <div className={`flex items-center justify-center h-8 w-8 rounded-full border transition-all shrink-0 ${isOpen ? "border-green-500/30 bg-green-500/10" : "border-[#2A2D31] bg-[#1A1D21]"}`}>
                                                <ChevronDown
                                                    className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "text-green-500 rotate-180" : "text-gray-400"}`}
                                                />
                                            </div>
                                        </button>

                                        <div
                                            className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                }`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="border-t border-[#2A2D31] px-5 md:px-6 py-4 md:py-5 text-gray-400 leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Ask Question */}
                    <section className="mx-auto mt-24 max-w-3xl relative">
                        <div className="absolute inset-0 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
                        <div className="relative rounded-3xl border border-[#2A2D31] bg-[#171A1D]/80 backdrop-blur-sm p-8 md:p-12 shadow-xl">
                            <div className="text-center md:text-left md:flex justify-between items-end mb-8">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                                        Didn't find your answer?
                                    </h2>
                                    <p className="mt-3 text-gray-400">
                                        Send your question directly to our team and we'll get back to you.
                                    </p>
                                </div>
                            </div>

                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="mx-auto w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-gray-400">
                                        We've received your question and will get back to you at your provided email address.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="mt-8 text-green-500 hover:text-green-400 font-medium transition-colors"
                                    >
                                        Ask another question
                                    </button>
                                </div>
                            ) : (
                                <form
                                    className="space-y-5"
                                    onSubmit={handleFormSubmit}
                                >
                                    {formError && (
                                        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                            {formError}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <input
                                            name="name"
                                            required
                                            disabled={isSubmitting}
                                            placeholder="Your Name"
                                            className="w-full rounded-xl border border-[#2A2D31] bg-[#0F1113] px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            disabled={isSubmitting}
                                            placeholder="Email Address"
                                            className="w-full rounded-xl border border-[#2A2D31] bg-[#0F1113] px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500 disabled:opacity-50"
                                        />
                                    </div>

                                    <textarea
                                        name="question"
                                        required
                                        rows={5}
                                        disabled={isSubmitting}
                                        placeholder="Ask your question..."
                                        className="w-full rounded-xl border border-[#2A2D31] bg-[#0F1113] px-4 py-3.5 text-white placeholder-gray-500 outline-none transition-all focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none disabled:opacity-50"
                                    />

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-3.5 font-bold text-black transition-all hover:bg-green-400 disabled:hover:scale-100 hover:scale-[1.02] shadow-[0_0_15px_rgba(34,197,94,0.2)] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-[#171A1D] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                        {isSubmitting ? "Sending..." : "Send Question"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>
                </section>
            </main>

            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        mainEntity: faqs.map((faq) => ({
                            "@type": "Question",
                            name: faq.question,
                            acceptedAnswer: {
                                "@type": "Answer",
                                text: faq.answer,
                            },
                        })),
                    }),
                }}
            />
        </>
    );
}
