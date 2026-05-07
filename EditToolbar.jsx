/* EditToolbar.jsx — floating toolbar for Tweaks panel + Edit Text mode */

const EditToolbar = ({ editMode, onToggleEdit }) => {
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  const toggleTweaks = () => {
    const next = !tweaksOpen;
    setTweaksOpen(next);
    window.postMessage({ type: next ? '__activate_edit_mode' : '__deactivate_edit_mode' }, '*');
  };

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e?.data?.type === '__edit_mode_dismissed') setTweaksOpen(false);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <div className="edit-toolbar">
      <button className={`edit-tb-btn ${tweaksOpen ? 'active' : ''}`} onClick={toggleTweaks}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
        </svg>
        Tweaks
      </button>
      <div className="edit-tb-divider" />
      <button className={`edit-tb-btn ${editMode ? 'active' : ''}`} onClick={onToggleEdit}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        {editMode ? 'Done editing' : 'Edit text'}
      </button>
      {editMode && (
        <div className="edit-tb-hint">Click any text to edit</div>
      )}
    </div>
  );
};

Object.assign(window, { EditToolbar });
