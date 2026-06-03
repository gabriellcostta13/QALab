"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { bugReports, projects, testCases, testRuns } from "@/lib/seed-data";

export type View = "dashboard" | "tests" | "bugs";
type TestStatus = "Passou" | "Falhou" | "Bloqueado" | "Não executado";
type Severity = "Baixa" | "Média" | "Alta" | "Crítica";

type TestCase = {
  id: number;
  title: string;
  project: string;
  type: string;
  status: TestStatus;
  expected: string;
};

type BugReport = {
  id: number;
  title: string;
  project: string;
  severity: Severity;
  priority: "P1" | "P2" | "P3";
  status: "Aberto" | "Em análise" | "Corrigido";
};

const statusClass: Record<TestStatus, string> = {
  Passou: "is-green",
  Falhou: "is-red",
  Bloqueado: "is-amber",
  "Não executado": "is-gray",
};

const severityClass: Record<Severity, string> = {
  Baixa: "is-green",
  Média: "is-amber",
  Alta: "is-orange",
  Crítica: "is-red",
};

const navItems: Array<{ id: View; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "tests", label: "Casos de teste" },
  { id: "bugs", label: "Bugs" },
];

function normalizeCases(items: TestCase[]) {
  return items.map((item) => ({
    ...item,
    status: item.status === ("Nao executado" as TestStatus) ? "Não executado" : item.status,
  }));
}

function normalizeBugs(items: BugReport[]) {
  return items.map((item) => ({
    ...item,
    severity: item.severity === ("Media" as Severity) ? "Média" : item.severity === ("Critica" as Severity) ? "Crítica" : item.severity,
    status: item.status === ("Em analise" as BugReport["status"]) ? "Em análise" : item.status,
  }));
}

