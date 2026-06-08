/* WorkPage.jsx — Dedicated work overview page, 3-column 4:3 grid */

const WorkPage = ({ cases, onBack, onOpenProject, onContact }) => {
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="work-page">
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

        <div className="page-cta">
          <button className="btn primary" onClick={onContact}>
            <span>Get in touch →</span>
          </button>
        </div>
    </div>
  );
};

Object.assign(window, { WorkPage });
