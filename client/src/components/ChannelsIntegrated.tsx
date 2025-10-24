import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiX, SiFacebook, SiInstagram } from "react-icons/si";
import { Mail, MessageCircle, CheckCircle2 } from "lucide-react";

// TODO: API Integration Point - Track connected channels
// This component shows which social media APIs are currently integrated
const mockChannels = [
  { id: 1, name: "Twitter", icon: SiX, status: "active", count: "12.5K" },
  { id: 2, name: "Facebook", icon: SiFacebook, status: "active", count: "8.3K" },
  { id: 3, name: "Instagram", icon: SiInstagram, status: "active", count: "15.2K" },
  { id: 4, name: "Email", icon: Mail, status: "active", count: "4.1K" },
  { id: 5, name: "Live Chat", icon: MessageCircle, status: "active", count: "2.8K" },
];

export default function ChannelsIntegrated() {
  return (
    <Card className="p-6" data-testid="card-channels-integrated">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Integrated Customer Channels</h3>
        <Badge variant="secondary" className="text-xs">
          {mockChannels.length} Active
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {mockChannels.map((channel) => {
          const Icon = channel.icon;
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
                {channel.count} messages
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
