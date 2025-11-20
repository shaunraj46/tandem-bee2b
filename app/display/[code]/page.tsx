'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Logo } from '@/components/Logo';
import QRCode from 'qrcode';

export default function DisplayCodePage() {
  const params = useParams();
  const eventCode = params.code as string;
  const [event, setEvent] = useState<any>(null);
  const [participantCount, setParticipantCount] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    loadEvent();
    loadParticipants();

    if (!event?.id) return;

    const channel = supabase
      .channel(`display-${eventCode}`)
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/event/${eventCode}/lobby`;
      QRCode.toDataURL(url, {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }).then(setQrCodeUrl);
    }
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
      const { data, count } = await supabase
        .from('participants')
        .select('*', { count: 'exact' })
        .eq('event_id', eventData.id);
      setParticipantCount(count || 0);
    }
  };

  if (!event) return null;

  const joinUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/event/${eventCode}/lobby`
    : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full text-center text-white">
        {/* Logo */}
        <div className="mb-8 md:mb-12">
          <Logo size="lg" showTagline />
        </div>

        {/* Event Name */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 px-4" style={{ color: '#2d3561' }}>
          {event.name}
        </h2>

        {/* Instructions */}
        <p className="text-lg md:text-2xl lg:text-3xl mb-8 md:mb-12 leading-relaxed px-4" style={{ color: '#2d3561' }}>
          Scan QR code or enter event code
        </p>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* QR Code */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border-4 border-white shadow-2xl">
            <p className="text-lg md:text-xl mb-4 font-bold" style={{ color: '#2d3561' }}>Scan to join</p>
            {qrCodeUrl && (
              <div className="bg-white rounded-2xl p-4 md:p-6 inline-block">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 md:w-64 md:h-64" />
              </div>
            )}
          </div>

          {/* Event Code */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 border-4 border-white shadow-2xl">
            <p className="text-lg md:text-xl mb-4 font-bold" style={{ color: '#2d3561' }}>Or enter code:</p>
            <div className="text-6xl md:text-8xl lg:text-9xl font-black tracking-wider mb-4 md:mb-6" style={{ color: '#2d3561' }}>
              {eventCode}
            </div>
            <p className="text-base md:text-xl lg:text-2xl font-mono break-all px-2" style={{ color: '#2d3561' }}>
              {joinUrl}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 inline-block shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black mb-2" style={{ color: '#ff6b6b' }}>{participantCount}</div>
              <div className="text-base md:text-xl" style={{ color: '#2d3561' }}>Participants joined</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-gray-300"></div>
            <div className="w-full md:w-px h-px md:h-16 bg-gray-300 md:hidden"></div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-black mb-2" style={{ color: '#ff6b6b' }}>{event.rounds}</div>
              <div className="text-base md:text-xl" style={{ color: '#2d3561' }}>Rounds planned</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-16 text-sm md:text-lg" style={{ color: '#2d3561' }}>
          <p>Powered by <strong>menter.digital</strong></p>
        </div>
      </div>
    </div>
  );
}
