// app/projects/page.tsx
"use client";
import { supabase } from "@/app/supabase/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectType {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  technology: string;
  role?: string;
  features: string;
  image_urls?: string[];
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      console.error("Error fetching projects:", error);
      return;
    } else {
      setProjects(data || []);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-5xl font-extrabold mb-12 text-center text-blue-800 tracking-wide">
        My Projects
      </h2>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/CustomerSide/projects/${project.id}`}
            className="text-blue-600 font-semibold hover:underline"
          >
            <div className="bg-white rounded-3xl shadow-md p-8 border border-transparent hover:border-blue-400 hover:shadow-2xl transition duration-300 cursor-pointer">
              <div className="relative w-full h-64 mb-6">
                <Image
                  src={
                    project.image_urls?.[0] ||
                    "/assets/default-project-image.jpg"
                  }
                  alt={project.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-3">
                {project.title}
              </h3>
              <p className="text-gray-700 mb-4">
                {project.description.substring(0, 50) + "..."}
              </p>
              View Details &rarr;
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
