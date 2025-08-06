// components/About.tsx
"use client";
import React from "react";
import Image from "next/image";
//import { FaUserGraduate, FaLaptopCode, FaBuilding } from "react-icons/fa";

const About = () => {
  return (
    <section id="about" className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left side with text */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-20 bg-gray-50">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-blue-700">
            About Me
          </h2>

          <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-center">
            <p>
              🎓 Graduated with a degree in{" "}
              <span className="font-semibold text-blue-600">
                Software Engineering
              </span>{" "}
              from
              <span className="font-semibold text-blue-600">
                {" "}
                Bule Hora University
              </span>
              .
            </p>
            <p>
              🧠 Skilled in{" "}
              <span className="font-semibold text-blue-600">React</span>,{" "}
              <span className="font-semibold text-blue-600">Next.js</span>,
              <span className="font-semibold text-blue-600"> Node.js</span>, and{" "}
              <span className="font-semibold text-blue-600">MongoDB</span> to
              build modern, responsive web applications.
            </p>
            <p>
              💼 7+ months of experience as a{" "}
              <span className="font-semibold text-blue-600">
                Junior IT Expert
              </span>{" "}
              at
              <span className="font-semibold text-blue-600">
                {" "}
                Oromia Construction Corporation
              </span>
              .
            </p>
            <p>
              🚀 Worked on impactful projects like the{" "}
              <span className="font-semibold text-blue-600">
                Employee Hiring System
              </span>{" "}
              and
              <span className="font-semibold text-blue-600">
                {" "}
                House Rental System
              </span>
              .
            </p>
          </div>
        </section>

        {/* Right side with image (optional, can remove if not needed) */}
        <div className="flex justify-center">
          <Image
            src="/assets/profile.jpg" // replace with your actual path
            alt="Lelisa Shashura"
            className="rounded-2xl shadow-lg w-72 h-72 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
