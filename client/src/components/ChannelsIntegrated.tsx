/**
 * Channels Integrated Component
 * 
 * Displays all integrated communication channels in a grid layout
 * Each channel card shows:
 * - Platform icon (Twitter, Facebook, Instagram, etc.)
 * - Channel name
 * - Connection status (Connected badge)
 * - Message count
 * 
 * TODO: Add Twitter API integration for real-time message counts
 * TODO: Add Instagram API integration for real-time message counts
 * TODO: Add Facebook API integration for real-time message counts
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiX, SiFacebook, SiInstagram } from "react-icons/si";
import { Mail, MessageCircle, CheckCircle2, LucideIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Channel } from "@shared/schema";

/**
 * Icon Mapping
 * Maps channel names to their corresponding brand icons
 * Uses react-icons/si for social media logos
 * Uses lucide-react for generic icons (Email, Chat)
 */
const iconMap: Record<string, LucideIcon | React.ComponentType<{ className?: string }>> = {
  Twitter: SiX, // X (formerly Twitter) logo
  Facebook: SiFacebook, // Facebook logo
  Instagram: SiInstagram, // Instagram logo
  Email: Mail, // Email envelope icon
  "Live Chat": MessageCircle, // Chat bubble icon
};

export default function ChannelsIntegrated() {
  /**
   * Fetch Channels Data
   * Retrieves all integrated communication channels from the API
   */
  const { data: channelsData, isLoading } = useQuery<Channel[]>({
    queryKey: ["/api/channels"],
  });

  return (
    <Card className="p-6" data-testid="card-channels-integrated">
      {/* Header with Active Channels Count */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Integrated Customer Channels</h3>
        
        {/* Active Channels Badge */}
        <Badge variant="secondary" className="text-xs">
          {channelsData?.length || 0} Active
        </Badge>
      </div>
      
      {isLoading ? (
        // Loading State: Display skeleton cards
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-muted/20 animate-pulse" />
          ))}
        </div>
      ) : (
        // Loaded State: Display channel cards
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {channelsData?.map((channel) => {
            // Get appropriate icon for the channel (fallback to MessageCircle)
            const Icon = iconMap[channel.name] || MessageCircle;
            
            return (
              <div
                key={channel.id}
                className="flex flex-col items-center p-4 rounded-lg border bg-card hover-elevate"
                data-testid={`channel-${channel.name.toLowerCase()}`}
              >
                {/* Channel Icon Badge */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Channel Name */}
                <div className="text-sm font-medium mb-1">{channel.name}</div>
                
                {/* Connection Status Badge */}
                <div className="flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-3 h-3 text-green-600" />
                  <span className="text-xs text-green-600">Connected</span>
                </div>
                
                {/* Message Count */}
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
