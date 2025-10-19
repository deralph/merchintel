import { Button } from "@/components/ui/button";

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorScreen = ({
  title = "Something went wrong",
  message = "We couldn't load the requested data.",
  onRetry,
}: ErrorScreenProps) => (
  <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-card border border-border rounded-lg p-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-card-foreground mb-3">{title}</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      {onRetry ? (
        <Button onClick={onRetry} variant="outline">
          Try again
        </Button>
      ) : null}
    </div>
  </div>
);

export default ErrorScreen;
