"use client";

import AnimatedBackground from "@/components/AnimatedBackground";
import FeatureShowcase from "@/components/FeatureShowcase";
import FloatingElement from "@/components/FloatingElement";
import InteractiveDemo from "@/components/InteractiveDemo";
import ParticleSystem from "@/components/ParticleSystem";
// import TestimonialCard from "@/components/TestimonialCard";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  LineChart,
  PieChart,
  Play,
  Rocket,
  Shield,
  Sparkles,
  // Star,
  Target,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  const features = [
    {
      icon: <BarChart3 className='h-8 w-8' />,
      title: "AI-Powered Analytics",
      description:
        "Transform your Excel data into intelligent insights with advanced AI algorithms that understand your business context.",
      gradient: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Zap className='h-8 w-8' />,
      title: "Lightning Fast",
      description:
        "Generate beautiful dashboards in seconds, not hours. Our optimized engine processes thousands of rows instantly.",
      gradient: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: <Shield className='h-8 w-8' />,
      title: "Secure & Private",
      description:
        "Your data stays secure with enterprise-grade encryption and compliance with industry standards.",
      gradient: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      icon: <Sparkles className='h-8 w-8' />,
      title: "Beautiful Visualizations",
      description:
        "Create stunning, interactive charts and graphs that tell compelling data stories to your audience.",
      gradient: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
  ];

  // const testimonials = [
  //   {
  //     name: "Sarah Johnson",
  //     role: "Data Analyst at TechCorp",
  //     content:
  //       "ClickDash completely transformed how we present data to stakeholders. What used to take our team hours now takes just minutes, and the insights are incredible!",
  //     rating: 5,
  //     avatar: "bg-gradient-to-r from-pink-500 to-rose-500",
  //   },
  //   {
  //     name: "Mike Chen",
  //     role: "Marketing Director",
  //     content:
  //       "The AI insights helped us discover trends we never noticed before. Our marketing ROI improved by 40% thanks to these data-driven decisions!",
  //     rating: 5,
  //     avatar: "bg-gradient-to-r from-blue-500 to-cyan-500",
  //   },
  //   {
  //     name: "Emily Rodriguez",
  //     role: "Business Intelligence Lead",
  //     content:
  //       "Beautiful dashboards that actually make sense. Our executive team loves the clean, professional reports we can generate instantly.",
  //     rating: 5,
  //     avatar: "bg-gradient-to-r from-green-500 to-emerald-500",
  //   },
  // ];

  return (
    <div className='min-h-screen bg-white relative overflow-hidden'>
      <AnimatedBackground />
      <ParticleSystem />

      <div className='relative z-10'>
        {/* Hero Section */}
        <motion.section
          className='container mx-auto px-4 pb-20 min-h-screen flex items-center mt-10'
          style={{ opacity }}
        >
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto'>
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.div
                className='inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-6 py-3 mb-8'
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)",
                }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className='w-5 h-5 text-blue-600' />
                <span className='text-blue-700 font-bold'>
                  AI-Powered Dashboard Generator
                </span>
              </motion.div>

              <motion.h1
                className='text-6xl md:text-7xl font-black mb-8 leading-tight'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  ClickDash
                </span>
                <motion.div
                  className='text-gray-900 text-4xl md:text-5xl mt-4'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Excel to Dashboard
                  <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                    {" "}
                    Magic
                  </span>
                </motion.div>
              </motion.h1>

              <motion.p
                className='text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Transform your boring spreadsheets into
                <span className='font-bold text-gray-800'>
                  {" "}
                  stunning, interactive dashboards
                </span>{" "}
                with AI.
                <br />
                <span className='text-lg text-blue-600 font-semibold'>
                  No coding. No complexity. Just pure visualization magic. ✨
                </span>
              </motion.p>

              <motion.div
                className='flex flex-col sm:flex-row gap-6 mb-12'
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <motion.button
                  className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl px-10 py-5 rounded-2xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-2xl flex items-center gap-3'
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(59, 130, 246, 0.3)",
                      "0 15px 40px rgba(147, 51, 234, 0.3)",
                      "0 10px 30px rgba(236, 72, 153, 0.3)",
                      "0 10px 30px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🚀 Start Creating Magic
                  <ArrowRight className='w-6 h-6' />
                </motion.button>

                <motion.button
                  className='border-3 border-gray-300 text-gray-700 text-xl px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-3'
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className='w-6 h-6' />
                  Watch Magic Happen
                </motion.button>
              </motion.div>

              {/* Animated Stats */}
              {/* <motion.div
                className='grid grid-cols-3 gap-6'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <MetricCard
                  icon={Users}
                  value='25K+'
                  label='Happy Users'
                  color='from-blue-500 to-cyan-500'
                  delay={0.2}
                />
                <MetricCard
                  icon={BarChart3}
                  value='100K+'
                  label='Dashboards Created'
                  color='from-purple-500 to-pink-500'
                  delay={0.4}
                />
                <MetricCard
                  icon={Clock}
                  value='99.9%'
                  label='Uptime'
                  color='from-green-500 to-emerald-500'
                  delay={0.6}
                />
              </motion.div>*/}
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className='relative'
            >
              <FloatingElement amplitude={30} duration={8}>
                <div className='relative'>
                  {/* Main Dashboard */}
                  <div className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 relative z-10'>
                    <div className='flex items-center gap-3 mb-6'>
                      <div className='w-4 h-4 rounded-full bg-red-400'></div>
                      <div className='w-4 h-4 rounded-full bg-yellow-400'></div>
                      <div className='w-4 h-4 rounded-full bg-green-400'></div>
                      <div className='ml-4 text-gray-600 font-semibold'>
                        ClickDash Dashboard
                      </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className='grid grid-cols-2 gap-4 h-80'>
                      <motion.div
                        className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 flex flex-col justify-between'
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <div className='flex items-center gap-2 mb-3'>
                          <BarChart3 className='w-6 h-6 text-blue-600' />
                          <span className='text-blue-800 font-semibold'>
                            Sales
                          </span>
                        </div>
                        <div className='space-y-2'>
                          <motion.div
                            className='h-3 bg-blue-300 rounded-full'
                            animate={{ width: ["60%", "80%", "60%"] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className='h-3 bg-blue-400 rounded-full'
                            animate={{ width: ["40%", "70%", "40%"] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                          />
                          <motion.div
                            className='h-3 bg-blue-500 rounded-full'
                            animate={{ width: ["70%", "90%", "70%"] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4'
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                      >
                        <div className='flex items-center gap-2 mb-3'>
                          <PieChart className='w-6 h-6 text-purple-600' />
                          <span className='text-purple-800 font-semibold'>
                            Analytics
                          </span>
                        </div>
                        <div className='flex items-center justify-center h-24'>
                          <motion.div
                            className='w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-500'
                            animate={{ rotate: [0, 360] }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        </div>
                      </motion.div>

                      <motion.div
                        className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 col-span-2'
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                      >
                        <div className='flex items-center gap-2 mb-3'>
                          <LineChart className='w-6 h-6 text-green-600' />
                          <span className='text-green-800 font-semibold'>
                            Growth Trends
                          </span>
                        </div>
                        <div className='h-20 flex items-end justify-around'>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className='bg-green-400 rounded-t-lg'
                              style={{ width: "8px" }}
                              animate={{
                                height: [
                                  `${Math.random() * 40 + 20}px`,
                                  `${Math.random() * 60 + 30}px`,
                                  `${Math.random() * 40 + 20}px`,
                                ],
                              }}
                              transition={{
                                duration: 2 + i * 0.2,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Floating elements around dashboard */}
                  <FloatingElement delay={0.5} amplitude={15} duration={4}>
                    <div className='absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-lg'>
                      <Sparkles className='w-8 h-8 text-white' />
                    </div>
                  </FloatingElement>

                  <FloatingElement delay={1} amplitude={20} duration={5}>
                    <div className='absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-lg'>
                      <Zap className='w-8 h-8 text-white' />
                    </div>
                  </FloatingElement>
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className='py-12 relative'>
          <div className='container mx-auto px-4 max-w-7xl'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-20'
            >
              <motion.div
                className='inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-full px-6 py-3 mb-8'
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className='w-5 h-5 text-purple-600' />
                <span className='text-purple-700 font-bold'>
                  Powerful Features
                </span>
              </motion.div>

              <h2 className='text-5xl md:text-6xl font-black mb-8'>
                <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
                  Everything You Need
                </span>
                <div className='text-gray-900'>To Transform Your Data</div>
              </h2>

              <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                Powerful AI-driven tools that make data visualization effortless
                and insights actionable.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-20'>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotate: -2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, rotate: 1, scale: 1.02 }}
                  className={`${feature.bgColor} rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all`}
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className='text-white'>{feature.icon}</div>
                  </motion.div>

                  <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-lg leading-relaxed'>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Interactive Demo Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='mb-20'
            >
              <InteractiveDemo />
            </motion.div>

            {/* Feature Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='mb-20'
            >
              <FeatureShowcase />
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <section className='py-32 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden'>
          <div className='container mx-auto px-4 max-w-7xl'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-20'
            >
              <motion.div
                className='inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 rounded-full px-6 py-3 mb-8'
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className='w-5 h-5 text-green-600 fill-current' />
                <span className='text-green-700 font-bold'>Customer Love</span>
              </motion.div>

              <h2 className='text-5xl md:text-6xl font-black mb-8'>
                <span className='text-gray-900'>What Our</span>
                <div className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
                  Customers Say
                </div>
              </h2>

              <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                Join thousands of data professionals who&apos;ve transformed
                their workflow with ClickDash.
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  {...testimonial}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className='pt-12 pb-32 relative overflow-hidden'>
          <div className='container mx-auto px-4 max-w-4xl text-center'>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className='inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-full px-6 py-3 mb-8'
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket className='w-5 h-5 text-orange-600' />
                <span className='text-orange-700 font-bold'>
                  Ready to Launch?
                </span>
              </motion.div>

              <motion.h2
                className='text-5xl md:text-7xl font-black mb-8'
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <span className='bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent'>
                  Start Your
                </span>
                <div className='text-gray-900'>Data Magic Today</div>
              </motion.h2>

              <motion.p
                className='text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Transform your Excel files into stunning dashboards in minutes.
                <br />
                <span className='font-bold text-gray-800'>
                  No credit card required. Start free today!
                </span>
              </motion.p>

              <motion.div
                className='flex flex-col sm:flex-row gap-6 justify-center mb-12'
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className='bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white text-xl px-12 py-6 rounded-2xl font-bold hover:from-orange-700 hover:via-red-700 hover:to-pink-700 transition-all shadow-2xl flex items-center gap-3 mx-auto sm:mx-0'
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 25px 50px rgba(234, 88, 12, 0.4)",
                    y: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 30px rgba(234, 88, 12, 0.3)",
                      "0 15px 40px rgba(220, 38, 38, 0.3)",
                      "0 10px 30px rgba(236, 72, 153, 0.3)",
                      "0 10px 30px rgba(234, 88, 12, 0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🎯 Get Started Free
                  <ArrowRight className='w-6 h-6' />
                </motion.button>
              </motion.div>

              <motion.div
                className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className='flex flex-col items-center'>
                  <CheckCircle className='w-8 h-8 text-green-500 mb-3' />
                  <span className='text-gray-600 font-semibold'>
                    Free Forever Plan
                  </span>
                </div>
                <div className='flex flex-col items-center'>
                  <CheckCircle className='w-8 h-8 text-green-500 mb-3' />
                  <span className='text-gray-600 font-semibold'>
                    No Credit Card Required
                  </span>
                </div>
                <div className='flex flex-col items-center'>
                  <CheckCircle className='w-8 h-8 text-green-500 mb-3' />
                  <span className='text-gray-600 font-semibold'>
                    Setup in 30 Seconds
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Background decoration */}
          <div className='absolute inset-0 overflow-hidden'>
            <motion.div
              className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-orange-100 to-pink-100 rounded-full opacity-20'
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20'
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </section>

        {/* Footer */}
        <footer className='py-16 bg-gray-900 text-white relative overflow-hidden'>
          <div className='container mx-auto px-4 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h3
                className='text-3xl font-bold mb-4'
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background:
                    "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ClickDash
              </motion.h3>
              <p className='text-gray-400 mb-8 text-lg'>
                Transform your data, transform your business.
              </p>
              <div className='flex justify-center gap-8 text-gray-400 text-sm'>
                <span>© 2025 ClickDash. All rights reserved.</span>
                <span>•</span>
                <span>Privacy Policy</span>
                <span>•</span>
                <span>Terms of Service</span>
              </div>
            </motion.div>
          </div>

          {/* Footer background animation */}
          <div className='absolute inset-0 overflow-hidden'>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className='absolute w-2 h-2 bg-blue-500 rounded-full opacity-10'
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 5 + 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}
