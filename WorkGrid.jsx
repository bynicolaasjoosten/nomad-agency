/* WorkGrid.jsx — 2×2 grid, still images on cards, video in modal */

const DEFAULT_CASES = [
  {
    id: 'airup', title: 'AIR UP',
    client: 'Air Up', kind: 'Social', year: '2026',
    vimeoId: '1190095444',
    still: 'img-airup.png',
  },
  {
    id: 'pathe', title: 'PATHÉ',
    client: 'Pathé', kind: 'Aftermovie', year: '2026',
    vimeoId: '1190095162',
    still: 'img-pathe.jpg',
  },
  {
    id: 'samsung', title: 'SAMSUNG',
    client: 'Samsung', kind: 'Social', year: '2025',
    vimeoId: '1190095527',
    still: 'img-samsung.jpg',
  },
];

const CaseCard = ({ item, editMode, Editable, onUpdate, onOpen }) => (
  <div className="case-card" onClick={!editMode ? onOpen : undefined}>
    <div className="case-img" style={{ backgroundImage: `url(${item.still})` }} />
    <div className="case-img-title">
      <Editable value={item.title} onChange={v => onUpdate(item.id, 'title', v)} editMode={editMode} />
    </div>
    <div className="case-img-date">
      <Editable value={item.year} onChange={v => onUpdate(item.id, 'year', v)} editMode={editMode} />
    </div>
  </div>
);

const WorkGrid = ({ tweaks, cases, updateCase, editMode, Editable, onOpenProject }) => (
  <section id="work" className="section">
    <div className="container">
      <div className="work-head">
        <div>
          <div className="section-label"><span className="num">01</span><span>Selected Work</span></div>
          <h2 className="h1" style={{ marginTop: 24, maxWidth: '14ch' }}>
            Films we made.
          </h2>
        </div>
      </div>
    </div>
    <div className="work-stack">
      {cases.map((c, i) => (
        <div key={c.id} className="stack-slot">
          <CaseCard item={c} index={i}
            editMode={editMode} Editable={Editable} onUpdate={updateCase}
            onOpen={() => onOpenProject({ ...c, index: i })} />
        </div>
      ))}
    </div>
  </section>
);

Object.assign(window, { WorkGrid, DEFAULT_CASES });
