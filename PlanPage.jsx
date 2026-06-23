/* PlanPage.jsx — Plan detail page with tabs */

const PLANS = {
  starter: {
    name: 'Starter',
    price: '€799',
    badge: null,
    description: 'Voor merken die een eerste stap willen zetten met kwalitatief videocontent. Eén strakke commercial, volledig afgeleverd — klaar om te posten.',
    features: [
      '1 commercial van 30 seconden',
      'Professionele crew on set',
      'Volledige montage inbegrepen',
      'Aflevering binnen 5 werkdagen',
    ],
    cta: 'Start Starter →',
    timeline: [
      { label: 'Briefing & concept', value: 'Dag 1' },
      { label: 'Opnamedag', value: 'Dag 2–3' },
      { label: 'Montage', value: 'Dag 4' },
      { label: 'Oplevering', value: 'Dag 5' },
    ],
    fit: 'Startende merken · Eerste social campaign · Productlancering',
    faq: {
      q: 'Kan ik later upgraden naar Growth?',
      a: 'Ja, altijd. Geen verplichte looptijd.',
    },
  },
  growth: {
    name: 'Growth',
    price: '€1.699',
    badge: 'Most chosen',
    description: 'Voor groeiende merken die consistent zichtbaar willen zijn. Twee producties per maand, met een dedicated Creative Director die jouw merk begrijpt.',
    features: [
      '2 producties per maand',
      'Behind-the-scenes inbegrepen',
      'Dedicated Creative Director',
      'Priority scheduling',
    ],
    cta: 'Start Growth →',
    timeline: [
      { label: 'Maandelijkse briefing', value: 'Week 1' },
      { label: 'Productie #1', value: 'Week 1–2' },
      { label: 'Productie #2', value: 'Week 3–4' },
      { label: 'Review & oplevering', value: 'Doorlopend' },
    ],
    fit: 'Scale-ups · Merken met actieve social kanalen · Maandelijkse campagnes',
    faq: {
      q: 'Kan ik zelf bepalen wat de twee producties zijn?',
      a: 'Ja, we bepalen samen in de briefing wat het meeste oplevert.',
    },
  },
  partner: {
    name: 'Partner',
    price: '€3.499',
    badge: null,
    description: 'Voor serieuze merken die content als strategisch wapen inzetten. Vier producties, een vaste creatieve lijn en directe toegang tot onze Creative Director.',
    features: [
      '4 producties per maand',
      'Maandelijkse strategiesessie',
      'Eerste keus uit crew community',
      'Directe lijn met de Creative Director',
    ],
    cta: 'Become a partner →',
    timeline: [
      { label: 'Strategiesessie', value: 'Week 1' },
      { label: 'Productie #1 & #2', value: 'Week 1–2' },
      { label: 'Productie #3 & #4', value: 'Week 3–4' },
      { label: 'Review & oplevering', value: 'Doorlopend' },
    ],
    fit: 'Gevestigde merken · E-commerce · Meerdere campagnes tegelijk',
    faq: {
      q: 'Is er een minimale contractduur?',
      a: 'We werken met een maand-op-maand model. Geen lange verplichtingen.',
    },
  },
};

const PlanPage = ({ initialPlan = 'starter', onContact }) => {
  const [active, setActive] = React.useState(initialPlan);
  const plan = PLANS[active];

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  React.useEffect(() => {
    setActive(initialPlan);
  }, [initialPlan]);

  return (
    <div className="work-page">
      <div className="plan-page-inner">

        <div className="section-label" style={{ marginBottom: 32 }}>
          <span className="num">01</span><span>Plans</span>
        </div>
        <h1 className="h1" style={{ marginBottom: 40 }}>Our packages.</h1>

        {/* Tabs */}
        <div className="plan-tabs">
          {Object.keys(PLANS).map(key => (
            <button
              key={key}
              className={`plan-tab ${active === key ? 'plan-tab--active' : ''}`}
              onClick={() => setActive(key)}
            >
              {PLANS[key].name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="plan-grid">

          {/* Left — price + features */}
          <div>
            {plan.badge && (
              <span className="pricing-badge" style={{ marginBottom: 16, display: 'inline-block' }}>{plan.badge}</span>
            )}
            <p className="plan-price">{plan.price}</p>
            <p className="plan-per">per month</p>
            <p className="plan-desc-long">{plan.description}</p>

            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>

            <button className="pricing-btn pricing-btn--primary" onClick={onContact}>
              {plan.cta}
            </button>
          </div>

          {/* Right — info blocks */}
          <div className="plan-info-col">
            <div className="plan-info-block">
              <p className="plan-info-label">Tijdlijn</p>
              {plan.timeline.map((t, i) => (
                <div key={i} className="plan-timeline-row">
                  <span>{t.label}</span>
                  <span>{t.value}</span>
                </div>
              ))}
            </div>

            <div className="plan-info-block">
              <p className="plan-info-label">Geschikt voor</p>
              <p className="plan-info-body">{plan.fit}</p>
            </div>

            <div className="plan-info-block">
              <p className="plan-info-label">Veelgestelde vraag</p>
              <p className="plan-info-body">
                {plan.faq.q}<br />
                <span style={{ color: 'rgba(255,255,255,0.35)', marginTop: 6, display: 'block' }}>{plan.faq.a}</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PlanPage });
