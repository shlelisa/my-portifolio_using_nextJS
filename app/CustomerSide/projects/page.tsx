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
            <div className="bg-white rounded-2xl shadow-md mr-4 p-3 sm:p-6 border border-transparent hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-[80%]">
              {/* Image container - using aspect ratio for consistent proportions */}
              <div className="relative w-80 aspect-[4/3] mb-2 sm:mb-3">
                <Image
                  src={
                    project.image_urls?.[0] ||
                    "/assets/default-project-image.jpg"
                  }
                  alt={project.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 480px) 80vw, (max-width: 768px) 50vw, (max-width: 1200px) 30vw, 20vw"
                  quality={100}
                  priority={false}
                />
              </div>

              {/* Content */}
              <h3
                className="text-lg sm:text-xl md:text-2xl font-semibold 
    text-blue-900 mb-2 sm:mb-3 line-clamp-5"
              >
                {project.title}
              </h3>

              <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">
                {project.description.substring(0, 30) +
                  (project.description.length > 100 ? "..." : "")}
              </p>

              <div className="text-blue-600 font-medium text-sm sm:text-base flex items-center group">
                View Details
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">
                  &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
