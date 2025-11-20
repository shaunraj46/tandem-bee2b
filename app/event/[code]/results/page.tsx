'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ResultsPage() {
  const params = useParams();
  const eventCode = params.code as string;
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    const myId = sessionStorage.getItem('participant_id');
    if (!myId) return;

    const { data: eventData } = await supabase
      .from('events')
      .select('id')
      .eq('code', eventCode)
      .single();

    if (!eventData) return;

    const { data: mySaves } = await supabase
      .from('saves')
      .select('to_participant_id, participants(*)')
      .eq('event_id', eventData.id)
      .eq('from_participant_id', myId);

    const { data: savesToMe } = await supabase
      .from('saves')
      .select('from_participant_id')
      .eq('event_id', eventData.id)
      .eq('to_participant_id', myId);

    const mutualIds = new Set(savesToMe?.map(s => s.from_participant_id) || []);

    const connectionsData = mySaves?.map((save: any) => ({
      ...save.participants,
      isMutual: mutualIds.has(save.participants.id)
    })) || [];

    setConnections(connectionsData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500"></div>
      </div>
    );
  }

  const mutualConnections = connections.filter(c => c.isMutual);
  const oneWayConnections = connections.filter(c => !c.isMutual);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">🎉</div>
          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
            You're All Set!
          </h1>
          <p className="text-gray-600">Here are your connections from today</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <p className="text-4xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              {mutualConnections.length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Mutual Matches</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
            <p className="text-4xl font-black text-gray-800">{connections.length}</p>
            <p className="text-sm text-gray-600 mt-1">Total Saved</p>
          </div>
        </div>

        {/* Mutual Connections */}
        {mutualConnections.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>💚</span> Mutual Connections
            </h2>
            <div className="space-y-3">
              {mutualConnections.map((person) => (
                <div key={person.id} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold">{person.name}</h3>
                      <p className="text-green-100 text-sm">{person.company} • {person.role}</p>
                    </div>
                    <div className="text-2xl">✨</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {person.offers?.map((offer: string) => (
                      <span key={offer} className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                        {offer}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* One-Way */}
        {oneWayConnections.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span>⭐</span> Saved Contacts
            </h2>
            <div className="space-y-3">
              {oneWayConnections.map((person) => (
                <div key={person.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">{person.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{person.company} • {person.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {person.offers?.map((offer: string) => (
                      <span key={offer} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                        {offer}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {connections.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
            <div className="text-5xl mb-4">🤷</div>
            <p className="text-xl font-bold text-gray-800 mb-2">No connections yet</p>
            <p className="text-gray-600">Better luck next time!</p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Powered by <span className="font-semibold text-pink-600">menter.digital</span></p>
        </div>
      </div>
    </div>
  );
}
