"use client";

import React, { useRef } from "react";
import emailjs from "emailjs-com";

const ContactUs = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs

  
      .sendForm(
        "service_g13uyno", // 🔁 Replace with your actual EmailJS service ID
        "template_o67n72i", // 🔁 Replace with your template ID
        form.current,
        "vC6pt6HJ8sIAh3fQ3"   // 🔁 Replace with your EmailJS public key
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          form.current?.reset();
        },
        (error) => {
          console.error("Failed to send:", error.text);
          alert("Failed to send message. Please try again.");
        }
      );
  };

  return (
    <>
      <div className="flex-center bg-gradient-to-br from-white to-blue-50 text-gray-800 font-sans py-20 px-6">
        <h1>Get in touch with us</h1>
      </div>

      <div className="w-full max-w-6xl mx-auto mt-24 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          className="w-full h-[450px] border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        ></iframe>
      </div>

      <section
        id="contact"
        className="bg-gradient-to-br from-white to-blue-50 py-24 px-4 md:px-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold text-blue-900 mb-6">
            Let’s Connect
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Whether you have a question, an opportunity, or just want to chat — I’m always open to connecting. Drop a message!
          </p>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 grid gap-6 text-left"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
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
                  name="email"
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
                name="title"
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
                name="message"
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
