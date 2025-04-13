import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
const Contact = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const token = localStorage.getItem('token')
      console.log(token)
      const response = await fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }
  
      const result = await response.json();
      console.log('Success:', result);
  
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
  
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error.message);
      // Optionally, set error state to display error message to the user
    } finally {
      setIsLoading(false);
    }
  };
  

  const contactMethods = [
    {
      icon: <FiMail className="text-3xl text-purple-400" />,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      details: "guptarishikesh51@gmail.com",
      action: "guptarishikesh51@gmail.com"
    },
    {
      icon: <FiPhone className="text-3xl text-blue-400" />,
      title: "Call Us",
      description: "Mon-Fri, 9am-5pm",
      details: "8340574346",
      action: "8340574346"
    },
    {
      icon: <FiMapPin className="text-3xl text-green-400" />,
      title: "Visit Us",
      description: "Come say hello",
      details: "123 Study Lane, Edutown, 10101",
      action: "https://maps.google.com"
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Contact Niyam Buddy
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-gray-800 p-8 rounded-xl hover:shadow-lg transition-all"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-4">{method.description}</p>
                <p className="mb-4">{method.details}</p>
                <a 
                  href={method.action} 
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-900/50 border border-green-400 p-4 rounded-lg mb-6 flex items-center"
              >
                <FiCheckCircle className="text-green-400 text-2xl mr-3" />
                <div>
                  <h3 className="font-bold">Thank you!</h3>
                  <p>Your message has been sent. We'll get back to you soon.</p>
                </div>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-2 font-medium">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FiSend className="mr-2" /> Send Message
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 p-8 rounded-xl"
          >
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {[
                {
                  question: "How do I reset my password?",
                  answer: "You can reset your password from the login page by clicking 'Forgot Password' and following the instructions sent to your email."
                },
                {
                  question: "Is there a mobile app available?",
                  answer: "Yes! Niyam Buddy is available on both iOS and Android. Download it from your device's app store."
                },
                {
                  question: "What's your response time for support requests?",
                  answer: "We typically respond within 24 hours for email inquiries and within 1 business day for other contact methods."
                },
                {
                  question: "Can I suggest new features?",
                  answer: "Absolutely! We welcome feature suggestions. Please use our feedback form or email us directly."
                }
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-700 pb-4">
                  <h3 className="font-semibold text-lg mb-1">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gray-700/50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Need more help?</h3>
              <p className="mb-3">Check out our <a href="/help-center" className="text-blue-400 hover:underline">Help Center</a> for detailed guides and tutorials.</p>
              <p>You can also join our <a href="/community" className="text-purple-400 hover:underline">Community Forum</a> to ask other users.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;