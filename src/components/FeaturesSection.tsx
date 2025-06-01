"use client";

import { motion } from "framer-motion";
import { BarChart3, Shield, Sparkles, Target, Zap } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  bgColor: string;
  index: number;
}

const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
  bgColor,
  index,
}: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: -2 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -10, rotate: 1, scale: 1.02 }}
    className={`${bgColor} rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all`}
  >
    <motion.div
      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center mb-6 shadow-lg`}
      whileHover={{ rotate: 360, scale: 1.1 }}
      transition={{ duration: 0.6 }}
    >
      <div className='text-white'>{icon}</div>
    </motion.div>

    <h3 className='text-2xl font-bold text-gray-900 mb-4'>{title}</h3>
    <p className='text-gray-600 text-lg leading-relaxed'>{description}</p>
  </motion.div>
);

export default function FeaturesSection() {
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

  return (
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
            <span className='text-purple-700 font-bold'>Powerful Features</span>
          </motion.div>

          <h2 className='text-5xl md:text-6xl font-black mb-8'>
            <span className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
              Everything You Need
            </span>
            <div className='text-gray-900'>To Transform Your Data</div>
          </h2>

          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Powerful AI-driven tools that make data visualization effortless and
            insights actionable.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-20'>
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
