export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm p-12">
          <h1 className="text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Your privacy is important to us. This Privacy Policy explains how menter Digital GmbH collects, uses, and protects your personal information when you use Bee2B.
            </p>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Controller</h2>
              <p>
                menter Digital GmbH<br />
                Freiheitstr. 2<br />
                66125 Saarbrücken<br />
                Germany<br />
                Email: <a href="mailto:admin@menter.digital" className="text-pink-600 hover:underline">admin@menter.digital</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="mb-4">When you use Bee2B, we collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and professional information you provide</li>
                <li>Company and role details</li>
                <li>Networking preferences (what you offer/seek)</li>
                <li>Event participation data</li>
                <li>Interaction data (who you save as contacts)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Data</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate AI-powered group matching</li>
                <li>Enable networking during events</li>
                <li>Provide post-event connection summaries</li>
                <li>Improve our service quality</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Retention</h2>
              <p>
                All event and participant data is automatically deleted 30 days after the event ends. You can request earlier deletion at any time by contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights (GDPR)</h2>
              <p className="mb-4">Under GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data, including encryption, secure servers (EU-hosted), and access controls.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p>
                For privacy-related questions or to exercise your rights, contact us at:<br />
                <a href="mailto:admin@menter.digital" className="text-pink-600 hover:underline">admin@menter.digital</a>
              </p>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Last updated: November 20, 2025
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
