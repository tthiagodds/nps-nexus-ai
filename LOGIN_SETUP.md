# Sistema de Login - NPS Nexus AI

## Funcionalidades Implementadas

### 1. Autenticação Completa
- ✅ Login com username, senha e ID da empresa
- ✅ Integração com API: `http://localhost/nps-nexus-ai-api/api/v1/auth/login`
- ✅ Armazenamento seguro do token no localStorage
- ✅ Persistência da sessão do usuário

### 2. Proteção de Rotas
- ✅ Todas as rotas protegidas com ProtectedRoute
- ✅ Redirecionamento automático para login se não autenticado
- ✅ Preservação da rota solicitada para redirecionamento pós-login

### 3. Interface de Login
- ✅ Campos de entrada para username e senha
- ✅ Select dropdown para seleção da empresa
- ✅ Validação de formulário
- ✅ Exibição de erros de autenticação
- ✅ Estados de loading durante a autenticação
- ✅ Valores padrão para teste rápido
- ✅ Lista de empresas: Novo Mundo, SisGest, Vivacom

### 4. Contexto de Autenticação
- ✅ AuthContext com React Context API
- ✅ Gerenciamento de estado do usuário logado
- ✅ Funções de login e logout
- ✅ Verificação de token expirado

### 5. Interface do Usuário
- ✅ Sidebar com informações do usuário
- ✅ Menu do usuário com opção de logout
- ✅ Dashboard personalizado com nome do usuário
- ✅ Exibição de informações da empresa

### 6. Utilitários de API
- ✅ Cliente HTTP configurado
- ✅ Interceptação automática para incluir token
- ✅ Tratamento de token expirado (401)
- ✅ Redirecionamento automático para login

## Como Usar

### 1. Credenciais de Teste
O sistema vem pré-configurado com as seguintes credenciais de teste:

```
Username: admin
Senha: password
Empresa: Novo Mundo (ID: 1)
```

**Empresas Disponíveis:**
- 1 - Novo Mundo
- 2 - SisGest  
- 3 - Vivacom

### 2. Fluxo de Login
1. Acesse `http://localhost:8082`
2. Será redirecionado para `/login` se não autenticado
3. Digite as credenciais (ou use as pré-preenchidas)
4. Selecione uma empresa no dropdown
5. Clique em "Entrar"
6. Será redirecionado para o dashboard

### 3. Resposta da API Esperada
A API pode retornar as seguintes estruturas e o sistema trata todas elas:

**✅ Sucesso (200) - Login realizado:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
    "user": {
      "id": "hash_do_usuario",
      "nome": "Administrador",
      "username": "admin",
      "email": "admin@empresa.com",
      "status": "ativo",
      "foto_perfil": null,
      "id_empresa": "1"
    }
  }
}
```

**❌ Erro (401) - Credenciais inválidas:**
```json
{
  "success": false,
  "message": "Credenciais inválidas"
}
```

**🔧 Todos os Códigos de Status Tratados:**
- **200**: Sucesso ou falha na autenticação
- **400**: Dados inválidos
- **401**: Não autorizado/credenciais incorretas
- **403**: Acesso negado/usuário inativo
- **404**: API não encontrada
- **422**: Dados de entrada inválidos
- **500**: Erro interno do servidor
- **503**: Serviço temporariamente indisponível

### 4. Funcionalidades Adicionais
- **Logout Robusto**: 
  - Clique no avatar do usuário no sidebar e selecione "Sair"
  - Limpeza completa do localStorage e estado da aplicação
  - Redirecionamento automático para login
  - Fallback para casos de erro durante logout
  - Hook personalizado `useLogout` para uso em outras partes da aplicação
- **Sessão Persistente**: O login é mantido entre recarregamentos da página
- **Redirecionamento**: Após login, você é redirecionado para a página solicitada
- **Validação de Dados**: Verificação de integridade dos dados do usuário no localStorage

## Estrutura de Arquivos

```
src/
├── contexts/
│   └── AuthContext.tsx        # Contexto de autenticação
├── components/
│   ├── ProtectedRoute.tsx     # Componente de proteção de rotas
│   └── AppSidebar.tsx         # Sidebar com informações do usuário
├── hooks/
│   └── useLogout.ts           # Hook personalizado para logout
├── lib/
│   └── api.ts                 # Utilitários para chamadas de API
└── pages/
    └── Login.tsx              # Página de login
```

## Configuração da API

Para que o sistema funcione corretamente, certifique-se de que:

1. A API está rodando em `http://localhost/nps-nexus-ai-api`
2. O endpoint `/api/v1/auth/login` está configurado
3. CORS está habilitado para `http://localhost:8082`
4. A API retorna a estrutura de resposta correta

## Estados de Autenticação

O sistema gerencia os seguintes estados:
- `isLoading`: Durante verificação inicial ou processo de login
- `isAuthenticated`: Se o usuário está logado
- `user`: Dados do usuário logado
- `token`: Token JWT para requisições autenticadas

## Tratamento de Erros

O sistema agora possui tratamento robusto de erros com mensagens user-friendly:

### ✅ **Tipos de Erro Tratados:**

1. **Erros de Conectividade**
   - "Não foi possível conectar ao servidor. Verifique sua conexão com a internet e se a API está rodando."
   - Dica visual quando API não está disponível

2. **Erros de API por Status Code**
   - **400**: "Dados inválidos. Verifique os campos preenchidos."
   - **401**: "Credenciais inválidas. Verifique usuário, senha e empresa."
   - **403**: "Acesso negado. Usuário pode estar inativo."
   - **404**: "Serviço de autenticação não encontrado. Verifique se a API está rodando."
   - **422**: "Dados de entrada inválidos. Verifique os campos."
   - **500**: "Erro interno do servidor. Tente novamente em alguns instantes."
   - **503**: "Serviço temporariamente indisponível. Tente novamente em alguns minutos."

3. **Erros de Dados**
   - "Erro na comunicação com o servidor. Resposta inválida recebida."
   - "Resposta do servidor incompleta. Token ou dados do usuário não encontrados."

4. **Validações de Formulário**
   - "Por favor, digite seu usuário."
   - "Por favor, digite sua senha."
   - "Por favor, selecione uma empresa."

### 🛠 **Melhorias Implementadas:**

- ✅ Validação de campos obrigatórios antes do envio
- ✅ Tratamento de respostas JSON inválidas
- ✅ Mensagens específicas para todos os códigos de erro HTTP (400, 401, 403, 404, 422, 500, 503)
- ✅ Tratamento de respostas success:false mesmo com status 200
- ✅ Verificação de completude dos dados retornados (token e user)
- ✅ Indicadores visuais para problemas de conectividade
- ✅ Logs detalhados para debugging em console
- ✅ Fallback para erros não mapeados
- ✅ Interface de erro mais visível e amigável

## Segurança

- ✅ Token armazenado apenas no localStorage (não em cookies)
- ✅ Verificação automática de expiração de token
- ✅ Limpeza completa de dados sensíveis no logout
- ✅ Proteção de todas as rotas administrativas
- ✅ Validação de integridade dos dados do usuário
- ✅ Fallback para limpeza forçada em caso de erro
- ✅ Logs de segurança para auditoria