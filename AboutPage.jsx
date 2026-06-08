/* AboutPage.jsx */

const AboutPage = ({ onBack }) => {
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="about-page">
      <div className="about-nav" style={{ display: 'none' }} />

      <div className="about-body-wrap">
        <div className="about-hero">
          <div className="section-label" style={{ color: 'rgba(0,0,0,0.4)' }}>
            <span className="num">04</span><span>About</span>
          </div>
          <h1 className="about-heading">
            A two-person agency<br/>built on intent.
          </h1>
          <p className="about-intro">
            Nomad Agency is a creative agency based in Amsterdam × Utrecht. We work at the intersection
            of film, brand, and social — making content that earns attention rather
            than interrupting it.
          </p>
        </div>

        <div className="about-team">
          <div className="about-team-item">
            <span className="about-team-role">Creative Lead</span>
            <p className="about-team-desc">
              Direction, cinematography, and the overall visual language of every project.
              Every frame is a decision.
            </p>
          </div>
          <div className="about-team-divider" />
          <div className="about-team-item">
            <span className="about-team-role">Marketing Lead</span>
            <p className="about-team-desc">
              Strategy, client relations, and ensuring every film drives results
              beyond the screen.
            </p>
          </div>
        </div>

        <div className="about-quote">
          <p className="about-quote-text">
            "Small enough to care about every frame.<br/>
            Focused enough to make them count."
          </p>
        </div>

        <div className="about-footer-row">
          <div>
            <span className="about-detail-label">Based in</span>
            <span className="about-detail-value">Amsterdam × Utrecht</span>
          </div>
          <div>
            <span className="about-detail-label">Founded</span>
            <span className="about-detail-value">2026</span>
          </div>
          <div>
            <span className="about-detail-label">Disciplines</span>
            <span className="about-detail-value">Film · Brand · Social</span>
          </div>
          <button className="btn secondary" onClick={onBack}>See our work →</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AboutPage });
