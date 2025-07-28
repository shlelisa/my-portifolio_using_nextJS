// app/projects/page.tsx (or pages/projects/index.tsx)
import Link from 'next/link';
import Header from '@/app/CustomerSide/components/Header';
import Footer from '@/app/CustomerSide/components/Footer';

const projects = [
  {
    id: 'employee-hiring',
    name: 'Employee Hiring System',
    fullDescription: 'A comprehensive web-based platform to streamline hiring, manage job postings, and track applicants.',
    technologies: ['React', 'Next.js', 'Node.js', 'MongoDB'],
    role: 'Full Stack Developer',
    features: [
      'Job posting & vacancy management',
      'Applicant resume upload & filtering',
      'Admin dashboard for application tracking',
      'Authentication for admin access'
    ],
  },
  {
    id: 'house-rental',
    name: 'House Rental System',
    fullDescription: 'A system built for Bule Hora City to manage property listings, tenant applications, and rental status.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    role: 'Backend & Frontend Developer',
    features: [
      'Landlord and tenant login system',
      'Real-time rental availability updates',
      'Property detail pages',
      'Admin dashboard for listing control'
    ],
  },
];


export default function ProjectsPage() {
  return (
<>
<Header/>

  <section className="max-w-7xl mx-auto py-20 px-6">
  <h2 className="text-5xl font-extrabold mb-12 text-center text-blue-800 tracking-wide">
    My Projects
  </h2>

  <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
    {projects.map((project) => (
      <div
        key={project.id}
        className="bg-white rounded-3xl shadow-md p-8 border border-transparent hover:border-blue-400 hover:shadow-2xl transition duration-300 cursor-pointer"
      >
        <h3 className="text-2xl font-semibold text-blue-900 mb-3">{project.name}</h3>
        <p className="text-gray-700 mb-4">{project.fullDescription}</p>

        <div className="mb-4">
          <span className="font-semibold text-gray-800">Technologies:</span>
          <ul className="list-disc ml-6 text-gray-600">
            {project.technologies.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <span className="font-semibold text-gray-800">Role:</span>
          <p className="text-gray-600">{project.role}</p>
        </div>

        <div className="mb-6">
          <span className="font-semibold text-gray-800">Key Features:</span>
          <ul className="list-disc ml-6 text-gray-600">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="text-blue-600 font-semibold hover:underline"
        >
          View Details &rarr;
        </Link>
      </div>
    ))}
  </div>
</section>
<Footer/>
 </>

  );
}
