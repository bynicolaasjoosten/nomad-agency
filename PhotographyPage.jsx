/* PhotographyPage.jsx — Photography overview, 3-column grid */

const DEFAULT_PHOTOS = [
  // { id: 'photo-1', src: 'img-example.jpg', title: 'Title', year: '2026' },
];

const PhotographyPage = ({ onBack, onContact }) => {
  const [photos] = React.useState(DEFAULT_PHOTOS);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="work-page">
      <div className="work-page-inner">
        <div className="work-page-header">
          <div className="section-label">
            <span className="num">02</span><span>Photography</span>
          </div>
          <h1 className="h1" style={{ marginTop: 24 }}>Stills we made.</h1>
        </div>

        {photos.length === 0 ? (
          <p className="body-lg muted" style={{ marginTop: 48 }}>Coming soon.</p>
        ) : (
          <div className="work-page-grid">
            {photos.map((p) => (
              <div key={p.id} className="work-page-card">
                <div className="work-page-thumb">
                  <img src={p.src} alt={p.title} />
                </div>
                <div className="work-page-meta">
                  <span className="work-page-title">{p.title}</span>
                  <span className="work-page-kind">{p.year}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

        <div className="page-cta">
          <h2 className="h1">Need stills<br/>that speak?</h2>
          <p className="body-lg muted" style={{ marginTop: 20 }}>Tell us what you have in mind.</p>
          <button className="btn primary" style={{ marginTop: 36 }} onClick={onContact}>
            <span>Get in touch →</span>
          </button>
        </div>
    </div>
  );
};

Object.assign(window, { PhotographyPage });
