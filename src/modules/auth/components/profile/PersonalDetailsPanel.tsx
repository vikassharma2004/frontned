import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema, type UpdateProfileFormData } from '../../schemas/auth.schema';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { Input } from '@/components/ui/input';

export function PersonalDetailsPanel() {
  const { data: user } = useCurrentUser();

  // Assuming full_name contains first and last name separated by space
  const names = (user?.full_name || '').split(' ');
  const firstName = names[0] || '';
  const lastName = names.slice(1).join(' ') || '';

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { full_name: user?.full_name ?? '' },
  });

  const { mutate: updateProfile, isPending } = useUpdateProfile();
  
  const onSubmit = (data: UpdateProfileFormData) => {
    // In a real app we'd split the name fields, but keeping existing schema
    updateProfile(data);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300 w-full max-w-[800px]">
      <div className="mb-2">
        <h1 className="text-[24px] font-semibold text-foreground mb-2 tracking-[-0.5px]">Personal Details</h1>
        <p className="text-[14px] text-muted-foreground leading-relaxed">Manage your account profile and identifying information.</p>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h3 className="text-[16px] font-semibold text-foreground">Profile Picture</h3>
        </div>
        <div className="p-6 flex items-center gap-6">
          <div className="w-[80px] h-[80px] rounded-full bg-accent text-[32px] font-semibold flex items-center justify-center border border-border text-foreground">
            {user?.full_name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <button className="px-4 py-2.5 bg-accent text-foreground border border-border text-[13px] font-medium rounded-md hover:bg-accent transition-all">
              Upload New Avatar
            </button>
            <p className="text-[12px] text-[var(--text3)] mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-border">
          <h3 className="text-[16px] font-semibold text-foreground">Basic Information</h3>
          <p className="text-[13px] text-muted-foreground mt-1">Update your name and contact details.</p>
        </div>
        <div className="p-6">
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-muted-foreground">First Name</label>
                <Input 
                  {...register('full_name')} 
                  defaultValue={firstName}
                  className="bg-background border-border text-foreground text-[14px] px-3.5 py-2.5 rounded-md focus:border-primary h-auto"
                />
                {errors.full_name && <p className="text-destructive text-xs mt-1">{errors.full_name.message}</p>}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-muted-foreground">Last Name</label>
                <Input 
                  defaultValue={lastName}
                  className="bg-background border-border text-foreground text-[14px] px-3.5 py-2.5 rounded-md focus:border-primary h-auto"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-medium text-muted-foreground">Email Address</label>
              <Input 
                value={user?.email ?? ''} 
                disabled 
                className="bg-card border-border text-[var(--text3)] text-[14px] px-3.5 py-2.5 rounded-md h-auto cursor-not-allowed"
              />
              <span className="text-[11px] text-[var(--text3)]">Email changes require verification. Contact support.</span>
            </div>
          </form>
        </div>
        <div className="px-6 py-4 bg-card border-t border-border flex justify-end">
          <button 
            type="submit" 
            form="profile-form"
            disabled={isPending}
            className="px-4 py-2.5 bg-foreground text-background text-[13px] font-medium rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
