"use client";

import { useMemo, useState } from "react";

type Modal =
  | { type: "import" }
  | { type: "material" }
  | { type: "drill"; title: string; source: string; risk: string }
  | { type: "cohort"; name: string; trainer: string; score: string };

const nav = [
  ["Overview", "top"],
  ["Signals", "signals"],
  ["Training Queue", "queue"],
  ["Cohorts", "cohorts"],
  ["Materials", "materials"],
  ["Automations", "automations"],
];

const signals = [
  {
    title: "Refund exception handling",
    reason: "Spike in escalations after the policy update. Agents are applying the rule correctly but missing judgment moments.",
    source: "Zendesk + QA + Slack",
    risk: "High",
    lift: "+31%",
    confidence: "94%",
    action: "Generate drill",
  },
  {
    title: "Billing handoff quality",
    reason: "Intercom-to-email handoffs lose plan context, causing repeat customer explanations and lower QA notes.",
    source: "Intercom + Gmail",
    risk: "Medium",
    lift: "+18%",
    confidence: "87%",
    action: "Build checklist",
  },
  {
    title: "Setup article mismatch",
    reason: "KB article views are high, but customers still reopen tickets after following the setup guide.",
    source: "KB search + CSAT",
    risk: "Medium",
    lift: "+12%",
    confidence: "79%",
    action: "Refresh lesson",
  },
];

const cohorts = [
  {
    name: "June B2B Support Ramp",
    trainer: "Nadia",
    stage: "Live queue week 2",
    score: "84",
    trend: "+19 pts",
    risk: "Low",
  },
  {
    name: "Billing Edge Case Clinic",
    trainer: "Raka",
    stage: "Certification review",
    score: "76",
    trend: "+18 pts",
    risk: "Medium",
  },
  {
    name: "Vendor Team QA Reset",
    trainer: "Maya",
    stage: "30-day follow-up",
    score: "81",
    trend: "+14 pts",
    risk: "Low",
  },
];

const materials = [
  ["Refund exception roleplay", "Ready", "4 simulations", "QA misses"],
  ["Billing investigation path", "Draft", "6 lessons", "42 tickets"],
  ["Launch readiness quiz", "Live", "18 questions", "Post-test"],
];

const automations = [
  ["Zendesk topic sync", "Every 6 hours", "Healthy"],
  ["Slack escalation watcher", "Real time", "Healthy"],
  ["30/60/90 cohort pulse", "Weekly", "Scheduled"],
  ["Post-training survey", "After session", "Ready"],
];

