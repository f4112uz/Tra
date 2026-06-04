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
                  <button>{need.action}</button>
                </article>
              ))}
            </div>
          </section>

          <aside className="side-stack">
            <section className="panel">
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

            <section className="panel">
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
          <section className="panel">
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
                <article className="cohort-row" key={cohort.name}>
                  <div>
                    <strong>{cohort.name}</strong>
                    <small>Trainer {cohort.trainer}</small>
                  </div>
                  <span>{cohort.attendance}</span>
                  <span>{cohort.pre}</span>
                  <span>{cohort.post}</span>
                  <span>{cohort.certified}</span>
                </article>
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
          <section className="panel">
            <div className="section-heading compact">
              <h2>Material builder</h2>
              <button className="ghost">Open library</button>
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

          <section className="panel">
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
    </main>
  );
}
