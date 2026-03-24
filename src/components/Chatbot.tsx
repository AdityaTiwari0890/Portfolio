import { Fragment, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { MessageSquare, X, Loader2 } from "lucide-react";

type ChatMessage = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

const SYSTEM_PROMPT = `You are Aditya Tiwari's portfolio assistant. You help visitors learn about Aditya's background, skills, projects, and experience.

About Aditya:
- B.Tech Computer Science student at Lovely Professional University (CGPA: 8.41)
- Specializes in Data Science, AI, and Full-Stack Development
- Builds end-to-end solutions from data preprocessing to ML deployment
- Technologies: Python, Flask, React, Node.js, SQL/NoSQL, Power BI, ML/AI
- Tools: Linux (Ubuntu, Kali), VMware, Git/GitHub
- Soft skills: Teamwork, Time Management, Problem Solving, Strategic Leaner
- GitHub: https://github.com/AdityaTiwari0890
- Email: aditya.tiwari0890@gmail.com

Education:
- B.Tech CSE, LPU (2023-Present, CGPA 8.41)
- Intermediate, Tiny Tots School (2022-2023, 81.6%)
- Matriculation, Tiny Tots School (2020-2021, 78.8%)

Projects:
- SiteShield URL Risk Analyzer (ML security pipeline)
- Nexus URL Shortener (Node.js, MySQL, security features)
- Git Workflow Assistant (VS Code extension)
- Smart Parking Prediction (ML regression model)
- Weather Forecast App (React + APIs)

Certifications:
- Algo University: Graphs Camp
- IIT Kanpur: Cloud Computing
- IIT Kharagpur: Modern C++
- PW Skills: Backend Development
- LPU: Data Structures & Algorithms

Training/Experience:
- Full Stack MERN Training (CipherSchools)
- Field Data Collection Volunteer (NGO)

Achievements:
- Inter-School Chess Winner
- 400+ DSA problems solved
- 100+ SQL problems solved
- 288+ hours coding practice

Be helpful, professional, and engaging. Keep responses concise but informative. If asked about contact, encourage using the portfolio contact form.`;

const suggestionPrompts = [
  "Tell me about his projects",
  "What technologies does he use?",
  "His education background",
  "Show me his certifications",
  "His achievements",
  "Contact information",
  "GitHub profile",
  "Skills and experience",
];

/** Local answers when API is unavailable or fails — order matters (first match wins). */
const LOCAL_FAQ: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["project", "site", "nexus", "siteshield", "parking", "weather", "workflow", "work"],
    answer:
      "Aditya has built over 10+ impressive projects showcasing his expertise in Data Science, AI, and Full-Stack Development! Here are some highlights:\n\n🎯 **Portfolio Projects:**\n• SiteShield URL Risk Analyzer (ML security pipeline)\n• Nexus URL Shortener (Node.js, MySQL, security features)\n• Git Workflow Assistant (VS Code extension)\n• Smart Parking Prediction (ML regression model)\n• Weather Forecast App (React + APIs)\n\n🚀 **Additional Projects:**\n• Rock Prediction Model (ML)\n• Diabetes Prediction Model (ML)\n• Book Shelf App (React, Node.js, SQL)\n• Calculator (JavaScript, HTML, CSS)\n• Todo App (JavaScript, HTML, CSS)\n• Stone Paper Scissor Game\n• Cricket App\n• E-Learning Website\n• Excel Call Center Dashboard\n\nCheck out his complete portfolio of projects and code repositories!\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["skill", "technolog", "stack", "python", "react", "flask", "node", "tech"],
    answer:
      "Aditya is a versatile developer with expertise across the full technology stack, specializing in Data Science, AI, and Full-Stack Development. Here's his comprehensive technical profile:\n\n💻 **Programming Languages:**\n• Python (Data Science, ML, Backend)\n• JavaScript/TypeScript (Frontend, Backend)\n• C++ (Systems Programming)\n• SQL/NoSQL Databases\n\n🌐 **Web Technologies:**\n• Frontend: React, HTML5, CSS3, Tailwind CSS\n• Backend: Node.js, Flask, Express.js\n• Databases: MySQL, MongoDB, PostgreSQL\n\n🤖 **AI/ML & Data Science:**\n• Machine Learning Algorithms\n• Data Preprocessing & Analysis\n• Model Deployment\n• Power BI, Excel Dashboards\n\n🛠️ **Tools & Platforms:**\n• Linux (Ubuntu, Kali) - System Administration\n• VMware - Virtualization\n• Git/GitHub - Version Control\n• VS Code - Development Environment\n\n📊 **Problem Solving:**\n• 400+ DSA Problems Solved\n• 100+ SQL Problems Solved\n• 288+ Hours Coding Practice\n\nHis technical expertise spans from building end-to-end ML pipelines to creating responsive web applications, with strong foundations in both theoretical computer science and practical development.\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["education", "cgpa", "lpu", "degree", "school", "intermediate", "matric", "study"],
    answer:
      "Aditya has a strong educational foundation with excellent academic performance throughout his educational journey:\n\n🎓 **Current Education:**\n• Bachelor of Technology in Computer Science and Engineering\n• Lovely Professional University, Phagwara, Punjab\n• Duration: August 2023 – Present\n• CGPA: 8.41/10 (Outstanding performance)\n\n📚 **Secondary Education:**\n• Intermediate (12th Grade)\n• Tiny Tots Senior Secondary Public School, Sultanpur, U.P.\n• Percentage: 81.6%\n• Duration: April 2022 – April 2023\n\n📖 **Higher Secondary Education:**\n• Matriculation (10th Grade)\n• Tiny Tots Senior Secondary Public School, Sultanpur, U.P.\n• Percentage: 78.8%\n• Duration: April 2020 – April 2021\n\nHis academic journey reflects consistent excellence and a strong foundation in science and mathematics, preparing him for advanced studies in computer science and engineering.\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["certif", "iit", "algo", "pw skills", "certificate"],
    answer:
      "Aditya has earned over 20+ professional certifications demonstrating his commitment to continuous learning and technical excellence:\n\n🎓 **Core Programming & CS Fundamentals:**\n• Object Oriented Programming – Neo CoLab\n• Data Structures and Algorithm – Neo CoLab\n• Programming in Modern C++ – Indian Institute of Technology, Kharagpur\n• Introduction to Python – Infosys\n\n🏆 **Advanced Certifications:**\n• Algo University: Graphs Camp\n• IIT Kanpur: Cloud Computing\n• PW Skills: Backend Development\n• LPU: Data Structures & Algorithms\n\n💡 **Additional Technical Skills:**\n• Full Stack MERN Training (CipherSchools)\n• Linux Administration (Ubuntu, Kali)\n• VMware Virtualization\n• Git/GitHub Version Control\n\nHis certifications span algorithms, cloud computing, modern development practices, and specialized technical domains.\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["achiev", "chess", "dsa problem", "sql problem", "coding hour", "accomplish"],
    answer:
      "Aditya has achieved remarkable milestones in both academics and extracurricular activities, demonstrating exceptional dedication and talent:\n\n🏆 **Academic Excellence:**\n• B.Tech CSE at LPU (CGPA: 8.41/10)\n• Intermediate: 81.6% | Matriculation: 78.8%\n• Consistent high performance in computer science coursework\n\n🎯 **Problem Solving & Coding:**\n• 400+ Data Structures & Algorithms problems solved\n• 100+ SQL problems solved\n• 288+ hours of dedicated coding practice\n• Strong foundation in competitive programming\n\n🏅 **Extracurricular Achievements:**\n• Inter-School Chess Winner\n• Active participation in technical competitions\n• Volunteer work with NGO for field data collection\n\n💼 **Professional Development:**\n• Full Stack MERN Training at CipherSchools\n• Multiple professional certifications from IITs and reputed institutions\n• Hands-on experience with real-world projects\n\nHis achievements reflect a perfect balance of academic excellence, technical proficiency, and extracurricular involvement.\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["experience", "training", "cipher", "mern", "ngo", "volunteer", "background"],
    answer:
      "Aditya has diverse professional experience combining formal training, practical projects, and community service:\n\n💼 **Professional Training:**\n• Full Stack MERN Development Training\n• CipherSchools - Comprehensive web development curriculum\n• Hands-on experience with MongoDB, Express.js, React, Node.js\n• Modern development practices and industry standards\n\n🤝 **Community Service:**\n• Field Data Collection Volunteer\n• NGO Collaboration\n• Real-world data management experience\n• Social impact through technology\n\n🚀 **Project-Based Learning:**\n• End-to-end ML pipeline development (SiteShield, Smart Parking)\n• Full-stack web applications (Nexus URL Shortener, Weather App)\n• Development tools and extensions (Git Workflow Assistant)\n• Cross-platform development experience\n\n📈 **Technical Proficiency:**\n• 400+ DSA problems solved across various platforms\n• 100+ SQL query challenges completed\n• 288+ hours of focused coding practice\n• Strong problem-solving and analytical skills\n\nHis experience combines theoretical knowledge with practical application, making him well-prepared for professional software development roles.\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["contact", "email", "reach", "message", "hire", "connect", "get in touch"],
    answer:
      "I'd be delighted to connect with you! Here are multiple ways to reach Aditya:\n\n📧 **Email:**\n• aditya.tiwari0890@gmail.com\n• Best for detailed inquiries and professional opportunities\n\n💼 **Professional Networks:**\n• LinkedIn: https://www.linkedin.com/in/adityatiwari089 - Connect for professional networking\n• GitHub: https://github.com/AdityaTiwari0890 - Explore code and projects\n\n💻 **Coding Platforms:**\n• LeetCode: https://leetcode.com/u/Aditya089081/ - View problem-solving skills\n• Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61 - Technical articles and discussions\n\n📱 **Portfolio Contact Form:**\n• Use the Contact section on this website for direct messages\n• Perfect for project inquiries and collaborations\n\nWhether you're interested in collaboration, job opportunities, or just want to discuss technology, Aditya is always open to meaningful connections!\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["github", "git ", "repo", "code", "repository"],
    answer:
      "Explore Aditya's complete coding journey and technical expertise on GitHub! His repository showcases a diverse range of projects and contributions:\n\n📂 **Featured Repositories:**\n• SiteShield URL Risk Analyzer - ML-powered security tool\n• Nexus URL Shortener - Full-stack web application\n• Git Workflow Assistant - VS Code extension\n• Smart Parking Prediction - Machine learning model\n• Weather Forecast App - React-based weather application\n\n🚀 **Project Categories:**\n• Machine Learning & AI Projects\n• Full-Stack Web Applications\n• Development Tools & Extensions\n• Data Science & Analytics\n• Interactive Web Applications\n\n📊 **GitHub Stats:**\n• Multiple repositories with comprehensive documentation\n• Clean, well-structured code\n• Regular commits and updates\n• Open source contributions\n\n🔗 **Connect on all platforms:**\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["who", "about", "introduce", "background", "yourself"],
    answer:
      "Meet Aditya Tiwari, a passionate and talented Computer Science student with a remarkable journey in technology and innovation!\n\n🎓 **Academic Profile:**\n• B.Tech Computer Science & Engineering Student\n• Lovely Professional University (CGPA: 8.41)\n• Strong foundation in mathematics and computer science\n\n💻 **Technical Expertise:**\n• Specializes in Data Science, Artificial Intelligence, and Full-Stack Development\n• Builds end-to-end solutions from data preprocessing to ML deployment\n• Proficient in Python, React, Node.js, and modern development frameworks\n\n🚀 **Professional Highlights:**\n• 10+ diverse projects spanning ML, web development, and tools\n• 20+ professional certifications from IITs and reputed institutions\n• 400+ DSA problems solved, 100+ SQL challenges completed\n• 288+ hours of dedicated coding practice\n\n🏆 **Key Achievements:**\n• Inter-school chess winner\n• Full Stack MERN training at CipherSchools\n• NGO volunteer work in field data collection\n• Consistent academic excellence\n\nAditya combines academic excellence with practical experience, making him a well-rounded developer ready to tackle complex challenges and contribute to innovative projects.\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
  {
    keywords: ["hire", "job", "work", "opportunity", "internship", "position", "career"],
    answer:
      "Aditya is actively seeking exciting opportunities in technology and is open to various professional roles! Here's why he's a great fit for your team:\n\n💼 **Available Positions:**\n• Data Science & Machine Learning Engineer\n• Full-Stack Web Developer\n• AI/ML Developer\n• Software Development Intern\n• Research & Development Roles\n\n🎯 **Key Strengths:**\n• Strong academic foundation (CGPA 8.41 in CSE)\n• 10+ diverse projects with real-world applications\n• 20+ professional certifications\n• 400+ DSA problems solved\n• Full-stack development expertise\n\n🚀 **Technical Skills:**\n• Programming: Python, JavaScript, C++, SQL\n• Frameworks: React, Node.js, Flask, Express.js\n• AI/ML: Data preprocessing, model development, deployment\n• Tools: Linux, Git, VMware, Power BI\n\n📈 **Professional Experience:**\n• Full Stack MERN training at CipherSchools\n• NGO volunteer work with data collection\n• Multiple end-to-end project implementations\n• Strong problem-solving and analytical skills\n\nAditya brings enthusiasm, technical expertise, and a proven track record of delivering quality solutions. He's eager to contribute to innovative projects and grow within a dynamic team environment!\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61",
  },
];

