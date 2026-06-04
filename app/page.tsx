"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type Modal =
  | { type: "import" }
  | { type: "material" }
  | { type: "need"; title: string; source: string }
  | { type: "cohort"; name: string; owner: string };

const needs = [
  {
    title: "Refund exception judgment",
    source: "Zendesk, QA, Slack",
    evidence: "31% more escalations and 14 QA misses in the last 7 days.",
    impact: "High",
    owner: "Nadia",
    status: "Ready to train",
    recommended: "Create scenario lab",
  },
  {
    title: "Billing handoff completeness",
    source: "Intercom, Gmail",
    evidence: "Context is missing in 22% of reopened billing cases.",
    impact: "Medium",
    owner: "Raka",
    status: "Needs review",
    recommended: "Build checklist",
  },
  {
    title: "Setup guide comprehension",
    source: "Knowledge base, CSAT",
    evidence: "High article usage, but customers still reopen setup tickets.",
    impact: "Medium",
    owner: "Maya",
    status: "Draft material",
    recommended: "Refresh lesson",
  },
];

const cohorts = [
  {
    name: "June B2B Support Ramp",
    owner: "Nadia",
    stage: "Live queue week 2",
    attendance: "94%",
    lift: "+23 pts",
    risk: "Low",
  },
  {
    name: "Billing Edge Case Clinic",
    owner: "Raka",
    stage: "Certification review",
    attendance: "89%",
    lift: "+18 pts",
    risk: "Medium",
  },
  {
    name: "Vendor Team QA Reset",
    owner: "Maya",
    stage: "30-day follow-up",
    attendance: "91%",
    lift: "+14 pts",
    risk: "Low",
  },
];

const materials = [
  ["Refund exception scenario lab", "Ready", "4 simulations", "Refund judgment"],
  ["Billing handoff checklist", "Draft", "12 checks", "Handoff quality"],
  ["Launch readiness quiz", "Live", "18 questions", "Product release"],
];

const outcomes = [
  ["QA score", "86", "+9 pts"],
  ["Escalation rate", "7.8%", "-3.1 pts"],
  ["Reopen rate", "11.4%", "-1.2 pts"],
  ["CSAT", "4.62", "+0.21"],
];

const nav = [
  ["Overview", "overview"],
  ["Needs", "needs"],
  ["Cohorts", "cohorts"],
  ["Materials", "materials"],
  ["Impact", "impact"],
  ["Integrations", "integrations"],
];

function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "risk";
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

