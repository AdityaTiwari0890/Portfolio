import { FadeInUp, FadeInLeft } from "@/components/animations/MotionWrapper";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, hsl(0 0% 10% / 0.3) 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeInLeft>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="section-number">01.</span>
            About Me
          </h2>
        </FadeInLeft>

        <div className="max-w-4xl glass rounded-2xl p-6 border border-primary/30 shadow-[0_0_20px_rgba(34,197,94,0.15)] hover:shadow-[0_0_45px_rgba(34,197,94,0.45)] hover:border-primary transition-all duration-500">

          <FadeInUp delay={0.1}>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I'm a B.Tech Computer Science student with an 8.4 CGPA. I build data-driven solutions in Data Science, AI, and Full-Stack Development, and I specialize in end-to-end systems—from data preprocessing and analytics to machine learning model building and deployment.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              I develop machine learning models, analytics dashboards, and web apps using Python, Flask, React, Node.js, Power BI, and database technologies. I also have practical experience with Linux (Ubuntu, Kali), VMware, Git, and strong soft skills in teamwork, time management, and problem solving.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              I enjoy collaborating on open-source projects and continuously improving my skills by building practical projects and sharing my work on GitHub.
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};
