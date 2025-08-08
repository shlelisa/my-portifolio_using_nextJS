'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/supabase/supabaseClient';
import ContactUs from '@/app/CustomerSide/ContactUs/page';
import About from '@/app/CustomerSide/components/About/page';
import Projects from '@/app/CustomerSide/projects/page';


type ProfileType = {
  firstName: string;
  profileTitle: string;
}

export default function HomePage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileType | null>(null);

  useEffect(() => {
    fetchSkills();
    fetchProfile();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase.from('skills').select('name');
    if (error) {
      console.error('Error fetching skills:', error.message);
    } else {
      setSkills(data.map((skill: { name: string }) => skill.name));
    }
  };


  const fetchProfile = async () => {
    const { data, error } = await supabase.from('profiles').select('*').single();
    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }
    setProfile(data);
  }

  return (
    <main className="bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800 font-sans scroll-smooth">
      {/* Hero */}
      <section
        id="hero"
        className="flex flex-col items-center justify-center text-center pt-36 pb-24 bg-gradient-to-b from-white to-blue-50"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-800 tracking-tight">
          {profile?.firstName.toLocaleUpperCase() || 'LELISA'}
        </h1>
        <p className="text-xl mt-6 text-gray-600 animate-fade-in">
          {profile?.profileTitle || 'Full Stack Developer'}
        </p>
        <a
          href="#contact"
          className="mt-8 bg-blue-700 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-800 transition"
        >
          Let&apos;s Connect
        </a>
      </section>

      {/* About Me */}
      <About />

      {/* Skills */}
      <section id="skills" className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 text-blue-700 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.length > 0 ? (
              skills.map((skill, id) => (
                <span
                  key={id}
                  className="px-5 py-2 bg-blue-100 text-blue-800 font-medium rounded-full shadow-md hover:scale-105 transition transform duration-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-500">Loading skills...</p>
            )}
          </div>
        </div>
      </section>

      <Projects />

      {/* Contact */}
      <ContactUs />
    </main>
  );
}
