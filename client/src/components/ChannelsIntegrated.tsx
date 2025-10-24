import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiX, SiFacebook, SiInstagram } from "react-icons/si";
import { Mail, MessageCircle, CheckCircle2, LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Channel } from "@shared/schema";

const iconMap: Record<string, LucideIcon | React.ComponentType<{ className?: string }>> = {
  Twitter: SiX,
  Facebook: SiFacebook,
  Instagram: SiInstagram,
  Email: Mail,
  "Live Chat": MessageCircle,
};

export default function ChannelsIntegrated() {
  // Fetch data from API
  const { data: channelsData, isLoading } = useQuery<Channel[]>({
    queryKey: ["/api/channels"],
  });

  return (
    <Card className="p-6" data-testid="card-channels-integrated">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Integrated Customer Channels</h3>
        <Badge variant="secondary" className="text-xs">
          {channelsData?.length || 0} Active
        </Badge>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {channelsData?.map((channel) => {
            const Icon = iconMap[channel.name] || MessageCircle;
            return (
              <div
                key={channel.id}
                className="flex flex-col items-center p-4 rounded-lg border bg-card hover-elevate"
                data-testid={`channel-${channel.name.toLowerCase()}`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                <div className="text-sm font-medium mb-1">{channel.name}</div>
                
                <div className="flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">Connected</span>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {channel.messageCount} messages
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
