import React from "react";
import { Link } from "react-router-dom";
import {
  FaCogs,
  FaCoins,
  FaLock,
  FaCalculator,
  FaDesktop,
  FaSyncAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaThumbsUp,
} from "react-icons/fa";

const Settings = () => {
  const features = [
    {
      icon: <FaCogs />,
      label: "Configuration",
      url: "/settings/configuration",
    },
    { icon: <FaCoins />, label: "Accounts", url: "/settings/accounts" },
    { icon: <FaLock />, label: "Passcode", url: "/settings/configuration" },
    {
      icon: <FaCalculator />,
      label: "CalcBox",
      url: "/settings/configuration",
    },
    {
      icon: <FaDesktop />,
      label: "PC Manager",
      url: "/settings/configuration",
    },
    { icon: <FaSyncAlt />, label: "Backup ", url: "/settings/backup" },
    { icon: <FaEnvelope />, label: "Feedback", url: "/settings/feedback" },
    {
      icon: <FaQuestionCircle />,
      label: "Help",
      url: "/settings/help",
    },
    {
      icon: <FaThumbsUp />,
      label: "Recommend",
      url: "/settings/configuration",
    },
  ];
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="grid grid-cols-3 gap-6 bg-white p-6 rounded-lg shadow-md">
          {features.map((feature, index) => (
            <Link to={feature.url}>
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="text-2xl text-gray-700 mb-2">
                  {feature.icon}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {feature.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