export default function DashboardClient({ initialView }: { initialView: View }) {
  const [activeView, setActiveView] = useState<View>(initialView);
  const [cases, setCases] = useState<TestCase[]>(testCases);
  const [bugs, setBugs] = useState<BugReport[]>(bugReports);
  const [storageReady, setStorageReady] = useState(false);
  const [projectFilter, setProjectFilter] = useState("Todos");
  const [caseTitle, setCaseTitle] = useState("");
  const [caseProject, setCaseProject] = useState(projects[0].name);
  const [bugTitle, setBugTitle] = useState("");
  const [bugProject, setBugProject] = useState(projects[0].name);
  const [bugSeverity, setBugSeverity] = useState<Severity>("Média");

  useEffect(() => {
    setActiveView(initialView);
  }, [initialView]);

  useEffect(() => {
    try {
      const savedCases = window.localStorage.getItem("qalab:test-cases");
      const savedBugs = window.localStorage.getItem("qalab:bug-reports");

      if (savedCases) setCases(normalizeCases(JSON.parse(savedCases) as TestCase[]));
      if (savedBugs) setBugs(normalizeBugs(JSON.parse(savedBugs) as BugReport[]));
    } catch {
      window.localStorage.removeItem("qalab:test-cases");
      window.localStorage.removeItem("qalab:bug-reports");
    }
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("qalab:test-cases", JSON.stringify(cases));
  }, [cases, storageReady]);

  useEffect(() => {
    if (!storageReady) return;
    window.localStorage.setItem("qalab:bug-reports", JSON.stringify(bugs));
  }, [bugs, storageReady]);

  const visibleCases = useMemo(
    () => cases.filter((item) => projectFilter === "Todos" || item.project === projectFilter),
    [cases, projectFilter],
  );

  const visibleBugs = useMemo(
    () => bugs.filter((item) => projectFilter === "Todos" || item.project === projectFilter),
    [bugs, projectFilter],
  );

  const passed = cases.filter((item) => item.status === "Passou").length;
  const failed = cases.filter((item) => item.status === "Falhou").length;
  const blocked = cases.filter((item) => item.status === "Bloqueado").length;
  const openBugs = bugs.filter((item) => item.status !== "Corrigido").length;
  const maxRunTotal = Math.max(...testRuns.map((run) => run.passed + run.failed + run.blocked), 1);

  const projectSummary = projects.map((project) => ({
    name: project.name,
    cases: cases.filter((item) => item.project === project.name).length,
    bugs: bugs.filter((item) => item.project === project.name).length,
  }));

  const bugSeveritySummary = (["Crítica", "Alta", "Média", "Baixa"] as Severity[]).map((severity) => ({
    severity,
    total: bugs.filter((bug) => bug.severity === severity).length,
  }));

  const recentActivity = [
    ...cases.slice(0, 5).map((item) => ({ id: `case-${item.id}`, title: item.title, project: item.project, kind: "Caso" })),
    ...bugs.slice(0, 5).map((item) => ({ id: `bug-${item.id}`, title: item.title, project: item.project, kind: "Bug" })),
  ].slice(0, 8);

  function addCase(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!caseTitle.trim()) return;

    setCases((current) => [
      {
        id: Date.now(),
        title: caseTitle.trim(),
        project: caseProject,
        type: "Manual",
        status: "Não executado",
        expected: "Comportamento deve seguir a regra de negócio documentada.",
      },
      ...current,
    ]);
    setCaseTitle("");
  }

  function addBug(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!bugTitle.trim()) return;

    setBugs((current) => [
      {
        id: Date.now(),
        title: bugTitle.trim(),
        project: bugProject,
        severity: bugSeverity,
        priority: bugSeverity === "Crítica" || bugSeverity === "Alta" ? "P1" : "P2",
        status: "Aberto",
      },
      ...current,
    ]);
    setBugTitle("");
  }

  function updateCaseStatus(id: number, status: TestStatus) {
    setCases((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  function updateBugStatus(id: number, status: BugReport["status"]) {
    setBugs((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  function resetDemoData() {
    window.localStorage.removeItem("qalab:test-cases");
    window.localStorage.removeItem("qalab:bug-reports");
    setCases(normalizeCases(testCases));
    setBugs(normalizeBugs(bugReports));
    setProjectFilter("Todos");
  }

  return (
    <main className="shell">
      <aside className="sidebar" aria-label="Navegacao do QALab">
        <div className="brand">
          <span className="brand-mark">QA</span>
          <div>
            <strong>QALab</strong>
            <small>Portfolio QA dashboard</small>
          </div>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <a
              className={activeView === item.id ? "active" : ""}
              href={`/?view=${item.id}`}
              key={item.id}
              onClick={() => setActiveView(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="profile">
          <span>Fluxo de QA</span>
          <strong>Casos, bugs e evidências</strong>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Controle de qualidade</p>
            <h1>{activeView === "dashboard" ? "Dashboard de casos e bugs" : navItems.find((item) => item.id === activeView)?.label}</h1>
            <p className="lead">Um painel visual para organizar execuções, registrar defeitos e apresentar seu processo de QA no portfólio.</p>
          </div>
          <div className="top-actions">
            <span className="portfolio-badge">Projeto de portfólio QA</span>
            <label className="filter">
              Projeto
              <select value={projectFilter} onChange={(event) => setProjectFilter(event.target.value)}>
                <option>Todos</option>
                {projects.map((project) => (
                  <option key={project.name}>{project.name}</option>
                ))}
              </select>
            </label>
            <button className="ghost-button" type="button" onClick={resetDemoData}>
              Restaurar demo
            </button>
          </div>
        </header>

        {activeView === "dashboard" && (
          <>
            <section className="metrics" aria-label="Indicadores principais">
              <article className="metric">
                <span>Casos cadastrados</span>
                <strong>{cases.length}</strong>
                <small>Roteiros manuais para execução QA</small>
              </article>
              <article className="metric">
                <span>Casos passaram</span>
                <strong>{passed}</strong>
                <small>Validacoes sem defeito encontrado</small>
              </article>
              <article className="metric">
                <span>Falhas ou bloqueios</span>
                <strong>{failed + blocked}</strong>
                <small>{failed} falhas - {blocked} bloqueios</small>
              </article>
              <article className="metric">
                <span>Bugs abertos</span>
                <strong>{openBugs}</strong>
                <small>Itens para acompanhar na fila QA</small>
              </article>
            </section>

            <section className="grid">
              <article className="panel wide">
                <div className="panel-header compact">
                  <div>
                    <p className="eyebrow">Execução</p>
                    <h2>Ultimos ciclos de teste</h2>
                  </div>
                </div>
                <div className="bar-chart" aria-label="Gráfico de barras com execuções de QA">
                  {testRuns.map((run) => (
                    <div className="bar-column" key={run.id}>
                      <span style={{ height: `${Math.max(12, ((run.passed + run.failed + run.blocked) / maxRunTotal) * 100)}%` }} />
                      <small>{run.date.slice(0, 5)}</small>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <div className="panel-header compact">
                  <div>
                    <p className="eyebrow">Projetos</p>
                    <h2>Volume por projeto</h2>
                  </div>
                </div>
                <div className="table">
                  {projectSummary.map((project) => (
                    <div className="row" key={project.name}>
                      <div>
                        <strong>{project.name}</strong>
                        <small>{project.cases} casos - {project.bugs} bugs</small>
                      </div>
                      <span className="pill is-blue">QA</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel">
                <div className="panel-header compact">
                  <div>
                    <p className="eyebrow">Defeitos</p>
                    <h2>Bugs por severidade</h2>
                  </div>
                </div>
                <div className="table">
                  {bugSeveritySummary.map((item) => (
                    <div className="row" key={item.severity}>
                      <strong>{item.severity}</strong>
                      <span className={`pill ${severityClass[item.severity]}`}>{item.total}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="panel wide">
                <div className="panel-header compact">
                  <div>
                    <p className="eyebrow">Histórico</p>
                    <h2>Últimos registros</h2>
                  </div>
                </div>
                <div className="run-grid">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((item) => (
                      <div className="run" key={item.id}>
                        <strong>{item.title}</strong>
                        <span>{item.kind}</span>
                        <small>{item.project}</small>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">Cadastre um caso de teste ou bug para movimentar o histórico.</div>
                  )}
                </div>
              </article>
            </section>
          </>
        )}

        {activeView === "tests" && (
          <article className="panel">
            <div className="panel-header">
              <div>
                <p className="eyebrow">Execução</p>
                <h2>Casos de teste</h2>
              </div>
              <form className="quick-form" onSubmit={addCase}>
                <input
                  aria-label="Novo caso de teste"
                  placeholder="Novo caso de teste"
                  value={caseTitle}
                  onChange={(event) => setCaseTitle(event.target.value)}
                />
                <select aria-label="Projeto do caso" value={caseProject} onChange={(event) => setCaseProject(event.target.value)}>
                  {projects.map((project) => (
                    <option key={project.name}>{project.name}</option>
                  ))}
                </select>
                <button type="submit">Adicionar</button>
              </form>
            </div>

            <div className="table">
              {visibleCases.length > 0 ? (
                visibleCases.map((item) => (
                  <div className="row" key={item.id}>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.project} - {item.type}</small>
                    </div>
                    <div className="row-actions">
                      <select
                        aria-label={`Status do caso ${item.title}`}
                        value={item.status}
                        onChange={(event) => updateCaseStatus(item.id, event.target.value as TestStatus)}
                      >
                        <option>Passou</option>
                        <option>Falhou</option>
                        <option>Bloqueado</option>
                        <option>Não executado</option>
                      </select>
                      <span className={`pill ${statusClass[item.status]}`}>{item.status}</span>
                      <button type="button" onClick={() => setCases((current) => current.filter((caseItem) => caseItem.id !== item.id))}>
                        Excluir
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">Nenhum caso encontrado para o filtro atual.</div>
              )}
            </div>
          </article>
        )}

        {activeView === "bugs" && (
          <section className="grid">
            <article className="panel">
              <div className="panel-header compact">
                <div>
                  <p className="eyebrow">Defeitos</p>
                  <h2>Registrar bug</h2>
                </div>
              </div>
              <form className="stack-form" onSubmit={addBug}>
                <input
                  aria-label="Novo bug"
                  placeholder="Bug encontrado"
                  value={bugTitle}
                  onChange={(event) => setBugTitle(event.target.value)}
                />
                <select value={bugProject} onChange={(event) => setBugProject(event.target.value)}>
                  {projects.map((project) => (
                    <option key={project.name}>{project.name}</option>
                  ))}
                </select>
                <select value={bugSeverity} onChange={(event) => setBugSeverity(event.target.value as Severity)}>
                  <option>Baixa</option>
                  <option>Média</option>
                  <option>Alta</option>
                  <option>Crítica</option>
                </select>
                <button type="submit">Registrar bug</button>
              </form>
            </article>

            <article className="panel wide">
              <div className="panel-header compact">
                <div>
                  <p className="eyebrow">Fila</p>
                  <h2>Bugs reportados</h2>
                </div>
              </div>
              <div className="bug-list">
                {visibleBugs.map((bug) => (
                  <div className="bug-card" key={bug.id}>
                    <strong>{bug.title}</strong>
                    <small>{bug.project}</small>
                    <div className="bug-meta">
                      <span className={`pill ${severityClass[bug.severity]}`}>{bug.severity}</span>
                      <span className="pill is-gray">{bug.priority}</span>
                      <span className="pill is-blue">{bug.status}</span>
                    </div>
                    <div className="bug-controls">
                      <select
                        aria-label={`Status do bug ${bug.title}`}
                        value={bug.status}
                        onChange={(event) => updateBugStatus(bug.id, event.target.value as BugReport["status"])}
                      >
                        <option>Aberto</option>
                        <option>Em análise</option>
                        <option>Corrigido</option>
                      </select>
                      <button type="button" onClick={() => setBugs((current) => current.filter((item) => item.id !== bug.id))}>
                        Excluir
                      </button>
                    </div>
                  </div>
                ))}
                {visibleBugs.length === 0 && <div className="empty-state">Nenhum bug encontrado para o filtro atual.</div>}
              </div>
            </article>
          </section>
        )}
      </section>
    </main>
  );
}
