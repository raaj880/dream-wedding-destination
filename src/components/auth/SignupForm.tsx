import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import SocialAuthButtons from './SocialAuthButtons';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const signupSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits").regex(/^\d+$/, "Invalid phone number"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters"),
  profileForSelf: z.boolean().default(true),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchToLogin: () => void;
  onSignupSuccess: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onSignupSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signup } = useAuth();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      profileForSelf: true,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data);
      toast({ 
        title: "Account Created! 🎉", 
        description: "Welcome to Wedder! Let's set up your profile." 
      });
      onSignupSuccess();
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Aditi Sharma" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-50">
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="e.g., 9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-100">
              <FormLabel>Email (Optional)</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-150">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-deep-blue"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-200">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-deep-blue"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileForSelf"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-3 shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-250 bg-background">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  id="profileForSelf"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel htmlFor="profileForSelf" className="font-normal text-sm">
                  I'm creating this profile for myself
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-deep-blue text-white hover:bg-deep-blue/90 rounded-full transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
        </Button>
        <div className="relative my-4 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-300">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-350">
          <SocialAuthButtons actionText="Sign up" />
        </div>
        <p className="text-center text-xs text-gray-500 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-400">
          By signing up, you agree to our{' '}
          <a href="/terms" className="underline hover:text-soft-pink">Terms of Service</a> and{' '}
          <a href="/privacy" className="underline hover:text-soft-pink">Privacy Policy</a>.
        </p>
        <p className="text-center text-sm text-gray-600 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-450">
          Already have an account?{' '}
          <Button variant="link" className="p-0 h-auto text-soft-pink hover:underline" onClick={onSwitchToLogin}>
            Login
          </Button>
        </p>
      </form>
    </Form>
  );
};

export default SignupForm;
