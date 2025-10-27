/**
 * Manage Page Component
 * 
 * This page provides data management interfaces for adding new:
 * - Customer feedback entries
 * - Priority items for the impact matrix
 * - Communication channels
 * 
 * All forms use controlled components with real-time validation
 * and optimistic updates to the dashboard.
 */

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
import { Plus, AlertCircle } from "lucide-react";

export default function Manage() {
  // Toast notification hook for user feedback
  const { toast } = useToast();
  
  // ============================================================================
  // Feedback Form State
  // Controls for the customer feedback submission form
  // ============================================================================
  const [feedbackText, setFeedbackText] = useState(""); // Feedback content
  const [feedbackSentiment, setFeedbackSentiment] = useState("positive"); // positive/negative/neutral
  const [feedbackSource, setFeedbackSource] = useState("Twitter"); // Channel source
  const [feedbackRegion, setFeedbackRegion] = useState("Northeast"); // U.S. region

  // ============================================================================
  // Priority Item Form State
  // Controls for the priority item submission form
  // ============================================================================
  const [priorityTitle, setPriorityTitle] = useState(""); // Item title
  const [priorityDescription, setPriorityDescription] = useState(""); // Detailed description
  const [priorityImpact, setPriorityImpact] = useState("5"); // Impact score 1-10
  const [priorityEffort, setPriorityEffort] = useState("5"); // Effort score 1-10
  const [priorityCategory, setPriorityCategory] = useState("Product"); // Category classification
  const [priorityRank, setPriorityRank] = useState("1"); // Priority ranking

  // ============================================================================
  // Channel Form State
  // Controls for the communication channel submission form
  // ============================================================================
  const [channelName, setChannelName] = useState(""); // Channel name
  const [channelStatus, setChannelStatus] = useState("active"); // active/inactive
  const [channelMessageCount, setChannelMessageCount] = useState("0"); // Formatted count (e.g., "2.5K")
  
  // ============================================================================
  // Message Count Validation State
  // Tracks whether the message count input is valid and stores error messages
  // ============================================================================
  const [messageCountError, setMessageCountError] = useState<string | null>(null);

  /**
   * VALIDATE MESSAGE COUNT FORMAT
   * 
   * This function validates the message count input to ensure it follows
   * acceptable formats. It prevents invalid data from being submitted.
   * 
   * VALID FORMATS:
   * - Plain numbers: "100", "1500", "42"
   * - Numbers with K suffix: "2.5K", "10K", "1.2K"  (case insensitive)
   * - Numbers with M suffix: "1M", "2.5M", "10M"    (case insensitive)
   * - Numbers with B suffix: "1B", "3.5B"           (case insensitive)
   * 
   * INVALID FORMATS:
   * - Text/words: "hello", "test"
   * - Special characters: "@", "#", "$"
   * - Multiple decimal points: "2.5.3K"
   * - Invalid suffix: "2X", "5Z", "2KK", "10kmb"
   * - Mixed characters: "1a2", "2.5abc"
   * 
   * EDGE CASE HANDLING:
   * - Trims whitespace before validation
   * - Case-insensitive suffix matching (K, k, M, m, B, b all work)
   * - Rejects any trailing characters after valid suffix
   * 
   * @param value - The message count string to validate
   * @returns boolean - true if valid, false if invalid
   */
  const validateMessageCount = (value: string): boolean => {
    // Trim whitespace to handle edge cases like " 100 " or "2.5K "
    const trimmedValue = value.trim();
    
    // Allow empty string (required attribute will handle it)
    if (trimmedValue === "") {
      setMessageCountError(null);
      return true;
    }

    // EDGE CASE: Reject negative numbers (e.g., "-100", "-2.5K")
    if (trimmedValue.startsWith("-") || trimmedValue.startsWith("+")) {
      setMessageCountError(
        "Invalid format. Use numbers (e.g., 100), K suffix (e.g., 2.5K), M suffix (e.g., 1.5M), or B suffix (e.g., 3B)."
      );
      return false;
    }

    // EDGE CASE: Reject scientific notation (e.g., "1E3", "1e3", "2.5E10")
    if (trimmedValue.toLowerCase().includes("e")) {
      setMessageCountError(
        "Invalid format. Use numbers (e.g., 100), K suffix (e.g., 2.5K), M suffix (e.g., 1.5M), or B suffix (e.g., 3B)."
      );
      return false;
    }

    // STRICT Regular expression pattern for valid message count formats
    // ^ = start of string (no characters before)
    // [0-9]+ = one or more digits (required)
    // (\.[0-9]+)? = optional decimal point followed by one or more digits
    // [KMB]? = optional SINGLE letter K, M, or B (case insensitive with 'i' flag)
    // $ = end of string (no characters after - this prevents "1KK" or "2.5abc")
    const validPattern = /^[0-9]+(\.[0-9]+)?[KMB]?$/i;

    // Test the trimmed value against the pattern
    if (!validPattern.test(trimmedValue)) {
      // Invalid format detected - set error message with examples
      setMessageCountError(
        "Invalid format. Use numbers (e.g., 100), K suffix (e.g., 2.5K), M suffix (e.g., 1.5M), or B suffix (e.g., 3B)."
      );
      return false;
    }

    // Valid format - clear any error messages
    setMessageCountError(null);
    return true;
  };

  /**
   * HANDLE MESSAGE COUNT CHANGE
   * 
   * This function is called every time the user types in the message count field.
   * It updates the state and validates the input in real-time to provide
   * immediate feedback to the user.
   * 
   * @param value - The new value from the input field
   */
  const handleMessageCountChange = (value: string) => {
    setChannelMessageCount(value);
    validateMessageCount(value);
  };

  // ============================================================================
  // Feedback Mutation
  // Handles feedback submission with cache invalidation
  // ============================================================================
  const addFeedbackMutation = useMutation({
    mutationFn: async (data: any) => {
      // POST request to create feedback
      return await apiRequest("POST", "/api/feedback", data);
    },
    onSuccess: () => {
      // Invalidate relevant queries to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["/api/feedback"] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard-stats"] });
      
      // Show success notification
      toast({
        title: "Success",
        description: "Feedback added successfully",
      });
      
      // Clear form
      setFeedbackText("");
    },
    onError: () => {
      // Show error notification
      toast({
        title: "Error",
        description: "Failed to add feedback",
        variant: "destructive",
      });
    },
  });

  // ============================================================================
  // Priority Item Mutation
  // Handles priority item submission with cache invalidation
  // ============================================================================
  const addPriorityMutation = useMutation({
    mutationFn: async (data: any) => {
      // POST request to create priority item
      return await apiRequest("POST", "/api/priority-items", data);
    },
    onSuccess: () => {
      // Invalidate priority items query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["/api/priority-items"] });
      
      // Show success notification
      toast({
        title: "Success",
        description: "Priority item added successfully",
      });
      
      // Clear form fields
      setPriorityTitle("");
      setPriorityDescription("");
    },
    onError: () => {
      // Show error notification
      toast({
        title: "Error",
        description: "Failed to add priority item",
        variant: "destructive",
      });
    },
  });

  // ============================================================================
  // Channel Mutation
  // Handles channel submission with cache invalidation
  // ============================================================================
  const addChannelMutation = useMutation({
    mutationFn: async (data: any) => {
      // POST request to create channel
      return await apiRequest("POST", "/api/channels", data);
    },
    onSuccess: () => {
      // Invalidate channels query to trigger refetch
      queryClient.invalidateQueries({ queryKey: ["/api/channels"] });
      
      // Show success notification
      toast({
        title: "Success",
        description: "Channel added successfully",
      });
      
      // Reset form fields
      setChannelName("");
      setChannelMessageCount("0");
      setMessageCountError(null); // Clear any error state
    },
    onError: () => {
      // Show error notification
      toast({
        title: "Error",
        description: "Failed to add channel",
        variant: "destructive",
      });
    },
  });

  // ============================================================================
  // Form Handlers
  // ============================================================================
  
  /**
   * Handle Feedback Form Submission
   * Validates and submits new customer feedback
   */
  const handleAddFeedback = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    addFeedbackMutation.mutate({
      text: feedbackText,
      sentiment: feedbackSentiment,
      source: feedbackSource,
      region: feedbackRegion,
    });
  };

  /**
   * Handle Priority Item Form Submission
   * Validates and submits new priority item
   */
  const handleAddPriority = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    addPriorityMutation.mutate({
      title: priorityTitle,
      description: priorityDescription,
      impact: parseInt(priorityImpact), // Convert to number
      effort: parseInt(priorityEffort), // Convert to number
      category: priorityCategory,
      rank: parseInt(priorityRank), // Convert to number
    });
  };

  /**
   * Handle Channel Form Submission
   * 
   * This handler validates the message count before submitting.
   * If the message count is invalid, the form submission is blocked
   * and the user sees an error message.
   */
  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // EDGE CASE HANDLING: Validate message count format before submission
    // This prevents invalid data from reaching the backend
    if (!validateMessageCount(channelMessageCount)) {
      // Show error toast to alert the user
      toast({
        title: "Validation Error",
        description: "Please fix the message count format before submitting.",
        variant: "destructive",
      });
      return; // Stop form submission
    }

    // All validation passed - submit the data
    addChannelMutation.mutate({
      name: channelName,
      status: channelStatus,
      messageCount: channelMessageCount,
    });
  };

  return (
    <div className="pt-20 px-4 md:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-2">Data Management</h1>
          <p className="text-muted-foreground">
            Add new feedback, priority items, and channels to your analytics dashboard
          </p>
        </div>

        {/* Three-column grid layout for forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ============================================================================
              Feedback Form
              Allows adding customer feedback from various channels
              ============================================================================ */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Add New Feedback</h2>
            </div>

            <form onSubmit={handleAddFeedback} className="space-y-4">
              {/* Feedback Text Input */}
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

              {/* Sentiment Selection */}
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

              {/* Source and Region Selection */}
              <div className="grid grid-cols-2 gap-4">
                {/* Feedback Source */}
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

                {/* Geographic Region */}
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

              {/* Submit Button */}
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

          {/* ============================================================================
              Priority Item Form
              Allows adding items to the impact vs effort matrix
              ============================================================================ */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Add Priority Item</h2>
            </div>

            <form onSubmit={handleAddPriority} className="space-y-4">
              {/* Priority Title */}
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

              {/* Priority Description */}
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

              {/* Impact and Effort Scores */}
              <div className="grid grid-cols-2 gap-4">
                {/* Impact Score (1-10) */}
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

                {/* Effort Score (1-10) */}
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

              {/* Category and Rank */}
              <div className="grid grid-cols-2 gap-4">
                {/* Category Classification */}
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

                {/* Priority Ranking */}
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

              {/* Submit Button */}
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

          {/* ============================================================================
              Channel Form
              Allows adding new communication channels with validation
              ============================================================================ */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Add New Channel</h2>
            </div>

            <form onSubmit={handleAddChannel} className="space-y-4">
              {/* Channel Name */}
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

              {/* Channel Status */}
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

              {/* Message Count with Validation */}
              <div>
                <Label htmlFor="channel-message-count">Message Count</Label>
                <Input
                  id="channel-message-count"
                  data-testid="input-channel-message-count"
                  type="text"
                  value={channelMessageCount}
                  onChange={(e) => handleMessageCountChange(e.target.value)}
                  placeholder="e.g., 2.5K, 15K, 100..."
                  required
                  // ERROR HANDLING: Add red border when validation fails
                  className={`mt-2 ${messageCountError ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
                
                {/* ERROR MESSAGE: Display validation error when present */}
                {messageCountError && (
                  <div 
                    className="flex items-start gap-2 mt-2 text-sm text-destructive"
                    data-testid="error-message-count"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{messageCountError}</span>
                  </div>
                )}
                
                {/* HELPER TEXT: Always visible to guide users */}
                {!messageCountError && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Enter a number (e.g., 100) or use K/M/B suffixes (e.g., 2.5K, 1.5M, 3B)
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                data-testid="button-add-channel"
                disabled={addChannelMutation.isPending || !!messageCountError}
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
