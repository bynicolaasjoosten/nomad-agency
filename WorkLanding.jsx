/* WorkLanding.jsx — Work overview: choose Films or Photography */

const WorkLanding = ({ onFilms, onPhotography }) => {
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="work-landing">
      <div className="work-landing-inner">
        <div className="section-label" style={{ marginBottom: 48 }}>
          <span className="num">01</span><span>Our Work</span>
        </div>
        <div className="work-landing-grid">
          <div className="work-landing-tile" onClick={onFilms}>
            <div className="work-landing-bg" style={{ backgroundImage: 'url(img-airup.png)' }} />
            <div className="work-landing-label">
              <span className="work-landing-title">Films</span>
              <span className="work-landing-sub">Commercials · Brand films · Social</span>
            </div>
          </div>
          <div className="work-landing-tile" onClick={onPhotography}>
            <div className="work-landing-bg" style={{ backgroundImage: 'url(img-samsung.jpg)' }} />
            <div className="work-landing-label">
              <span className="work-landing-title">Photography</span>
              <span className="work-landing-sub">Stills · Portraits · Editorial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { WorkLanding });