export default function Home() {
  const [modal, setModal] = useState<Modal | null>(null);
  const [range, setRange] = useState("30 days");

  function jumpTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="app" id="overview">
      <aside className="sidebar">
        <div className="brand">
          <div className="mark">ST</div>
          <div>
            <strong>Support Trainer OS</strong>
            <span>Training intelligence</span>
          </div>
        </div>

        <nav className="nav">
          {nav.map(([label, id]) => (
            <button key={id} onClick={() => jumpTo(id)}>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p>Training operations</p>
            <h1>Training needs command center</h1>
          </div>

          <div className="topbar-actions">
            <div className="segmented" aria-label="Reporting range">
              {["7 days", "30 days", "90 days"].map((item) => (
                <button
                  className={range === item ? "active" : ""}
                  key={item}
                  onClick={() => setRange(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <button className="secondary" onClick={() => setModal({ type: "import" })}>
              Import data
            </button>
            <button className="primary" onClick={() => setModal({ type: "material" })}>
              New material
            </button>
          </div>
        </header>

        <section className="intro-grid">
          <article className="intro-card">
            <div className="section-label">Recommended focus</div>
            <h2>Train refund judgment before the next QA cycle.</h2>
            <p>
              The signal is not the highest volume issue, but it has the
              strongest business risk because it drives escalation, refund
              leakage, and customer trust concerns.
            </p>
            <div className="intro-actions">
              <button
                className="primary"
                onClick={() =>
                  setModal({
                    type: "need",
                    title: needs[0].title,
                    source: needs[0].source,
                  })
                }
              >
                Review recommendation
              </button>
              <button className="secondary" onClick={() => jumpTo("needs")}>
                View all needs
              </button>
            </div>
          </article>

          <article className="signal-card">
            <div>
              <span>Signal confidence</span>
              <strong>94%</strong>
            </div>
            <p>
              Based on ticket topics, QA misses, escalation notes, and Slack
              support-lead comments.
            </p>
            <div className="meter">
              <span />
            </div>
          </article>
        </section>

        <section className="metrics" aria-label="Training summary">
          {[
            ["Open needs", "8", "3 high priority"],
            ["Active trainees", "53", "+11 this week"],
            ["Avg post-test lift", "19 pts", "Across 3 cohorts"],
            ["Survey sentiment", "4.4 / 5", "28 responses"],
          ].map(([label, value, detail]) => (
            <article className="metric" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{detail}</small>
            </article>
          ))}
        </section>

        <section className="layout-grid">
          <section className="panel" id="needs">
            <div className="panel-header">
              <div>
                <span className="section-label">Needs inbox</span>
                <h2>Prioritized training needs</h2>
              </div>
              <Badge tone="warn">3 recommended</Badge>
            </div>

            <div className="needs-list">
              {needs.map((need) => (
                <article className="need-row" key={need.title}>
                  <div className="need-main">
                    <div className="need-title">
                      <h3>{need.title}</h3>
                      <Badge tone={need.impact === "High" ? "risk" : "warn"}>
                        {need.impact}
                      </Badge>
                    </div>
                    <p>{need.evidence}</p>
                    <div className="meta-line">
                      <span>{need.source}</span>
                      <span>Owner: {need.owner}</span>
                      <span>{need.status}</span>
                    </div>
                  </div>
                  <button
                    className="row-action"
                    onClick={() =>
                      setModal({
                        type: "need",
                        title: need.title,
                        source: need.source,
                      })
                    }
                  >
                    {need.recommended}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <aside className="side-column">
            <section className="panel compact" id="impact">
              <div className="panel-header slim">
                <h2>90-day impact</h2>
              </div>
              <div className="impact-grid">
                {outcomes.map(([label, value, delta]) => (
                  <div className="impact-item" key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                    <small>{delta}</small>
                  </div>
                ))}
              </div>
            </section>

            <section className="panel compact">
              <div className="panel-header slim">
                <h2>Today</h2>
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

        <section className="layout-grid">
          <section className="panel" id="cohorts">
            <div className="panel-header">
              <div>
                <span className="section-label">Cohorts</span>
                <h2>Readiness by training group</h2>
              </div>
            </div>
            <div className="cohort-list">
              {cohorts.map((cohort) => (
                <button
                  className="cohort-row"
                  key={cohort.name}
                  onClick={() =>
                    setModal({
                      type: "cohort",
                      name: cohort.name,
                      owner: cohort.owner,
                    })
                  }
                >
                  <div>
                    <strong>{cohort.name}</strong>
                    <span>{cohort.stage}</span>
                  </div>
                  <span>{cohort.attendance}</span>
                  <span>{cohort.lift}</span>
                  <Badge tone={cohort.risk === "Low" ? "good" : "warn"}>
                    {cohort.risk} risk
                  </Badge>
                </button>
              ))}
            </div>
          </section>

          <section className="panel" id="materials">
            <div className="panel-header">
              <div>
                <span className="section-label">Materials</span>
                <h2>Material pipeline</h2>
              </div>
              <button className="secondary" onClick={() => setModal({ type: "material" })}>
                Open builder
              </button>
            </div>
            <div className="material-list">
              {materials.map(([title, status, count, focus]) => (
                <article className="material-row" key={title}>
                  <div>
                    <h3>{title}</h3>
                    <span>
                      {count} · {focus}
                    </span>
                  </div>
                  <Badge tone={status === "Live" ? "good" : "neutral"}>
                    {status}
                  </Badge>
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="panel integrations" id="integrations">
          <div className="panel-header">
            <div>
              <span className="section-label">Data sources</span>
              <h2>Integration health</h2>
            </div>
            <Badge tone="good">6 connected</Badge>
          </div>
          <div className="integration-grid">
            {[
              "Zendesk",
              "Intercom",
              "Knowledge base",
              "Slack",
              "Google Calendar",
              "Gmail",
            ].map((source) => (
              <div className="integration" key={source}>
                <strong>{source}</strong>
                <span>Synced</span>
              </div>
            ))}
          </div>
        </section>
      </section>

      {modal ? <ModalView modal={modal} onClose={() => setModal(null)} /> : null}
    </main>
  );
}

function ModalView({
  modal,
  onClose,
}: {
  modal: Modal;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <section className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          x
        </button>

        {modal.type === "import" ? (
          <>
            <span className="section-label">Data import</span>
            <h2>Connect support signals</h2>
            <p>
              Bring ticket topics, QA misses, KB searches, survey responses,
              and escalation notes into one training-needs view.
            </p>
            <div className="connector-grid">
              {["Zendesk", "Intercom", "Slack", "Gmail", "Calendar", "Knowledge base"].map(
                (source) => (
                  <button key={source}>
                    <strong>{source}</strong>
                    <span>Connect</span>
                  </button>
                ),
              )}
            </div>
          </>
        ) : null}

        {modal.type === "material" ? (
          <>
            <span className="section-label">Material builder</span>
            <h2>Create training material</h2>
            <p>
              Draft a scenario, quiz, checklist, or live session from a support
              issue pattern.
            </p>
            <div className="form-grid">
              <label>
                Title
                <input defaultValue="Refund exception decision lab" />
              </label>
              <label>
                Format
                <select defaultValue="Scenario lab">
                  <option>Scenario lab</option>
                  <option>Quiz</option>
                  <option>Checklist</option>
                  <option>Live session</option>
                </select>
              </label>
              <label className="wide">
                Learning objective
                <textarea defaultValue="Agents can evaluate refund exception requests, communicate the policy clearly, and document their decision in the ticket." />
              </label>
            </div>
            <button className="primary modal-action" onClick={onClose}>
              Save draft
            </button>
          </>
        ) : null}

        {modal.type === "need" ? (
          <>
            <span className="section-label">Recommendation</span>
            <h2>{modal.title}</h2>
            <p>
              Source evidence: {modal.source}. This draft can become a scenario
              lab, checklist, or assessment path.
            </p>
            <div className="recommendation">
              <h3>Suggested scenario</h3>
              <p>
                A customer asks for an exception after missing the refund window
                by three days. They mention confusing guidance from a previous
                reply and say they may cancel.
              </p>
              <h3>Scoring rubric</h3>
              <ul>
                <li>Confirms account context before deciding.</li>
                <li>Applies the policy without sounding rigid.</li>
                <li>Escalates only when exception criteria are met.</li>
                <li>Documents the final decision clearly.</li>
              </ul>
            </div>
            <button className="primary modal-action" onClick={onClose}>
              Add to materials
            </button>
          </>
        ) : null}

        {modal.type === "cohort" ? (
          <>
            <span className="section-label">Cohort detail</span>
            <h2>{modal.name}</h2>
            <p>
              Trainer {modal.owner} is tracking assessment lift, attendance,
              coaching gaps, and post-training performance.
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
      </section>
    </div>
  );
}
