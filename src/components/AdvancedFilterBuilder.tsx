import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Filter } from "lucide-react";

interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  type: 'text' | 'number' | 'date' | 'boolean';
}

interface FilterGroup {
  id: string;
  logic: 'AND' | 'OR';
  conditions: FilterCondition[];
}

interface AdvancedFilterBuilderProps {
  value: FilterGroup[];
  onChange: (filters: FilterGroup[]) => void;
  availableFields: { name: string; label: string; type: 'text' | 'number' | 'date' | 'boolean' }[];
}

const operators = {
  text: [
    { value: 'eq', label: 'Igual a' },
    { value: 'ne', label: 'Diferente de' },
    { value: 'contains', label: 'Contém' },
    { value: 'starts_with', label: 'Começa com' },
    { value: 'ends_with', label: 'Termina com' },
    { value: 'empty', label: 'Está vazio' },
    { value: 'not_empty', label: 'Não está vazio' }
  ],
  number: [
    { value: 'eq', label: 'Igual a' },
    { value: 'ne', label: 'Diferente de' },
    { value: 'gt', label: 'Maior que' },
    { value: 'gte', label: 'Maior ou igual a' },
    { value: 'lt', label: 'Menor que' },
    { value: 'lte', label: 'Menor ou igual a' },
    { value: 'between', label: 'Entre' }
  ],
  date: [
    { value: 'eq', label: 'Igual a' },
    { value: 'ne', label: 'Diferente de' },
    { value: 'gt', label: 'Depois de' },
    { value: 'gte', label: 'A partir de' },
    { value: 'lt', label: 'Antes de' },
    { value: 'lte', label: 'Até' },
    { value: 'between', label: 'Entre' },
    { value: 'last_7_days', label: 'Últimos 7 dias' },
    { value: 'last_30_days', label: 'Últimos 30 dias' },
    { value: 'last_90_days', label: 'Últimos 90 dias' }
  ],
  boolean: [
    { value: 'eq', label: 'Igual a' }
  ]
};

