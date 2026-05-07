/* App.jsx — root shell + tweaks wiring */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "videoUrl": "https://vimeo.com/1189931004",
  "heroText": "FOR BRANDS\nTHAT WANT\nTO BE FELT",
  "heroBody": "We make commercials, brand films, and social content for brands that are done blending in. An honest eye. A slow hand. No filler.",
  "showHeroBody": true,
  "showHeroCtas": true,
  "showReelMeta": true,
  "showVignette": true,
  "heroOverlay": 0.55,
  "heroVignette": 1,
  "heroSize": 8,
  "heroAlign": "flex-end",
  "grain": 0.08,
  "reelDuration": 24,
  "accent": "#550022",
  "gridCols": 2,
  "gridGap": 16,
  "showClients": true,
  "pagePad": 64,
  "pageMax": 1440,
  "sectionPad": 96
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

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
      <TopNav onHome={goHome} scrollTo={scrollTo} />
      <Hero tweaks={tweaks} scrollTo={scrollTo} />
      <WorkGrid tweaks={tweaks} />
      <Clients visible={tweaks.showClients} />
      <Manifesto />
      <StatRow />
      <ContactCTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Showreel">
          <TweakText
            label="Video URL (Vimeo or mp4)"
            value={tweaks.videoUrl}
            onChange={v => setTweak('videoUrl', v)}
            placeholder="https://vimeo.com/… or https://…mp4"
          />
          <TweakSlider
            label="Overlay darkness" min={0} max={0.9} step={0.05}
            value={tweaks.heroOverlay}
            onChange={v => setTweak('heroOverlay', v)}
          />
          <TweakSlider
            label="Vignette" min={0} max={1} step={0.05}
            value={tweaks.heroVignette}
            onChange={v => setTweak('heroVignette', v)}
          />
          <TweakToggle
            label="Vignette on" value={tweaks.showVignette}
            onChange={v => setTweak('showVignette', v)}
          />
          <TweakSlider
            label="Film grain" min={0} max={0.25} step={0.01}
            value={tweaks.grain}
            onChange={v => setTweak('grain', v)}
          />
          <TweakSlider
            label="Reel cycle (s)" min={8} max={60} step={2}
            value={tweaks.reelDuration}
            onChange={v => setTweak('reelDuration', v)}
          />
          <TweakToggle
            label="Reel meta strip" value={tweaks.showReelMeta}
            onChange={v => setTweak('showReelMeta', v)}
          />
        </TweakSection>

        <TweakSection label="Hero copy">
          <TweakText
            label="Headline (use \\n for breaks)"
            value={tweaks.heroText.replace(/\n/g, '\\n')}
            onChange={v => setTweak('heroText', v.replace(/\\n/g, '\n'))}
          />
          <TweakSlider
            label="Headline size (vw)" min={5} max={14} step={0.5}
            value={tweaks.heroSize}
            onChange={v => setTweak('heroSize', v)}
          />
          <TweakRadio
            label="Vertical align"
            value={tweaks.heroAlign}
            options={[
              { value: 'flex-start', label: 'Top' },
              { value: 'center', label: 'Mid' },
              { value: 'flex-end', label: 'Bottom' },
            ]}
            onChange={v => setTweak('heroAlign', v)}
          />
          <TweakToggle
            label="Body paragraph" value={tweaks.showHeroBody}
            onChange={v => setTweak('showHeroBody', v)}
          />
          <TweakToggle
            label="CTA buttons" value={tweaks.showHeroCtas}
            onChange={v => setTweak('showHeroCtas', v)}
          />
        </TweakSection>

        <TweakSection label="Work grid">
          <TweakRadio
            label="Columns"
            value={tweaks.gridCols}
            options={[
              { value: 2, label: '2 × 2' },
              { value: 3, label: '3 col' },
              { value: 4, label: '4 col' },
            ]}
            onChange={v => setTweak('gridCols', v)}
          />
          <TweakSlider
            label="Grid gap" min={0} max={48} step={2}
            value={tweaks.gridGap}
            onChange={v => setTweak('gridGap', v)}
          />
        </TweakSection>

        <TweakSection label="Brand">
          <TweakColor
            label="Accent"
            value={tweaks.accent}
            options={['#550022', '#7a0030', '#c1121f', '#0f3a2e', '#1a1a1a']}
            onChange={v => setTweak('accent', v)}
          />
        </TweakSection>

        <TweakSection label="Layout">
          <TweakSlider
            label="Page max-width" min={1080} max={1800} step={20}
            value={tweaks.pageMax}
            onChange={v => setTweak('pageMax', v)}
          />
          <TweakSlider
            label="Side padding" min={24} max={128} step={4}
            value={tweaks.pagePad}
            onChange={v => setTweak('pagePad', v)}
          />
          <TweakSlider
            label="Section padding" min={48} max={160} step={8}
            value={tweaks.sectionPad}
            onChange={v => setTweak('sectionPad', v)}
          />
          <TweakToggle
            label="Clients marquee" value={tweaks.showClients}
            onChange={v => setTweak('showClients', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
