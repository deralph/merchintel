import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { CalendarIcon, ArrowLeft, Sparkles } from "lucide-react";
import { format } from "date-fns";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    destinationUrl: "",
    tagQuantity: "",
    locationConsent: true,
    emailConsent: true,
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!startDate || !endDate) {
      toast.error("Please select campaign dates");
      return;
    }

    if (!formData.emailConsent) {
      toast.error("Email consent collection is required");
      return;
    }

    // Mock campaign creation
    console.log("Creating campaign:", {
      ...formData,
      startDate,
      endDate,
    });

    toast.success("Campaign created successfully!");
    navigate("/dashboard/demo");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create New Campaign</h1>
              <p className="text-muted-foreground">Set up tracking for your branded merchandise</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <Card className="p-8 border border-border bg-card shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Campaign Details
                </h3>
              </div>

              <div>
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Summer Festival 2025"
                  required
                  className="mt-2 bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Internal name for your reference
                </p>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the campaign and what scanners can expect..."
                  rows={4}
                  required
                  className="mt-2 bg-background"
                />
              </div>

              <div>
                <Label htmlFor="destinationUrl">Destination URL</Label>
                <Input
                  id="destinationUrl"
                  type="url"
                  value={formData.destinationUrl}
                  onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
                  placeholder="https://yourwebsite.com/landing-page"
                  required
                  className="mt-2 bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Where scanners will be redirected after consent
                </p>
              </div>
            </div>

            {/* Campaign Dates */}
            <div className="space-y-6 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-card-foreground">Campaign Duration</h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mt-2 bg-background"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal mt-2 bg-background"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Tag Quantity */}
            <div className="space-y-6 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-card-foreground">Tag Provisioning</h3>
              
              <div>
                <Label htmlFor="tagQuantity">Number of Tags</Label>
                <Input
                  id="tagQuantity"
                  type="number"
                  min="1"
                  value={formData.tagQuantity}
                  onChange={(e) => setFormData({ ...formData, tagQuantity: e.target.value })}
                  placeholder="1000"
                  required
                  className="mt-2 bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How many NFC tags or QR codes you need for this campaign
                </p>
              </div>
            </div>

            {/* Consent Toggles */}
            <div className="space-y-6 pt-6 border-t border-border">
              <h3 className="text-lg font-semibold text-card-foreground">Data Collection Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
                  <Checkbox
                    id="emailConsent"
                    checked={formData.emailConsent}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, emailConsent: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="emailConsent" className="cursor-pointer text-card-foreground font-medium">
                      Collect Email Addresses
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Required for tracking conversions and follow-up campaigns
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 rounded-lg bg-muted/30">
                  <Checkbox
                    id="locationConsent"
                    checked={formData.locationConsent}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, locationConsent: checked as boolean })
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="locationConsent" className="cursor-pointer text-card-foreground font-medium">
                      Request Location Permission
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Collect coarse geolocation for regional heatmaps (optional for scanners)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent-hover text-accent-foreground"
              >
                Create Campaign
              </Button>
            </div>
          </form>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm text-card-foreground">
            <strong>Next Steps:</strong> After creating your campaign, you'll receive downloadable QR codes and NFC tag provisioning instructions.
            Tags will be active immediately upon creation.
          </p>
        </div>
      </main>
    </div>
  );
};

export default CreateCampaign;
