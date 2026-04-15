## MindShelf Frontend

### Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` ou o IP da maquina na rede local.

### Arquitetura de consumo de API

- REST no browser passa pelo proprio Next em rotas ` /api/... `
- As rotas `app/api/**` funcionam como um proxy/BFF para o backend Go
- WebSocket continua conectando direto no backend em `/api/ws`
- Auth HTTP usa ` /api/auth/login ` e ` /api/auth/register ` no frontend

### Env recomendado do frontend

```env
API_ORIGIN=http://localhost:8080
NEXT_PUBLIC_API_ORIGIN=http://localhost:8080
NEXT_PUBLIC_WS_PATH=/api/ws
```

Explicacao:

- `API_ORIGIN`: origem do backend usada pelo proxy server-side do Next
- `NEXT_PUBLIC_API_ORIGIN`: origem publica usada para montar a URL do WebSocket no browser
- `NEXT_PUBLIC_WS_PATH`: caminho do WebSocket, padrao `/api/ws`

### Backend esperado

- REST: `http://localhost:8080`
- WebSocket autenticado: `ws://localhost:8080/api/ws`
- O backend precisa aceitar a origem do frontend em `ALLOWED_ORIGINS`
- O cookie `mindshelf_token` precisa funcionar no handshake do WebSocket

Exemplo no backend:

```env
ALLOWED_ORIGINS=http://localhost:3000,http://192.168.68.51:3000
```
