import Reveal from "./Reveal";

export default function FAQ() {
  return (
    <>
      <section className="container mx-auto px-6 py-16 md:py-24 max-w-4xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-dark-600">Everything you need to know about booking with GatherDeck.</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-[#1A1D21] border border-[#363A3D] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">How do I book an event manager or venue?</h3>
              <p className="text-dark-600">Simply sign up, browse our verified vendors across Kerala (Kochi, Trivandrum, etc.), and submit a booking request. The vendor will contact you directly to finalize details.</p>
            </div>
            
            <div className="bg-[#1A1D21] border border-[#363A3D] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Are the event vendors verified?</h3>
              <p className="text-dark-600">Yes! We thoroughly vet all event managers, caterers, and decorators to ensure high-quality service and reliability for your events.</p>
            </div>

            <div className="bg-[#1A1D21] border border-[#363A3D] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Do you charge a booking fee?</h3>
              <p className="text-dark-600">GatherDeck is completely free for users looking to find and book vendors. You only pay for the services you hire directly to the vendor.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I book an event manager or venue?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Simply sign up, browse our verified vendors across Kerala (Kochi, Trivandrum, etc.), and submit a booking request. The vendor will contact you directly to finalize details."
                }
              },
              {
                "@type": "Question",
                "name": "Are the event vendors verified?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! We thoroughly vet all event managers, caterers, and decorators to ensure high-quality service and reliability for your events."
                }
              },
              {
                "@type": "Question",
                "name": "Do you charge a booking fee?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "GatherDeck is completely free for users looking to find and book vendors. You only pay for the services you hire directly to the vendor."
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
