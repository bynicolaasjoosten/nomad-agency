/* Sections.jsx — Manifesto, Stats, Clients, Contact, Footer */

const Manifesto = ({ editMode, Editable }) => {
  const [line1, setLine1] = React.useState('Most brands\nwant to be seen');
  const [line2, setLine2] = React.useState('We help ours\nbe felt.');
  const [body, setBody]   = React.useState("Seen is an impression. Felt is a memory. We make commercials, brand films, and social content for brands that are done blending in. What holds it all together isn't format or platform — it's a point of view.");

  return (
    <section id="manifesto" className="manifesto">
      <div className="container">
        <div className="section-label"><span className="num">02</span><span>Manifesto</span></div>
        <div className="manifesto-block" style={{ marginTop: 40 }}>
          <Editable
            tag="p" className="manifesto-line" style={{ whiteSpace: 'pre-line' }}
            value={line1 + (editMode ? '' : '')}
            onChange={setLine1}
            editMode={editMode}
          />
          {!editMode && <span style={{ color: 'var(--accent)', fontSize: 'inherit', fontFamily: 'var(--font-display)', fontWeight: 900 }}>.</span>}
          <Editable
            tag="p" className="manifesto-line" style={{ marginTop: 24, whiteSpace: 'pre-line' }}
            value={line2}
            onChange={setLine2}
            editMode={editMode}
          />
          <Editable
            tag="p" className="body-lg muted" style={{ marginTop: 48, maxWidth: '52ch' }}
            value={body}
            onChange={setBody}
            editMode={editMode}
          />
        </div>
      </div>
    </section>
  );
};

const StatRow = () => {
  const items = [
    { value: '02', unit: '', label: 'Core team',      desc: 'One creative lead. One marketing lead.' },
    { value: '100', unit: '%', label: 'Independent',  desc: 'No holding company. No middleman.' },
  ];
  return (
    <section id="approach" className="section">
      <div className="container">
        <div className="section-label" style={{ marginBottom: 32 }}>
          <span className="num">03</span><span>By the numbers</span>
        </div>
        <div className="stat-row" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {items.map((it, i) => (
            <div key={i} className="stat-cell">
              <span className="stat-lbl">{it.label}</span>
              <span className="stat-num">{it.value}<span style={{ color: 'var(--accent)' }}>{it.unit}</span></span>
              <span className="stat-desc">{it.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Clients = ({ visible }) => {
  if (!visible) return null;
  const names = ['PATHÉ', 'SAMSUNG', 'AIR UP', 'TAMRON', 'GODOX'];
  const doubled = [...names, ...names];
  return (
    <section className="clients">
      <div className="clients-track">
        {doubled.map((n, i) => (
          <span key={i}>
            <span className="clients-sep">×</span> {n}
          </span>
        ))}
      </div>
    </section>
  );
};

const ContactCTA = ({ editMode, Editable }) => {
  const [heading, setHeading] = React.useState('Have something\nworth filming');
  const [body, setBody]       = React.useState("Send the brief, the budget, and the deadline. We'll come back fast.");

  const [name, setName]       = React.useState('');
  const [email, setEmail]     = React.useState('');
  const [message, setMessage] = React.useState('');
  const [sent, setSent]       = React.useState(false);
  const [sending, setSending] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('https://formsubmit.co/ajax/nomadagencynl@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setSent(true);
      }
    } catch {
      /* fallback: open mail client */
      const subject = encodeURIComponent(`New inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:nomadagencynl@gmail.com?subject=${subject}&body=${body}`;
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section" style={{ paddingTop: 128, paddingBottom: 128 }}>
      <div className="container">
        <div className="cta-grid">
          <div>
            <div className="section-label"><span className="num">04</span><span>Get in Touch</span></div>
            <Editable
              tag="h2" className="cta-head" style={{ marginTop: 24, whiteSpace: 'pre-line' }}
              value={heading}
              onChange={setHeading}
              editMode={editMode}
            />
            {!editMode && <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(40px,6vw,80px)' }}>?</span>}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingBottom: 12 }}>
            <Editable tag="p" className="body-lg" value={body} onChange={setBody} editMode={editMode} />
            {!editMode && !sent && (
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  className="contact-input"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
                <input
                  className="contact-input"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <textarea
                  className="contact-input contact-textarea"
                  placeholder="Tell us about your project"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                />
                <button type="submit" className="btn primary" style={{ alignSelf: 'flex-start' }} disabled={sending}>
                  <span>{sending ? 'Sending…' : 'Send message →'}</span>
                </button>
              </form>
            )}
            {!editMode && sent && (
              <div style={{ padding: '24px 0' }}>
                <p style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 8 }}>Message sent.</p>
                <p style={{ fontSize: 14, color: 'var(--white-70)' }}>We'll get back to you soon.</p>
              </div>
            )}
            <p style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--white-70)' }}>
              NOMAD AGENCY
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <span className="footer-wm">Nomad Agency</span>
          <p style={{ fontSize: 12, lineHeight: 1.8, color: 'var(--white-70)', marginTop: 14, maxWidth: '24ch' }}>
            Creative &amp; film studio<br/>Amsterdam × Utrecht
          </p>
        </div>
        <div>
          <span className="footer-lbl">Studio</span>
          <div className="footer-item">Work</div>
          <div className="footer-item">Team</div>
          <div className="footer-item">Contact</div>
        </div>
        <div>
          <span className="footer-lbl">Output</span>
          <div className="footer-item">Commercials</div>
          <div className="footer-item">Brand Films</div>
          <div className="footer-item">Social Content</div>
        </div>
        <div>
          <span className="footer-lbl">Connect</span>
          <a href="https://www.instagram.com/nomadagencynl/" target="_blank" rel="noopener noreferrer" className="footer-item">Instagram <span style={{ color: 'var(--accent)' }}>↗</span></a>
          <a href="https://www.tiktok.com/@nomadagencynl?_r=1&_t=ZG-96Aqmb0rZ7g" target="_blank" rel="noopener noreferrer" className="footer-item">TikTok <span style={{ color: 'var(--accent)' }}>↗</span></a>
          <div className="footer-item">LinkedIn <span style={{ color: 'var(--accent)' }}>↗</span></div>
          <div className="footer-item">nomadagencynl@gmail.com</div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 NOMAD Agency</span>
        <span>Made between AMS &amp; UTR</span>
      </div>
    </div>
  </footer>
);

Object.assign(window, { Manifesto, StatRow, Clients, ContactCTA, Footer });
