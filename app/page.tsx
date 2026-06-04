"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type Modal =
  | { type: "import" }
  | { type: "material" }
  | { type: "drill"; title: string; source: string }
  | { type: "cohort"; name: string; trainer: string };

const trainingNeeds = [
  {
    title: "Refund exception handling",
    reason: "Escalations are rising after recent policy changes.",
    source: "Zendesk, QA, Slack",
    impact: "High",
    lift: "+31%",
    action: "Create scenario drill",
  },
  {
    title: "Billing handoff quality",
    reason: "Agents miss key context when moving cases from Intercom to email.",
    source: "Intercom, Gmail",
    impact: "Medium",
    lift: "+18%",
    action: "Update handoff checklist",
  },
  {
    title: "Setup article mismatch",
    reason: "KB searches are successful, but related tickets still reopen.",
    source: "Knowledge base, CSAT",
    impact: "Medium",
    lift: "+12%",
    action: "Refresh lesson",
  },
];

const cohorts = [
  {
    name: "June B2B Support Ramp",
    trainer: "Nadia",
    attendance: "94%",
    pre: "61%",
    post: "84%",
    certified: "12 / 18",
  },
  {
    name: "Billing Edge Case Clinic",
    trainer: "Raka",
    attendance: "89%",
    pre: "58%",
    post: "76%",
    certified: "5 / 9",
  },
  {
    name: "Vendor Team QA Reset",
    trainer: "Maya",
    attendance: "91%",
    pre: "67%",
    post: "81%",
    certified: "19 / 26",
  },
];

const sessions = [
  { time: "09:30", title: "Refund Exceptions Lab", meta: "12 attending" },
  { time: "13:00", title: "Release Ticket Simulation", meta: "Pre-test open" },
  { time: "16:00", title: "QA Calibration Review", meta: "Scorecards ready" },
];

const materials = [
  {
    title: "Refund exception roleplay",
    status: "Ready",
    detail: "4 realistic customer scenarios generated from QA misses.",
  },
  {
    title: "Billing investigation path",
    status: "Draft",
    detail: "Six-step lesson built from 42 recent billing tickets.",
  },
  {
    title: "Launch readiness quiz",
    status: "Live",
    detail: "18-question post-test closes today at 18:00.",
  },
];

const outcomes = [
  { label: "QA score", value: "86", delta: "+9 pts" },
  { label: "Escalation rate", value: "7.8%", delta: "-3.1 pts" },
  { label: "Reopen rate", value: "11.4%", delta: "-1.2 pts" },
  { label: "CSAT", value: "4.62", delta: "+0.21" },
];

const skills = [
  { label: "Policy judgment", value: 58, target: 85 },
  { label: "Troubleshooting depth", value: 72, target: 88 },
  { label: "Tone under pressure", value: 69, target: 84 },
  { label: "Handoff quality", value: 63, target: 82 },
];

const integrations = [
  "Zendesk",
  "Intercom",
  "Knowledge base",
  "Slack",
  "Google Calendar",
  "Gmail",
];

