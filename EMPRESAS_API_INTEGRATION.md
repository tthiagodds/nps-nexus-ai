# Integração com API de Empresas - Configurações do Sistema

## Resumo das Implementações

Implementada a integração completa com os novos endpoints de empresas da API, conforme especificado. A página de Configurações do Sistema agora carrega e salva dados reais da empresa através da API.

## Endpoints Implementados

### 1. Obter Dados da Empresa - `/companies/get`
- **Método**: POST
- **Uso**: Carregar dados da empresa ao abrir as configurações
- **Headers**: `Authorization: Bearer {JWT_TOKEN}`, `Content-Type: application/json`
- **Body**: `{}` (token no header é suficiente)

### 2. Atualizar Empresa - `/companies/update`
- **Método**: POST  
- **Uso**: Salvar alterações nos dados da empresa
- **Headers**: `Authorization: Bearer {JWT_TOKEN}`, `Content-Type: application/json`
- **Body**: Dados da empresa a serem atualizados

### 3. Listar Empresas - `/companies/list`
- **Método**: POST
- **Uso**: Disponível para futuras funcionalidades
- **Headers**: `Authorization: Bearer {JWT_TOKEN}`, `Content-Type: application/json`
- **Body**: `{}` (token no header é suficiente)

## Estrutura de Dados

```typescript
interface EmpresaData {
  id_empresa?: number;
  nome_empresa?: string;
  razao_social?: string;
  cpf_cnpj?: string;          // Somente leitura
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  website?: string;
  id_segmento?: number;       // Não alterável via update
  logo_empresa?: string;
}
```

## Funcionalidades Implementadas

### ✅ Carregamento Automático
- Dados da empresa são carregados automaticamente ao abrir as configurações
- Loading state durante o carregamento
- Tratamento de erros com mensagens amigáveis

### ✅ Formulário Completo
- **Informações Básicas**: Nome, razão social, CNPJ, email, telefone, website
- **Endereço Completo**: Logradouro, número, complemento, bairro, cidade, estado, CEP
- **Validações**: CNPJ somente leitura, estado limitado a 2 caracteres

### ✅ Salvamento de Dados
- Botão "Salvar Configurações" funcional
- Loading state durante salvamento
- Feedback visual de sucesso/erro
- Auto-clear de mensagens após 3 segundos

### ✅ Segurança Implementada
- Token JWT obrigatório em todas as requisições
- Validação automática de token expirado
- Redirecionamento para login em caso de token inválido

## Campos da Interface

### Seção "Informações da Empresa"
```tsx
- Nome da Empresa (nome_empresa)
- Razão Social (razao_social)  
- CNPJ (cpf_cnpj) - Somente leitura
- Email Corporativo (email)
- Telefone (telefone)
- Website (website)
```

### Seção "Endereço"
```tsx
- Logradouro (endereco)
- Número (numero)
- Complemento (complemento)
- Bairro (bairro)
- Cidade (cidade)
- Estado (estado) - Máximo 2 caracteres
- CEP (cep)
```

## Estados e Controles

### Estados de Loading
```tsx
const [isLoading, setIsLoading] = useState(true);     // Carregamento inicial
const [isSaving, setIsSaving] = useState(false);     // Salvamento
```

### Estados de Mensagem
```tsx
const [message, setMessage] = useState({ 
  type: 'success' | 'error' | '', 
  text: string 
});
```

### Dados da Empresa
```tsx
const [empresaData, setEmpresaData] = useState({
  // Todos os campos da empresa com valores padrão vazios
});
```

## Tratamento de Erros

### Códigos de Resposta Tratados
- **200**: Sucesso - Dados salvos/carregados
- **400**: Dados inválidos - Validação de campos
- **401**: Token ausente/inválido - Redirecionamento para login
- **403**: Sem permissão - Mensagem de erro específica
- **404**: Empresa não encontrada - Erro tratado
- **500**: Erro interno - Mensagem genérica

### Mensagens de Feedback
```tsx
// Sucesso
"Dados da empresa salvos com sucesso!"

// Erro genérico
"Erro ao salvar dados da empresa. Tente novamente."

// Erro de carregamento
"Erro ao carregar dados da empresa. Tente novamente."
```

## Integração com AuthContext

A implementação utiliza o contexto de autenticação existente:

```tsx
const { empresa } = useAuth();
```

- Acesso aos dados básicos da empresa do contexto
- Token de autenticação automático
- Sincronização com dados de login

## Funcionalidades de UX

### Loading States
- Spinner durante carregamento inicial
- Botão desabilitado durante salvamento
- Texto de "Salvando..." no botão

### Feedback Visual
- Alertas de sucesso (verde) e erro (vermelho)
- Ícones contextuais (CheckCircle/AlertCircle)
- Auto-clear de mensagens

### Validações
- Campo CNPJ como somente leitura
- Limitação de 2 caracteres para estado
- Validação de email (HTML5)
- Placeholder informativos

## Estrutura do Código

### Arquivo: `src/lib/api.ts`
```typescript
// Adicionadas funções específicas para empresas
export const empresaAPI = {
  get: () => Promise<EmpresaData>,
  list: () => Promise<EmpresaData[]>,
  update: (data) => Promise<EmpresaData>
}
```

### Arquivo: `src/pages/SystemSettings.tsx`
```typescript
// Estados e funções adicionadas
- empresaData: Estado com dados da empresa
- handleEmpresaChange: Atualizar campos individuais
- handleSaveEmpresa: Salvar dados na API
- useEffect: Carregar dados iniciais
```

## Próximos Passos

### Melhorias Sugeridas
1. **Upload de Logo**: Implementar upload real de imagem
2. **Validações Avançadas**: CEP, telefone, email em tempo real
3. **Auto-save**: Salvar automaticamente após mudanças
4. **Histórico**: Log de alterações nos dados da empresa
5. **Multi-tenancy**: Suporte completo para múltiplas empresas

### Funcionalidades Futuras
1. **Segmentação**: Gerenciar `id_segmento` da empresa
2. **Configurações Avançadas**: Integrações, webhooks, etc.
3. **Branding**: Aplicar logo e cores da empresa na interface
4. **Relatórios**: Dados de uso específicos por empresa

## Teste da Implementação

### Passos para Testar
1. Fazer login na aplicação
2. Navegar para "Configurações do Sistema"
3. Verificar se os dados da empresa são carregados
4. Alterar alguns campos
5. Clicar em "Salvar Configurações"
6. Verificar mensagem de sucesso
7. Recarregar a página e confirmar que dados foram salvos

### Verificações no DevTools
```javascript
// Verificar requisições na aba Network
- POST /api/v1/companies/get (ao carregar)
- POST /api/v1/companies/update (ao salvar)

// Headers esperados
Authorization: Bearer {token}
Content-Type: application/json
```

A implementação está completa e pronta para uso, seguindo exatamente as especificações dos endpoints fornecidos.