export function AdvancedFilterBuilder({ value, onChange, availableFields }: AdvancedFilterBuilderProps) {
  const addFilterGroup = () => {
    const newGroup: FilterGroup = {
      id: Date.now().toString(),
      logic: 'AND',
      conditions: [{
        id: Date.now().toString(),
        field: '',
        operator: '',
        value: '',
        type: 'text'
      }]
    };
    onChange([...value, newGroup]);
  };

  const updateFilterGroup = (groupId: string, updatedGroup: Partial<FilterGroup>) => {
    onChange(value.map(group => 
      group.id === groupId ? { ...group, ...updatedGroup } : group
    ));
  };

  const removeFilterGroup = (groupId: string) => {
    onChange(value.filter(group => group.id !== groupId));
  };

  const addCondition = (groupId: string) => {
    const group = value.find(g => g.id === groupId);
    if (group) {
      const newCondition: FilterCondition = {
        id: Date.now().toString(),
        field: '',
        operator: '',
        value: '',
        type: 'text'
      };
      updateFilterGroup(groupId, {
        conditions: [...group.conditions, newCondition]
      });
    }
  };

  const updateCondition = (groupId: string, conditionId: string, updates: Partial<FilterCondition>) => {
    const group = value.find(g => g.id === groupId);
    if (group) {
      const updatedConditions = group.conditions.map(condition =>
        condition.id === conditionId ? { ...condition, ...updates } : condition
      );
      updateFilterGroup(groupId, { conditions: updatedConditions });
    }
  };

  const removeCondition = (groupId: string, conditionId: string) => {
    const group = value.find(g => g.id === groupId);
    if (group && group.conditions.length > 1) {
      updateFilterGroup(groupId, {
        conditions: group.conditions.filter(c => c.id !== conditionId)
      });
    }
  };

  const generateFilterSummary = () => {
    return value.map(group => {
      const conditions = group.conditions
        .filter(c => c.field && c.operator)
        .map(c => {
          const field = availableFields.find(f => f.name === c.field);
          const operator = operators[c.type]?.find(o => o.value === c.operator);
          return `${field?.label || c.field} ${operator?.label || c.operator} ${c.value}`;
        })
        .join(` ${group.logic} `);
      return conditions;
    }).filter(Boolean).join(' E ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-base font-medium">Filtros Avançados</Label>
          <p className="text-sm text-muted-foreground">
            Configure condições para filtrar os dados desta visualização
          </p>
        </div>
        <Button onClick={addFilterGroup} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Grupo
        </Button>
      </div>

      {value.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed rounded-lg">
          <Filter className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Nenhum filtro configurado. Clique em "Adicionar Grupo" para começar.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {value.map((group, groupIndex) => (
          <div key={group.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline">Grupo {groupIndex + 1}</Badge>
                <Select
                  value={group.logic}
                  onValueChange={(logic: 'AND' | 'OR') => updateFilterGroup(group.id, { logic })}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AND">E</SelectItem>
                    <SelectItem value="OR">OU</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  (todas as condições devem {group.logic === 'AND' ? 'ser atendidas' : 'pelo menos uma deve ser atendida'})
                </span>
              </div>
              {value.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFilterGroup(group.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {group.conditions.map((condition, conditionIndex) => {
                const selectedField = availableFields.find(f => f.name === condition.field);
                const fieldType = selectedField?.type || 'text';
                const availableOperators = operators[fieldType] || operators.text;

                return (
                  <div key={condition.id} className="grid grid-cols-12 gap-2 items-end">
                    {conditionIndex > 0 && (
                      <div className="col-span-1 text-center text-sm text-muted-foreground">
                        {group.logic}
                      </div>
                    )}
                    
                    <div className={`${conditionIndex > 0 ? 'col-span-3' : 'col-span-4'} space-y-1`}>
                      <Label className="text-xs">Campo</Label>
                      <Select
                        value={condition.field}
                        onValueChange={(field) => {
                          const fieldDef = availableFields.find(f => f.name === field);
                          updateCondition(group.id, condition.id, {
                            field,
                            type: fieldDef?.type || 'text',
                            operator: '',
                            value: ''
                          });
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFields.map(field => (
                            <SelectItem key={field.name} value={field.name}>
                              {field.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3 space-y-1">
                      <Label className="text-xs">Operador</Label>
                      <Select
                        value={condition.operator}
                        onValueChange={(operator) => updateCondition(group.id, condition.id, { operator })}
                        disabled={!condition.field}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Operador" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableOperators.map(op => (
                            <SelectItem key={op.value} value={op.value}>
                              {op.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-3 space-y-1">
                      <Label className="text-xs">Valor</Label>
                      {fieldType === 'boolean' ? (
                        <Select
                          value={condition.value}
                          onValueChange={(value) => updateCondition(group.id, condition.id, { value })}
                          disabled={!condition.operator}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Valor" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Verdadeiro</SelectItem>
                            <SelectItem value="false">Falso</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          type={fieldType === 'number' ? 'number' : fieldType === 'date' ? 'date' : 'text'}
                          value={condition.value}
                          onChange={(e) => updateCondition(group.id, condition.id, { value: e.target.value })}
                          placeholder="Digite o valor"
                          disabled={!condition.operator || ['empty', 'not_empty', 'last_7_days', 'last_30_days', 'last_90_days'].includes(condition.operator)}
                        />
                      )}
                    </div>

                    <div className="col-span-2 flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addCondition(group.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      {group.conditions.length > 1 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeCondition(group.id, condition.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {value.length > 0 && (
        <div className="p-4 bg-muted/50 rounded-lg">
          <Label className="text-sm font-medium">Resumo dos Filtros:</Label>
          <p className="text-sm text-muted-foreground mt-1">
            {generateFilterSummary() || 'Configure os campos para ver o resumo'}
          </p>
        </div>
      )}
    </div>
  );
}