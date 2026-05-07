/* WorkGrid.jsx — 2×2 grid at 4:3 aspect ratio */

const DEFAULT_CASES = [
  {
    id: 'lights',
    title: 'WHEN THE LIGHTS\nSTAY ON',
    client: 'KPN',
    kind: 'Brand Film',
    year: '2025',
    vimeoId: '1190095444',
  },
  {
    id: 'salt',
    title: 'SALT OF\nTHE EARTH',
    client: 'Heineken',
    kind: 'Commercial',
    year: '2025',
    vimeoId: '1190095162',
  },
  {
    id: 'route',
    title: 'THE LONG\nWAY HOME',
    client: 'NS',
    kind: 'Social',
    year: '2024',
    vimeoId: '1190095356',
  },
  {
    id: 'still',
    title: 'STILLNESS\nAS A VERB',
    client: 'Rituals',
    kind: 'Brand Film',
    year: '2024',
    vimeoId: '1190095527',
  },
];

const CaseCard = ({ item, index }) => (
  <div className="case-card">
    <div className="case-video-wrap">
      <iframe
        src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=1&loop=1&muted=1&background=1&byline=0&title=0&portrait=0`}
        allow="autoplay; fullscreen"
        style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '133.34%',
          height: '100%',
          transform: 'translate(-50%, -50%)',
          border: 0,
          pointerEvents: 'none',
        }}
        title={item.title}
      />
    </div>
    <div className="case-shade" />
    <div className="case-meta-top">
      <span>{item.client}</span>
      <span className="case-num">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="case-body">
      <div className="case-title">{item.title}</div>
      <div className="case-kind">
        <span>{item.kind} · {item.year}</span>
        <span className="arrow">→</span>
      </div>
    </div>
  </div>
);

const WorkGrid = ({ tweaks }) => (
  <section
    id="work"
    className="section"
    style={{
      '--grid-cols': tweaks.gridCols,
      '--grid-gap': tweaks.gridGap + 'px',
    }}
  >
    <div className="container">
      <div className="work-head">
        <div>
          <div className="section-label"><span className="num">01</span><span>Selected Work</span></div>
          <h2 className="h1" style={{ marginTop: 16, maxWidth: '14ch' }}>
            Films we made.<br/>Brands we kept.
          </h2>
        </div>
        <span className="body muted" style={{ maxWidth: '32ch' }}>
          Four cases from the last two years. Click any tile for the full read.
        </span>
      </div>
      <div className="work-grid">
        {DEFAULT_CASES.map((c, i) => (
          <CaseCard key={c.id} item={c} index={i} />
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { WorkGrid, DEFAULT_CASES });
