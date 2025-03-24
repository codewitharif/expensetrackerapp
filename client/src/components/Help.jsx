import React from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaEnvelope, FaPhone, FaHome } from "react-icons/fa";

const Help = () => {
  const faqs = [
    {
      question: "How do I reset my passcode?",
      answer:
        "You can reset your passcode by going to the 'Passcode' section in the Settings menu.",
    },
    {
      question: "How do I backup my data?",
      answer:
        "You can backup your data by navigating to the 'Backup' section in the Settings menu.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can contact support by emailing us at support@example.com or calling us at +1-123-456-7890.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FaQuestionCircle className="mr-2" /> Help Center
        </h1>

        {/* FAQs Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-800">
                  {faq.question}
                </h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Contact Us
          </h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="text-gray-700 mr-2" />
              <span className="text-gray-600">Email: support@example.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-gray-700 mr-2" />
              <span className="text-gray-600">Phone: +1-123-456-7890</span>
            </div>
            <div className="flex items-center">
              <FaHome className="text-gray-700 mr-2" />
              <span className="text-gray-600">
                Address: 123 Main St, City, Country
              </span>
            </div>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            to="/"
            className="text-blue-500 hover:text-blue-700 font-medium flex items-center justify-center"
          >
            <FaHome className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;
