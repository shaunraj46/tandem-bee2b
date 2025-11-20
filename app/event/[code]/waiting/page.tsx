'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function WaitingPage() {
  const params = useParams();
  const router = useRouter();
  const eventCode = params.code as string;
  const [event, setEvent] = useState<any>(null);
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    loadEvent();
  }, [eventCode]);

  useEffect(() => {
    if (!event?.id) return;

    loadParticipants();

    const channel = supabase
      .channel(`waiting-${eventCode}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'events',
        filter: `code=eq.${eventCode}`
      }, (payload) => {
        const updatedEvent = payload.new;
        setEvent(updatedEvent);
        
        if (updatedEvent.status === 'active' && updatedEvent.current_round > 0) {
          router.push(`/event/${eventCode}/round`);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [event?.id, eventCode, router]);

  const loadEvent = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('code', eventCode)
      .single();
    
    setEvent(data);
    
    if (data?.status === 'active' && data?.current_round > 0) {
      router.push(`/event/${eventCode}/round`);
    }
  };

  const loadParticipants = async () => {
    if (!event?.id) return;

    const { count } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true })
      .eq('event_id', event.id);
    
    setParticipantCount(count || 0);
  };

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 mb-6">
          <div className="animate-pulse mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
            You're In!
          </h1>
          
          <p className="text-xl text-gray-700 mb-8">
            Waiting for the organizer to start the event...
          </p>

          <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6 mb-6">
            <p className="text-gray-600 mb-2">Event</p>
            <p className="text-2xl font-bold text-gray-900">{event.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-pink-50 rounded-xl p-4">
              <p className="text-3xl font-black text-pink-600">{participantCount}</p>
              <p className="text-sm text-gray-600">Participants</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-3xl font-black text-orange-600">{event.rounds}</p>
              <p className="text-sm text-gray-600">Rounds</p>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-600">
          <p>The organizer will start the first round soon.</p>
          <p className="mt-2">Stay on this page - you'll be redirected automatically!</p>
        </div>
      </div>
    </div>
  );
}
