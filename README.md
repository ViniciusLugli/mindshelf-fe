# MindShelf Frontend

Frontend do MindShelf construído com Next.js, React, TypeScript, React Query e WebSocket para consumo de dados em tempo real.

Este repositório é responsável pela interface web, pelo proxy HTTP do backend via rotas `app/api/**` e pela experiência do usuário autenticado.

## Visão geral

O frontend do MindShelf tem 3 responsabilidades principais:

- renderizar a aplicação web com Next.js App Router
- atuar como BFF/proxy para chamadas REST do browser ao backend
- conectar o cliente ao WebSocket do backend para chat, convites e atualizações em tempo real

O backend vive em outro repositório e a infraestrutura em AWS será mantida com Terraform em um terceiro repositório dedicado.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- DaisyUI
- Material UI Icons
- TanStack React Query
- Axios
- TipTap
- Vitest

## Requisitos

- Node.js 20+
- npm 10+
- backend do MindShelf rodando localmente ou acessível por URL

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:watch
```

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env.local` com as variáveis mínimas:

```env
API_ORIGIN=http://localhost:8080
NEXT_PUBLIC_API_ORIGIN=http://localhost:8080
NEXT_PUBLIC_WS_PATH=/api/ws
```

3. Suba o frontend:

```bash
npm run dev
```

4. Acesse:

```text
http://localhost:3000
```

## Variáveis de ambiente

### Desenvolvimento

| Variável | Obrigatória | Exemplo | Uso |
| --- | --- | --- | --- |
| `API_ORIGIN` | sim | `http://localhost:8080` | origem do backend usada no proxy server-side do Next |
| `NEXT_PUBLIC_API_ORIGIN` | sim | `http://localhost:8080` | origem pública usada no browser, principalmente para WebSocket |
| `NEXT_PUBLIC_WS_PATH` | não | `/api/ws` | caminho do WebSocket quando `NEXT_PUBLIC_WS_URL` não é informado |
| `NEXT_PUBLIC_WS_URL` | não | `ws://localhost:8080/api/ws` | URL completa do WebSocket |
| `ALLOWED_DEV_ORIGINS` | não | `192.168.0.10,192.168.0.20` | origens extras permitidas pelo Next em desenvolvimento |

### Produção

Exemplo recomendado:

```env
API_ORIGIN=https://api.seudominio.com
NEXT_PUBLIC_API_ORIGIN=https://api.seudominio.com
NEXT_PUBLIC_WS_URL=wss://api.seudominio.com/api/ws
NEXT_PUBLIC_WS_PATH=/api/ws
```

### Observações importantes

- `API_ORIGIN` é lida no server e usada pelo proxy em `app/api/**`
- `NEXT_PUBLIC_API_ORIGIN` e `NEXT_PUBLIC_WS_URL` são lidas no browser
- quando `NEXT_PUBLIC_WS_URL` existe, ela tem prioridade sobre a composição automática do WebSocket

## Arquitetura da aplicação

### Consumo de API

O frontend usa dois canais diferentes de integração com o backend:

- REST via rotas do próprio Next em `app/api/**`
- WebSocket direto no backend em `/api/ws`

Fluxo REST:

1. o browser chama `/api/...` no próprio Next
2. a rota em `app/api/**` recebe a requisição
3. `lib/server/backend-proxy.ts` encaminha a chamada ao backend
4. a resposta volta para o browser como se o Next fosse um BFF

Isso reduz acoplamento no browser e centraliza autenticação, headers e compatibilidade com cookies.

### WebSocket

O chat e os eventos em tempo real usam conexão direta com o backend.

Fluxo:

1. o frontend monta a URL com base em `NEXT_PUBLIC_WS_URL` ou `NEXT_PUBLIC_API_ORIGIN`
2. o browser abre a conexão com `/api/ws`
3. o cookie `mindshelf_token` precisa estar disponível no handshake

### Estado e dados

- React Query para queries e mutations REST
- `RealtimeProvider` para dados e ações em tempo real
- `SessionProvider` para estado do usuário autenticado

O `RealtimeProvider` foi separado em hooks menores para reduzir rerenders:

- `useRealtimeSocial()`
- `useRealtimeRelationshipActions()`
- `useRealtimeConversation()`

### Autenticação

- login e registro passam por rotas do frontend:
  - `/api/auth/login`
  - `/api/auth/register`
- o token é armazenado no cookie `mindshelf_token`
- o layout privado valida a sessão no server e hidrata o usuário inicial

## Estrutura principal do projeto

```text
app/
  (private)/
    account/
    chat/
    contacts/
    groups/
    home/
    tasks/
  api/
  components/
    auth/
    shared/
    social/
    UI/
  hooks/
  providers/

lib/
  api/
    client/
    hooks/
    types/
  auth/
  realtime/
  server/
  utils/
```

### Pastas mais importantes

- `app/(private)`
  - páginas autenticadas da aplicação
- `app/api`
  - proxy/BFF do frontend para o backend
- `app/providers`
  - providers de sessão e realtime
- `lib/api/client`
  - clients HTTP da aplicação
- `lib/api/hooks`
  - hooks baseados em React Query
- `lib/api/types`
  - contratos tipados da API

## Contrato com o backend

O contrato de referência do frontend é o `swagger.json` deste repositório.

Ele deve ser usado como fonte de verdade para:

- endpoints REST
- métodos HTTP
- request bodies
- response bodies
- evolução do schema

Sempre que o backend mudar contrato, o ideal é:

1. atualizar o `swagger.json`
2. revisar clients em `lib/api/client`
3. revisar types em `lib/api/types`
4. revisar hooks e componentes impactados

