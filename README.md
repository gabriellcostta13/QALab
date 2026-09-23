# 🧪 QALab — Dashboard para Quality Assurance

Aplicação de portfólio criada para representar uma rotina de QA,
permitindo organizar projetos, casos de teste, resultados de execução e
bugs em um dashboard.

## 🎯 Objetivo

O QALab foi desenvolvido para aproximar conceitos de Quality Assurance
de uma aplicação prática, simulando uma rotina de acompanhamento de
testes e defeitos.

A proposta é demonstrar a organização do processo:

**Projeto → Caso de teste → Execução → Resultado → Defeito →
Acompanhamento**

## ✨ Funcionalidades

### Projetos

- Cadastro de projetos
- Organização dos casos de teste por projeto
- Visualização dos projetos cadastrados

### Casos de teste

- Criação de casos de teste
- Associação com projetos
- Definição de status
- Status disponíveis:
  - Passou
  - Falhou
  - Bloqueado
  - Não executado
- Filtros e organização dos casos

### Bugs

- Registro de defeitos
- Associação com projeto
- Definição de severidade
- Definição de prioridade
- Acompanhamento por status
- Exclusão de registros

### Dashboard

- Indicadores de casos de teste
- Distribuição dos resultados
- Indicadores relacionados a bugs
- Visualização resumida da situação dos projetos

## 💾 Persistência

Os dados da aplicação são armazenados utilizando **localStorage** do
navegador.

O projeto também possui dados de demonstração para facilitar a
visualização do dashboard.

## 🛠️ Tecnologias

- Next.js
- React
- TypeScript
- CSS
- localStorage
- Git/GitHub

## 🌐 Demonstração

[QALab — Demo](https://qa-lab-weld.vercel.app)

## 🚀 Executando localmente

``` bash
npm install
npm run dev
```

Depois, acesse:

``` text
http://localhost:3000
```

## 🧠 O que este projeto demonstra

- Organização de casos de teste
- Classificação e acompanhamento de defeitos
- Conceitos de severidade e prioridade
- Acompanhamento de resultados
- Estruturação de informações de QA em uma aplicação
- Integração entre conhecimentos de QA e desenvolvimento

## 👤 Autor

**Gabriel Costa \| Quality Assurance (QA)**

[GitHub](https://github.com/gabriellcostta13)