const DEFAULT_LOCAL =
  "I can help with Aditya's projects, skills, education, certifications, achievements, experience, GitHub, contact info, or job opportunities. Try one of the quick prompts above or ask in your own words! All responses include links to his professional profiles.\n\n🔗 GitHub: https://github.com/AdityaTiwari0890\n🔗 LinkedIn: https://www.linkedin.com/in/adityatiwari089\n🔗 LeetCode: https://leetcode.com/u/Aditya089081/\n🔗 Geeks for Geeks: https://www.geeksforgeeks.org/profile/aktiwarikx61";

function getLocalResponse(question: string): string {
  const lower = question.toLowerCase();
  for (const entry of LOCAL_FAQ) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.answer;
    }
  }
  return DEFAULT_LOCAL;
}

function newMessageId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const RATE_MS = 2000;

export const Chatbot = () => {
  /** True only if Vite embedded this at dev/build time — must be named VITE_OPENAI_API_KEY */
  const openAiKeyLoaded = Boolean(
    String(import.meta.env.VITE_OPENAI_API_KEY ?? "").trim(),
  );

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: newMessageId(),
      sender: "bot",
      text: "Hi! I’m Aditya’s portfolio assistant. Ask about skills, projects, education, certifications, or contact — or tap a suggestion below.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSendRef = useRef<number>(0);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const toggleOpen = () => setOpen((prev) => !prev);

  const appendMessage = (message: Omit<ChatMessage, "id">) => {
    setMessages((prev) => [...prev, { ...message, id: newMessageId() }]);
  };

  const tryOpenAI = async (userText: string): Promise<string | null> => {
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey || String(apiKey).trim() === "") {
      return null;
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userText },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        console.log(`OpenAI API error (${response.status}): ${response.statusText}`);
        return null;
      }

      const data = (await response.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = data.choices?.[0]?.message?.content?.trim();
      return text && text.length > 0 ? text : null;
    } catch (error) {
      console.log("OpenAI API fetch error:", error);
      return null;
    }
  };

  const handleSend = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const now = Date.now();
    if (now - lastSendRef.current < RATE_MS) {
      setError("Please wait a moment before sending another message.");
      return;
    }
    lastSendRef.current = now;

    setError(null);
    appendMessage({ sender: "user", text });
    setInput("");
    setLoading(true);

    try {
      const fromApi = await tryOpenAI(text);
      if (fromApi) {
        appendMessage({ sender: "bot", text: fromApi });
        return;
      }

      // API failed (no key, quota exceeded, etc.) — use local fallback
      await new Promise((r) => setTimeout(r, 500)); // Brief delay for UX
      const localResponse = getLocalResponse(text);
      appendMessage({ sender: "bot", text: localResponse });
    } catch (error) {
      console.error("Chatbot error:", error);
      appendMessage({ sender: "bot", text: "Sorry, I'm having trouble responding right now. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void handleSend();
    }
  };

  const displayMessages = useMemo(() => messages.slice(-16), [messages]);

  const renderMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={`${part}-${i}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            {part}
          </a>
        );
      }

      const lines = part.split("\n");
      return lines.map((line, j) => (
        <Fragment key={`${i}-${j}`}>
          {line}
          {j < lines.length - 1 ? <br /> : null}
        </Fragment>
      ));
    });
  };

  useEffect(() => {
    const el = chatRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [displayMessages]);

  const handleQuickPrompt = (prompt: string) => {
    void handleSend(prompt);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      <button
        type="button"
        aria-label={open ? "Close chat" : "Open chat"}
        onClick={toggleOpen}
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary p-0 text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-2xl [&_svg]:block [&_svg]:shrink-0"
      >
        {open ? <X size={24} strokeWidth={2} aria-hidden /> : <MessageSquare size={24} strokeWidth={2} aria-hidden />}
      </button>

      {open && (
        <div className="absolute bottom-16 right-0 w-96 max-w-[calc(100vw-2rem)]">
          <section className="rounded-2xl border border-border bg-background shadow-2xl transition-all duration-300 ease-out backdrop-blur-sm">
            <header className="flex items-center justify-between border-b border-border p-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Aditya&rsquo;s assistant</h3>
                <p className="text-xs text-muted-foreground">Portfolio Q&amp;A</p>
                {import.meta.env.DEV && (
                  <p
                    className="mt-1 max-w-[220px] text-[10px] leading-snug text-muted-foreground/90"
                    title="Vite only exposes variables that start with VITE_. Restart npm run dev after editing .env."
                  >
                    {openAiKeyLoaded
                      ? "Dev: API key loaded — if using fallback, check console for API errors (e.g., quota exceeded)."
                      : "Dev: no VITE_OPENAI_API_KEY — add it to .env in project root and restart the dev server."}
                  </p>
                )}
              </div>
              <button
                type="button"
                className="rounded-xl bg-muted px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted/80"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </header>

            <div className="flex flex-wrap gap-2 border-b border-border px-3 py-3">
              {suggestionPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt)}
                  disabled={loading}
                  className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div ref={chatRef} className="max-h-80 space-y-3 overflow-y-auto px-4 py-3">
              {displayMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
                disabled={loading}
                aria-label="Chat message"
              />
              <button
                type="button"
                onClick={() => void handleSend()}
                disabled={!input.trim() || loading}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : "Send"}
              </button>
            </div>

            {error && (
              <p className="border-t border-border px-3 py-2 text-xs text-destructive" role="alert">
                {error}
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};
