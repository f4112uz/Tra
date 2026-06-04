const issueSignals = [
  {
    topic: "Refund exception handling",
    source: "Zendesk, QA, Slack",
    volume: "+31%",
    risk: "High",
    gap: "Policy judgment",
    action: "Build scenario drill",
  },
  {
    topic: "Intercom billing handoff",
    source: "Intercom, Gmail",
    volume: "+18%",
    risk: "Medium",
    gap: "Context capture",
    action: "Update checklist",
  },
  {
    topic: "Knowledge base setup article",
    source: "KB search, CSAT",
    volume: "+12%",
    risk: "Medium",
    gap: "Article mismatch",
    action: "Refresh lesson",
  },
];

const cohorts = [
  {
    name: "June B2B Support Ramp",
    owner: "Nadia",
    trainees: 18,
    attendance: "94%",
    pre: "61%",
    post: "84%",
    ready: "12 certified",
  },
  {
    name: "Billing Edge Case Clinic",
    owner: "Raka",
    trainees: 9,
    attendance: "89%",
    pre: "58%",
    post: "76%",
    ready: "5 certified",
  },
  {
    name: "Vendor Team QA Reset",
    owner: "Maya",
    trainees: 26,
    attendance: "91%",
    pre: "67%",
    post: "81%",
    ready: "19 certified",
  },
];

const sessions = [
  {
    time: "09:30",
    title: "Refund Exceptions Lab",
    channel: "Calendar + Slack",
    status: "12 attending",
  },
  {
    time: "13:00",
    title: "New Release Ticket Simulation",
    channel: "Zoom + Gmail",
    status: "Pre-test open",
  },
  {
    time: "16:00",
    title: "QA Calibration Review",
    channel: "Calendar",
    status: "Scorecards ready",
  },
];

const performance = [
  { label: "QA score", value: "86", delta: "+9 pts" },
  { label: "Escalation rate", value: "7.8%", delta: "-3.1 pts" },
  { label: "Reopen rate", value: "11.4%", delta: "-1.2 pts" },
  { label: "CSAT", value: "4.62", delta: "+0.21" },
];

const modules = [
  {
    title: "Billing investigation path",
    state: "Draft",
    items: "6 lessons",
    signal: "Built from 42 tickets",
  },
  {
    title: "Refund exception roleplay",
    state: "Ready",
    items: "4 scenarios",
    signal: "Uses QA misses",
  },
  {
    title: "Launch readiness quiz",
    state: "Live",
    items: "18 questions",
    signal: "Post-test closes 18:00",
  },
];

const skillGaps = [
  { skill: "Policy judgment", current: 58, target: 85 },
  { skill: "Troubleshooting depth", current: 72, target: 88 },
  { skill: "Tone under pressure", current: 69, target: 84 },
  { skill: "Handoff quality", current: 63, target: 82 },
];

