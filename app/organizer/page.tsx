'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrganizerPage() {
  const router = useRouter();
  const [eventName, setEventName] = useState('');
  const [rounds, setRounds] = useState(4);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: eventName,
          date: new Date().toISOString(),
          rounds,
          organizer_email: email
        })
      });

      const data = await res.json();
      if (data.success) {
        router.push(`/organizer/${data.event.code}`);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
            </svg>
          </a>
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
            Create Event
          </h1>
          <p className="text-gray-600">
            Set up your networking session
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-6">
          <div className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                placeholder="e.g., Startup Founders Mixer"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition text-lg"
              />
            </div>

            {/* Organizer Email */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition text-lg"
              />
            </div>

            {/* Number of Rounds */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Number of Rounds
              </label>
              <input
                type="number"
                min={2}
                max={8}
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                You can set group size and duration before each round
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCreateEvent}
              disabled={loading || !eventName || !email}
              className="w-full p-5 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-2xl font-bold text-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  Creating event...
                </span>
              ) : (
                'Create Event'
              )}
            </button>

            {/* Back Link */}
            <div className="text-center pt-4">
              <a href="/" className="text-gray-500 hover:text-gray-700 text-sm transition">
                Back to home
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Powered by <span className="font-semibold text-pink-600">menter.digital</span></p>
        </div>
      </div>
    </div>
  );
}
