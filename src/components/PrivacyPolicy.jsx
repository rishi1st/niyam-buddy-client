import React from 'react';
import { FiLock, FiMail, FiServer, FiShield, FiUser, FiSettings } from 'react-icons/fi';

const PrivacyPolicy = ({ contactEmail = "privacy@niyambuddy.com", lastUpdated = "January 1, 2023" }) => {
  return (
    <>
    <div className='w-full bg-gray-900'>
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-300">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
          <FiLock className="text-2xl" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-lg text-gray-400">Last Updated: {lastUpdated}</p>
      </div>

      <div className="mb-12 bg-gray-800 p-6 rounded-lg">
        <p className="text-lg">
          At Niyam Buddy, we are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our services.
        </p>
        <p className="mt-4 text-lg">
          By using Niyam Buddy, you agree to the terms outlined in this policy. If you do not agree, please refrain from using our platform.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiUser className="mr-2 text-purple-400" /> 1. Information We Collect
          </h2>
          <div className="ml-8">
            <h3 className="text-xl font-semibold mb-2">Personal Information</h3>
            <p className="mb-4">
              When you register or use Niyam Buddy, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Name</strong> (if provided)</li>
              <li><strong>Email address</strong> (for account creation and notifications)</li>
              <li><strong>Study routines, goals, and progress data</strong> (to personalize your experience)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
            <p className="mb-4">
              We automatically collect:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Device information</strong> (browser type, operating system, IP address)</li>
              <li><strong>Usage patterns</strong> (pages visited, time spent, interactions)</li>
              <li><strong>Cookies & Analytics</strong> (to improve functionality and user experience)</li>
            </ul>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiSettings className="mr-2 text-blue-400" /> 2. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use your data to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "✅ Provide and improve our services",
              "✅ Personalize your study routines and recommendations",
              "✅ Send important updates and notifications",
              "✅ Analyze usage trends for better performance",
              "✅ Prevent fraud and ensure security"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2 mt-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiServer className="mr-2 text-green-400" /> 3. Data Sharing & Disclosure
          </h2>
          <p className="mb-4">
            We <strong>do not sell</strong> your personal information. However, we may share data with:
          </p>
          <ul className="space-y-3">
            {[
              "🔹 Service Providers (for hosting, analytics, and customer support)",
              "🔹 Legal Authorities (if required by law or to protect our rights)",
              "🔹 Business Transfers (in case of mergers or acquisitions)"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiShield className="mr-2 text-yellow-400" /> 4. Data Security
          </h2>
          <p className="mb-4">
            We implement industry-standard security measures, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Encryption</strong> (for sensitive data)</li>
            <li><strong>Secure servers</strong> (to prevent unauthorized access)</li>
            <li><strong>Regular audits</strong> (to maintain compliance)</li>
          </ul>
          <p>
            However, no online service is 100% secure. Please use strong passwords and keep your login details private.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiMail className="mr-2 text-purple-400" /> 5. Your Privacy Rights
          </h2>
          <p className="mb-4">
            You have the right to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              "🔸 Access, update, or delete your data",
              "🔸 Opt out of marketing emails",
              "🔸 Disable cookies (via browser settings)",
              "🔸 Request data portability"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="mr-2 mt-1">{item}</span>
              </div>
            ))}
          </div>
          <p>
            To exercise these rights, contact us at: <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:underline">{contactEmail}</a>
          </p>
        </div>

        {/* Sections 6-9 */}
        {[
          {
            icon: <FiServer className="mr-2 text-blue-400" />,
            title: "6. Third-Party Services",
            content: "Niyam Buddy may integrate with third-party tools (e.g., Google Analytics). These services have their own privacy policies, and we are not responsible for their practices."
          },
          {
            icon: <FiUser className="mr-2 text-yellow-400" />,
            title: "7. Children's Privacy",
            content: "Our service is not intended for users under 13. If we discover that a child has provided personal data, we will delete it immediately."
          },
          {
            icon: <FiSettings className="mr-2 text-green-400" />,
            title: "8. Changes to This Policy",
            content: "We may update this Privacy Policy periodically. Any changes will be posted here, and continued use of Niyam Buddy constitutes acceptance of the revised terms."
          },
          {
            icon: <FiMail className="mr-2 text-purple-400" />,
            title: "9. Contact Us",
            content: `For questions or concerns about this Privacy Policy, email us at: ${contactEmail}`
          }
        ].map((section, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              {section.icon} {section.title}
            </h2>
            <p>{section.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Key Takeaways:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "✔ Transparent data collection",
            "✔ No selling of personal info",
            "✔ Strong security measures",
            "✔ User control over data"
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2">{item}</span>
            </div>
          ))}
        </div>
        <p className="mt-4">
          This policy is compliant with <strong>GDPR, CCPA</strong>, and other privacy regulations.
        </p>
      </div>
    </div>
    </div>
    </>
    
  );
};

export default PrivacyPolicy;