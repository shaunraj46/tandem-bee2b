'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogoWhite } from '@/components/Logo';

export default function LandingPage() {
  const router = useRouter();
  const [eventCode, setEventCode] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <LogoWhite size="sm" />
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-white/90 hover:text-white font-medium transition">How it works</a>
              <a href="#features" className="text-white/90 hover:text-white font-medium transition">Features</a>
              <a href="#use-cases" className="text-white/90 hover:text-white font-medium transition">Use cases</a>
              <a href="#contact" className="px-6 py-2 bg-white text-pink-600 rounded-full font-bold hover:shadow-lg transition">
                Contact us
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20 lg:py-32">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6">
                Turn any event into smart conversation groups
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-3 md:mb-4 leading-relaxed">
                Bee2B uses AI to match attendees by interests and goals, so nobody stands awkwardly by the coffee machine.
              </p>
              <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8">
                Perfect for team offsites, meetups, hackathons, and workshops.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
                <button
                  onClick={() => router.push('/organizer')}
                  className="px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-full font-bold text-base md:text-lg hover:bg-gray-800 transition shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  Organize event
                </button>
                <button
                  onClick={() => window.location.href = 'mailto:moritz.diehl@menter.digital?subject=Bee2B%20Demo%20Request'}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white/20 backdrop-blur-sm text-white rounded-full font-bold text-base md:text-lg hover:bg-white/30 transition border border-white/30 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Request demo
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
                <p className="text-white/80 text-xs md:text-sm mb-3 font-medium">Join an event</p>
                <div className="flex gap-2 md:gap-3">
                  <input
                    type="text"
                    placeholder="Enter event code"
                    value={eventCode}
                    onChange={(e) => setEventCode(e.target.value.toUpperCase())}
                    className="flex-1 px-3 md:px-4 py-2 md:py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 font-mono text-base md:text-lg"
                    maxLength={6}
                  />
                  <button
                    onClick={() => router.push(`/event/${eventCode}/lobby`)}
                    disabled={eventCode.length < 5}
                    className="px-4 md:px-6 py-2 md:py-3 bg-white text-pink-600 rounded-xl font-bold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Mockup */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-4 md:p-6 transform rotate-2 hover:rotate-0 transition duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-orange-100 rounded-2xl px-3 md:px-4 py-2">
                    <span className="text-xs md:text-sm font-medium text-orange-900">Round 2 of 4</span>
                  </div>
                  <div className="text-xl md:text-2xl font-black text-gray-900">5:43</div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-4">
                  Startup Founders Mixer
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-xl p-3 md:p-4 text-white">
                    <p className="font-bold mb-1 text-sm md:text-base">Sarah Chen</p>
                    <p className="text-xs md:text-sm text-white/80">Tesla · Product Lead</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs">hiring</span>
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs">partnerships</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-3 md:p-4">
                    <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">Marcus Weber</p>
                    <p className="text-xs md:text-sm text-gray-600">AI Startup · CTO</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">AI/ML</span>
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">funding</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 md:p-4">
                    <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">Julia Schmidt</p>
                    <p className="text-xs md:text-sm text-gray-600">Design Studio · Founder</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">design</span>
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">UX</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 md:p-4">
                    <p className="font-bold text-gray-900 mb-1 text-sm md:text-base">Raj Patel</p>
                    <p className="text-xs md:text-sm text-gray-600">Venture Capital · Partner</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">investing</span>
                      <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">startups</span>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-xl p-3 text-center">
                  <p className="text-xs md:text-sm text-pink-900">Tap the star to save contacts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps from chaos to connections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-orange-50 rounded-2xl p-8 border border-pink-100">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-black text-xl mb-4">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Organizer creates event</h3>
              <p className="text-gray-600 leading-relaxed">
                Set event name, number of rounds, and group size (4-6 people). Get a unique event code like "FMS25" to share with attendees.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-black text-xl mb-4">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Attendees join and profile</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter the event code, fill out name, role, what they offer and what they're looking for. AI analyzes profiles for optimal matching.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-black text-xl mb-4">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart groups and rounds</h3>
              <p className="text-gray-600 leading-relaxed">
                AI creates balanced groups of 4-6 people. Timer counts down 8 minutes. Save contacts. Next round auto-starts with new people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              What you get
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything needed to run structured networking sessions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'AI-Powered Matching',
                description: 'Claude analyzes profiles to create complementary groups based on what people offer and seek.',
                gradient: 'from-pink-500 to-rose-500'
              },
              {
                title: 'No App Required',
                description: 'Works instantly in any mobile browser. No downloads, no friction—just a web link and event code.',
                gradient: 'from-purple-500 to-pink-500'
              },
              {
                title: 'Automated Timing',
                description: 'Built-in timer for each round. Auto-rotate to next group when time expires. Perfect rhythm.',
                gradient: 'from-blue-500 to-purple-500'
              },
              {
                title: 'Behavioral Signals',
                description: 'Track who saves whom. Mutual matches highlighted after the event. Real connection data.',
                gradient: 'from-green-500 to-emerald-500'
              },
              {
                title: 'Organizer Dashboard',
                description: 'Real-time participant count, live engagement metrics, and comprehensive post-event analytics.',
                gradient: 'from-orange-500 to-red-500'
              },
              {
                title: 'GDPR Compliant',
                description: 'EU hosting, auto-delete after 30 days, full data export on request. Privacy by design.',
                gradient: 'from-cyan-500 to-blue-500'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition">
                <div className={`w-10 h-10 bg-gradient-to-br ${feature.gradient} rounded-lg mb-4`}></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Built for
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From corporate summits to startup accelerators
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Corporate Innovation Summits',
                description: 'Replace awkward mingling with structured networking. Track ROI with engagement metrics. Ensure every attendee has meaningful conversations.',
              },
              {
                title: 'University Career Fairs',
                description: 'Connect students with recruiters efficiently. Prevent booth overcrowding. Create memorable first impressions for both sides.',
              },
              {
                title: 'Startup Accelerators',
                description: 'Demo days, cohort mixers, mentor matching. Build meaningful founder connections that last beyond the event.',
              },
              {
                title: 'Professional Associations',
                description: 'Industry conferences, member events, knowledge exchange sessions. Activate your community with data-driven networking.',
              }
            ].map((useCase, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Bring Bee2B to your next event
          </h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed">
            Get in touch to discuss how Bee2B can transform networking at your events. We offer flexible deployment options and custom solutions.
          </p>
          
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <p className="text-white/80 text-sm mb-4 font-medium">Contact us</p>
            <a 
              href="mailto:moritz.diehl@menter.digital?subject=Bee2B%20Inquiry"
              className="block w-full px-8 py-4 bg-white text-pink-600 rounded-xl font-bold text-lg hover:shadow-2xl transition"
            >
              moritz.diehl@menter.digital
            </a>
          </div>

          <p className="mt-8 text-white/70 text-sm">
            We typically respond within 24 hours
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <LogoWhite size="sm" />
              </div>
              <p className="text-gray-400 text-xs md:text-sm">Powered by menter.digital</p>
            </div>
            <div className="flex gap-6 md:gap-8 text-xs md:text-sm">
              <a href="mailto:moritz.diehl@menter.digital" className="text-gray-400 hover:text-white transition">Contact</a>
              <a href="/impressum" className="text-gray-400 hover:text-white transition">Impressum</a>
              <a href="/terms" className="text-gray-400 hover:text-white transition">Terms</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition">Privacy</a>
            </div>
          </div>
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-800 text-center text-xs md:text-sm text-gray-500">
            © 2025 menter Digital GmbH · All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}
