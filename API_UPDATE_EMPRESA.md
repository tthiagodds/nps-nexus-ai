# Atualização da API de Login - Dados da Empresa

## Resumo das Mudanças

A API de login foi atualizada para retornar informações completas da empresa junto com os dados do usuário. Esta documentação descreve as alterações implementadas no frontend para suportar a nova estrutura.

## Nova Estrutura da Resposta da API

```json
{
    "success": true,
    "message": "Login realizado com sucesso",
    "timestamp": "2025-10-01 08:33:16",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
        "user": {
            "id_login": "7a8b9c1d2e3f4g5h6i7j8k9l0m1n2o3p",
            "id_empresa": 1,
            "nome": "Thiago Silva",
            "username": "tthiago.dds@gmail.com",
            "email": "tthiago.dds@gmail.com",
            "status": 1,
            "foto_perfil": null,
            "created_at": "2025-09-30 22:18:34",
            "updated_at": "2025-09-30 22:35:56"
        },
        "empresa": {
            "id_empresa": 1,
            "nome_empresa": "Empresa Teste LTDA",
            "razao_social": "Empresa Teste Desenvolvimento de Software LTDA",
            "cpf_cnpj": "00.000.000/0001-00",
            "cidade": "São Paulo",
            "estado": "SP",
            "telefone": "(11) 3000-0000",
            "email": "contato@empresateste.com.br"
        },
        "expires_in": 3600
    }
}
```

## Alterações Implementadas

### 1. AuthContext (`src/contexts/AuthContext.tsx`)

#### Novas Interfaces
- **Interface `Empresa`**: Adicionada para mapear os dados da empresa
- **Interface `User`**: Atualizada para usar `id_login` em vez de `id`
- **Interface `AuthContextType`**: Adicionada propriedade `empresa`

#### Mudanças no Estado
- Adicionado estado `empresa` do tipo `Empresa | null`
- Atualizada recuperação do localStorage para incluir dados da empresa

#### Função `login`
- Atualizada para processar o novo campo `empresa` da resposta da API
- Mapeamento dos dados da empresa quando disponível
- Armazenamento dos dados da empresa no localStorage

#### Função `logout`
- Adicionada limpeza dos dados da empresa do estado e localStorage

### 2. Layout Component (`src/components/Layout.tsx`)

#### Mudanças na Exibição
- **Antes**: Exibia o ID da empresa (`user?.id_empresa`)
- **Depois**: Exibe o nome da empresa (`empresa?.nome_empresa`)

#### Hook de Autenticação
- Atualizado para usar também os dados da empresa: `const { user, empresa } = useAuth()`

## Benefícios das Mudanças

1. **Melhor UX**: O usuário agora vê o nome da empresa em vez de um ID numérico
2. **Dados Completos**: Informações completas da empresa ficam disponíveis para toda a aplicação
3. **Flexibilidade**: Possibilidade de usar outros dados da empresa (telefone, cidade, etc.) futuramente
4. **Consistência**: Mantém a estrutura de dados sincronizada com a API

## Compatibilidade

### Retrocompatibilidade
- ✅ Mantém funcionamento se a API antiga ainda não incluir dados da empresa
- ✅ Fallback para "N/A" quando dados da empresa não estão disponíveis
- ✅ Não quebra funcionalidades existentes

### Migração de Dados
- Os dados são migrados automaticamente no próximo login
- Não há necessidade de ação manual dos usuários
- LocalStorage é limpo e recriado com a nova estrutura

## Campos da Empresa Disponíveis

A partir de agora, a aplicação tem acesso aos seguintes dados da empresa:

- `id_empresa`: ID numérico da empresa
- `nome_empresa`: Nome comercial da empresa
- `razao_social`: Razão social completa
- `cpf_cnpj`: Documento da empresa
- `cidade`: Cidade onde a empresa está localizada
- `estado`: Estado (UF)
- `telefone`: Telefone comercial
- `email`: Email corporativo

## Uso dos Dados da Empresa

### No Contexto de Autenticação
```tsx
const { user, empresa } = useAuth();

// Acessar dados da empresa
console.log(empresa?.nome_empresa); // "Empresa Teste LTDA"
console.log(empresa?.cidade); // "São Paulo"
```

### Exibição no Layout
```tsx
<p className="text-xs text-muted-foreground">
  Empresa: {empresa?.nome_empresa || 'N/A'}
</p>
```

## Próximos Passos

1. **Implementar exibição completa da empresa**: Usar outros campos da empresa em configurações
2. **Validação de empresa**: Adicionar verificações de empresa ativa/válida
3. **Multi-tenancy**: Usar dados da empresa para isolamento de dados entre empresas
4. **Branding**: Usar dados da empresa para personalização da interface

## Teste da Implementação

Para testar as mudanças:

1. Fazer logout da aplicação
2. Fazer login novamente
3. Verificar se o nome da empresa aparece no lugar do ID
4. Verificar no localStorage se os dados da empresa estão sendo salvos corretamente

```javascript
// No DevTools do navegador
localStorage.getItem('auth_empresa'); // Deve retornar JSON com dados da empresa
```