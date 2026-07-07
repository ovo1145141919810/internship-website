import { lazy, Suspense, useEffect, useState } from "react";
import BorderGlow from "./components/BorderGlow";
import { usePortfolioMotion } from "./hooks/usePortfolioMotion";

const Threads = lazy(() => import("./components/Threads"));

const heroVideoSrc = "";

const profile = {
  name: "HU HUANGCAN",
  role: "Computer Science - Artificial Intelligence Undergraduate",
  headline: "Computer Science and Artificial Intelligence student seeking an IT internship.",
  intro:
    "I am a motivated undergraduate with a strong interest in software development and intelligent systems. My academic experience has built a foundation in programming, problem solving, data analysis, and collaborative project execution.",
  email: "huhuangcan@gmail.com",
  phone: "+60 142570621",
  location: "Asia Pacific University of Technology & Innovation",
  internship: "September 2026 - February 2027",
  linkedin: "https://www.linkedin.com/in/huangcan-hu-9516a4416/",
  whatsapp: "https://wa.me/60142570621",
  avatar: "/profile-photo.webp",
};

const metrics = [
  { value: "APU", label: "University" },
  { value: "3.0", label: "CGPA / 4.0" },
  { value: "2024-2027", label: "Degree Period" },
  { value: "Sep 2026", label: "Internship Start" },
];

const heroFacts = [
  { label: "Target Role", value: "IT / Software Internship" },
  { label: "Availability", value: "Sep 2026 - Feb 2027" },
  { label: "Focus", value: "Software, AI, Data" },
];

const resumeHighlights = [
  {
    label: "Education",
    value: "Bachelor's Degree in Computer Science - Artificial Intelligence",
  },
  {
    label: "Relevant Coursework",
    value: "Java, Python, SQL, AI, Data Analysis, Object-Oriented Programming",
  },
  {
    label: "Academic Experience",
    value: "Group projects involving Java, Python, SQL, R, planning, task allocation, and delivery.",
  },
];

const skillGroups = [
  {
    id: "frontend",
    title: "Front-End Foundations",
    type: "School Skill",
    description:
      "Able to build structured pages with HTML and CSS, refine layout hierarchy, and use AI tools to improve front-end presentation and design efficiency.",
    items: [
      { label: "HTML", level: 86 },
      { label: "CSS", level: 82 },
      { label: "UI Layout", level: 76 },
      { label: "Front-end Design", level: 78 },
      { label: "Vite", level: 68 },
    ],
  },
  {
    id: "coursework",
    title: "Coursework & CS Basics",
    type: "Course Learning",
    description:
      "Academic coursework covers Java programming, Python programming, SQL, artificial intelligence, data analysis, and object-oriented programming.",
    items: [
      { label: "Java Programming", level: 80 },
      { label: "Python Programming", level: 78 },
      { label: "SQL", level: 76 },
      { label: "Artificial Intelligence", level: 70 },
      { label: "Data Analysis", level: 72 },
      { label: "OOP", level: 74 },
    ],
  },
  {
    id: "backend",
    title: "Back-End Languages",
    type: "Backend Basics",
    description:
      "Familiar with Java, Python, C++, SQL, and introductory C# and .NET concepts for back-end logic, data handling, database queries, and basic system implementation.",
    items: [
      { label: "Java", level: 80 },
      { label: "Python", level: 78 },
      { label: "C++", level: 70 },
      { label: "SQL", level: 76 },
      { label: "C#", level: 64 },
      { label: ".NET", level: 60 },
    ],
  },
  {
    id: "workflow",
    title: "Workflow & Collaboration",
    type: "Workflow",
    description:
      "Experienced in academic group projects, including planning, task allocation, execution, communication, issue identification, and practical problem solving.",
    items: [
      { label: "Agile", level: 72 },
      { label: "Scrum", level: 70 },
      { label: "Team Planning", level: 78 },
      { label: "Task Allocation", level: 76 },
      { label: "Execution", level: 82 },
    ],
  },
  {
    id: "ai-productivity",
    title: "AI Productivity",
    type: "AI Productivity",
    description:
      "Comfortable using Codex, opencode, and prompt-driven workflows to understand code, debug issues, optimize front-end design, and improve development efficiency.",
    items: [
      { label: "Codex", level: 88 },
      { label: "opencode", level: 84 },
      { label: "Prompt", level: 82 },
      { label: "Debug", level: 78 },
      { label: "UI Optimization", level: 80 },
    ],
    featured: true,
  },
  {
    id: "data-office",
    title: "Data & Office Tools",
    type: "Data & Office",
    description:
      "Able to use R Studio, SQL, and Python for basic data analysis tasks, while also working comfortably with PowerPoint, Word, and Excel.",
    items: [
      { label: "R Studio", level: 70 },
      { label: "SQL", level: 76 },
      { label: "Python", level: 78 },
      { label: "PowerPoint", level: 84 },
      { label: "Word", level: 82 },
      { label: "Excel", level: 78 },
    ],
  },
];

