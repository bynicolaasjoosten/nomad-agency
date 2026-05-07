/* ProjectModal.jsx — full-screen project detail overlay */

const ProjectModal = ({ project, onClose }) => {
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-inner" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-video">
          <iframe
            src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&color=550022&byline=0&portrait=0&title=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
            title={project.title}
          />
        </div>

        <div className="modal-meta">
          <div className="modal-meta-left">
            <span className="section-label">
              <span className="num">{String(project.index + 1).padStart(2, '0')}</span>
              <span>{project.client}</span>
            </span>
            <h2 className="modal-title">{project.title}</h2>
          </div>
          <div className="modal-meta-right">
            <span className="modal-tag">{project.kind}</span>
            <span className="modal-tag">{project.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ProjectModal });
