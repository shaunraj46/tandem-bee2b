export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm p-12">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Bee2B ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="mb-4">
                Bee2B provides a web-based platform for event organizers to facilitate structured networking sessions through AI-powered group matching. The Service includes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Event creation and management tools</li>
                <li>Participant registration and profiling</li>
                <li>AI-powered matching algorithms</li>
                <li>Real-time group coordination</li>
                <li>Post-event analytics and connection management</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="mb-4">As a user of Bee2B, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and truthful information</li>
                <li>Maintain the confidentiality of event codes</li>
                <li>Use the Service only for lawful purposes</li>
                <li>Not attempt to disrupt or interfere with the Service</li>
                <li>Respect other participants' privacy and data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Privacy</h2>
              <p className="mb-4">
                We take your privacy seriously. By using Bee2B:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Event and participant data is stored securely on EU servers</li>
                <li>Data is automatically deleted 30 days after event completion</li>
                <li>Users can request data export or deletion at any time</li>
                <li>We comply with GDPR and applicable data protection laws</li>
                <li>Data is not shared with third parties without consent</li>
              </ul>
              <p className="mt-4">
                For detailed information, please see our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <p>
                All content, features, and functionality of Bee2B, including but not limited to software, text, displays, images, and the design, are owned by menter Digital GmbH and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Service Availability</h2>
              <p className="mb-4">
                While we strive to provide uninterrupted service:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The Service is provided "as is" without warranties</li>
                <li>We do not guarantee 100% uptime</li>
                <li>Scheduled maintenance will be communicated in advance</li>
                <li>We reserve the right to modify or discontinue features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p>
                menter Digital GmbH shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service. This includes, but is not limited to, lost profits, data loss, or business interruption.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Event Organizer Responsibilities</h2>
              <p className="mb-4">
                Event organizers using Bee2B agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Obtain necessary consents from participants</li>
                <li>Comply with local data protection regulations</li>
                <li>Not use the Service for discriminatory purposes</li>
                <li>Provide accurate event information</li>
                <li>Handle participant data responsibly</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <p>
                We reserve the right to terminate or suspend access to the Service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Continued use of the Service after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Germany. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Saarbrücken, Germany.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
              <p>
                For questions about these Terms, please contact us at:<br />
                <a href="mailto:admin@menter.digital" className="text-pink-600 hover:underline">admin@menter.digital</a>
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: November 20, 2025<br />
                menter Digital GmbH · Freiheitstr. 2 · 66125 Saarbrücken
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a href="/" className="text-pink-600 hover:text-pink-700 font-medium">
              ← Back to home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
