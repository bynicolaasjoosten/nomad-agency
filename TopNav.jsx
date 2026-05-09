/* TopNav.jsx */

const TopNav = ({ onHome, scrollTo, onAbout }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav-fixed ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-wm" onClick={onHome}>Nomad Agency</span>
        <div className="nav-links">
          <span onClick={() => scrollTo('work')}>Work</span>
          <span onClick={onAbout}>About</span>
          <button className="btn nav-cta" onClick={() => scrollTo('contact')}>
            <span>Get in touch →</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

Object.assign(window, { TopNav });
