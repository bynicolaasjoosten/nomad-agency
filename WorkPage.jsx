/* WorkPage.jsx — Dedicated work overview page, 3-column 4:3 grid */

const WorkPage = ({ cases, onClose, onOpenProject }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="work-page-overlay">
      <div className="work-page">
        <button className="work-page-close" onClick={onClose} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="work-page-inner">
          <div className="work-page-header">
            <div className="section-label">
              <span className="num">01</span><span>All Work</span>
            </div>
            <h1 className="h1" style={{ marginTop: 24 }}>Every film we made.</h1>
          </div>

          <div className="work-page-grid">
            {cases.map((c) => (
              <div
                key={c.id}
                className="work-page-card"
                onClick={() => onOpenProject(c)}
              >
                <div className="work-page-thumb">
                  <img src={c.still} alt={c.title} />
                </div>
                <div className="work-page-meta">
                  <span className="work-page-title">{c.title}</span>
                  <span className="work-page-kind">{c.kind} · {c.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { WorkPage });
