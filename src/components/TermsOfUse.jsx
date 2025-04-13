import React from 'react';
import { FiBook, FiAlertCircle, FiUserCheck, FiShield, FiTool, FiMail } from 'react-icons/fi';

const TermsOfUse = ({ contactEmail = "guptarishikesh51@gmail.com", effectiveDate = "April 12, 2025" }) => {
  return (
      <>
      <div className='w-full bg-gray-900'>
      <div className="max-w-4xl mx-auto px-4 py-12 text-gray-300">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
          <FiBook className="text-2xl" />
        </div>
        <h1 className="text-4xl font-bold mb-2">Terms of Use</h1>
        <p className="text-lg text-gray-400">Effective Date: {effectiveDate}</p>
      </div>

      <div className="mb-12 bg-gray-800 p-6 rounded-lg">
        <p className="text-lg">
          Welcome to Niyam Buddy! These Terms of Use govern your use of our study companion platform. 
          By accessing or using Niyam Buddy, you agree to comply with these terms.
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiUserCheck className="mr-2 text-blue-400" /> 1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By using Niyam Buddy, you confirm that:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You are at least 13 years old</li>
            <li>You will provide accurate registration information</li>
            <li>You will not share your account credentials</li>
            <li>You will comply with all applicable laws</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiTool className="mr-2 text-purple-400" /> 2. User Responsibilities
          </h2>
          <p className="mb-4">
            As a user, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use Niyam Buddy only for lawful purposes</li>
            <li>Not disrupt or interfere with the service's security</li>
            <li>Not attempt to reverse engineer any part of the platform</li>
            <li>Not use bots, scrapers, or other automated tools</li>
            <li>Not upload harmful or offensive content</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiShield className="mr-2 text-green-400" /> 3. Intellectual Property
          </h2>
          <p className="mb-4">
            All content and features on Niyam Buddy are protected by intellectual property laws:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We grant you a limited, non-exclusive license to use our platform</li>
            <li>All trademarks, logos, and service marks are our property</li>
            <li>User-generated content remains your property, but you grant us a license to use it</li>
            <li>Unauthorized use may result in termination of your account</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiAlertCircle className="mr-2 text-yellow-400" /> 4. Disclaimers
          </h2>
          <p className="mb-4 font-semibold">
            Niyam Buddy is provided "as is" without warranties of any kind:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We don't guarantee uninterrupted or error-free service</li>
            <li>We're not responsible for the accuracy of study recommendations</li>
            <li>We don't guarantee specific academic results</li>
            <li>You use the service at your own risk</li>
          </ul>
          <p className="mt-4">
            We reserve the right to modify or discontinue the service at any time.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiAlertCircle className="mr-2 text-red-400" /> 5. Limitation of Liability
          </h2>
          <p className="mb-4">
            To the fullest extent permitted by law:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>We won't be liable for any indirect, incidental, or consequential damages</li>
            <li>Our total liability is limited to the amount you've paid us in the last 6 months</li>
            <li>We're not responsible for third-party services linked from our platform</li>
            <li>Some jurisdictions don't allow these limitations, so they may not apply to you</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiTool className="mr-2 text-blue-400" /> 6. Account Termination
          </h2>
          <p className="mb-4">
            We may suspend or terminate your account if:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You violate these Terms of Use</li>
            <li>We suspect fraudulent activity</li>
            <li>Required by law enforcement</li>
          </ul>
          <p className="mt-4">
            You may terminate your account at any time through your account settings.
          </p>
        </div>

        {/* Section 7 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiMail className="mr-2 text-purple-400" /> 7. Governing Law
          </h2>
          <p className="mb-4">
            These terms are governed by the laws of [Your Country/State] without regard to conflict of law principles.
          </p>
        </div>

        {/* Section 8 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiMail className="mr-2 text-green-400" /> 8. Changes to Terms
          </h2>
          <p className="mb-4">
            We may update these terms periodically. We'll notify you of significant changes via email or in-app notice.
          </p>
          <p>
            Continued use after changes constitutes acceptance of the new terms.
          </p>
        </div>

        {/* Section 9 */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FiMail className="mr-2 text-blue-400" /> 9. Contact Information
          </h2>
          <p>
            For questions about these Terms of Use, contact us at: <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:underline">{contactEmail}</a>
          </p>
        </div>
      </div>

      <div className="mt-12 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Key Points:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "✔ You retain ownership of your content",
            "✔ We may terminate accounts for violations",
            "✔ Service provided 'as is' with no warranties",
            "✔ Limited liability for the platform",
            "✔ Governing law applies to disputes",
            "✔ Terms may be updated periodically"
          ].map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="mr-2 mt-1">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
      </div>
      </>
  );
};

export default TermsOfUse;