/* TopNav.jsx */

const TopNav = ({ onHome, scrollTo }) => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav-fixed ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <span className="nav-wm" onClick={onHome}>NOMAD</span>
        <div className="nav-links">
          <span onClick={() => scrollTo('work')}>Work</span>
          <span onClick={() => scrollTo('manifesto')}>Studio</span>
          <span onClick={() => scrollTo('approach')}>Approach</span>
          <span onClick={() => scrollTo('contact')}>Contact</span>
        </div>
      </div>
    </nav>
  );
};

Object.assign(window, { TopNav });
