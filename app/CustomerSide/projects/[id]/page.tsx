// app/CustomerSide/projects/[id]/page.tsx
import { notFound } from "next/navigation";
import { supabase } from "@/app/supabase/supabaseClient";
import ProjectCarousel from "@/app/CustomerSide/swiper/ProjectCarousel";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    notFound();
  }
const images: string[] = project.image_urls.map((url: string) => url.trim());


  const technologies =
    project.technology?.split(",").map((t:string) => t.trim()) || [];
  const features = project.features?.split(",").map((f:string) => f.trim()) || [];

  return (
    <section className="py-12 px-6 bg-gray-50 min-h-screen flex justify-center">
      <div className="max-w-5xl w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-10">
          {project.title}
        </h2>

        {images.length > 0 && <ProjectCarousel images={images} />}

        <p className="text-gray-700 text-lg mb-8">{project.description}</p>

        <div className="mb-6">
          <h4 className="text-xl font-semibold text-blue-700 mb-2">
            Technologies
          </h4>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            {technologies.map((tech: string, index: string) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold text-blue-700 mb-2">
            Key Features
          </h4>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            {features.map((feature: string, index: string) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