const navItems = [
  ["Command center", "top"],
  ["Training needs", "needs"],
  ["Cohorts", "cohorts"],
  ["Materials", "materials"],
  ["Assessments", "assessment"],
  ["90-day impact", "impact"],
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

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="progress">
      <span style={{ width: `${value}%` }} />
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState<Modal | null>(null);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <main className="page" id="top">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">ST</span>
          <div>
            <strong>Support Trainer OS</strong>
            <small>Training intelligence</small>
          </div>
        </div>

        <nav>
          {navItems.map(([item, id], index) => (
            <button
              className={index === 0 ? "active" : ""}
              key={item}
              onClick={() => scrollToSection(id)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="workspace">
        <header className="hero">
          <div>
            <p className="eyebrow">Thursday, June 4, 2026</p>
            <h1>Training impact command center</h1>
            <p className="hero-copy">
              Turn live support signals into training plans, then track whether
              each cohort actually improves in the queue.
            </p>
          </div>

          <div className="hero-actions">
            <button onClick={() => setModal({ type: "import" })}>
              Import support data
            </button>
            <button className="primary" onClick={() => setModal({ type: "material" })}>
              Create material
            </button>
          </div>
        </header>

        <section className="summary-strip" aria-label="Training summary">
          {[
            ["Active trainees", "53", "+11 this week"],
            ["Post-test lift", "19 pts", "Average gain"],
            ["Priority gaps", "3", "Need trainer action"],
            ["Survey score", "4.4/5", "28 responses"],
          ].map(([label, value, note]) => (
            <div className="summary-item" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </div>
          ))}
        </section>

        <section className="priority-layout" id="needs">
          <section className="panel main-priority">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Recommended next</p>
                <h2>Training needs queue</h2>
              </div>
              <Badge tone="warn">3 actions</Badge>
            </div>

            <div className="needs-list">
              {trainingNeeds.map((need, index) => (
                <article className="need-row" key={need.title}>
                  <div className="rank">{index + 1}</div>
                  <div>
                    <div className="row-title">
                      <h3>{need.title}</h3>
                      <Badge tone={need.impact === "High" ? "risk" : "warn"}>
                        {need.impact}
                      </Badge>
                    </div>
                    <p>{need.reason}</p>
                    <div className="row-meta">
                      <span>{need.source}</span>
                      <strong>{need.lift} volume</strong>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setModal({
                        type: "drill",
                        title: need.title,
                        source: need.source,
                      })
                    }
                  >
                    {need.action}
                  </button>
                </article>
              ))}
            </div>
          </section>

          <aside className="side-stack">
            <section className="panel" id="assessment">
              <div className="section-heading compact">
                <h2>Today</h2>
                <Badge>3 sessions</Badge>
              </div>
              <div className="session-list">
                {sessions.map((session) => (
                  <article className="session-row" key={session.title}>
                    <time>{session.time}</time>
                    <div>
                      <strong>{session.title}</strong>
                      <span>{session.meta}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel" id="impact">
              <div className="section-heading compact">
                <h2>90-day impact</h2>
              </div>
              <div className="outcome-grid">
                {outcomes.map((outcome) => (
                  <div className="outcome" key={outcome.label}>
                    <span>{outcome.label}</span>
                    <strong>{outcome.value}</strong>
                    <small>{outcome.delta}</small>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </section>

        <section className="lower-grid">
          <section className="panel" id="cohorts">
            <div className="section-heading compact">
              <h2>Cohort readiness</h2>
            </div>
            <div className="cohort-table">
              <div className="table-head">
                <span>Cohort</span>
                <span>Attendance</span>
                <span>Pre</span>
                <span>Post</span>
                <span>Certified</span>
              </div>
              {cohorts.map((cohort) => (
                <button
                  className="cohort-row"
                  key={cohort.name}
                  onClick={() =>
                    setModal({
                      type: "cohort",
                      name: cohort.name,
                      trainer: cohort.trainer,
                    })
                  }
                >
                  <div>
                    <strong>{cohort.name}</strong>
                    <small>Trainer {cohort.trainer}</small>
                  </div>
                  <span>{cohort.attendance}</span>
                  <span>{cohort.pre}</span>
                  <span>{cohort.post}</span>
                  <span>{cohort.certified}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="section-heading compact">
              <h2>Skill gaps</h2>
            </div>
            <div className="skill-list">
              {skills.map((skill) => (
                <article className="skill-row" key={skill.label}>
                  <div>
                    <strong>{skill.label}</strong>
                    <small>
                      {skill.value}% current / {skill.target}% target
                    </small>
                  </div>
                  <ProgressBar value={skill.value} />
                </article>
              ))}
            </div>
          </section>
        </section>

        <section className="lower-grid">
          <section className="panel" id="materials">
            <div className="section-heading compact">
              <h2>Material builder</h2>
              <button className="ghost" onClick={() => setModal({ type: "material" })}>
                Open library
              </button>
            </div>
            <div className="material-list">
              {materials.map((material) => (
                <article className="material-row" key={material.title}>
                  <div>
                    <h3>{material.title}</h3>
                    <p>{material.detail}</p>
                  </div>
                  <Badge tone={material.status === "Live" ? "good" : "neutral"}>
                    {material.status}
                  </Badge>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" id="integrations">
            <div className="section-heading compact">
              <h2>Integration health</h2>
              <Badge tone="good">6 connected</Badge>
            </div>
            <div className="integration-grid">
              {integrations.map((integration) => (
                <div className="integration" key={integration}>
                  <span>{integration}</span>
                  <strong>Synced</strong>
                </div>
              ))}
            </div>
          </section>
        </section>
      </section>

      {modal ? <DemoModal modal={modal} onClose={() => setModal(null)} /> : null}
    </main>
  );
}

function DemoModal({
  modal,
  onClose,
}: {
  modal: Modal;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          x
        </button>

        {modal.type === "import" ? (
          <>
            <p className="eyebrow">Connect data</p>
            <h2>Import support signals</h2>
            <p className="modal-copy">
              Pull topics, QA misses, escalation notes, KB searches, and survey
              results into the training needs queue.
            </p>
            <div className="connector-grid">
              {integrations.map((item) => (
                <button key={item}>
                  <strong>{item}</strong>
                  <span>Connect</span>
                </button>
              ))}
            </div>
          </>
        ) : null}

        {modal.type === "material" ? (
          <>
            <p className="eyebrow">Material builder</p>
            <h2>Create training material</h2>
            <p className="modal-copy">
              Draft a focused training asset from real issue patterns and assign
              it to a cohort.
            </p>
            <div className="form-grid">
              <label>
                Material title
                <input defaultValue="Refund exception roleplay" />
              </label>
              <label>
                Cohort
                <select defaultValue="June B2B Support Ramp">
                  {cohorts.map((cohort) => (
                    <option key={cohort.name}>{cohort.name}</option>
                  ))}
                </select>
              </label>
              <label className="wide">
                Learning objective
                <textarea defaultValue="Help agents decide when a refund exception is allowed, when to escalate, and what evidence to capture before replying." />
              </label>
            </div>
            <button className="modal-primary" onClick={onClose}>
              Save draft
            </button>
          </>
        ) : null}

        {modal.type === "drill" ? (
          <>
            <p className="eyebrow">Scenario draft</p>
            <h2>{modal.title}</h2>
            <p className="modal-copy">
              Built from signals in {modal.source}. Use this as the first draft
              for a practical support simulation.
            </p>
            <div className="drill-card">
              <h3>Customer prompt</h3>
              <p>
                A customer requests an exception after missing the refund window
                by three days. They mention a previous agent gave unclear
                guidance and threaten to cancel their account.
              </p>
              <h3>Trainer scoring rubric</h3>
              <ul>
                <li>Confirms timeline and account context before deciding.</li>
                <li>Applies policy without sounding rigid.</li>
                <li>Escalates only when exception criteria are met.</li>
                <li>Documents the final decision clearly in the ticket.</li>
              </ul>
            </div>
            <button className="modal-primary" onClick={onClose}>
              Add to material library
            </button>
          </>
        ) : null}

        {modal.type === "cohort" ? (
          <>
            <p className="eyebrow">Cohort detail</p>
            <h2>{modal.name}</h2>
            <p className="modal-copy">
              Trainer {modal.trainer} is tracking readiness, assessment lift,
              and post-training queue behavior for this cohort.
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
