import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageSquare, Smartphone } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
  percentage: number;
}

interface ChannelDistributionProps {
  value: Channel[];
  onChange: (channels: Channel[]) => void;
}

export function ChannelDistribution({ value, onChange }: ChannelDistributionProps) {
  const [channels, setChannels] = useState<Channel[]>([
    { id: 'email', name: 'Email', icon: Mail, enabled: true, percentage: 50 },
    { id: 'sms', name: 'SMS', icon: MessageSquare, enabled: false, percentage: 0 },
    { id: 'whatsapp', name: 'WhatsApp', icon: Smartphone, enabled: true, percentage: 50 }
  ]);

  useEffect(() => {
    if (value && value.length > 0) {
      setChannels(value);
    }
  }, [value]);

  const updateChannel = (id: string, updates: Partial<Channel>) => {
    const updatedChannels = channels.map(channel => 
      channel.id === id ? { ...channel, ...updates } : channel
    );
    
    // Auto-adjust percentages if needed
    if (updates.enabled !== undefined) {
      const enabledChannels = updatedChannels.filter(c => c.enabled);
      if (enabledChannels.length > 0) {
        const equalPercentage = Math.floor(100 / enabledChannels.length);
        let remaining = 100 - (equalPercentage * enabledChannels.length);
        
        updatedChannels.forEach(channel => {
          if (channel.enabled) {
            channel.percentage = equalPercentage + (remaining > 0 ? 1 : 0);
            if (remaining > 0) remaining--;
          } else {
            channel.percentage = 0;
          }
        });
      }
    }

    setChannels(updatedChannels);
    onChange(updatedChannels);
  };

  const updatePercentage = (id: string, percentage: number) => {
    const updatedChannels = [...channels];
    const channel = updatedChannels.find(c => c.id === id);
    if (channel) {
      channel.percentage = percentage;
      
      // Adjust other percentages to maintain 100% total
      const enabledChannels = updatedChannels.filter(c => c.enabled && c.id !== id);
      const remaining = 100 - percentage;
      const perChannel = enabledChannels.length > 0 ? Math.floor(remaining / enabledChannels.length) : 0;
      let leftover = remaining - (perChannel * enabledChannels.length);
      
      enabledChannels.forEach((c, index) => {
        c.percentage = perChannel + (index < leftover ? 1 : 0);
      });
      
      setChannels(updatedChannels);
      onChange(updatedChannels);
    }
  };

  const totalPercentage = channels.filter(c => c.enabled).reduce((sum, c) => sum + c.percentage, 0);
  const enabledChannels = channels.filter(c => c.enabled);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Distribuição por Canal</CardTitle>
        <p className="text-sm text-muted-foreground">
          Selecione os canais e defina a porcentagem de envio para cada um
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center space-x-4 p-3 border rounded-lg">
            <Checkbox
              checked={channel.enabled}
              onCheckedChange={(checked) => 
                updateChannel(channel.id, { enabled: !!checked })
              }
            />
            
            <div className="flex items-center gap-2 flex-1">
              <channel.icon className="h-4 w-4" />
              <Label className="font-medium">{channel.name}</Label>
            </div>
            
            {channel.enabled && (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={channel.percentage}
                  onChange={(e) => updatePercentage(channel.id, Number(e.target.value))}
                  className="w-16 h-8"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            )}
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total:</span>
            <span className={`text-sm font-medium ${totalPercentage === 100 ? 'text-green-600' : 'text-destructive'}`}>
              {totalPercentage}%
            </span>
          </div>
          {totalPercentage !== 100 && enabledChannels.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              ⚠️ O total deve ser igual a 100%
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}