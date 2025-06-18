import React from "react";
import {
  EnvelopeIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f1f3f5] text-gray-800 py-12 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-8 grid-cols-1  sm:grid-cols-3">
        {/* Brand and Description */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold text-black">
            Job<span className="text-[#265df5]">Hunt</span>
          </h1>
          <p className="text-sm text-gray-500 mt-4">
            Your go-to platform for finding your dream job and connecting with
            top recruiters worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#265df5] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-[#265df5] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-[#265df5] transition">
                Jobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info and Social Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex justify-center md:justify-start items-center">
              <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400 mr-2" />
              +1 (123) 456-7890
            </li>
            <li className="flex justify-center md:justify-start items-center">
              <EnvelopeIcon className="w-5 h-5 text-gray-400 mr-2" />
              info@example.com
            </li>
          </ul>
          <div className="flex justify-center md:justify-start mt-6 space-x-4">
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#265df5] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.394c0-1.281-.024-2.93-1.788-2.93-1.789 0-2.064 1.397-2.064 2.835v5.489h-3v-10h2.881v1.358h.041c.401-.759 1.379-1.56 2.839-1.56 3.038 0 3.6 2 3.6 4.597v5.605z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-[#265df5] transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.676 0h-21.352c-.729 0-1.324.595-1.324 1.324v21.352c0 .729.595 1.324 1.324 1.324h11.507v-9.294h-3.119v-3.627h3.119v-2.676c0-3.087 1.883-4.765 4.633-4.765 1.316 0 2.447.098 2.776.143v3.218l-1.906.001c-1.494 0-1.783.71-1.783 1.749v2.297h3.566l-.465 3.627h-3.101v9.294h6.078c.729 0 1.324-.595 1.324-1.324v-21.352c0-.729-.595-1.324-1.324-1.324z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center mt-8 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-black font-semibold">
          Job<span className="text-[#265df5]">Hunt</span>
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
