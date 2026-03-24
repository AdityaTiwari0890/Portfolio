import { Award } from "lucide-react";
import { FadeInLeft } from "@/components/animations/MotionWrapper";
import { AnimatedCard } from "@/components/animations/AnimatedCard";

const resolvePublicPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const certifications = [
  {
    title: "Graphs Camp Participation Certificate",
    logo: resolvePublicPath("/algoUniversity.png"),
    link: "https://drive.google.com/file/d/1hHvYSPn6lesaccLa2fTxGQ58wA3kwMhi/view?usp=sharing",
  },
  {
    title: "Cloud Computing Certification",
    logo: resolvePublicPath("/iitkharagpur.png"),
    link: "https://drive.google.com/file/d/1MrmcstDzt22YbGRPjTpedQffAYI98m5N/view?usp=sharing",
  },
  {
    title: "Programming in Modern C++ Certification",
    logo: resolvePublicPath("/iitkharagpur.png"),
    link: "https://drive.google.com/file/d/1I5_D5QfWGJVjj7Qh57-DdXp1_uo2ir0O/view?usp=drive_link",
  },
  {
    title: "Backend Development Course Certification",
    logo: resolvePublicPath("/pw.png"),
    link: "https://drive.google.com/file/d/1NUbC_ReJhiH2f1loK5NFrPa6vjJ03Zb7/view?usp=drive_link",
  },
  {
    title: "Data Structures and Algorithms Certification",
    logo: resolvePublicPath("/lpu.png"),
    link: "https://drive.google.com/file/d/1VWTcKl7GZjiDX7vhYUIoXzYPIHX_IurL/view?usp=sharing",
  },
];

export const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, hsl(0 0% 10% / 0.3) 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeInLeft>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="section-number">06.</span>
            Certifications
          </h2>
        </FadeInLeft>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {certifications.map((cert, idx) => (
              <AnimatedCard
                key={cert.title}
                index={idx}
                hoverEffect="lift"
                className="glass rounded-2xl overflow-hidden border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_45px_rgba(34,197,94,0.45)] hover:border-primary transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row items-center gap-4 p-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-background/40 flex items-center justify-center">
                    <img src={cert.logo} alt="Certificate logo" className="w-16 h-16 object-contain" />
                  </div>
                  <div className="flex-1 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Award className="text-primary" size={20} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{cert.title}</h3>
                    </div>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
                    >
                      View Certificate
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
