/* WorkGrid.jsx — 2×2 grid, still images on cards, video in modal */

const DEFAULT_CASES = [
  {
    id: 'airup', title: 'AIR UP',
    client: 'Air Up', kind: 'Social', year: '2025',
    vimeoId: '1190095444',
    still: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=2000&q=80',
  },
  {
    id: 'pathe', title: 'PATHÉ',
    client: 'Pathé', kind: 'Aftermovie', year: '2025',
    vimeoId: '1190095162',
    still: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2000&q=80',
  },
  {
    id: 'maas', title: 'MAAS',
    client: 'MAAS', kind: 'Social', year: '2024',
    vimeoId: '1190095356',
    still: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=2000&q=80',
  },
  {
    id: 'samsung', title: 'SAMSUNG',
    client: 'Samsung', kind: 'Social', year: '2024',
    vimeoId: '1190095527',
    still: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=2000&q=80',
  },
];

const CaseCard = ({ item, index, editMode, Editable, onUpdate, onOpen }) => (
  <div className="case-card" onClick={!editMode ? onOpen : undefined}>
    <div className="case-img" style={{ backgroundImage: `url(${item.still})` }} />
    <div className="case-shade" />
    <div className="case-play-hint">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
    </div>
    <div className="case-meta-top">
      <Editable value={item.client} onChange={v => onUpdate(item.id, 'client', v)} editMode={editMode} />
      <span className="case-num">{String(index + 1).padStart(2, '0')}</span>
    </div>
    <div className="case-body">
      <Editable tag="div" className="case-title" style={{ whiteSpace: 'pre-line' }}
        value={item.title} onChange={v => onUpdate(item.id, 'title', v)} editMode={editMode} />
      <div className="case-kind">
        <Editable value={item.kind} onChange={v => onUpdate(item.id, 'kind', v)} editMode={editMode} />
        <span style={{ color: 'rgba(255,255,255,0.75)' }}> · </span>
        <Editable value={item.year} onChange={v => onUpdate(item.id, 'year', v)} editMode={editMode} />
        <span className="arrow">→</span>
      </div>
    </div>
  </div>
);

const WorkGrid = ({ tweaks, cases, updateCase, editMode, Editable, onOpenProject }) => (
  <section id="work" className="section" style={{
    '--grid-cols': tweaks.gridCols,
    '--grid-gap': tweaks.gridGap + 'px',
  }}>
    <div className="container">
      <div className="work-head">
        <div>
          <div className="section-label"><span className="num">01</span><span>Selected Work</span></div>
          <h2 className="h1" style={{ marginTop: 16, maxWidth: '14ch' }}>
            Films we made.<br/>Brands we kept.
          </h2>
        </div>
      </div>
      <div className="work-grid">
        {cases.map((c, i) => (
          <CaseCard key={c.id} item={c} index={i}
            editMode={editMode} Editable={Editable} onUpdate={updateCase}
            onOpen={() => onOpenProject({ ...c, index: i })} />
        ))}
      </div>
    </div>
  </section>
);

Object.assign(window, { WorkGrid, DEFAULT_CASES });
