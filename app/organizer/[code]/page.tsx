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
  
  const [showRoundSettings, setShowRoundSettings] = useState(false);
  const [groupSize, setGroupSize] = useState(4);
  const [minutesPerRound, setMinutesPerRound] = useState(8);

  useEffect(() => {
    loadEvent();
    loadParticipants();

    if (!event?.id) return;

    const channel = supabase
      .channel(`event-${eventCode}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'participants',
        filter: `event_id=eq.${event.id}`
      }, () => {
        loadParticipants();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventCode, event?.id]);

  const loadEvent = async () => {
    try {
      console.log('Loading event with code:', eventCode);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('code', eventCode)
        .single();

      if (error) {
        console.error('Error loading event:', error);
        alert(`Failed to load event: ${error.message}`);
        return;
      }

      console.log('Event loaded:', data);
      setEvent(data);
    } catch (error) {
      console.error('Exception loading event:', error);
    }
  };

  const loadParticipants = async () => {
    try {
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select('id')
        .eq('code', eventCode)
        .single();

      if (eventError) {
        console.error('Error loading event for participants:', eventError);
        return;
      }

      if (eventData) {
        const { data, error } = await supabase
          .from('participants')
          .select('*')
          .eq('event_id', eventData.id);

        if (error) {
          console.error('Error loading participants:', error);
          return;
        }

        console.log('Participants loaded:', data);
        setParticipants(data || []);
      }
    } catch (error) {
      console.error('Exception loading participants:', error);
    }
  };

  const deleteParticipant = async (participantId: string) => {
    if (!confirm('Are you sure you want to remove this participant?')) return;
    
    const { error } = await supabase
      .from('participants')
      .delete()
      .eq('id', participantId);
    
    if (!error) {
      loadParticipants();
    }
  };

const startRound = async () => {
  setLoading(true);
  try {
    const roundRes = await fetch('/api/rounds/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: event.id,
        group_size: groupSize,
        minutes_per_round: minutesPerRound
      })
    });

    const roundData = await roundRes.json();

    if (!roundData.success || !roundData.round) {
      throw new Error(roundData.error || 'Failed to create round');
    }

    const matchRes = await fetch('/api/rounds/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        round_id: roundData.round.id,
        event_id: event.id,
        group_size: groupSize
      })
    });

    const matchData = await matchRes.json();

    if (!matchData.success) {
      // Rollback: delete the round we just created
      await supabase
        .from('rounds')
        .delete()
        .eq('id', roundData.round.id);

      throw new Error(matchData.error || 'Failed to create groups');
    }

    setShowRoundSettings(false);
    loadEvent();
  } catch (error) {
    console.error('Error starting round:', error);
    alert('Failed to start round. Please try again.');
  } finally {
    setLoading(false);
  }
};

  const openDisplayCode = () => {
    window.open(`/display/${eventCode}`, '_blank');
  };

  if (!event) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
    </div>
  );

  const canStartRound = participants.length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-0">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Bee2B</h1>
                <p className="text-xs text-gray-500">Organizer Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
              <button
                onClick={openDisplayCode}
                className="flex-1 md:flex-initial px-3 md:px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Display</span>
              </button>
              <div className="text-right">
                <p className="text-xs text-gray-500">Code</p>
                <p className="text-xl md:text-3xl font-black text-transparent bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text">
                  {event.code}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <p className="text-xs md:text-sm text-gray-500 mb-1">Event</p>
            <p className="text-sm md:text-xl font-bold text-gray-800 truncate">{event.name}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl p-4 md:p-6 shadow-lg text-white">
            <p className="text-xs md:text-sm opacity-90 mb-1">Participants</p>
            <p className="text-3xl md:text-4xl font-black">{participants.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <p className="text-xs md:text-sm text-gray-500 mb-1">Rounds</p>
            <p className="text-3xl md:text-4xl font-black text-gray-800">{event.rounds}</p>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
            <p className="text-xs md:text-sm text-gray-500 mb-1">Progress</p>
            <p className="text-3xl md:text-4xl font-black text-gray-800">
              {event.current_round}/{event.rounds}
            </p>
          </div>
        </div>

        {/* Participants List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Participants ({participants.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {participants.map(p => (
              <div key={p.id} className="border border-gray-200 rounded-xl p-3 md:p-4 hover:shadow-md transition relative group">
                <button
                  onClick={() => deleteParticipant(p.id)}
                  className="absolute top-2 right-2 w-6 h-6 md:w-7 md:h-7 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-sm md:text-base"
                  title="Remove participant"
                >
                  ×
                </button>
                <p className="font-bold text-gray-800 text-sm md:text-base pr-8">{p.name}</p>
                <p className="text-xs md:text-sm text-gray-600">{p.company} · {p.role}</p>
                <div className="mt-2 md:mt-3 flex flex-wrap gap-1">
                  {p.offers?.slice(0, 2).map((o: string) => (
                    <span key={o} className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full">
                      {o}
                    </span>
                  ))}
                  {p.offers?.length > 2 && (
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      +{p.offers.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Round Settings Modal */}
        {showRoundSettings && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
                Round {event.current_round + 1} Settings
              </h2>
              
              <div className="space-y-6 mb-8">
                {/* Group Size - Flexible */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Group Size (people per group)
                  </label>
                  <input
                    type="number"
                    min={2}
                    max={20}
                    value={groupSize}
                    onChange={(e) => setGroupSize(Number(e.target.value))}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition text-lg"
                  />
                  <p className="text-xs md:text-sm text-gray-500 mt-2">
                    Minimum 2, maximum 20
                  </p>
                </div>

                {/* Timer Duration */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Round Duration (minutes)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 8, 10, 15].map(mins => (
                      <button
                        key={mins}
                        onClick={() => setMinutesPerRound(mins)}
                        className={`p-3 rounded-xl border-2 font-bold transition text-sm md:text-base ${
                          minutesPerRound === mins
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={minutesPerRound}
                    onChange={(e) => setMinutesPerRound(Number(e.target.value))}
                    placeholder="Custom minutes"
                    className="w-full mt-3 p-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition"
                  />
                </div>

                {/* Estimated Groups */}
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                  <p className="text-sm text-gray-700">
                    <strong>{participants.length}</strong> participants ÷ <strong>{groupSize}</strong> per group = 
                    <strong> ~{Math.ceil(participants.length / groupSize)}</strong> groups
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRoundSettings(false)}
                  className="flex-1 p-3 md:p-4 bg-gray-100 text-gray-700 rounded-2xl font-bold hover:bg-gray-200 transition text-sm md:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={startRound}
                  disabled={loading || !canStartRound}
                  className="flex-1 p-3 md:p-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-2xl font-bold shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {loading ? 'Starting...' : 'Start Round'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        {event.status === 'lobby' && (
          <button
            onClick={() => setShowRoundSettings(true)}
            disabled={!canStartRound}
            className="w-full p-4 md:p-6 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white rounded-2xl text-lg md:text-xl font-bold shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {!canStartRound 
              ? 'Need at least 2 participants to start'
              : 'Start Round 1'
            }
          </button>
        )}

        {event.status === 'active' && event.current_round < event.rounds && (
          <button
            onClick={() => setShowRoundSettings(true)}
            disabled={loading}
            className="w-full p-4 md:p-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl text-lg md:text-xl font-bold shadow-lg transform transition hover:scale-105"
          >
            Start Round {event.current_round + 1}
          </button>
        )}

        {event.current_round === event.rounds && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 md:p-8 text-center text-white">
            <p className="text-3xl md:text-4xl mb-4">🎉</p>
            <p className="text-xl md:text-2xl font-bold">Event Complete!</p>
            <p className="mt-2 opacity-90 text-sm md:text-base">All rounds finished successfully</p>
          </div>
        )}
      </div>
    </div>
  );
}
