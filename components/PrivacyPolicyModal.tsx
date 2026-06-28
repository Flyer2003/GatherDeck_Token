"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function PrivacyPolicyModal({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-dark-200 border-dark-400 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4 border-b border-dark-400 pb-4">Privacy Policy</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 text-sm text-dark-600">
          <p className="text-gray-400">
            <strong>Last Updated:</strong> May 17, 2026
          </p>

          <p>
            Welcome to <strong>gatherdeck</strong> (“gatherdeck”, “we”, “our”, or “us”).
            We are committed to protecting your privacy and handling your personal
            information responsibly.
          </p>

          <p>
            This Privacy Policy explains how gatherdeck collects, uses, stores,
            shares, and protects your information when you use our website,
            applications, and related services (“Services”).
          </p>

          <p>
            By accessing or using gatherdeck, you agree to this Privacy Policy.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">1. Who We Are</h2>

          <p>
            gatherdeck is an online platform that helps users discover, compare,
            communicate with, and book event-related services including:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Event planners</li>
            <li>Caterers</li>
            <li>Decorators</li>
            <li>Photographers</li>
            <li>Makeup artists</li>
            <li>Venues and auditoriums</li>
            <li>Entertainment providers</li>
            <li>Other event vendors</li>
          </ul>

          <p>
            gatherdeck acts as a technology platform connecting users and independent vendors.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">2. Information We Collect</h2>

          <h3 className="text-lg font-bold mt-6 mb-2 text-gray-300">a. Personal Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Full name</li>
            <li>Email address</li>
            <li>Mobile number</li>
            <li>Profile photo</li>
            <li>Location details</li>
            <li>Account credentials</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2 text-gray-300">b. Event Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Event type</li>
            <li>Event date</li>
            <li>Budget</li>
            <li>Guest count</li>
            <li>Venue preferences</li>
            <li>Service preferences</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2 text-gray-300">c. Vendor Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Business name</li>
            <li>Service category</li>
            <li>Business address</li>
            <li>Portfolio images</li>
            <li>Pricing information</li>
            <li>Social media links</li>
          </ul>

          <h3 className="text-lg font-bold mt-6 mb-2 text-gray-300">d. Technical Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>Cookies and analytics data</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">3. How We Collect Information</h2>
          <p>We collect information when users:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create an account</li>
            <li>Submit booking or inquiry forms</li>
            <li>Search for vendors or services</li>
            <li>Communicate with vendors</li>
            <li>Upload images or content</li>
            <li>Contact customer support</li>
            <li>Browse or use the platform</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">4. How We Use Your Information</h2>
          <p>We use your information for purposes including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Managing user accounts</li>
            <li>Connecting users with vendors</li>
            <li>Facilitating bookings and inquiries</li>
            <li>Improving platform functionality</li>
            <li>Sending updates and notifications</li>
            <li>Providing customer support</li>
            <li>Preventing fraud and misuse</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">5. Sharing of Information</h2>
          <p>We do not sell personal information.</p>
          <p>Information may be shared with:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vendors and service providers selected by users</li>
            <li>Cloud hosting and infrastructure providers</li>
            <li>Authentication and analytics services</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">6. User Chats and Communication</h2>
          <p>
            gatherdeck may store communications exchanged through the platform,
            including chats and inquiry messages, for customer support,
            dispute resolution, moderation, and service functionality.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">7. Cookies and Tracking Technologies</h2>
          <p>gatherdeck uses cookies and similar technologies to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Maintain login sessions</li>
            <li>Remember user preferences</li>
            <li>Improving platform functionality</li>
            <li>Analyze website traffic and usage</li>
            <li>Enhance security</li>
          </ul>
          <p>
            Users can disable cookies through browser settings, though some
            features may not function properly.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">8. Data Storage and Security</h2>
          <p>
            We implement reasonable technical and organizational safeguards
            to protect personal information against unauthorized access,
            misuse, alteration, disclosure, or destruction.
          </p>
          <p>
            However, no method of transmission or storage is completely secure,
            and we cannot guarantee absolute security.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">9. Data Retention</h2>
          <p>
            We retain information only for as long as necessary to provide services,
            resolve disputes, enforce agreements, and comply with legal obligations.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">10. Your Rights</h2>
          <p>Depending on applicable laws, users may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access their personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of data</li>
            <li>Withdraw consent</li>
            <li>Request a copy of stored information</li>
          </ul>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">11. Vendor Responsibility</h2>
          <p>
            Vendors listed on gatherdeck are independent third parties.
            gatherdeck is not responsible for vendor conduct, pricing,
            service quality, availability, or agreements made outside the platform.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">12. Third-Party Links</h2>
          <p>
            gatherdeck may contain links to third-party websites or services.
            We are not responsible for their content, privacy practices,
            or security policies.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">13. Children's Privacy</h2>
          <p>
            gatherdeck is not intended for individuals under 18 years of age.
            We do not knowingly collect information from children.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">14. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time.
            Updated versions will be posted on this page with a revised
            “Last Updated” date.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">15. Contact Us</h2>
          <p>For questions or privacy-related requests, contact:</p>
          <p>
            <strong>gatherdeck Support</strong><br />
            Email: <a href="mailto:support@gatherdeck.in" className="text-green-500 hover:underline">support@gatherdeck.in</a>
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4 text-white">16. Consent</h2>
          <p>
            By using gatherdeck, creating an account, or submitting information
            through the platform, you consent to the collection and use of
            information described in this Privacy Policy.
          </p>

        </div>
      </DialogContent>
    </Dialog>
  )
}