## Qualidade e validação local

Antes de abrir PR, o fluxo recomendado é:

```bash
npm run lint
npm run test
npm run build
```

Se o projeto ainda não tiver cobertura ampla de testes, `lint` e `build` continuam sendo o mínimo obrigatório.

## Backend esperado

Exemplo local esperado:

- REST: `http://localhost:8080`
- WebSocket: `ws://localhost:8080/api/ws`

O backend precisa:

- aceitar a origem do frontend em `ALLOWED_ORIGINS`
- manter o cookie `mindshelf_token` compatível com requests HTTP e handshake WebSocket

Exemplo no backend:

```env
ALLOWED_ORIGINS=http://localhost:3000,http://192.168.68.51:3000
```

## Estratégia recomendada de deploy

### Repositórios

O desenho recomendado do ecossistema é:

- `mindshelf-fe` -> este repositório
- `mindshelf-be` -> backend
- `mindshelf-infra` -> Terraform da infraestrutura AWS

### Responsabilidade de cada repositório

#### `mindshelf-infra`

Mantém toda a IaC com Terraform:

- VPC
- subnets
- security groups
- ALB
- ECS cluster
- ECS services
- ECR
- Route53
- ACM
- IAM
- SSM Parameter Store / Secrets Manager

#### `mindshelf-fe`

Responsável por:

- validar código do frontend
- buildar imagem Docker do frontend
- enviar imagem para o ECR do frontend
- atualizar a task definition/service do frontend no ECS

#### `mindshelf-be`

Responsável por:

- validar código do backend
- buildar imagem Docker do backend
- enviar imagem para o ECR do backend
- atualizar a task definition/service do backend no ECS

## AWS ECS + Terraform

### Arquitetura recomendada

- AWS ECS Fargate
- 1 cluster ECS por ambiente
- 2 services separados:
  - frontend
  - backend
- 1 ALB público
- 2 ECR repositories
- logs em CloudWatch
- DNS e TLS via Route53 + ACM

### Domínios recomendados

- frontend: `app.seudominio.com`
- backend/API: `api.seudominio.com`
- WebSocket: `wss://api.seudominio.com/api/ws`

### Configuração recomendada do frontend em produção

```env
API_ORIGIN=https://api.seudominio.com
NEXT_PUBLIC_API_ORIGIN=https://api.seudominio.com
NEXT_PUBLIC_WS_URL=wss://api.seudominio.com/api/ws
NEXT_PUBLIC_WS_PATH=/api/ws
```

## Bitbucket Pipelines

Como frontend e backend estão em repositórios diferentes, as pipelines devem ser diferentes também.

### Pipeline do repositório de infraestrutura

Objetivo:

- `terraform fmt -check`
- `terraform init`
- `terraform validate`
- `terraform plan`
- `terraform apply` manual ou controlado por ambiente

### Pipeline do frontend

Objetivo:

1. instalar dependências
2. executar `lint`
3. executar `test`
4. executar `build`
5. buildar imagem Docker do frontend
6. publicar imagem no ECR do frontend
7. registrar nova revisão da task definition
8. atualizar o ECS service do frontend

### Pipeline do backend

Objetivo:

1. executar validações do backend
2. buildar imagem Docker do backend
3. publicar imagem no ECR do backend
4. registrar nova revisão da task definition
5. atualizar o ECS service do backend

### Importante

As pipelines de frontend e backend não devem aplicar Terraform.

Elas devem apenas consumir infraestrutura já criada e estável.

## Fluxo recomendado de rollout

### Staging

1. aplicar Terraform do ambiente `staging`
2. deploy manual inicial do backend
3. deploy manual inicial do frontend
4. validar:
   - carregamento da aplicação
   - login
   - chamadas REST via proxy do Next
   - WebSocket
   - cookies de autenticação
5. ativar deploy automático por pipeline

### Production

1. replicar a infraestrutura em `production`
2. validar DNS, HTTPS e variáveis de ambiente
3. liberar deploy manual ou promovido por tag

## O que este repositório deve conter

- código-fonte do frontend
- testes do frontend
- Dockerfile do frontend
- configuração da pipeline do frontend no Bitbucket
- documentação operacional do frontend

## O que este repositório não deve conter

- Terraform compartilhado de frontend + backend
- infraestrutura principal da AWS
- configuração de deploy do backend

## Troubleshooting

### O frontend sobe, mas não consegue falar com o backend

Verifique:

- `API_ORIGIN`
- backend disponível na URL configurada
- proxy em `app/api/**`

### O chat não conecta

Verifique:

- `NEXT_PUBLIC_WS_URL` ou `NEXT_PUBLIC_API_ORIGIN`
- path `/api/ws`
- `ALLOWED_ORIGINS` no backend
- cookie `mindshelf_token`

### O login funciona, mas o WebSocket falha

Normalmente é problema de:

- origem não permitida no backend
- cookie não enviado no handshake
- ambiente HTTPS mal configurado em produção

### A aplicação em produção carrega, mas as chamadas `/api/*` falham

Revise:

- `API_ORIGIN`
- conectividade do container do frontend com o backend
- regras do ALB e security groups

## Próximos passos recomendados

1. criar `Dockerfile` do frontend
2. criar `bitbucket-pipelines.yml` do frontend
3. criar repositório `mindshelf-infra` com Terraform
4. provisionar `staging` no ECS
5. validar frontend + backend juntos antes de abrir `production`

## Resumo rápido

- este repo é só o frontend
- o backend fica em outro repo
- a infraestrutura deve ficar em um repo Terraform separado
- frontend e backend terão pipelines independentes no Bitbucket
- Terraform não deve ser duplicado entre front e back
