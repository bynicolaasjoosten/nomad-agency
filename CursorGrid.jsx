/* CursorGrid.jsx — infinite scrolling grid revealed by cursor */

const CursorGrid = () => {
  const bgRef     = React.useRef(null);
  const revealRef = React.useRef(null);

  React.useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let animId;
    let ox = 0, oy = 0;
    const SPEED = 0.4;
    const SIZE  = 40;

    const onMove = (e) => {
      if (!revealRef.current) return;
      const mask = `radial-gradient(350px circle at ${e.clientX}px ${e.clientY}px, black, transparent)`;
      revealRef.current.style.maskImage       = mask;
      revealRef.current.style.webkitMaskImage = mask;
    };

    window.addEventListener('mousemove', onMove, { passive: true });

    const tick = () => {
      ox = (ox + SPEED) % SIZE;
      oy = (oy + SPEED) % SIZE;
      const pos = `${ox}px ${oy}px`;
      if (bgRef.current)     bgRef.current.style.backgroundPosition     = pos;
      if (revealRef.current) revealRef.current.style.backgroundPosition = pos;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const gridBg = [
    'linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
    'linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
  ].join(', ');

  const base = {
    position: 'absolute', inset: 0,
    backgroundImage: gridBg,
    backgroundSize: '40px 40px',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 48, pointerEvents: 'none', overflow: 'hidden' }}>
      <div ref={bgRef} style={{ ...base, opacity: 0.04 }} />
      <div ref={revealRef} style={{
        ...base, opacity: 0.3,
        maskImage:       'radial-gradient(350px circle at -9999px -9999px, black, transparent)',
        WebkitMaskImage: 'radial-gradient(350px circle at -9999px -9999px, black, transparent)',
      }} />
    </div>
  );
};

Object.assign(window, { CursorGrid });
