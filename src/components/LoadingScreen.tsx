interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Loading..." }: LoadingScreenProps) => (
  <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  </div>
);

export default LoadingScreen;
