/* Hero.jsx — full-bleed showreel hero */

const Hero = ({ tweaks, scrollTo }) => {
  const videoRef = React.useRef(null);
  const [muted, setMuted] = React.useState(true);

  // try to autoplay (browsers require muted for autoplay)
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
  }, [tweaks.videoUrl, muted]);

  // Cinematic still frames for the CSS-fallback reel — used if no video URL.
  // Earthy / warm-grounded palette per brand.
  const fallbackFrames = [
    'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=2000&q=80', // warm cinematic city night
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&q=80', // film camera close
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=80', // warm field
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=2000&q=80', // raw umber portrait
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=2000&q=80', // earthy desert
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=2000&q=80', // cinematic interior
  ];

  const useVideo = !!tweaks.videoUrl;

  return (
    <section className="hero" style={{
      '--hero-overlay': tweaks.heroOverlay,
      '--hero-vignette': tweaks.heroVignette,
      '--grain': tweaks.grain,
      '--reel-duration': tweaks.reelDuration + 's',
      '--hero-align': tweaks.heroAlign,
      '--hero-size': (tweaks.heroSize || 8) + 'vw',
    }}>
      <div className="hero-media">
        {useVideo ? (
          <video
            ref={videoRef}
            src={tweaks.videoUrl}
            autoPlay loop muted={muted} playsInline
          />
        ) : (
          <div className="showreel-fallback">
            {fallbackFrames.map((src, i) => (
              <div key={i} className="frame" style={{ backgroundImage: `url(${src})` }} />
            ))}
          </div>
        )}
      </div>

      {tweaks.showVignette && <div className="hero-vignette" />}
      <div className="hero-overlay" />
      {tweaks.grain > 0 && <div className="film-grain" />}

      <div className="container hero-content">
        <div className="hero-eyebrow-row">
          <span className="rule" />
          <span className="eyebrow">Creative &amp; Film Studio · AMS × UTR</span>
        </div>
        <h1 className="hero-display" dangerouslySetInnerHTML={{
          __html: tweaks.heroText.replace(/\n/g, '<br/>') + `<span style="color:var(--accent)">.</span>`
        }} />
        {tweaks.showHeroBody && (
          <p className="hero-supporting">{tweaks.heroBody}</p>
        )}
        {tweaks.showHeroCtas && (
          <div className="hero-cta-row">
            <button className="btn primary" onClick={() => scrollTo('work')}><span>View Work →</span></button>
            <button className="btn secondary" onClick={() => scrollTo('contact')}><span>Get In Touch</span></button>
          </div>
        )}
      </div>

      {/* showreel meta strip (bottom-right) */}
      {tweaks.showReelMeta && (
        <div className="reel-meta">
          <span className="live-dot" />
          <span>Showreel · 2026 · 02:14</span>
        </div>
      )}

      {/* mute toggle (only meaningful when video provided) */}
      {useVideo && (
        <button className="reel-mute" onClick={() => setMuted(m => !m)} aria-label="Toggle sound">
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M11 5L6 9H2v6h4l5 4V5z"/>
              <path d="M15.54 8.46a5 5 0 010 7.07"/>
              <path d="M19.07 4.93a10 10 0 010 14.14"/>
            </svg>
          )}
        </button>
      )}
    </section>
  );
};

Object.assign(window, { Hero });
