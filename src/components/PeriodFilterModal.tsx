import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PeriodFilterModalProps {
  children: React.ReactNode;
  onApplyFilter: (filter: any) => void;
}

export function PeriodFilterModal({ children, onApplyFilter }: PeriodFilterModalProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [periodType, setPeriodType] = useState("custom");
  const [open, setOpen] = useState(false);

  const handleQuickPeriod = (type: string) => {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    switch (type) {
      case "today":
        setStartDate(startOfToday);
        setEndDate(today);
        break;
      case "week":
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        setStartDate(weekStart);
        setEndDate(today);
        break;
      case "month":
        const monthStart = new Date(today);
        monthStart.setDate(today.getDate() - 30);
        setStartDate(monthStart);
        setEndDate(today);
        break;
      case "quarter":
        const quarterStart = new Date(today);
        quarterStart.setDate(today.getDate() - 90);
        setStartDate(quarterStart);
        setEndDate(today);
        break;
    }
    setPeriodType(type);
  };

  const handleApply = () => {
    onApplyFilter({
      startDate,
      endDate,
      periodType
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtro de Período
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Períodos Rápidos */}
          <div className="space-y-3">
            <Label>Períodos Rápidos</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={periodType === "today" ? "default" : "outline"} 
                onClick={() => handleQuickPeriod("today")}
              >
                Hoje
              </Button>
              <Button 
                variant={periodType === "week" ? "default" : "outline"} 
                onClick={() => handleQuickPeriod("week")}
              >
                Últimos 7 dias
              </Button>
              <Button 
                variant={periodType === "month" ? "default" : "outline"} 
                onClick={() => handleQuickPeriod("month")}
              >
                Últimos 30 dias
              </Button>
              <Button 
                variant={periodType === "quarter" ? "default" : "outline"} 
                onClick={() => handleQuickPeriod("quarter")}
              >
                Últimos 90 dias
              </Button>
            </div>
          </div>

          {/* Período Customizado */}
          <div className="space-y-4">
            <Label>Período Customizado</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : "Selecione..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setPeriodType("custom");
                      }}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date">Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : "Selecione..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date);
                        setPeriodType("custom");
                      }}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleApply}>
              Aplicar Filtro
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}