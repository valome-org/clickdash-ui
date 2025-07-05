"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageBackground } from "@/components/ui/page-background";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/app/contexts/AuthContext";
import { ROUTES } from "@/lib/routes";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const { register, error, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const success = await register({
        full_name: formData.firstName + " " + formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        router.push(ROUTES.DASHBOARD);
      }
    } catch (err) {
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <PageBackground>
      <div className='min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl'>
              <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl text-center font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                  Create your account
                </CardTitle>
                <p className='text-sm text-muted-foreground text-center'>
                  Join ClickDash to start creating amazing dashboards
                </p>
              </CardHeader>
              <CardContent className='space-y-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input
                        id='firstName'
                        name='firstName'
                        type='text'
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder='John'
                        className='bg-white/50 backdrop-blur-sm border-white/30'
                        disabled={isSubmitting}
                      />
                      {validationErrors.firstName && (
                        <p className='text-red-500 text-sm'>
                          {validationErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input
                        id='lastName'
                        name='lastName'
                        type='text'
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder='Doe'
                        className='bg-white/50 backdrop-blur-sm border-white/30'
                        disabled={isSubmitting}
                      />
                      {validationErrors.lastName && (
                        <p className='text-red-500 text-sm'>
                          {validationErrors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='username'>Username</Label>
                    <Input
                      id='username'
                      name='username'
                      type='text'
                      value={formData.username}
                      onChange={handleChange}
                      placeholder='johndoe'
                      className='bg-white/50 backdrop-blur-sm border-white/30'
                      disabled={isSubmitting}
                    />
                    {validationErrors.username && (
                      <p className='text-red-500 text-sm'>
                        {validationErrors.username}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      name='email'
                      type='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='john@example.com'
                      className='bg-white/50 backdrop-blur-sm border-white/30'
                      disabled={isSubmitting}
                    />
                    {validationErrors.email && (
                      <p className='text-red-500 text-sm'>
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='password'>Password</Label>
                    <div className='relative'>
                      <Input
                        id='password'
                        name='password'
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='••••••••'
                        className='bg-white/50 backdrop-blur-sm border-white/30 pr-10'
                        disabled={isSubmitting}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                      >
                        {showPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                    {validationErrors.password && (
                      <p className='text-red-500 text-sm'>
                        {validationErrors.password}
                      </p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='confirmPassword'>Confirm Password</Label>
                    <div className='relative'>
                      <Input
                        id='confirmPassword'
                        name='confirmPassword'
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder='••••••••'
                        className='bg-white/50 backdrop-blur-sm border-white/30 pr-10'
                        disabled={isSubmitting}
                      />
                      <button
                        type='button'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-4 w-4' />
                        ) : (
                          <Eye className='h-4 w-4' />
                        )}
                      </button>
                    </div>
                    {validationErrors.confirmPassword && (
                      <p className='text-red-500 text-sm'>
                        {validationErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {(error || errors.general) && (
                    <div className='p-3 bg-red-50 border border-red-200 rounded-md'>
                      <p className='text-red-800 text-sm'>
                        {error || errors.general}
                      </p>
                    </div>
                  )}

                  <Button
                    type='submit'
                    className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className='mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full'
                        />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className='mr-2 h-4 w-4' />
                        Create Account
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </>
                    )}
                  </Button>
                </form>

                <div className='text-center text-sm text-muted-foreground'>
                  Already have an account?{" "}
                  <Link
                    href={ROUTES.LOGIN}
                    className='text-blue-600 hover:text-blue-700 font-medium transition-colors'
                  >
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageBackground>
  );
}
