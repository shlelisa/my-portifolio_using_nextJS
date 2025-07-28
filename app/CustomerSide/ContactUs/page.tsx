// components/ContactUs.tsx
"use client";

import React from "react";

const ContactUs = () => {
  return (
    <>
      {/* Embedded Google Map */}
      <div className="w-full max-w-6xl mx-auto mt-24 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d585.8958190545243!2d38.76512974720554!3d8.933244786719126!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x164b8397a99b57d1%3A0x3a52a485eeae70b9!2sAkaki%20Kaliti%2012%2F13%20Addis%20Ababa!3m2!1d8.9459065!2d38.765612!5e0!3m2!1sen!2set!4v1752818724639!5m2!1sen!2set"
          className="w-full h-[450px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>

      {/* Contact Form */}
      <section
        id="contact"
        className="bg-gradient-to-br from-white to-blue-50 py-24 px-4 md:px-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-blue-900 mb-6">
            Let’s Connect
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Whether you have a question, an opportunity, or just want to chat —
            I’m always open to connecting with new people. Drop me a message
            below!
          </p>

          <form className="bg-white rounded-3xl shadow-xl p-8 md:p-12 grid gap-6 text-left">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="Let's collaborate"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                rows={6}
                placeholder="Write your message here..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none"
                required
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
