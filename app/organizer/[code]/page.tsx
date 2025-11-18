'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function OrganizerDashboard() {
  const params = useParams();
  const eventCode = params.code as string;
  const [event, setEvent] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvent();
    loadParticipants();

    // Real-time updates
    const channel = supabase
      .channel(`event-${eventCode}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'participants'
      }, () => {
        loadParticipants();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventCode]);

  const loadEvent = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('code', eventCode)
      .single();
    setEvent(data);
  };

  const loadParticipants = async () => {
    const { data: eventData } = await supabase
      .from('events')
      .select('id')
      .eq('code', eventCode)
      .single();

    if (eventData) {
      const { data } = await supabase
        .from('participants')
        .select('*')
        .eq('event_id', eventData.id);
      setParticipants(data || []);
    }
  };

  const startRound = async () => {
    setLoading(true);
    try {
      // Start round
      const roundRes = await fetch('/api/rounds/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_id: event.id })
      });
      const roundData = await roundRes.json();

      // Match participants
      await fetch('/api/rounds/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          round_id: roundData.round.id,
          event_id: event.id
        })
      });

      loadEvent();
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">{event.name}</h1>
              <p className="text-2xl font-mono font-bold text-indigo-600 mt-2">
                Code: {event.code}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Round</p>
              <p className="text-4xl font-bold">{event.current_round}/{event.rounds}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Participants</p>
              <p className="text-3xl font-bold">{participants.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Group Size</p>
              <p className="text-3xl font-bold">{event.group_size}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Expected Groups</p>
              <p className="text-3xl font-bold">
                {Math.ceil(participants.length / event.group_size)}
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Participants:</h2>
            <div className="grid grid-cols-2 gap-3">
              {participants.map(p => (
                <div key={p.id} className="border rounded-lg p-3">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-gray-600">{p.company} • {p.role}</p>
                  <div className="mt-2 flex gap-2 flex-wrap">
                    {p.offers?.map((o: string) => (
                      <span key={o} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {event.status === 'lobby' && (
            <button
              onClick={startRound}
              disabled={loading || participants.length < event.group_size}
              className="w-full p-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xl font-bold disabled:bg-gray-300"
            >
              {loading ? 'Starting...' : `🚀 Start Round 1`}
            </button>
          )}

          {event.status === 'active' && event.current_round < event.rounds && (
            <button
              onClick={startRound}
              disabled={loading}
              className="w-full p-6 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xl font-bold"
            >
              {loading ? 'Starting...' : `▶️ Start Round ${event.current_round + 1}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}