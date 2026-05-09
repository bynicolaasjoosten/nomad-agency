/* TopNav.jsx */

const TopNav = ({ onHome, scrollTo, onAbout }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 80 && y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav-fixed ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
      <div className="nav-inner">
        <span className="nav-wm" onClick={onHome}>Nomad Agency</span>
        <div className="nav-links">
          <span onClick={() => scrollTo('work')}>Work</span>
          <span onClick={onAbout}>About</span>
          <span onClick={() => scrollTo('contact')}>Get in touch</span>
        </div>
      </div>
    </nav>
  );
};

Object.assign(window, { TopNav });
