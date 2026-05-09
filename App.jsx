/* App.jsx */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "videoUrl": "https://vimeo.com/1189931004",
  "heroText": "FOR BRANDS\nTHAT WANT\nTO BE FELT",
  "heroBody": "We make commercials, brand films, and social content for brands that are done blending in. An honest eye. A slow hand.",
  "heroEyebrow": "Creative & Film Studio · AMS × UTR",
  "showHeroBody": true,
  "showHeroCtas": true,
  "showReelMeta": false,
  "showVignette": false,
  "heroOverlay": 0,
  "heroVignette": 0,
  "heroSize": 4,
  "heroAlign": "flex-end",
  "grain": 0.06,
  "reelDuration": 24,
  "accent": "#550022",
  "gridCols": 2,
  "gridGap": 16,
  "showClients": true,
  "pagePad": 64,
  "pageMax": 1440,
  "sectionPad": 96
}/*EDITMODE-END*/;

const Editable = ({ value, onChange, editMode, tag: Tag = 'span', className, style }) => {
  const ref = React.useRef(null);
  const focused = React.useRef(false);

  React.useEffect(() => {
    if (ref.current && !focused.current) ref.current.innerText = value || '';
  }, [value]);

  if (!editMode) return <Tag className={className} style={style}>{value}</Tag>;

  return (
    <Tag
      ref={ref}
      className={`${className || ''} editable`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      onFocus={() => { focused.current = true; }}
      onBlur={e => { focused.current = false; onChange(e.currentTarget.innerText); }}
    >
      {value}
    </Tag>
  );
};

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [editMode, setEditMode]       = React.useState(false);
  const [devMode, setDevMode]         = React.useState(false);
  const [cases, setCases]             = React.useState(DEFAULT_CASES);
  const [activeProject, setActiveProject] = React.useState(null);
  const [showAbout, setShowAbout]         = React.useState(false);

  const updateCase = (id, field, val) =>
    setCases(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));

  // Secret trigger: press backtick (`) three times within 2 seconds
  React.useEffect(() => {
    let taps = 0, timer = null;
    const onKey = (e) => {
      if (e.key !== '`') return;
      taps++;
      clearTimeout(timer);
      if (taps >= 3) { setDevMode(m => !m); taps = 0; return; }
      timer = setTimeout(() => { taps = 0; }, 2000);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', tweaks.accent);
    r.style.setProperty('--page-pad', tweaks.pagePad + 'px');
    r.style.setProperty('--page-max', tweaks.pageMax + 'px');
    r.style.setProperty('--section-pad', tweaks.sectionPad + 'px');
  }, [tweaks.accent, tweaks.pagePad, tweaks.pageMax, tweaks.sectionPad]);



  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: 'smooth' });
  };
  const goHome = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <TopNav onHome={goHome} scrollTo={scrollTo} onAbout={() => setShowAbout(true)} />
      <Hero tweaks={tweaks} setTweak={setTweak} scrollTo={scrollTo} editMode={editMode} Editable={Editable} />
      <WorkGrid tweaks={tweaks} cases={cases} updateCase={updateCase} editMode={editMode} Editable={Editable} onOpenProject={setActiveProject} />
      <Clients visible={tweaks.showClients} />
      <Manifesto editMode={editMode} Editable={Editable} />
      <ContactCTA editMode={editMode} Editable={Editable} />
      <Footer />

      {activeProject && (
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      {showAbout && (
        <AboutPage onClose={() => setShowAbout(false)} />
      )}

      {devMode && (
        <EditToolbar editMode={editMode} onToggleEdit={() => setEditMode(m => !m)} />
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Showreel">
          <TweakText label="Video URL (Vimeo or mp4)" value={tweaks.videoUrl}
            onChange={v => setTweak('videoUrl', v)} placeholder="https://vimeo.com/…" />
          <TweakSlider label="Overlay darkness" min={0} max={0.9} step={0.05}
            value={tweaks.heroOverlay} onChange={v => setTweak('heroOverlay', v)} />
          <TweakSlider label="Vignette" min={0} max={1} step={0.05}
            value={tweaks.heroVignette} onChange={v => setTweak('heroVignette', v)} />
          <TweakToggle label="Vignette on" value={tweaks.showVignette}
            onChange={v => setTweak('showVignette', v)} />
          <TweakSlider label="Film grain" min={0} max={0.25} step={0.01}
            value={tweaks.grain} onChange={v => setTweak('grain', v)} />
          <TweakSlider label="Reel cycle (s)" min={8} max={60} step={2}
            value={tweaks.reelDuration} onChange={v => setTweak('reelDuration', v)} />
          <TweakToggle label="Reel meta strip" value={tweaks.showReelMeta}
            onChange={v => setTweak('showReelMeta', v)} />
        </TweakSection>
        <TweakSection label="Hero copy">
          <TweakText label="Headline (use \\n for breaks)"
            value={tweaks.heroText.replace(/\n/g, '\\n')}
            onChange={v => setTweak('heroText', v.replace(/\\n/g, '\n'))} />
          <TweakSlider label="Headline size (vw)" min={2} max={14} step={0.5}
            value={tweaks.heroSize} onChange={v => setTweak('heroSize', v)} />
          <TweakRadio label="Vertical align" value={tweaks.heroAlign}
            options={[{ value: 'flex-start', label: 'Top' }, { value: 'center', label: 'Mid' }, { value: 'flex-end', label: 'Bottom' }]}
            onChange={v => setTweak('heroAlign', v)} />
          <TweakToggle label="Body paragraph" value={tweaks.showHeroBody}
            onChange={v => setTweak('showHeroBody', v)} />
          <TweakToggle label="CTA buttons" value={tweaks.showHeroCtas}
            onChange={v => setTweak('showHeroCtas', v)} />
        </TweakSection>
        <TweakSection label="Work grid">
          <TweakRadio label="Columns" value={tweaks.gridCols}
            options={[{ value: 2, label: '2 × 2' }, { value: 3, label: '3 col' }, { value: 4, label: '4 col' }]}
            onChange={v => setTweak('gridCols', v)} />
          <TweakSlider label="Grid gap" min={0} max={48} step={2}
            value={tweaks.gridGap} onChange={v => setTweak('gridGap', v)} />
        </TweakSection>
        <TweakSection label="Brand">
          <TweakColor label="Accent" value={tweaks.accent}
            options={['#550022', '#7a0030', '#c1121f', '#0f3a2e', '#1a1a1a']}
            onChange={v => setTweak('accent', v)} />
        </TweakSection>
        <TweakSection label="Layout">
          <TweakSlider label="Page max-width" min={1080} max={1800} step={20}
            value={tweaks.pageMax} onChange={v => setTweak('pageMax', v)} />
          <TweakSlider label="Side padding" min={24} max={128} step={4}
            value={tweaks.pagePad} onChange={v => setTweak('pagePad', v)} />
          <TweakSlider label="Section padding" min={48} max={160} step={8}
            value={tweaks.sectionPad} onChange={v => setTweak('sectionPad', v)} />
          <TweakToggle label="Clients marquee" value={tweaks.showClients}
            onChange={v => setTweak('showClients', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
