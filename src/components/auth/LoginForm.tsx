import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
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
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-white">Welcome back</h2>
        <p className="text-gray-400 text-sm">Sign in to your account to continue</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="emailOrPhone"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out">
                <FormLabel className="text-gray-300 font-medium">Email or Phone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      placeholder="Enter your email or phone" 
                      className="pl-11 bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      {...field} 
                    />
                  </div>
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
                <FormLabel className="text-gray-300 font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-11 pr-11 bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400 hover:text-blue-400 hover:bg-transparent transition-colors"
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

          <div className="text-right animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-100">
            <a href="#" className="text-sm text-card-gold hover:text-card-gold/80 hover:underline font-medium transition-colors">
              Forgot your password?
            </a>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-card-gold to-card-accent text-black hover:from-card-gold/90 hover:to-card-accent/90 rounded-xl py-6 text-base font-semibold transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg shadow-card-gold/20 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-150"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </Button>

          <div className="relative my-8 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-200">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-card-gold/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card-dark-gray px-4 text-gray-400 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-250">
            <SocialAuthButtons actionText="Sign in" />
          </div>

          <div className="text-center animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-300 pt-4">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-card-gold hover:text-card-gold/80 hover:underline font-semibold transition-colors" 
                onClick={onSwitchToSignup}
              >
                Create one now
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
