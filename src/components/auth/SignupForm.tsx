import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
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
      const { error } = await signup(data);
      
      if (error) {
        toast({
          title: "Signup Failed",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive"
        });
        return;
      }
      
      toast({ 
        title: "Account Created! 🎉", 
        description: "Welcome to Wedder! Please check your email to verify your account." 
      });
      onSignupSuccess();
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-white">Create your account</h2>
        <p className="text-gray-400 text-sm">Join Wedder and find your perfect match</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out">
                <FormLabel className="text-gray-300 font-medium">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      placeholder="e.g., Aditi Sharma" 
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
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-50">
                <FormLabel className="text-gray-300 font-medium">Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="e.g., 9876543210" 
                    className="bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                    {...field} 
                  />
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
                <FormLabel className="text-gray-300 font-medium">Email <span className="text-gray-500 text-sm">(Optional)</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
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
              <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-150">
                <FormLabel className="text-gray-300 font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-200">
                <FormLabel className="text-gray-300 font-medium">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="pl-11 pr-11 bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-gray-400 hover:text-blue-400 hover:bg-transparent transition-colors"
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
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-xl border border-card-gold/20 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-250 bg-card-charcoal/50 backdrop-blur-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="profileForSelf"
                    className="border-card-gold/50 data-[state=checked]:bg-card-gold data-[state=checked]:border-card-gold"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel htmlFor="profileForSelf" className="font-medium text-gray-300 text-sm cursor-pointer">
                    I'm creating this profile for myself
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-card-gold to-card-accent text-black hover:from-card-gold/90 hover:to-card-accent/90 rounded-xl py-6 text-base font-semibold transition-all duration-200 ease-out hover:scale-[1.02] hover:shadow-lg shadow-card-gold/20 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-300"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                <span>Creating account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
          <div className="relative my-8 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-350">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-card-gold/20" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card-dark-gray px-4 text-gray-400 font-medium">Or continue with</span>
            </div>
          </div>
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-400">
            <SocialAuthButtons actionText="Sign up" />
          </div>
          <p className="text-center text-xs text-gray-500 animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-450 leading-relaxed">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="underline hover:text-card-gold transition-colors">Terms of Service</a> and{' '}
            <a href="/privacy" className="underline hover:text-card-gold transition-colors">Privacy Policy</a>.
          </p>
          <div className="text-center animate-in fade-in slide-in-from-bottom-3 duration-300 ease-out delay-500 pt-2">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-card-gold hover:text-card-gold/80 hover:underline font-semibold transition-colors" 
                onClick={onSwitchToLogin}
              >
                Sign in
              </Button>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
