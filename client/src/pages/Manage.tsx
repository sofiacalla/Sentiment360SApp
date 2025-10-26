import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus } from "lucide-react";

export default function Manage() {
  const { toast } = useToast();
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackSentiment, setFeedbackSentiment] = useState("positive");
  const [feedbackSource, setFeedbackSource] = useState("Twitter");
  const [feedbackRegion, setFeedbackRegion] = useState("Northeast");

  const [priorityTitle, setPriorityTitle] = useState("");
  const [priorityDescription, setPriorityDescription] = useState("");
  const [priorityImpact, setPriorityImpact] = useState("5");
  const [priorityEffort, setPriorityEffort] = useState("5");
  const [priorityCategory, setPriorityCategory] = useState("Product");
  const [priorityRank, setPriorityRank] = useState("1");

  const [channelName, setChannelName] = useState("");
  const [channelStatus, setChannelStatus] = useState("active");
  const [channelMessageCount, setChannelMessageCount] = useState("0");

  const addFeedbackMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      toast({
        title: "Success",
        description: "Feedback added successfully",
      });
      setFeedbackText("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add feedback",
        variant: "destructive",
      });
    },
  });

  const addPriorityMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/priority-items", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/priority-items"] });
      toast({
        title: "Success",
        description: "Priority item added successfully",
      });
      setPriorityTitle("");
      setPriorityDescription("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add priority item",
        variant: "destructive",
      });
    },
  });

  const addChannelMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/channels", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/channels"] });
      toast({
        title: "Success",
        description: "Channel added successfully",
      });
      setChannelName("");
      setChannelMessageCount("0");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add channel",
        variant: "destructive",
      });
    },
  });

  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    addFeedbackMutation.mutate({
      text: feedbackText,
      sentiment: feedbackSentiment,
      source: feedbackSource,
      region: feedbackRegion,
    });
  };

  const handleAddPriority = (e: React.FormEvent) => {
    e.preventDefault();
    addPriorityMutation.mutate({
      title: priorityTitle,
      description: priorityDescription,
      impact: parseInt(priorityImpact),
      effort: parseInt(priorityEffort),
      category: priorityCategory,
      rank: parseInt(priorityRank),
    });
  };

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    addChannelMutation.mutate({
      name: channelName,
      status: channelStatus,
      messageCount: channelMessageCount,
    });
  };

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Data Management</h1>
          <p className="text-muted-foreground">
            Add new feedback, priority items, and channels to your analytics dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Add New Feedback</h2>
            </div>

            <form onSubmit={handleAddFeedback} className="space-y-4">
              <div>
                <Label htmlFor="feedback-text">Feedback Text</Label>
                <Textarea
                  id="feedback-text"
                  data-testid="input-feedback-text"
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Enter customer feedback..."
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="feedback-sentiment">Sentiment</Label>
                <Select value={feedbackSentiment} onValueChange={setFeedbackSentiment}>
                  <SelectTrigger id="feedback-sentiment" data-testid="select-sentiment" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feedback-source">Source</Label>
                  <Select value={feedbackSource} onValueChange={setFeedbackSource}>
                    <SelectTrigger id="feedback-source" data-testid="select-source" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Twitter">Twitter</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Live Chat">Live Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="feedback-region">Region</Label>
                  <Select value={feedbackRegion} onValueChange={setFeedbackRegion}>
                    <SelectTrigger id="feedback-region" data-testid="select-region" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Northeast">Northeast</SelectItem>
                      <SelectItem value="Southeast">Southeast</SelectItem>
                      <SelectItem value="Midwest">Midwest</SelectItem>
                      <SelectItem value="Southwest">Southwest</SelectItem>
                      <SelectItem value="West">West</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                data-testid="button-add-feedback"
                disabled={addFeedbackMutation.isPending}
              >
                {addFeedbackMutation.isPending ? "Adding..." : "Add Feedback"}
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Add Priority Item</h2>
            </div>

            <form onSubmit={handleAddPriority} className="space-y-4">
              <div>
                <Label htmlFor="priority-title">Title</Label>
                <Input
                  id="priority-title"
                  data-testid="input-priority-title"
                  value={priorityTitle}
                  onChange={(e) => setPriorityTitle(e.target.value)}
                  placeholder="Enter priority title..."
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="priority-description">Description</Label>
                <Textarea
                  id="priority-description"
                  data-testid="input-priority-description"
                  value={priorityDescription}
                  onChange={(e) => setPriorityDescription(e.target.value)}
                  placeholder="Enter description..."
                  required
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority-impact">Impact (1-10)</Label>
                  <Input
                    id="priority-impact"
                    data-testid="input-priority-impact"
                    type="number"
                    min="1"
                    max="10"
                    value={priorityImpact}
                    onChange={(e) => setPriorityImpact(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="priority-effort">Effort (1-10)</Label>
                  <Input
                    id="priority-effort"
                    data-testid="input-priority-effort"
                    type="number"
                    min="1"
                    max="10"
                    value={priorityEffort}
                    onChange={(e) => setPriorityEffort(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority-category">Category</Label>
                  <Select value={priorityCategory} onValueChange={setPriorityCategory}>
                    <SelectTrigger id="priority-category" data-testid="select-category" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Product">Product</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Content">Content</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority-rank">Rank</Label>
                  <Input
                    id="priority-rank"
                    data-testid="input-priority-rank"
                    type="number"
                    min="1"
                    value={priorityRank}
                    onChange={(e) => setPriorityRank(e.target.value)}
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                data-testid="button-add-priority"
                disabled={addPriorityMutation.isPending}
              >
                {addPriorityMutation.isPending ? "Adding..." : "Add Priority Item"}
              </Button>
            </form>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Add New Channel</h2>
            </div>

            <form onSubmit={handleAddChannel} className="space-y-4">
              <div>
                <Label htmlFor="channel-name">Channel Name</Label>
                <Input
                  id="channel-name"
                  data-testid="input-channel-name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="e.g., Twitter, Instagram, Support Email..."
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="channel-status">Status</Label>
                <Select value={channelStatus} onValueChange={setChannelStatus}>
                  <SelectTrigger id="channel-status" data-testid="select-channel-status" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="channel-message-count">Message Count</Label>
                <Input
                  id="channel-message-count"
                  data-testid="input-channel-message-count"
                  type="text"
                  value={channelMessageCount}
                  onChange={(e) => setChannelMessageCount(e.target.value)}
                  placeholder="e.g., 2.5K, 15K, 100..."
                  required
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                data-testid="button-add-channel"
                disabled={addChannelMutation.isPending}
              >
                {addChannelMutation.isPending ? "Adding..." : "Add Channel"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