const strengths = [
  {
    title: "Logical Thinking",
    copy: "Able to break tasks into clear steps, analyze problems, validate ideas, and adjust the approach until the work moves forward.",
  },
  {
    title: "Communication",
    copy: "Comfortable communicating progress, blockers, and collaboration needs during group projects and technical tasks.",
  },
  {
    title: "Multitasking",
    copy: "Able to prioritize multiple coursework and project responsibilities while maintaining time management and execution quality.",
  },
  {
    title: "Responsibility",
    copy: "Pays attention to quality, professionalism, delivery standards, and the small details that make work more reliable.",
  },
  {
    title: "Adaptability",
    copy: "Able to adapt to new tools, assignments, and team workflows while continuously learning and applying new techniques.",
  },
  {
    title: "AI Productivity",
    copy: "Uses Codex and opencode to read code, refine styles, locate bugs, and improve front-end design while keeping human judgment in control.",
  },
];

const navItems = [
  { label: "Resume", href: "#resume" },
  { label: "Skills", href: "#skills" },
  { label: "Strengths", href: "#strengths" },
  { label: "Contact", href: "#contact" },
];

const threadsColor = [0x25 / 255, 0x6c / 255, 0x55 / 255];
const skillGlowColors = ["#256c55", "#63d7c7", "#d9ad67"];

