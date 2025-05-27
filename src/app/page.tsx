"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, Shield, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're sure the user is authenticated and not loading
    if (!isLoading && isAuthenticated && user) {
      router.replace("/dashboard");
    }
  }, [user, isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-primary'></div>
      </div>
    );
  }

  const features = [
    {
      icon: <BarChart3 className='h-6 w-6' />,
      title: "AI-Powered Analytics",
      description:
        "Transform your Excel data into intelligent insights with advanced AI algorithms.",
    },
    {
      icon: <Zap className='h-6 w-6' />,
      title: "Lightning Fast",
      description: "Generate beautiful dashboards in seconds, not hours.",
    },
    {
      icon: <Shield className='h-6 w-6' />,
      title: "Secure & Private",
      description: "Your data stays secure with enterprise-grade encryption.",
    },
    {
      icon: <Sparkles className='h-6 w-6' />,
      title: "Beautiful Visualizations",
      description:
        "Create stunning charts and graphs that tell your data story.",
    },
  ];

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <BackgroundBeams />

      {/* Hero Section */}
      <div className='relative z-10 container mx-auto px-4 py-16'>
        <div className='text-center max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant='secondary' className='mb-4'>
              ✨ AI-Powered Dashboard Generator
            </Badge>

            <h1 className='text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              ClickDash
            </h1>

            <p className='text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed'>
              Transform your Excel files into beautiful, interactive dashboards
              with AI.
              <br />
              No coding required. Just upload, analyze, and visualize.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
              <Button asChild size='lg' className='text-lg px-8 py-6'>
                <Link href='/login'>Get Started Free</Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='text-lg px-8 py-6'
              >
                <Link href='/register'>Create Account</Link>
              </Button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16'
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card className='backdrop-blur-sm bg-card/50 border-border/50 hover:bg-card/80 transition-all duration-300 h-full'>
                  <CardContent className='p-6 text-center'>
                    <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 text-white'>
                      {feature.icon}
                    </div>
                    <h3 className='font-semibold mb-2'>{feature.title}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Demo Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-20'
          >
            <Card className='backdrop-blur-sm bg-card/50 border-border/50 p-8'>
              <div className='text-center'>
                <h2 className='text-3xl font-bold mb-4'>
                  Ready to get started?
                </h2>
                <p className='text-muted-foreground mb-6'>
                  Join thousands of users who are already creating amazing
                  dashboards with ClickDash.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <Button asChild size='lg'>
                    <Link href='/login'>Try Demo Account</Link>
                  </Button>
                  <Button asChild variant='outline' size='lg'>
                    <Link href='/upload'>Upload Your Data</Link>
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
