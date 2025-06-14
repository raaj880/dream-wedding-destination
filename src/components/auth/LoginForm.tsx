
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff } from 'lucide-react';
import SocialAuthButtons from './SocialAuthButtons';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or Phone Number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { error } = await login(data.emailOrPhone, data.password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Invalid credentials. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      toast({ 
        title: "Welcome back! 👋", 
        description: "You're successfully logged in." 
      });
      onLoginSuccess();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="emailOrPhone"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out">
              <FormLabel>Email or Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com or 9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-50">
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
        <Button 
          type="submit" 
          className="w-full bg-deep-blue text-white hover:bg-deep-blue/90 rounded-full transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <div className="text-center animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-100">
          <a href="#" className="text-sm text-deep-blue hover:text-deep-blue/80 hover:underline font-medium">
            Forgot Password?
          </a>
        </div>
        <div className="relative my-6 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-150">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-200">
          <SocialAuthButtons actionText="Login" />
        </div>
        <p className="text-center text-sm text-gray-600 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-250 pt-2">
          Don't have an account?{' '}
          <Button variant="link" className="p-0 h-auto text-deep-blue hover:text-deep-blue/80 hover:underline font-medium" onClick={onSwitchToSignup}>
            Create new one
          </Button>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
