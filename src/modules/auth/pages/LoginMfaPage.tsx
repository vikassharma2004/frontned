import { useState } from 'react';
import { Navigate, useLocation, Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginMfaSchema } from '../schemas/auth.schema';
import type { LoginMfaFormData } from '../schemas/auth.schema';
import { useLoginMfa } from '../hooks/useLoginMfa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '../api/auth.api';
import { toast } from 'sonner';

export default function LoginMfaPage() {
  const location = useLocation();
  const { challengeId, deviceType: initialDeviceType, availableMethods } = location.state || {};
  const { mutate: loginMfa, isPending } = useLoginMfa();
  
  const [deviceType, setDeviceType] = useState<string>(initialDeviceType || 'totp');
  const [isSwitching, setIsSwitching] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginMfaFormData>({
    resolver: zodResolver(loginMfaSchema),
    defaultValues: {
      challenge_id: challengeId || '',
      code: '',
    }
  });

  const onSubmit = handleSubmit((data) => {
    loginMfa({ ...data, challenge_id: challengeId });
  });

  const handleSwitchMethod = async (deviceId: string, type: string) => {
    if (type === deviceType) return;
    setIsSwitching(true);
    try {
      await authApi.switchLoginMfaMethod(challengeId, deviceId);
      setDeviceType(type);
      toast.success(type === 'email' ? 'Verification code sent to your email' : 'Switched to Authenticator App');
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Failed to switch verification method');
    } finally {
      setIsSwitching(false);
    }
  };

  if (!challengeId) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Two-factor verification
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {deviceType === 'totp' 
              ? 'Enter the 6-digit code from your authenticator app.'
              : 'Enter the 6-digit code sent to your email.'}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-6 sm:p-8">
        <form onSubmit={onSubmit} className="space-y-5">
          <input type="hidden" {...register('challenge_id')} />
          <div className="space-y-1.5">
            <Label htmlFor="code" className="text-xs text-muted-foreground">Verification code</Label>
            <Input
              id="code"
              maxLength={6}
              {...register('code')}
              placeholder="000000"
              autoComplete="one-time-code"
              className="h-12 font-mono text-center tracking-[0.3em] text-lg bg-secondary border-border text-foreground placeholder:text-[var(--text3)] focus:border-primary focus:ring-1 focus:ring-ring/30 transition-colors"
            />
            {errors.code && <p className="text-destructive text-xs mt-1">{errors.code.message}</p>}
          </div>
          <Button type="submit" disabled={isPending || isSwitching} className="w-full h-10 bg-primary text-primary-foreground font-semibold hover:bg-primary transition-colors">
            {isPending ? 'Verifying...' : 'Verify identity'}
          </Button>
        </form>
      </div>

      {availableMethods && availableMethods.length > 1 && (
        <div className="space-y-2 pt-4">
          <p className="text-xs text-center text-[var(--text3)]">Or verify using another method:</p>
          <div className="flex flex-col gap-2">
            {availableMethods.map((method: any) => (
              method.type !== deviceType && (
                <Button
                  key={method.id}
                  variant="outline"
                  disabled={isSwitching}
                  onClick={() => handleSwitchMethod(method.id, method.type)}
                  className="w-full h-10 border-input bg-secondary text-sm text-foreground hover:border-input hover:bg-accent transition-colors"
                >
                  {isSwitching ? 'Switching...' : `Use ${method.name}`}
                </Button>
              )
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col items-center gap-2 text-sm text-[var(--text3)] pt-4">
        <Link to="/auth/login/backup-code" state={{ challengeId }} className="hover:text-muted-foreground transition-colors">
          Use a backup code
        </Link>
        <Link to="/auth/login" className="hover:text-muted-foreground transition-colors">
          Back to sign in
        </Link>
      </div>
    </div>
  );
}
