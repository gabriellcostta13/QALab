# 🧪 QALab — Dashboard para Quality Assurance

O **QALab** é uma aplicação desenvolvida para representar uma rotina prática de **Quality Assurance**, permitindo organizar casos de teste, registrar bugs e acompanhar indicadores de execução em um dashboard.

A ideia é transformar atividades comuns de QA em uma ferramenta simples e visual para organização de testes.

## 🎯 Objetivo

O projeto foi criado com foco em demonstrar, de forma prática:

* Organização de casos de teste;
* Acompanhamento de execução;
* Registro e classificação de bugs;
* Controle de status;
* Visualização de métricas;
* Organização de informações de qualidade.

Além de ser uma aplicação de portfólio, o projeto demonstra a aplicação de conceitos de QA na construção de uma ferramenta voltada para a própria área.

## 📊 Funcionalidades

### Casos de teste

* Cadastro de casos de teste;
* Associação dos casos a projetos;
* Controle de status;
* Status disponíveis:

  * Passou;
  * Falhou;
  * Bloqueado;
  * Não executado;
* Exclusão de casos;
* Filtro por projeto.

### Bugs

* Registro de bugs;
* Associação por projeto;
* Classificação por severidade;
* Controle de status;
* Status:

  * Aberto;
  * Em análise;
  * Corrigido;
* Exclusão de bugs.

### Dashboard

O dashboard apresenta indicadores relacionados à execução dos testes e aos bugs registrados, permitindo uma visão rápida do estado atual da qualidade.

## 🧠 Como um QA pode utilizar o QALab

O fluxo principal da ferramenta representa uma rotina simples de execução:

```text
Projeto
   ↓
Casos de teste
   ↓
Execução
   ↓
Resultado
   ↓
Falha identificada
   ↓
Registro do bug
   ↓
Acompanhamento
```

Isso permite representar conceitos presentes em uma rotina de QA, como **casos de teste, execução, evidências de falha, severidade, status e acompanhamento de defeitos**.

## 💾 Persistência dos dados

Nesta versão, os dados são armazenados utilizando:

```text
localStorage
```

Isso permite manter os dados no navegador sem necessidade de backend ou banco de dados.

A aplicação também possui uma opção para restaurar os dados iniciais da demonstração.

## 🛠️ Stack

* Next.js
* React
* TypeScript
* CSS
* localStorage
* Git
* GitHub

## 🌐 Demonstração

A aplicação possui uma versão publicada para demonstração:

**https://qa-lab-weld.vercel.app**

Os dados utilizados na demonstração são armazenados localmente no navegador.

## 🚀 Como executar localmente

Clone o projeto:

```bash
git clone https://github.com/gabriellcostta13/QALab.git
```

Acesse o diretório:

```bash
cd QALab
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## 🏗️ Build

Para gerar a versão de produção:

```bash
npm run build
```

## 🤖 Uso de IA no desenvolvimento

O desenvolvimento contou com apoio de ferramentas de IA para acelerar atividades de implementação, revisão e validação.

A IA foi utilizada como **ferramenta de desenvolvimento**, enquanto as decisões relacionadas à estrutura da aplicação, funcionalidades, experiência de uso e validação do resultado fizeram parte do processo de construção do projeto.

## 💡 O que este projeto demonstra

O QALab demonstra a combinação entre:

* Conhecimento de QA;
* Organização de processos de teste;
* Desenvolvimento web;
* Modelagem de informações;
* Pensamento orientado a qualidade;
* Criação de ferramentas para apoiar atividades de QA.

Mais do que apresentar apenas uma aplicação web, o projeto busca demonstrar como conceitos de qualidade podem ser transformados em uma ferramenta funcional.

## 👨‍💻 Autor

**Gabriel Costa**

Quality Assurance (QA) | Testes Manuais | Automação de Testes em desenvolvimento

* [GitHub](https://github.com/gabriellcostta13)
* [LinkedIn](https://www.linkedin.com/in/gabrielcostatec)
