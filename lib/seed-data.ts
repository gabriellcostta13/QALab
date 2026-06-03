export const projects = [
  {
    name: "Loja Demo",
    domain: "E-commerce",
    status: "Em testes",
  },
  {
    name: "API de Login",
    domain: "Backend",
    status: "Exploratório",
  },
  {
    name: "App de Tarefas",
    domain: "Mobile",
    status: "Regressão",
  },
];

export const studyTopics = [
  {
    name: "Testes manuais",
    focus: "Cenários, evidências e massa de teste",
    progress: 82,
  },
  {
    name: "Teste de API",
    focus: "Status code, payload e contratos",
    progress: 64,
  },
  {
    name: "SQL para QA",
    focus: "Consultas para validar dados",
    progress: 48,
  },
  {
    name: "Automação",
    focus: "Primeiros fluxos E2E",
    progress: 37,
  },
];

export const testCases = [
  {
    id: 1,
    title: "Finalizar compra com cartão válido",
    project: "Loja Demo",
    type: "Funcional",
    status: "Passou" as const,
    expected: "Pedido deve ser criado e pagamento aprovado.",
  },
  {
    id: 2,
    title: "Bloquear login com senha incorreta",
    project: "API de Login",
    type: "API",
    status: "Passou" as const,
    expected: "API deve retornar 401 e mensagem clara.",
  },
  {
    id: 3,
    title: "Manter tarefa após recarregar tela",
    project: "App de Tarefas",
    type: "Regressão",
    status: "Falhou" as const,
    expected: "Tarefa deve permanecer salva.",
  },
  {
    id: 4,
    title: "Aplicar cupom expirado",
    project: "Loja Demo",
    type: "Negativo",
    status: "Bloqueado" as const,
    expected: "Sistema deve negar o cupom.",
  },
];

export const bugReports = [
  {
    id: 1,
    title: "Tarefa some após atualizar a página",
    project: "App de Tarefas",
    severity: "Alta" as const,
    priority: "P1" as const,
    status: "Aberto" as const,
  },
  {
    id: 2,
    title: "Mensagem de erro do login vem vazia",
    project: "API de Login",
    severity: "Média" as const,
    priority: "P2" as const,
    status: "Em análise" as const,
  },
  {
    id: 3,
    title: "Checkout permite finalizar sem CEP",
    project: "Loja Demo",
    severity: "Crítica" as const,
    priority: "P1" as const,
    status: "Aberto" as const,
  },
];

export const testRuns = [
  {
    id: 1,
    project: "Loja Demo",
    date: "02/06/2026",
    passed: 8,
    failed: 2,
    blocked: 1,
  },
  {
    id: 2,
    project: "API de Login",
    date: "31/05/2026",
    passed: 11,
    failed: 1,
    blocked: 0,
  },
  {
    id: 3,
    project: "App de Tarefas",
    date: "28/05/2026",
    passed: 5,
    failed: 3,
    blocked: 1,
  },
];
