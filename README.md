# QALab

Dashboard de portfólio para organizar casos de teste e bugs em um fluxo simples de QA.

## Objetivo

O QALab foi criado para demonstrar uma rotina prática de qualidade de software: registrar casos de teste, acompanhar status de execução, cadastrar bugs por severidade e visualizar indicadores em um dashboard apresentável.

## Funcionalidades

- Dashboard com métricas de casos, falhas, bloqueios e bugs abertos.
- Registro rápido de casos de teste por projeto.
- Alteração de status dos casos: passou, falhou, bloqueado ou não executado.
- Registro de bugs por projeto e severidade.
- Alteração de status dos bugs: aberto, em análise ou corrigido.
- Exclusão de casos e bugs.
- Filtro por projeto.
- Dados salvos localmente no navegador via `localStorage`.
- Botão para restaurar a demo aos dados iniciais.

## Stack

- Next.js
- React
- TypeScript
- CSS responsivo sem framework
- Persistência local no navegador

## Como rodar

```bash
npm install
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## Deploy

Este projeto está pronto para deploy em plataformas como Vercel ou Netlify. Para publicar na Vercel:

1. Suba o projeto para um repositório no GitHub.
2. Importe o repositório na Vercel.
3. Use as configurações padrão de Next.js.
4. Publique e teste o link final em desktop e mobile.

## Observação

Os dados cadastrados ficam no navegador da pessoa que está usando a demo. Isso mantém o projeto leve para portfólio e evita depender de backend ou banco de dados nesta versão.
