import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] w-full animate-in fade-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <Loader2 size={32} className="text-primary animate-spin relative z-10" />
      </div>
      <p className="text-sm text-muted-foreground font-medium mt-4 tracking-wide">Loading content...</p>
    </div>
  );
}
