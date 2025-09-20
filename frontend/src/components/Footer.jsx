"use client";
import React from "react";
import { FaGithub, FaTwitter, FaDiscord, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-indigo-900 to-black w-full py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="border-t border-indigo-500/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-white mb-3">ExtendEase</h3>
            <p className="text-indigo-200 text-sm">
              The ultimate marketplace for VS Code extensions. Discover, manage, 
              and publish extensions to enhance your development workflow.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-indigo-300 hover:text-white transition">
                <FaGithub className="text-lg" />
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition">
                <FaTwitter className="text-lg" />
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition">
                <FaDiscord className="text-lg" />
              </a>
              <a href="#" className="text-indigo-300 hover:text-white transition">
                <FaLinkedin className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Marketplace
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  Browse Extensions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  Popular Extensions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  Submit Extension
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  Publisher Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-300 hover:text-white text-sm transition"
                >
                  VS Code Integration
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-indigo-500/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} ExtendEase. Not affiliated with Microsoft or Visual Studio Code.
          </p>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-indigo-300 hover:text-white text-xs transition"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-indigo-300 hover:text-white text-xs transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-indigo-300 hover:text-white text-xs transition"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;