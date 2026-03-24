import { motion } from "framer-motion";
import {
  Cpu,
  Building2,
  BarChart,
  Database,
  Zap,
  MessageCircle,
  Car,
  BookOpen,
  CreditCard,
  Github,
  ExternalLink,
} from "lucide-react";
import { FadeInLeft } from "@/components/animations/MotionWrapper";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const staticProjects = [
  {
    icon: Zap,
    image: "/siteShield.png",
    title: "SiteShield - URL Risk Analyzer",
    duration: "2025",
    description: [
      "Developed a Malicious URL Detection System with a 6-layer security pipeline combining ML and real-time APIs (VirusTotal, URLScan.io, AbuseIPDB). Achieved ~85% accuracy using ensemble models and anomaly detection. Built an interactive Streamlit dashboard with detailed threat insights—capable of detecting zero-day attacks in real time.",
    ],
    technologies: ["Python", "Machine Learning", "Security","Numpy","Pandas","Matplotlib","Supervised","Unsupervised"],
    github: "https://github.com/AdityaTiwari0890/SiteShield---URL-Risk-Analyzer",
  },
  {
    icon: Building2,
    image: "/urilify.png",
    title: "Nexus - Enterprise Grade URL Shortening Microservice",
    duration: "2025",
    description: [
      "Developed a scalable backend system using Node.js (Express MVC), EJS, and MySQL with optimized CRUD operations. Implemented enterprise-level security using JWT (Access/Refresh), Google OAuth 2.0, Argon2 hashing, Zod validation, and role-based authorization. Ensured production reliability via ACID transactions, complex SQL joins, email verification (Resend API), and secure file handling.",
    ],
    technologies: ["HTML", "CSS", "Javascript", "NodeJs", "ExpressJS", "MySQL", "Ejs", "Mjml"],
    github: "https://github.com/AdityaTiwari0890/Nexus---Enterprise-Grade-URL-Shortening-Microservice",
    
  },
  {
    icon: Github,
    image: "/git_workflow.png",
    title: "Git Workflow Assistant",
    duration: "2025",
    description: [
      "Built a Git workflow automation tool to streamline development processes, enabling efficient branching, merging, and conflict resolution. Designed to reduce manual effort and improve developer productivity through simplified command execution and optimized workflows.",
    ],
    technologies: ["VS Code","NodeJS","ExpressJS", "Github","Git CLI", "Automation","Shell Scripting"],
    github: "https://github.com/AdityaTiwari0890/git-workflow-assistant",
    demo: "https://marketplace.visualstudio.com/items?itemName=AdityaTiwari0890.git-workflow-assistant&ssr=false#overview",
  },
  {
    icon: Car,
    image: "/space.png",
    title: "Smart Parking Space Availability Prediction",
    duration: "2024",
    description: [
      "Performed EDA and feature engineering on Bengaluru parking space data, handling outliers and deriving location- and size-based features to enhance data quality. Developed a Random Forest regression model achieving ~92% R² accuracy for accurate price prediction. Built an interactive Streamlit dashboard to visualize locality-wise trends, distributions, and key market insights for data-driven decision-making.",
    ],
    technologies: ["Python", "Machine Learning", "Numpy","Pandas","Seaborn","EDA", "Supervised", "Feature Engineering"],
    github: "https://github.com/AdityaTiwari0890/Smart-Parking-Space-Availability-Prediction",
  },
  {
    icon: Zap,
    image: "/weather.png",
    title: "Weather Forecast Dashboard",
    duration: "2025",
    description: [
      "Developed a Weather Forecast Dashboard in Power BI by integrating real-time weather data through API-based Power Query workflows. Performed data cleaning and transformation to build interactive visualizations for temperature, humidity, wind speed, and conditions. Implemented location and time-based filters, enabling intuitive, data-driven insights through a clean dashboard design.",
    ],
    technologies: ["Power BI", "DAX", "Power Query", "JSON", "Data Cleaning", "Data Visualization","API"],
    github: "https://github.com/AdityaTiwari0890/Today-s-Weather-Forecast",
    demo: "https://app.powerbi.com/links/v5a14HEnja?ctid=e14e73eb-5251-4388-8d67-8f9f2e2d5a46&pbi_source=linkShare",
  },
  
];

export const ProjectsSection = () => {
  const handleGithubClick = (githubUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (githubUrl && githubUrl !== "#") {
      window.open(githubUrl, "_blank");
    }
  };

  const handleDemoClick = (demoUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (demoUrl && demoUrl !== "#") {
      window.open(demoUrl, "_blank");
    }
  };

  return (
    <section id="projects" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 10% / 0.3) 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeInLeft>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="section-number">03.</span>
            Featured Projects
          </h2>
        </FadeInLeft>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticProjects.map((project, index) => {
            const { icon: Icon, title, duration, description, technologies, github: githubUrl, demo: demoUrl } = project;

            return (
              <AnimatedCard
                key={title + index}
                index={index}
                hoverEffect="glow"
                className="glass rounded-2xl p-6 border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_45px_rgba(34,197,94,0.45)] hover:border-primary transition-all duration-500"
              >
                {project.image && (
                  <div className="mb-4 overflow-hidden rounded-xl h-40 bg-muted/10">
                    <img
                      src={project.image}
                      alt={`${title} screenshot`}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <motion.div
                  className="text-primary text-4xl mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon size={34} />
                </motion.div>

                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{duration}</p>

                <p className="text-sm text-muted-foreground mb-6">{description.join(" ")}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {technologies.map((tech) => (
                    <span key={tech} className="tech-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <motion.a
                    href={githubUrl}
                    onClick={(e) => handleGithubClick(githubUrl, e)}
                    className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github size={18} />
                  </motion.a>

                  <motion.a
                    href={demoUrl}
                    onClick={(e) => handleDemoClick(demoUrl, e)}
                    className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ExternalLink size={18} />
                  </motion.a>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
