'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState<'create' | 'join' | null>(null);
  const [eventCode, setEventCode] = useState('');
  const [eventName, setEventName] = useState('');
  const [groupSize, setGroupSize] = useState<4 | 6>(4);
  const [rounds, setRounds] = useState(4);
  const [email, setEmail] = useState('');

  const handleCreateEvent = async () => {
    const res = await fetch('/api/events/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: eventName,
        date: new Date().toISOString(),
        rounds,
        minutes_per_round: 8,
        group_size: groupSize,
        organizer_email: email
      })
    });

    const data = await res.json();
    if (data.success) {
      router.push(`/organizer/${data.event.code}`);
    }
  };

  const handleJoinEvent = () => {
    router.push(`/event/${eventCode.toUpperCase()}/lobby`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900">
          🐝 Tandem Bee2B
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Smart group networking powered by AI
        </p>

        {!mode && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setMode('create')}
              className="p-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-lg transition"
            >
              🎯 Create Event
            </button>
            <button
              onClick={() => setMode('join')}
              className="p-8 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg transition"
            >
              🚀 Join Event
            </button>
          </div>
        )}

        {mode === 'create' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Create New Event</h2>
            <input
              type="text"
              placeholder="Event Name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <div>
              <label className="block mb-2 font-semibold">Group Size:</label>
              <select
                value={groupSize}
                onChange={(e) => setGroupSize(Number(e.target.value) as 4 | 6)}
                className="w-full p-3 border rounded-lg"
              >
                <option value={4}>4 people per group</option>
                <option value={6}>6 people per group</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Number of Rounds:</label>
              <input
                type="number"
                min={2}
                max={8}
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <button
              onClick={handleCreateEvent}
              className="w-full p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold"
            >
              Create Event
            </button>
            <button
              onClick={() => setMode(null)}
              className="w-full p-2 text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        )}

        {mode === 'join' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Join Event</h2>
            <input
              type="text"
              placeholder="Event Code (e.g., BEE123)"
              value={eventCode}
              onChange={(e) => setEventCode(e.target.value.toUpperCase())}
              className="w-full p-3 border rounded-lg text-center text-2xl font-bold tracking-widest"
              maxLength={6}
            />
            <button
              onClick={handleJoinEvent}
              disabled={eventCode.length < 5}
              className="w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:bg-gray-300"
            >
              Join Event
            </button>
            <button
              onClick={() => setMode(null)}
              className="w-full p-2 text-gray-600 hover:text-gray-800"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
