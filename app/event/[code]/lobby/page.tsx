'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function LobbyPage() {
  const router = useRouter();
  const params = useParams();
  const eventCode = params.code as string;

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [offers, setOffers] = useState<string[]>([]);
  const [seeks, setSeeks] = useState<string[]>([]);
  const [offerInput, setOfferInput] = useState('');
  const [seekInput, setSeekInput] = useState('');

  const addTag = (type: 'offer' | 'seek', value: string) => {
    if (!value.trim()) return;
    if (type === 'offer' && !offers.includes(value)) {
      setOffers([...offers, value]);
      setOfferInput('');
    } else if (type === 'seek' && !seeks.includes(value)) {
      setSeeks([...seeks, value]);
      setSeekInput('');
    }
  };

  const removeTag = (type: 'offer' | 'seek', value: string) => {
    if (type === 'offer') {
      setOffers(offers.filter(o => o !== value));
    } else {
      setSeeks(seeks.filter(s => s !== value));
    }
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/events/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_code: eventCode,
        name,
        company,
        role,
        offers,
        seeks
      })
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem('participant_id', data.participant.id);
      router.push(`/event/${eventCode}/round`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8">
        <h1 className="text-3xl font-bold mb-2">Join Event: {eventCode}</h1>
        <p className="text-gray-600 mb-6">Tell us about yourself</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Role/Title"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          <div>
            <label className="font-semibold block mb-2">What I Offer:</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g., hiring, funding, partnerships"
                value={offerInput}
                onChange={(e) => setOfferInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag('offer', offerInput)}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={() => addTag('offer', offerInput)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {offers.map(offer => (
                <span
                  key={offer}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                >
                  {offer}
                  <button onClick={() => removeTag('offer', offer)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold block mb-2">What I Seek:</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="e.g., investors, co-founder, B2B leads"
                value={seekInput}
                onChange={(e) => setSeekInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag('seek', seekInput)}
                className="flex-1 p-2 border rounded"
              />
              <button
                onClick={() => addTag('seek', seekInput)}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {seeks.map(seek => (
                <span
                  key={seek}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2"
                >
                  {seek}
                  <button onClick={() => removeTag('seek', seek)}>×</button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!name || !company || offers.length === 0 || seeks.length === 0}
            className="w-full p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold disabled:bg-gray-300"
          >
            Join Lobby
          </button>
        </div>
      </div>
    </div>
  );
}
