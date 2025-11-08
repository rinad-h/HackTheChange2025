// src/components/Mission.js
import React from "react";
import logo from "../images/logo.png";

const Mission = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50 font-['Elms Sans']">
      <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg p-8 max-w-6xl w-[90%]">
        {/* Logo Section */}
        <div className="flex justify-center md:w-1/2 p-4">
          <img
            src={logo}
            alt="Logo"
            className="w-64 h-auto object-contain drop-shadow-md"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 text-gray-800 space-y-4 p-4 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4 text-emerald-700">
            Our Mission
          </h2>
          <p>
            We strive to make cities smarter, greener, and more connected through
            technology and innovation.
          </p>
          <p>
            Our team believes in building tools that empower communities and
            enhance urban living.
          </p>
          <p>
            From sustainability tracking to intelligent infrastructure, we aim to
            create a positive impact on everyday life.
          </p>
          <p>
            Collaboration and inclusivity are at the heart of everything we do.
          </p>
          <p>
            Together, we envision a future where every city thrives in harmony
            with its people and the planet.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mission;