function App() {
  const [selectedSkill, setSelectedSkill] = useState(() => getSkillFromHash());
  usePortfolioMotion(!selectedSkill);

  useEffect(() => {
    function syncSkillFromHash() {
      setSelectedSkill(getSkillFromHash());
    }

    window.addEventListener("hashchange", syncSkillFromHash);
    window.addEventListener("popstate", syncSkillFromHash);
    return () => {
      window.removeEventListener("hashchange", syncSkillFromHash);
      window.removeEventListener("popstate", syncSkillFromHash);
    };
  }, []);

  useEffect(() => {
    if (selectedSkill) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedSkill]);

  function handleOpenSkill(group) {
    setSelectedSkill(group);
    window.history.pushState(null, "", `#skill-${group.id}`);
  }

  function handleBackToSkills() {
    setSelectedSkill(null);
    window.history.pushState(null, "", "#skills");
    window.setTimeout(() => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  if (selectedSkill) {
    return (
      <>
        <SiteBackground />
        <SkillDetail group={selectedSkill} onBack={handleBackToSkills} />
      </>
    );
  }

  return (
    <>
      <SiteBackground />
      <main>
        <Hero />
        <Resume />
        <Skills onOpenSkill={handleOpenSkill} />
        <Strengths />
        <Contact />
      </main>
    </>
  );
}

function getSkillFromHash() {
  const id = window.location.hash.replace("#skill-", "");
  return skillGroups.find((group) => group.id === id) ?? null;
}

function SiteBackground() {
  return (
    <div className="siteBackground" aria-hidden="true">
      <Suspense fallback={null}>
        <Threads
          color={threadsColor}
          amplitude={2.35}
          distance={0.14}
          enableMouseInteraction
        />
      </Suspense>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="videoFallback" aria-hidden="true" />
      {heroVideoSrc ? (
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-poster.svg"
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
      ) : null}
      <div className="heroShade" aria-hidden="true" />

      <header className="siteHeader">
        <a className="brand" href="#home" aria-label="Back to home">
          <span className="brandMark">IT</span>
          <span>Intern Portfolio</span>
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="headerButton" href="#contact">
          Contact Me
        </a>
      </header>

      <div className="heroInner">
        <div className="heroContent">
          <p className="eyebrow">Available for IT Internship</p>
          <h1 className="heroTitle">
            <span className="titleMask">
              <span className="titleLine">Computer Science.</span>
            </span>
            <span className="titleMask">
              <span className="titleLine">AI-minded software builder.</span>
            </span>
          </h1>
          <p className="heroCopy">
            I am seeking an IT internship from September 2026 to February 2027,
            with strengths in programming fundamentals, data tools, team collaboration,
            and AI-assisted front-end productivity.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#skills">
              Explore Skills
            </a>
            <a className="ghostButton" href={`mailto:${profile.email}`}>
              Send Email
            </a>
          </div>
        </div>
        <div className="heroFactGrid" aria-label="Internship profile highlights">
          {heroFacts.map((fact) => (
            <div className="heroFact" key={fact.label}>
              <span>{fact.label}</span>
              <strong>{fact.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Resume() {
  return (
    <section className="section resumeSection motion-section" id="resume">
      <div className="sectionInner resumeGrid">
        <div className="resumeCard motion-card">
          <div className="avatarFrame motion-image">
            <img
              src={profile.avatar}
              alt={`${profile.name} profile portrait`}
              width="720"
              height="1008"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="eyebrow">Resume Snapshot</p>
            <h2>{profile.name}</h2>
            <p className="role">{profile.role}</p>
          </div>
          <div className="contactList" aria-label="Contact information">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            <span>{profile.location}</span>
            <span>{profile.internship}</span>
          </div>
        </div>

        <div className="resumeContent">
          <p className="sectionLabel">Resume</p>
          <h2 className="motion-title">{profile.headline}</h2>
          <p>{profile.intro}</p>
          <div className="resumeHighlightGrid">
            {resumeHighlights.map((item) => (
              <div className="resumeHighlight motion-row" key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
          <div className="metricGrid">
            {metrics.map((metric) => (
              <div className="metric motion-card" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ onOpenSkill }) {
  return (
    <section className="section motion-section" id="skills">
      <div className="sectionInner">
        <div className="sectionHead">
          <p className="sectionLabel">Tools & Skills</p>
          <h2 className="motion-title">Capabilities I can bring into an internship team.</h2>
        </div>
        <div className="toolGrid">
          {skillGroups.map((group) => (
            <BorderGlow
              className={`toolGlowCard motion-card${group.featured ? " toolGlowCardFeatured" : ""}`}
              key={group.title}
              edgeSensitivity={24}
              glowColor="159 49 41"
              backgroundColor="rgba(9, 15, 14, 0.88)"
              borderRadius={8}
              glowRadius={34}
              glowIntensity={1.2}
              coneSpread={24}
              animated={group.featured}
              colors={skillGlowColors}
              fillOpacity={0.32}
            >
              <button
                type="button"
                className={`toolCard${group.featured ? " toolCardFeatured" : ""}`}
                onClick={() => onOpenSkill(group)}
                aria-label={`View familiarity chart for ${group.title}`}
              >
                <div className="toolCardTop">
                  <p>{group.type}</p>
                  <span>{group.featured ? "AI" : "IT"}</span>
                </div>
                <h3>{group.title}</h3>
                <p className="toolDescription">{group.description}</p>
                <div className="tagRow">
                  {group.items.map((item) => (
                    <small key={item.label}>{item.label}</small>
                  ))}
                </div>
                <span className="cardHint">View familiarity chart</span>
              </button>
            </BorderGlow>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillDetail({ group, onBack }) {
  return (
    <main className="detailPage">
      <header className="detailHeader">
        <button className="brand detailBrandButton" type="button" onClick={onBack}>
          <span className="brandMark">IT</span>
          <span>Skill Profile</span>
        </button>
        <button className="headerButton" type="button" onClick={onBack}>
          Back
        </button>
      </header>

      <section className="detailInner">
        <div className="detailIntro">
          <p className="sectionLabel">{group.type}</p>
          <h1>{group.title}</h1>
          <p>{group.description}</p>
        </div>

        <div className="barChart" aria-label={`${group.title} familiarity chart`}>
          {group.items.map((item, index) => (
            <div className="barItem" key={item.label}>
              <div className="barMeta">
                <span>{item.label}</span>
                <strong>{item.level}%</strong>
              </div>
              <div className="barTrack">
                <div
                  className="barFill"
                  style={{
                    "--level": `${item.level}%`,
                    animationDelay: `${index * 110}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="detailActions">
          <button className="primaryButton" type="button" onClick={onBack}>
            Back to Tools & Skills
          </button>
        </div>
      </section>
    </main>
  );
}

function Strengths() {
  return (
    <section className="section strengthsSection motion-section" id="strengths">
      <div className="sectionInner">
        <div className="sectionHead narrow">
          <p className="sectionLabel">Personal Strengths</p>
          <h2 className="motion-title">Clear communication, steady execution, and continuous learning.</h2>
        </div>
        <div className="strengthGrid">
          {strengths.map((item, index) => (
            <article className="strengthCard motion-card" key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contactSection motion-section" id="contact">
      <div className="contactInner">
        <p className="sectionLabel">Contact</p>
        <h2 className="motion-title">Ready to bring CS-AI fundamentals and AI productivity into a real team.</h2>
        <p>
          If you are looking for an IT intern who learns quickly, communicates clearly,
          and takes delivery seriously, I would be glad to connect.
        </p>
        <div className="contactActions motion-card">
          <a className="primaryButton" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="ghostButton" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="ghostButton" href={profile.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

export default App;