const benchmarks = [
  {
    name: "MaestroQA / Zendesk QA",
    lesson: "QA scorecards and coaching workflows",
    opportunity: "Connect coaching to training plans and 90-day impact.",
  },
  {
    name: "TalentLMS / Docebo / 360Learning",
    lesson: "Course delivery, live sessions, tests, skills gaps",
    opportunity: "Make support tickets and edge cases drive the curriculum.",
  },
  {
    name: "EdgeTier / Zonka / Finsi",
    lesson: "Conversation intelligence and recurring issue detection",
    opportunity: "Convert signals into trainer actions and cohort follow-up.",
  },
];

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "risk";
}) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ProgressBar({
  current,
  target,
}: {
  current: number;
  target: number;
}) {
  return (
    <div className="progress-block">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${current}%` }} />
      </div>
      <div className="progress-labels">
        <span>{current}% current</span>
        <span>{target}% target</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <strong>Support Trainer OS</strong>
          <span>Ops workspace</span>
        </div>

        <nav className="nav">
          {[
            "Dashboard",
            "Training needs",
            "Cohorts",
            "Materials",
            "Tests",
            "90-day impact",
            "Integrations",
          ].map((item, index) => (
            <button className={index === 0 ? "active" : ""} key={item}>
              <span>{item}</span>
              {index === 1 ? <small>3</small> : null}
            </button>
          ))}
        </nav>

        <section className="connected-box">
          <h2>Connected sources</h2>
          <div>
            <Badge>Zendesk</Badge>
            <Badge>Intercom</Badge>
            <Badge>Slack</Badge>
            <Badge>Gmail</Badge>
          </div>
        </section>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p>Thursday, June 4, 2026</p>
            <h1>Training impact command center</h1>
          </div>
          <div className="actions">
            <button>Import tickets</button>
            <button className="primary">New material</button>
          </div>
        </header>

        <div className="content-grid">
          <section className="main-column">
            <section className="stat-grid">
              {[
                ["Active trainees", "53", "+11 this week"],
                ["Avg post-test lift", "19 pts", "Across 3 cohorts"],
                ["Open skill gaps", "8", "3 high priority"],
                ["Survey sentiment", "4.4/5", "28 responses"],
              ].map(([label, value, note]) => (
                <article className="card stat-card" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </article>
              ))}
            </section>

            <article className="card table-card">
              <div className="card-header">
                <div>
                  <h2>Training needs queue</h2>
                  <p>
                    Prioritized from tickets, QA misses, KB searches, CSAT, and
                    team escalations.
                  </p>
                </div>
                <Badge tone="warn">3 recommended actions</Badge>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Issue signal</th>
                      <th>Source</th>
                      <th>Volume</th>
                      <th>Risk</th>
                      <th>Skill gap</th>
                      <th>Trainer action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issueSignals.map((signal) => (
                      <tr key={signal.topic}>
                        <td>
                          <strong>{signal.topic}</strong>
                        </td>
                        <td>{signal.source}</td>
                        <td className="risk-value">{signal.volume}</td>
                        <td>
                          <Badge
                            tone={signal.risk === "High" ? "risk" : "warn"}
                          >
                            {signal.risk}
                          </Badge>
                        </td>
                        <td>{signal.gap}</td>
                        <td>
                          <button className="small-primary">
                            {signal.action}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <section className="split-grid">
              <article className="card">
                <div className="card-header compact">
                  <h2>Cohort readiness</h2>
                </div>
                <div className="cohort-list">
                  {cohorts.map((cohort) => (
                    <div className="cohort-row" key={cohort.name}>
                      <div>
                        <strong>{cohort.name}</strong>
                        <span>
                          Trainer {cohort.owner} / {cohort.trainees} trainees
                        </span>
                      </div>
                      <Metric label="Attend" value={cohort.attendance} />
                      <Metric label="Pre" value={cohort.pre} />
                      <Metric label="Post" value={cohort.post} />
                      <Metric label="Ready" value={cohort.ready} />
                    </div>
                  ))}
                </div>
              </article>

              <article className="card padded">
                <h2>Skill gap radar</h2>
                <div className="gap-list">
                  {skillGaps.map((gap) => (
                    <div key={gap.skill}>
                      <div className="gap-title">
                        <strong>{gap.skill}</strong>
                        <span>Gap {gap.target - gap.current} pts</span>
                      </div>
                      <ProgressBar current={gap.current} target={gap.target} />
                    </div>
                  ))}
                </div>
              </article>
            </section>

            <article className="card padded">
              <div className="section-title">
                <h2>Material builder</h2>
                <div>
                  <Badge>Draft</Badge>
                  <Badge tone="good">Live</Badge>
                </div>
              </div>
              <div className="module-grid">
                {modules.map((module) => (
                  <div className="module-card" key={module.title}>
                    <div>
                      <h3>{module.title}</h3>
                      <Badge tone={module.state === "Live" ? "good" : "neutral"}>
                        {module.state}
                      </Badge>
                    </div>
                    <p>{module.items}</p>
                    <strong>{module.signal}</strong>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <aside className="right-column">
            <article className="card padded">
              <div className="section-title">
                <h2>Today sessions</h2>
                <Badge>3 live</Badge>
              </div>
              <div className="stack">
                {sessions.map((session) => (
                  <div className="session-card" key={session.title}>
                    <div>
                      <strong>{session.title}</strong>
                      <span>{session.time}</span>
                    </div>
                    <p>{session.channel}</p>
                    <b>{session.status}</b>
                  </div>
                ))}
              </div>
            </article>

            <article className="card padded">
              <h2>90-day performance monitor</h2>
              <div className="performance-grid">
                {performance.map((item) => (
                  <div className="performance-card" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    <small>{item.delta} since training</small>
                  </div>
                ))}
              </div>
            </article>

            <article className="card padded">
              <h2>Assessment flow</h2>
              <div className="stack">
                {[
                  ["Pre-test", "Open", "53 submitted"],
                  ["Ticket simulation", "Scoring", "17 need review"],
                  ["Post-test", "Scheduled", "Today 18:00"],
                  ["Survey", "Live", "28 responses"],
                ].map(([name, state, note]) => (
                  <div className="flow-row" key={name}>
                    <div>
                      <strong>{name}</strong>
                      <span>{note}</span>
                    </div>
                    <Badge tone={state === "Open" ? "good" : "neutral"}>
                      {state}
                    </Badge>
                  </div>
                ))}
              </div>
            </article>

            <article className="card padded">
              <h2>Benchmark map</h2>
              <div className="stack">
                {benchmarks.map((benchmark) => (
                  <div className="benchmark-card" key={benchmark.name}>
                    <strong>{benchmark.name}</strong>
                    <p>{benchmark.lesson}</p>
                    <b>{benchmark.opportunity}</b>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>
    </main>
  );
}
