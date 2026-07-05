import { useState } from 'react';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountUnlockRequestSchema } from '../schemas/auth.schema';
import type { AccountUnlockRequestFormData } from '../schemas/auth.schema';
import { useRequestAccountUnlock } from '../hooks/useRequestAccountUnlock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AccountUnlockRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate: requestUnlock, isPending } = useRequestAccountUnlock();

  const { register, handleSubmit, formState: { errors } } = useForm<AccountUnlockRequestFormData>({
    resolver: zodResolver(accountUnlockRequestSchema),
  });

  const onSubmit = handleSubmit((data) => {
    requestUnlock(data, {
      onSuccess: () => setSubmitted(true)
    });
  });

  if (submitted) {
    return (
      <div className="w-full space-y-6">
        <div className="text-center space-y-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">Check your email</h2>
            <p className="text-sm text-muted-foreground mt-1">
              If your account is locked, we&apos;ve sent an unlock link.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm text-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Unlock instructions sent. Check your inbox.
          </div>
          <Link to="/auth/login">
            <Button variant="outline" className="w-full h-10 border-input bg-secondary text-foreground hover:bg-accent hover:border-input">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Unlock your account
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email to receive an account unlock link.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8">
        <form className="space-y-5" onSubmit={onSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="you@company.com"
              autoComplete="email"
              className="h-10 bg-secondary border-border text-foreground placeholder:text-[var(--text3)] focus:border-primary focus:ring-1 focus:ring-ring/30 transition-colors"
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>
          <Button type="submit" disabled={isPending} className="w-full h-10 bg-primary text-primary-foreground font-semibold hover:bg-primary transition-colors">
            {isPending ? 'Sending...' : 'Send unlock link'}
          </Button>
        </form>
      </div>

      <div className="text-center text-sm text-[var(--text3)]">
        <Link to="/auth/login" className="hover:text-muted-foreground transition-colors">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
