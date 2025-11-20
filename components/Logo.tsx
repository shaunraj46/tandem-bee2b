export function Logo({ size = "md", showTagline = false }: { size?: "sm" | "md" | "lg", showTagline?: boolean }) {
  const sizes = {
    sm: { bee: "w-8 h-8", text: "text-2xl" },
    md: { bee: "w-12 h-12", text: "text-4xl" },
    lg: { bee: "w-16 h-16", text: "text-5xl" }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        {/* Simple Bee Icon */}
        <svg className={sizes[size].bee} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="beeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#ff8f54', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Head */}
          <circle cx="50" cy="25" r="12" fill="none" stroke="url(#beeGradient)" strokeWidth="4"/>
          
          {/* Antennae */}
          <path d="M 45 15 Q 40 8 38 5" fill="none" stroke="url(#beeGradient)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M 55 15 Q 60 8 62 5" fill="none" stroke="url(#beeGradient)" strokeWidth="3" strokeLinecap="round"/>
          
          {/* Body */}
          <ellipse cx="50" cy="55" rx="20" ry="28" fill="none" stroke="url(#beeGradient)" strokeWidth="4"/>
          
          {/* Stripes */}
          <path d="M 32 45 Q 50 48 68 45" fill="none" stroke="url(#beeGradient)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M 32 60 Q 50 63 68 60" fill="none" stroke="url(#beeGradient)" strokeWidth="4" strokeLinecap="round"/>
          
          {/* Wings */}
          <ellipse cx="32" cy="45" rx="15" ry="20" fill="none" stroke="url(#beeGradient)" strokeWidth="3" opacity="0.7"/>
          <ellipse cx="68" cy="45" rx="15" ry="20" fill="none" stroke="url(#beeGradient)" strokeWidth="3" opacity="0.7"/>
          
          {/* Stinger */}
          <path d="M 50 83 L 50 92" fill="none" stroke="url(#beeGradient)" strokeWidth="3" strokeLinecap="round"/>
        </svg>

        {/* Bee2B Text */}
        <span 
          className={`${sizes[size].text} font-bold`}
          style={{ 
            fontFamily: 'Satisfy, cursive',
            color: '#2d3561',
            letterSpacing: '0.02em'
          }}
        >
          Bee2B
        </span>
      </div>
      
      {showTagline && (
        <div className="text-sm" style={{ color: '#2d3561' }}>
          <span className="font-normal">Powered by </span>
          <span className="font-bold">menter</span>
        </div>
      )}
    </div>
  );
}

export function LogoWhite({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: { bee: "w-8 h-8", text: "text-2xl" },
    md: { bee: "w-12 h-12", text: "text-4xl" },
    lg: { bee: "w-16 h-16", text: "text-5xl" }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Simple Bee Icon - White version */}
      <svg className={sizes[size].bee} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="25" r="12" fill="none" stroke="white" strokeWidth="4"/>
        <path d="M 45 15 Q 40 8 38 5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 55 15 Q 60 8 62 5" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="50" cy="55" rx="20" ry="28" fill="none" stroke="white" strokeWidth="4"/>
        <path d="M 32 45 Q 50 48 68 45" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <path d="M 32 60 Q 50 63 68 60" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <ellipse cx="32" cy="45" rx="15" ry="20" fill="none" stroke="white" strokeWidth="3" opacity="0.7"/>
        <ellipse cx="68" cy="45" rx="15" ry="20" fill="none" stroke="white" strokeWidth="3" opacity="0.7"/>
        <path d="M 50 83 L 50 92" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      </svg>

      <span 
        className={`${sizes[size].text} font-bold text-white`}
        style={{ 
          fontFamily: 'Satisfy, cursive',
          letterSpacing: '0.02em'
        }}
      >
        Bee2B
      </span>
    </div>
  );
}
