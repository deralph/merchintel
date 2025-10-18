import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  XCircle,
  Download,
  Settings,
  User,
  Mail,
  Lock
} from "lucide-react";
import { toast } from "sonner";

const ComponentShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Component Library</h1>
          <p className="text-lg text-muted-foreground">
            Reusable UI components for Merchly platform
          </p>
        </div>

        <div className="space-y-12">
          {/* Buttons */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Buttons</h2>
            <Card className="p-6 border border-border bg-card">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Variants</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button variant="destructive">Destructive</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Settings className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">With Icons</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button className="bg-accent hover:bg-accent-hover text-accent-foreground">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Form Inputs */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Form Inputs</h2>
            <Card className="p-6 border border-border bg-card">
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Text Input
                  </label>
                  <Input placeholder="Enter your name" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    With Icon
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="email@example.com" className="pl-10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input type="password" placeholder="••••••••" className="pl-10" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Textarea
                  </label>
                  <Textarea placeholder="Enter your message..." rows={4} />
                </div>
              </div>
            </Card>
          </section>

          {/* Checkboxes & Switches */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Checkboxes & Switches</h2>
            <Card className="p-6 border border-border bg-card">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm text-card-foreground cursor-pointer">
                    I agree to the terms and conditions
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="newsletter" defaultChecked />
                  <label htmlFor="newsletter" className="text-sm text-card-foreground cursor-pointer">
                    Subscribe to newsletter
                  </label>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-card-foreground">Email notifications</label>
                    <Switch />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-card-foreground">Location tracking</label>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </section>

          {/* Alerts */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Alerts</h2>
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Information</AlertTitle>
                <AlertDescription>
                  This is an informational message about something important.
                </AlertDescription>
              </Alert>

              <Alert className="border-success/50 bg-success/10">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <AlertTitle className="text-success">Success</AlertTitle>
                <AlertDescription className="text-success-foreground/80">
                  Your campaign has been created successfully!
                </AlertDescription>
              </Alert>

              <Alert className="border-warning/50 bg-warning/10">
                <AlertCircle className="h-4 w-4 text-warning" />
                <AlertTitle className="text-warning">Warning</AlertTitle>
                <AlertDescription className="text-warning-foreground/80">
                  You're approaching your monthly scan limit.
                </AlertDescription>
              </Alert>

              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load campaign data. Please try again.
                </AlertDescription>
              </Alert>
            </div>
          </section>

          {/* Badges */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Badges</h2>
            <Card className="p-6 border border-border bg-card">
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge className="bg-success text-success-foreground">Active</Badge>
                <Badge className="bg-warning text-warning-foreground">Pending</Badge>
              </div>
            </Card>
          </section>

          {/* Progress & Loading */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Progress & Loading States</h2>
            <Card className="p-6 border border-border bg-card">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-card-foreground">Upload Progress</span>
                    <span className="text-sm text-muted-foreground">67%</span>
                  </div>
                  <Progress value={67} />
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-medium text-muted-foreground mb-4">Skeleton Loading</h3>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Tabs */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Tabs</h2>
            <Card className="p-6 border border-border bg-card">
              <Tabs defaultValue="overview">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <p className="text-card-foreground">
                    Overview content goes here. This is where you'd show campaign summaries.
                  </p>
                </TabsContent>
                <TabsContent value="analytics" className="mt-4">
                  <p className="text-card-foreground">
                    Analytics charts and metrics would be displayed in this tab.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <p className="text-card-foreground">
                    Campaign settings and configuration options go here.
                  </p>
                </TabsContent>
              </Tabs>
            </Card>
          </section>

          {/* Toast Examples */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Toast Notifications</h2>
            <Card className="p-6 border border-border bg-card">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => toast.success("Success! Your changes have been saved.")}>
                  Success Toast
                </Button>
                <Button onClick={() => toast.error("Error! Something went wrong.")}>
                  Error Toast
                </Button>
                <Button onClick={() => toast.info("Info: Campaign will start in 24 hours.")}>
                  Info Toast
                </Button>
                <Button onClick={() => toast("Default notification message")}>
                  Default Toast
                </Button>
              </div>
            </Card>
          </section>

          {/* Empty States */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Empty States</h2>
            <Card className="p-12 border border-border bg-card text-center">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">No campaigns yet</h3>
                <p className="text-muted-foreground mb-6">
                  Get started by creating your first merch tracking campaign.
                </p>
                <Button>Create Campaign</Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ComponentShowcase;
