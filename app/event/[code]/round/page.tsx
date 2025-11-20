'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RoundPage() {
  const params = useParams();
  const eventCode = params.code as string;
  const [event, setEvent] = useState<any>(null);
  const [currentRound, setCurrentRound] = useState<any>(null);
  const [myGroup, setMyGroup] = useState<any>(null);
  const [groupMembers, setGroupMembers] = useState<any[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [savedContacts, setSavedContacts] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadEventAndGroup();

    // Subscribe to changes
    const channel = supabase
      .channel(`round-${eventCode}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'rounds'
      }, () => {
        loadEventAndGroup();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'events'
      }, () => {
        loadEventAndGroup();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventCode]);

  // Timer sync based on round start time
  useEffect(() => {
    if (!currentRound || !currentRound.started_at || !currentRound.minutes_per_round) return;

    const updateTimer = () => {
      const startTime = new Date(currentRound.started_at).getTime();
      const now = Date.now();
      const elapsed = Math.floor((now - startTime) / 1000);
      const total = currentRound.minutes_per_round * 60;
      const remaining = Math.max(0, total - elapsed);
      setTimeRemaining(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [currentRound]);

  const loadEventAndGroup = async () => {
    const participantId = localStorage.getItem('participant_id');
    if (!participantId) return;

    const { data: eventData } = await supabase
      .from('events')
      .select('*')
      .eq('code', eventCode)
      .single();
    setEvent(eventData);

    if (!eventData) return;

    const { data: rounds } = await supabase
      .from('rounds')
      .select('*')
      .eq('event_id', eventData.id)
      .order('round_number', { ascending: false })
      .limit(1);

    if (!rounds || rounds.length === 0) return;
    const latestRound = rounds[0];
    setCurrentRound(latestRound);

    const { data: myGroupMembership } = await supabase
      .from('group_members')
      .select('*, groups(*)')
      .eq('participant_id', participantId)
      .eq('groups.round_id', latestRound.id)
      .single();

    if (!myGroupMembership) return;
    setMyGroup(myGroupMembership.groups);

    const { data: allMembers } = await supabase
      .from('group_members')
      .select('participant_id, participants(*)')
      .eq('group_id', myGroupMembership.groups.id);

    if (allMembers) {
      setGroupMembers(allMembers.map((m: any) => m.participants));
    }
  };

  const toggleSaveContact = async (participantId: string) => {
    const myId = localStorage.getItem('participant_id');
    if (!myId || !event || !currentRound) return;

    const newSaved = new Set(savedContacts);
    
    if (newSaved.has(participantId)) {
      newSaved.delete(participantId);
      await supabase
        .from('saves')
        .delete()
        .eq('from_participant_id', myId)
        .eq('to_participant_id', participantId);
    } else {
      newSaved.add(participantId);
      await supabase.from('saves').insert({
        event_id: event.id,
        round_id: currentRound.id,
        from_participant_id: myId,
        to_participant_id: participantId
      });
    }
    
    setSavedContacts(newSaved);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!event || !myGroup || !currentRound) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Finding your group...</p>
        </div>
      </div>
    );
  }

  const myId = localStorage.getItem('participant_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-4">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="bg-white rounded-3xl shadow-xl p-4 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              {/* Updated Logo */}
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="beeGrad" x1="0%" x2="100%">
                      <stop offset="0%" stopColor="#ff6a78"/>
                      <stop offset="100%" stopColor="#ff9a57"/>
                    </linearGradient>
                    <linearGradient id="wingGrad" x1="0%" x2="100%">
                      <stop offset="0%" stopColor="#fff6f6" stopOpacity="0.95"/>
                      <stop offset="100%" stopColor="#fff9f2" stopOpacity="0.95"/>
                    </linearGradient>
                  </defs>
                  <ellipse cx="60" cy="62" rx="44" ry="20" fill="url(#beeGrad)" opacity="0.06"/>
                  <g transform="translate(18,10)" stroke="url(#beeGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <circle cx="30" cy="22" r="10" fill="url(#beeGrad)" stroke="none"/>
                    <path d="M24 12 C18 4, 8 0, 4 6" stroke="url(#beeGrad)" fill="none" transform="translate(6,4) rotate(-10 30 0)"/>
                  </g>
                  <g transform="translate(18,10)">
                    <ellipse cx="12" cy="36" rx="14" ry="22" fill="url(#wingGrad)" stroke="url(#beeGrad)" strokeWidth="4" opacity="0.98"/>
                    <ellipse cx="48" cy="36" rx="14" ry="22" fill="url(#wingGrad)" stroke="url(#beeGrad)" strokeWidth="4" opacity="0.98"/>
                  </g>
                  <g transform="translate(18,10)" stroke="url(#beeGrad)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
                    <path d="M12 58 C28 48, 42 48, 58 58" />
                    <path d="M16 70 C30 62, 44 62, 58 70" />
                  </g>
                  <path d="M68 82 C62 86, 56 86, 50 82" stroke="url(#beeGrad)" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
                <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'Pacifico, cursive', background: 'linear-gradient(90deg, #ff5a6b, #ff8f54)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {myGroup.group_name}
                </h1>
              </div>
              <p className="text-gray-600 text-sm md:text-base">Round {event.current_round} of {event.rounds}</p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm text-gray-500 mb-1">Time Left</p>
              <div className={`text-3xl md:text-4xl font-black ${timeRemaining < 60 ? 'text-red-500' : 'bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent'}`}>
                {formatTime(timeRemaining)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Member Cards */}
      <div className="max-w-2xl mx-auto space-y-4">
        {groupMembers.map((member, index) => {
          const isMe = member.id === myId;
          const isSaved = savedContacts.has(member.id);
          
          return (
            <div
              key={member.id}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden transform transition hover:scale-102 ${isMe ? 'ring-4 ring-pink-500' : ''}`}
              style={{
                animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="bg-gradient-to-br from-pink-500 to-orange-500 p-4 md:p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold mb-1 truncate">
                      {member.name} {isMe && '(You)'}
                    </h3>
                    <p className="text-pink-100 text-sm md:text-base truncate">{member.company}</p>
                    <p className="text-xs md:text-sm text-pink-200 truncate">{member.role}</p>
                  </div>
                  {!isMe && (
                    <button
                      onClick={() => toggleSaveContact(member.id)}
                      className={`flex-shrink-0 p-3 md:p-4 rounded-2xl font-bold text-xl md:text-2xl transition transform hover:scale-110 ${
                        isSaved 
                          ? 'bg-yellow-400 text-yellow-900' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {isSaved ? '⭐' : '☆'}
                    </button>
                  )}
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Offers</p>
                  <div className="flex flex-wrap gap-2">
                    {member.offers?.map((offer: string) => (
                      <span key={offer} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs md:text-sm font-medium">
                        {offer}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">Looking For</p>
                  <div className="flex flex-wrap gap-2">
                    {member.seeks?.map((seek: string) => (
                      <span key={seek} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium">
                        {seek}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tip */}
      <div className="max-w-2xl mx-auto mt-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 md:p-4 text-center">
          <p className="text-xs md:text-sm text-gray-700">
            Tap ⭐ to save contacts you'd like to connect with
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
