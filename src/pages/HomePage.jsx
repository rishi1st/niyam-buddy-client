import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBook, FiCalendar, FiTrendingUp, FiAward, FiClock, FiTarget } from 'react-icons/fi';
import Footer from '../components/Footer';

const HomePage = () => {
  const features = [
    {
      title: "Routine",
      icon: <FiCalendar className="text-3xl mb-3 text-purple-400" />,
      description: "Create and manage your daily study routines",
      link: "/routine"
    },
    {
      title: "Today",
      icon: <FiClock className="text-3xl mb-3 text-blue-400" />,
      description: "Track your daily progress and tasks",
      link: "/today"
    },
    {
      title: "Dashboard",
      icon: <FiTrendingUp className="text-3xl mb-3 text-green-400" />,
      description: "Visualize your progress and achievements",
      link: "/dashboard"
    }
  ];

  const quotes = [
    "The expert in anything was once a beginner.",
    "Success is the sum of small efforts, repeated day in and day out.",
    "Don't watch the clock; do what it does. Keep going.",
    "The secret of getting ahead is getting started.",
    "You don't have to be great to start, but you have to start to be great."
  ];

  const stats = [
    { value: "95%", label: "User Satisfaction" },
    { value: "10K+", label: "Goals Achieved" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Animated Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4 bg-gradient-to-b from-gray-800 to-gray-900"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mx-auto w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center mb-6"
        >
          <FiBook className="text-4xl" />
        </motion.div>
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Niyam Buddy
        </h1>
        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
          Your intelligent companion for achieving study goals and building productive habits
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Link 
            to="/routine" 
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold shadow-lg"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.header>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          How <span className="text-purple-400">Niyam Buddy</span> Helps You
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-gray-800 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all"
            >
              {feature.icon}
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300 mb-5">{feature.description}</p>
              <Link 
                to={feature.link} 
                className="text-purple-400 hover:underline flex items-center"
              >
                 {feature.title.toLowerCase()} 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className="text-5xl font-bold text-purple-400 mb-2">{stat.value}</div>
                <div className="text-xl text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational Quotes Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Daily <span className="text-blue-400">Motivation</span>
        </motion.h2>
        
        <div className="space-y-8">
          {quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`p-6 rounded-lg ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gradient-to-r from-gray-800 to-gray-700'}`}
            >
              <div className="flex items-start">
                <FiAward className="text-2xl mr-4 mt-1 text-yellow-400" />
                <p className="text-xl italic">"{quote}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-gray-800 to-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <FiTarget className="text-5xl mx-auto mb-6 text-purple-400" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Study Habits?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of students who have achieved their academic goals with Niyam Buddy
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/routine" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold text-lg shadow-xl"
            >
              Start Your Journey Today
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;