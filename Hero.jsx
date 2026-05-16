/* Hero.jsx — full-bleed showreel hero */

const getVimeoId = (url) => {
  if (!url) return null;
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
};

const Hero = ({ tweaks, setTweak, scrollTo, editMode, Editable }) => {
  const videoRef = React.useRef(null);
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [tweaks.videoUrl, muted]);

  const fallbackFrames = [
    'https://images.unsplash.com/photo-1517462964-21fdcec3f25b?w=2000&q=80',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=2000&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=2000&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=2000&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=2000&q=80',
  ];

  const vimeoId = getVimeoId(tweaks.videoUrl);
  const isDirectVideo = !!tweaks.videoUrl && !vimeoId;
  const vimeoSrc = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&loop=1&muted=1&background=1&byline=0&title=0&portrait=0`
    : null;

  return (
    <section className="hero" style={{
      '--hero-overlay': tweaks.heroOverlay,
      '--hero-vignette': tweaks.heroVignette,
      '--grain': tweaks.grain,
      '--reel-duration': tweaks.reelDuration + 's',
      '--hero-align': tweaks.heroAlign,
      '--hero-size': (tweaks.heroSize || 4) + 'vw',
    }}>
      <div className="hero-media">
        {vimeoId ? (
          <iframe
            src={vimeoSrc}
            allow="autoplay; fullscreen; picture-in-picture"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '177.78vh', height: '56.25vw',
              minWidth: '100%', minHeight: '100%',
              transform: 'translate(-50%, -50%)',
              border: 0, pointerEvents: 'none',
            }}
            title="Showreel"
          />
        ) : isDirectVideo ? (
          <video ref={videoRef} src={tweaks.videoUrl} autoPlay loop muted={muted} playsInline />
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
          <Editable
            tag="span" className="eyebrow"
            value={tweaks.heroEyebrow || 'Creative & Film Agency · AMS × UTR'}
            onChange={v => setTweak('heroEyebrow', v)}
            editMode={editMode}
          />
        </div>
        {editMode ? (
          <h1 className="hero-display editable" style={{ whiteSpace: 'pre-wrap' }}
            contentEditable suppressContentEditableWarning
            onBlur={e => setTweak('heroText', e.currentTarget.innerText)}>
            {tweaks.heroText}
          </h1>
        ) : (
          <h1 className="hero-display" dangerouslySetInnerHTML={{
            __html: tweaks.heroText.replace(/\n/g, '<br/>') + '.'
          }} />
        )}
        {tweaks.showHeroBody && (
          <Editable
            tag="p" className="hero-supporting"
            value={tweaks.heroBody}
            onChange={v => setTweak('heroBody', v)}
            editMode={editMode}
          />
        )}
        {tweaks.showHeroCtas && (
          <div className="hero-cta-row">
            <button className="btn primary" onClick={() => scrollTo('work')}><span>View Work →</span></button>
            <button className="btn secondary" onClick={() => scrollTo('contact')}><span>Get In Touch</span></button>
          </div>
        )}
      </div>

      {tweaks.showReelMeta && (
        <div className="reel-meta">
          <span className="live-dot" />
          <span>Showreel · 2026 · 02:14</span>
        </div>
      )}

      {isDirectVideo && (
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
