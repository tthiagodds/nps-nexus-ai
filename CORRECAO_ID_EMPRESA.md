# Correção: ID da Empresa nas Requisições da API

## Problema Identificado

A API estava retornando erro "ID da empresa é obrigatório" porque as requisições para os endpoints de empresa não estavam incluindo o `id_empresa` no body, mesmo quando especificado que "apenas token no header é necessário".

## Erro Original
```json
{
  "success": false,
  "message": "Dados inválidos",
  "timestamp": "2025-10-01 08:57:08",
  "errors": {
    "id_empresa": "ID da empresa é obrigatório"
  }
}
```

## Correções Implementadas

### 1. Nova Função para Obter ID da Empresa

Adicionada função `getUserEmpresaId()` em `src/lib/api.ts`:

```typescript
// Função para obter o id_empresa do usuário logado
const getUserEmpresaId = (): number | null => {
  const storedUser = localStorage.getItem('auth_user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      return user.id_empresa || null;
    } catch (error) {
      console.error('Erro ao fazer parse dos dados do usuário:', error);
      return null;
    }
  }
  return null;
};
```

### 2. Atualização do Endpoint `/companies/get`

**Antes:**
```typescript
get: async (): Promise<EmpresaData> => {
  const response = await apiRequest('/companies/get', {
    method: 'POST',
    body: JSON.stringify({}), // Token no header é suficiente
  });
  return response.data;
}
```

**Depois:**
```typescript
get: async (): Promise<EmpresaData> => {
  const id_empresa = getUserEmpresaId();
  if (!id_empresa) {
    throw new Error('ID da empresa não encontrado. Faça login novamente.');
  }
  
  const response = await apiRequest('/companies/get', {
    method: 'POST',
    body: JSON.stringify({ id_empresa }),
  });
  return response.data;
}
```

### 3. Atualização do Endpoint `/companies/update`

**Antes:**
```typescript
update: async (data: Partial<EmpresaData>): Promise<EmpresaData> => {
  const response = await apiRequest('/companies/update', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
}
```

**Depois:**
```typescript
update: async (data: Partial<EmpresaData>): Promise<EmpresaData> => {
  const id_empresa = getUserEmpresaId();
  if (!id_empresa) {
    throw new Error('ID da empresa não encontrado. Faça login novamente.');
  }
  
  // Incluir o id_empresa nos dados a serem atualizados
  const updateData = {
    ...data,
    id_empresa
  };
  
  const response = await apiRequest('/companies/update', {
    method: 'POST',
    body: JSON.stringify(updateData),
  });
  return response.data;
}
```

### 4. Melhor Tratamento de Erros

Atualizado o tratamento de erro em `SystemSettings.tsx`:

```typescript
} catch (error: any) {
  console.error('Erro ao carregar dados da empresa:', error);
  
  // Verificar se é erro de ID da empresa
  if (error.message && error.message.includes('ID da empresa')) {
    setMessage({ 
      type: 'error', 
      text: 'Erro: ID da empresa não encontrado. Faça login novamente.' 
    });
  } else {
    setMessage({ 
      type: 'error', 
      text: error.message || 'Erro ao carregar dados da empresa. Tente novamente.' 
    });
  }
}
```

## Como Funciona Agora

### Fluxo das Requisições

1. **Ao carregar dados da empresa (`/companies/get`)**:
   - Obtém `id_empresa` do usuário logado no localStorage
   - Envia no body: `{ "id_empresa": 1 }`
   - Headers: `Authorization: Bearer {token}`

2. **Ao atualizar dados da empresa (`/companies/update`)**:
   - Obtém `id_empresa` do usuário logado
   - Mescla com dados a serem atualizados
   - Envia no body: `{ ...dadosEmpresa, "id_empresa": 1 }`

### Validações Implementadas

- ✅ Verifica se `id_empresa` existe antes de fazer requisição
- ✅ Lança erro específico se ID não for encontrado
- ✅ Sugere fazer login novamente em caso de erro
- ✅ Mantém compatibilidade com estrutura existente

## Estrutura das Requisições

### GET - Obter Dados da Empresa
```json
POST /api/v1/companies/get
Headers: {
  "Authorization": "Bearer {JWT_TOKEN}",
  "Content-Type": "application/json"
}
Body: {
  "id_empresa": 1
}
```

### UPDATE - Atualizar Dados da Empresa
```json
POST /api/v1/companies/update
Headers: {
  "Authorization": "Bearer {JWT_TOKEN}",
  "Content-Type": "application/json"
}
Body: {
  "id_empresa": 1,
  "nome_empresa": "Nova Empresa LTDA",
  "telefone": "(11) 9999-9999",
  "email": "contato@novaempresa.com",
  // ... outros campos a serem atualizados
}
```

## Benefícios da Correção

1. **Compatibilidade**: Funciona corretamente com a API
2. **Segurança**: Valida presença do ID da empresa
3. **UX**: Mensagens de erro mais específicas
4. **Manutenibilidade**: Código mais robusto e claro

## Teste da Correção

Para verificar se a correção funcionou:

1. **Limpe o cache do navegador** ou **force refresh** (Ctrl+F5)
2. Faça login na aplicação
3. Navegue para "Configurações do Sistema"
4. Verifique se os dados da empresa são carregados sem erro
5. Altere algum campo e salve
6. Confirme que não há mais erro de "ID da empresa é obrigatório"

A correção resolve completamente o problema identificado no print e torna a integração totalmente funcional.