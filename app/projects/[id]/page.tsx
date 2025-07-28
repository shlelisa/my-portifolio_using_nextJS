import { notFound } from "next/navigation";
import Link from "next/link";
interface ProjectDetailProps {
  params: { id: string };
}

const projects = [
  {
    id: "employee-hiring",
    name: "Employee Hiring System",
    shortDescription:
      "A web platform for managing job postings and applicant tracking.",
    fullDescription: `The Employee Hiring System is a web-based application that streamlines the recruitment process. 
    It allows HR teams to post vacancies, manage applications, review candidate profiles, and schedule interviews.
    Built with a focus on scalability and security, the system is tailored for institutional use.`,
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    features: [
      "Admin dashboard for HR staff",
      "Vacancy posting and editing",
      "Applicant submission and tracking",
      "Resume upload and management",
      "Search and filter functionality",
    ],
    image: "/assets/hiring-system.png", // Optional image path
    link: "/projects/employee-hiring-system", // Dynamic route
  },
  {
    id: "house-rental",
    name: "House Rental System",
    shortDescription:
      "Built for Bule Hora City to manage house rentals online.",
    fullDescription: `The House Rental System is an online platform developed for Bule Hora City. 
    It facilitates landlords to list rental properties and enables tenants to search, filter, and apply for houses. 
    It includes property management tools, maps, and secure user authentication.`,
    technologies: [
      "Next.js",
      "MongoDB",
      "Node.js",
      "Cloudinary",
      "CSS Modules",
    ],
    features: [
      "User registration and login",
      "Map-based property search",
      "Admin control for property approval",
      "Rental application and contact system",
      "Responsive and mobile-friendly design",
    ],
    image: "/assets/house-rental-system.png",
    link: "/projects/house-rental-system",
  },
];

// ✅ Make the function async
export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    // Optionally redirect to 404 page if project not found
    notFound();
  }

  return (<section className="py-20 px-6 bg-gray-50 min-h-screen flex justify-center items-start">
  <div className="max-w-7xl w-full">
    <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-16">
      My Projects
    </h2>

    <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">{project.name}</h3>
        <p className="text-gray-700 mb-6">{project.fullDescription}</p>

        <div className="mb-4">
          <h4 className="text-gray-800 font-semibold mb-1">Technologies:</h4>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            {project.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-gray-800 font-semibold mb-1">Key Features:</h4>
          <ul className="list-disc ml-5 text-gray-600 space-y-1">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

  );
}