const outcomes = [
  ["QA score", "86", "+9 pts"],
  ["Escalation rate", "7.8%", "-3.1 pts"],
  ["Reopen rate", "11.4%", "-1.2 pts"],
  ["CSAT", "4.62", "+0.21"],
];

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "risk" | "dark";
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export default function Home() {
  const [modal, setModal] = useState<Modal | null>(null);
  const [activeView, setActiveView] = useState("Week");

  const queueHealth = useMemo(() => {
    const high = signals.filter((signal) => signal.risk === "High").length;
    return high === 0 ? "Stable" : `${high} urgent signal`;
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="product-shell" id="top">
      <aside className="rail">
        <div className="brand">
          <div className="brand-orb">ST</div>
          <div>
            <strong>Support Trainer OS</strong>
            <span>Training intelligence suite</span>
          </div>
        </div>

        <nav className="rail-nav">
          {nav.map(([label, id]) => (
            <button key={id} onClick={() => scrollTo(id)}>
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="rail-card">
          <span>Queue health</span>
          <strong>{queueHealth}</strong>
          <p>Signals are ranked by volume, business risk, and coaching impact.</p>
        </div>
      </aside>

      <section className="workspace">
        <header className="command-bar">
          <div className="search-pill">
            <span>Search tickets, cohorts, skills...</span>
            <kbd>/</kbd>
          </div>
          <div className="segmented">
            {["Day", "Week", "Month"].map((view) => (
              <button
                className={activeView === view ? "selected" : ""}
                key={view}
                onClick={() => setActiveView(view)}
              >
                {view}
              </button>
            ))}
          </div>
          <button className="ghost-button" onClick={() => setModal({ type: "import" })}>
            Import
          </button>
          <button className="primary-button" onClick={() => setModal({ type: "material" })}>
            New material
          </button>
        </header>

        <section className="hero-grid">
          <div className="hero-panel">
            <Badge tone="dark">Live training operations</Badge>
            <h1>Turn support noise into measurable agent readiness.</h1>
            <p>
              A command center for trainers to detect knowledge gaps, create
              targeted exercises, run assessments, and prove 90-day support
              performance improvement.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={() => scrollTo("queue")}>
                Review training queue
              </button>
              <button className="ghost-button" onClick={() => setModal({ type: "import" })}>
                Connect data sources
              </button>
            </div>
          </div>

          <div className="insight-panel">
            <div className="pulse-header">
              <span>AI signal summary</span>
              <Badge tone="good">Updated 4 min ago</Badge>
            </div>
            <h2>Refund exceptions should be trained before the next QA cycle.</h2>
            <p>
              The issue has lower volume than password reset, but the impact is
              higher because it drives escalation, refund leakage, and customer
              trust risk.
            </p>
            <div className="signal-meter">
              <span style={{ width: "82%" }} />
            </div>
            <small>82% training priority score</small>
          </div>
        </section>

        <section className="metric-grid">
          {[
            ["Active trainees", "53", "+11 this week"],
            ["Avg post-test lift", "19 pts", "Across 3 cohorts"],
            ["Open skill gaps", "8", "3 high priority"],
            ["Survey sentiment", "4.4/5", "28 responses"],
          ].map(([label, value, detail]) => (
            <article className="metric-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </section>

        <section className="two-column" id="signals">
          <section className="glass-panel" id="queue">
            <div className="panel-heading">
              <div>
                <span className="overline">Prioritized work</span>
                <h2>Training intelligence queue</h2>
              </div>
              <Badge tone="warn">3 recommended</Badge>
            </div>

            <div className="queue-list">
              {signals.map((signal, index) => (
                <article className="queue-row" key={signal.title}>
                  <div className="queue-index">{index + 1}</div>
                  <div className="queue-main">
                    <div className="queue-title">
                      <h3>{signal.title}</h3>
                      <Badge tone={signal.risk === "High" ? "risk" : "warn"}>
                        {signal.risk}
                      </Badge>
                    </div>
                    <p>{signal.reason}</p>
                    <div className="queue-meta">
                      <span>{signal.source}</span>
                      <strong>{signal.lift} volume</strong>
                      <span>{signal.confidence} confidence</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setModal({
                        type: "drill",
                        title: signal.title,
                        source: signal.source,
                        risk: signal.risk,
                      })
                    }
                  >
                    {signal.action}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <aside className="stack">
            <section className="glass-panel compact-panel">
              <div className="panel-heading compact">
                <h2>90-day impact</h2>
                <Badge tone="good">Improving</Badge>
              </div>
              <div className="outcome-grid">
                {outcomes.map(([label, value, delta]) => (
                  <div className="outcome-card" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{delta}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-panel compact-panel">
              <div className="panel-heading compact">
                <h2>Today</h2>
                <Badge>3 sessions</Badge>
              </div>
              <div className="timeline">
                {[
                  ["09:30", "Refund Exceptions Lab", "12 attending"],
                  ["13:00", "Release Ticket Simulation", "Pre-test open"],
                  ["16:00", "QA Calibration Review", "Scorecards ready"],
                ].map(([time, title, note]) => (
                  <div className="timeline-row" key={title}>
                    <time>{time}</time>
                    <div>
                      <strong>{title}</strong>
                      <span>{note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="two-column">
          <section className="glass-panel" id="cohorts">
            <div className="panel-heading">
              <div>
                <span className="overline">Readiness</span>
                <h2>Cohort command board</h2>
              </div>
            </div>
            <div className="cohort-grid">
              {cohorts.map((cohort) => (
                <button
                  className="cohort-card"
                  key={cohort.name}
                  onClick={() =>
                    setModal({
                      type: "cohort",
                      name: cohort.name,
                      trainer: cohort.trainer,
                      score: cohort.score,
                    })
                  }
                >
                  <div>
                    <h3>{cohort.name}</h3>
                    <span>{cohort.stage}</span>
                  </div>
                  <div className="score-ring">
                    <strong>{cohort.score}</strong>
                    <small>{cohort.trend}</small>
                  </div>
                  <footer>
                    <span>Trainer {cohort.trainer}</span>
                    <Badge tone={cohort.risk === "Low" ? "good" : "warn"}>
                      {cohort.risk} risk
                    </Badge>
                  </footer>
                </button>
              ))}
            </div>
          </section>

          <section className="glass-panel" id="materials">
            <div className="panel-heading">
              <div>
                <span className="overline">Content ops</span>
                <h2>Material studio</h2>
              </div>
              <button className="ghost-button" onClick={() => setModal({ type: "material" })}>
                Open studio
              </button>
            </div>
            <div className="material-stack">
              {materials.map(([title, status, count, source]) => (
                <article className="material-row" key={title}>
                  <div>
                    <h3>{title}</h3>
                    <span>{count} · {source}</span>
                  </div>
                  <Badge tone={status === "Live" ? "good" : "neutral"}>{status}</Badge>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="glass-panel automation-panel" id="automations">
          <div className="panel-heading">
            <div>
              <span className="overline">Workflow layer</span>
              <h2>Automation and integration health</h2>
            </div>
            <Badge tone="good">6 sources connected</Badge>
          </div>
          <div className="automation-grid">
            {automations.map(([name, cadence, status]) => (
              <article className="automation-card" key={name}>
                <span>{cadence}</span>
                <strong>{name}</strong>
                <Badge tone={status === "Healthy" ? "good" : "neutral"}>{status}</Badge>
              </article>
            ))}
          </div>
        </section>
      </section>

      {modal ? <DemoModal modal={modal} onClose={() => setModal(null)} /> : null}
    </main>
  );
}

function DemoModal({ modal, onClose }: { modal: Modal; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          x
        </button>

        {modal.type === "import" ? (
          <>
            <span className="overline">Data layer</span>
            <h2>Connect support intelligence</h2>
            <p>
              Pull customer issue trends, QA misses, KB searches, survey
              feedback, and escalation notes into one training-needs engine.
            </p>
            <div className="connector-grid">
              {["Zendesk", "Intercom", "Slack", "Gmail", "Calendar", "Knowledge base"].map(
                (source) => (
                  <button key={source}>
                    <strong>{source}</strong>
                    <span>Connect source</span>
                  </button>
                ),
              )}
            </div>
          </>
        ) : null}

        {modal.type === "material" ? (
          <>
            <span className="overline">Material studio</span>
            <h2>Create a training asset</h2>
            <p>
              Draft scenario-based material from issue signals, then assign it
              to a cohort with pre-test and post-test measurement.
            </p>
            <div className="form-grid">
              <label>
                Title
                <input defaultValue="Refund exception decision lab" />
              </label>
              <label>
                Format
                <select defaultValue="Simulation">
                  <option>Simulation</option>
                  <option>Quiz</option>
                  <option>Checklist</option>
                  <option>Live session</option>
                </select>
              </label>
              <label className="wide">
                Learning goal
                <textarea defaultValue="Agents can decide when a refund exception is allowed, communicate the policy with empathy, and document the decision clearly." />
              </label>
            </div>
            <button className="primary-button modal-action" onClick={onClose}>
              Save draft
            </button>
          </>
        ) : null}

        {modal.type === "drill" ? (
          <>
            <span className="overline">Generated drill</span>
            <h2>{modal.title}</h2>
            <p>
              Drafted from {modal.source}. Risk level: {modal.risk}. This can
              be assigned to a cohort as a simulation or converted into a quiz.
            </p>
            <div className="drill-preview">
              <h3>Customer scenario</h3>
              <p>
                A customer requests an exception after missing the refund window
                by three days. They mention confusing guidance from a previous
                reply and say they may cancel.
              </p>
              <h3>Scoring rubric</h3>
              <ul>
                <li>Confirms customer timeline and account context.</li>
                <li>Applies policy without sounding rigid.</li>
                <li>Escalates only when exception criteria are met.</li>
                <li>Documents evidence and final decision in the ticket.</li>
              </ul>
            </div>
            <button className="primary-button modal-action" onClick={onClose}>
              Add to material studio
            </button>
          </>
        ) : null}

        {modal.type === "cohort" ? (
          <>
            <span className="overline">Cohort view</span>
            <h2>{modal.name}</h2>
            <p>
              Trainer {modal.trainer} is monitoring certification readiness,
              coaching gaps, and live queue behavior. Current readiness score:
              {` ${modal.score}`}.
            </p>
            <div className="detail-grid">
              <div>
                <span>Certification</span>
                <strong>On track</strong>
              </div>
              <div>
                <span>Open coaching</span>
                <strong>4 agents</strong>
              </div>
              <div>
                <span>Next checkpoint</span>
                <strong>Day 30</strong>
              </div>
              <div>
                <span>Top gap</span>
                <strong>Policy judgment</strong>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
