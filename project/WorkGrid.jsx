/* WorkGrid.jsx — 2x2 grid, 4:3 aspect */

const DEFAULT_CASES = [
  {
    id: 'lights',
    title: 'WHEN THE LIGHTS\nSTAY ON',
    client: 'KPN',
    kind: 'Brand Film',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=2000&q=80',
  },
  {
    id: 'salt',
    title: 'SALT OF\nTHE EARTH',
    client: 'Heineken',
    kind: 'Commercial',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=80',
  },
  {
    id: 'route',
    title: 'THE LONG\nWAY HOME',
    client: 'NS',
    kind: 'Social',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=2000&q=80',
  },
  {
    id: 'still',
    title: 'STILLNESS\nAS A VERB',
    client: 'Rituals',
    kind: 'Brand Film',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=2000&q=80',
  },
];

const CaseCard = ({ item, index, tweaks }) => (
  <div className="case-card">
    <div className="case-img" style={{ backgroundImage: `url(${item.image})` }} />
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
          <CaseCard key={c.id} item={c} index={i} tweaks={tweaks} />
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { WorkGrid, DEFAULT_CASES });
