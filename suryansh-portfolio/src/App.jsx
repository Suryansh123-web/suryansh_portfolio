import React, { useEffect, useState } from "react";

const navigation = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Contact", "#contact"],
];

const skills = [
  { number: "01", icon: "</>", title: "Frontend", details: "HTML5 · CSS3 · JavaScript", level: 84 },
  { number: "02", icon: "Py", title: "Programming", details: "Python · Application logic", level: 72 },
  { number: "03", icon: "▤", title: "Backend & Data", details: "Flask · MySQL · APIs", level: 68 },
  { number: "04", icon: "⌘", title: "Developer Tools", details: "Git · GitHub · VS Code", level: 78 },
];

const projects = [
  {
    number: "01",
    category: "WEB APPLICATION",
    title: "Smart Attendance System",
    description: "A web-based attendance system concept combining QR-code scanning and face recognition, with a Flask, HTML, CSS, JavaScript, and MySQL stack.",
    tags: ["Python", "Flask", "JavaScript", "MySQL"],
    href: "https://github.com/Suryansh123-web/smart-attendance-system",
    visual: "attendance",
    visualTag: "PYTHON · FLASK",
    featured: true,
  },
  {
    number: "02",
    category: "WEBSITE",
    title: "FitnessFreak Gym Website",
    description: "A responsive gym website focused on a bold visual identity, clean layout, and an accessible experience across screen sizes.",
    tags: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/Suryansh123-web/fitnessfreak-gym-website",
    visual: "fitness",
    visualTag: "RESPONSIVE UI",
  },
  {
    number: "03",
    category: "AI PROJECT",
    title: "Gyaan Kosh",
    description: "An AI-powered study assistant concept designed around document uploads, semantic search, and context-aware answers.",
    tags: ["JavaScript", "RAG", "AI"],
    href: "https://github.com/Suryansh123-web/Gyaan_Kosh-",
    visual: "gyaan",
    visualTag: "AI · RAG",
  },
];

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? " footer-brand" : ""}`} href="#home" aria-label="Suryansh Chhetry home">
      <span className="brand-mark">S.</span>
      <span>Suryansh<span className="brand-dot">.</span></span>
    </a>
  );
}

function ThemeIcon({ theme }) {
  return (
    <svg className="sun-icon" viewBox="0 0 24 24" aria-hidden="true">
      {theme === "light" ? <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" /> : <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>}
    </svg>
  );
}

function ProjectVisual({ project }) {
  if (project.visual === "attendance") {
    return (
      <div className="project-visual attendance-visual" aria-hidden="true">
        <div className="visual-window">
          <div className="visual-window-bar"><i /><i /><i /><span>attendance / dashboard</span></div>
          <div className="attendance-ui">
            <div className="ui-sidebar" />
            <div className="ui-content">
              <div className="ui-title" />
              <div className="ui-stat-row"><i /><i /><i /></div>
              <div className="ui-table"><b /><b /><b /><b /></div>
              <div className="face-scan"><span>SCAN READY</span></div>
            </div>
          </div>
        </div>
        <span className="visual-tag">{project.visualTag}</span>
      </div>
    );
  }

  if (project.visual === "fitness") {
    return (
      <div className="project-visual fitness-visual" aria-hidden="true">
        <div className="fitness-word">FITNESS<span>FREAK</span></div>
        <div className="fitness-circle" />
        <div className="fitness-caption">MOVE WITH PURPOSE / 01</div>
        <span className="visual-tag">{project.visualTag}</span>
      </div>
    );
  }

  return (
    <div className="project-visual gyaan-visual" aria-hidden="true">
      <div className="gyaan-orb" />
      <div className="gyaan-panel">
        <span className="gyaan-label">GYAAN KOSH / AI STUDY ASSISTANT</span>
        <div className="gyaan-prompt">Ask your documents<br /><span>Understand more. Search smarter.</span></div>
        <div className="gyaan-search"><span>⌕</span> Search your knowledge base <b>↗</b></div>
      </div>
      <span className="visual-tag">{project.visualTag}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={`project-card${project.featured ? " project-featured" : ""}`} data-reveal>
      <ProjectVisual project={project} />
      <div className="project-content">
        <div className="project-meta">
          <span>{project.number} / {project.category}</span>
          <span className="project-status">PROJECT</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <a className="project-link" href={project.href} target="_blank" rel="noopener noreferrer">
          View repository <ExternalArrow />
        </a>
      </div>
    </article>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("suryansh-portfolio-theme") === "dark" ? "dark" : "light";
    } catch {
      return "light";
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#121a17" : "#f4f0e7");
    try {
      localStorage.setItem("suryansh-portfolio-theme", theme);
    } catch {
      // The theme still works for this session when browser storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const closeOnDesktop = () => {
      if (window.innerWidth > 700) setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-reveal]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -36px 0px" });

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <nav className="nav container" aria-label="Main navigation">
          <Brand />
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span />
          </button>
          <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="nav-links">
            {navigation.map(([label, href]) => (
              <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              onClick={() => setTheme((current) => current === "dark" ? "light" : "dark")}
            >
              <ThemeIcon theme={theme} />
            </button>
          </div>
        </nav>
      </header>

      <main id="main">
        <section className="hero section container" id="home" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> INDEPENDENT DEVELOPER <span className="eyebrow-divider">/</span> FIELD NOTES 001</p>
            <h1 id="hero-title">Hey, I&apos;m<br /><span className="gradient-text">Suryansh</span><br />Chhetry<span className="accent">.</span></h1>
            <p className="hero-role">I build for the web <span>✳</span> and stay curious.</p>
            <p className="hero-description">A developer exploring web technologies, Python, and AI-powered applications — turning ideas into useful digital experiences, one project at a time.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ExternalArrow /></a>
              <a className="button button-secondary" href="#contact">Let&apos;s connect</a>
            </div>
            <div className="hero-socials" aria-label="Social links">
              <a href="https://github.com/Suryansh123-web" target="_blank" rel="noopener noreferrer">GitHub <ExternalArrow /></a>
              <a href="https://www.linkedin.com/in/suryansh-chhetry/" target="_blank" rel="noopener noreferrer">LinkedIn <ExternalArrow /></a>
            </div>
          </div>
          <div className="hero-art" aria-label="Decorative code illustration">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="hero-glow" />
            <div className="code-card">
              <div className="code-card-top"><span /><span /><span /><p>developer.js</p></div>
              <pre><code><span className="code-purple">const</span> developer = {'{'}{"\n"}
  name: <span className="code-green">&quot;Suryansh&quot;</span>,{"\n"}
  interests: [{"\n"}
    <span className="code-green">&quot;Web Development&quot;</span>,{"\n"}
    <span className="code-green">&quot;Python&quot;</span>,{"\n"}
    <span className="code-green">&quot;AI Projects&quot;</span>{"\n"}
  ],{"\n"}
  mindset: <span className="code-green">&quot;always learning&quot;</span>,{"\n"}
  build() {'{'}{"\n"}
    <span className="code-purple">return</span> <span className="code-green">&quot;something useful&quot;</span>;{"\n"}
  {'}'}{"\n"}
{'}'};</code></pre>
              <div className="code-card-footer"><span className="mini-pulse" /> Open to learning &amp; collaboration</div>
            </div>
            <div className="floating-chip chip-one">{"{ }"} <span>Clean code</span></div>
            <div className="floating-chip chip-two">✳ <span>Curiosity-driven</span></div>
            <div className="hero-art-index"><span>OBJECT / 001</span><strong>Ideas into interfaces.</strong></div>
          </div>
          <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO EXPLORE</a>
        </section>

        <section className="section container" id="about" aria-labelledby="about-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">01 / ABOUT</p>
            <h2 id="about-title">Curious by nature.<br /><span className="muted-heading">Builder by practice.</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-copy" data-reveal>
              <p className="large-copy">I enjoy learning how technology works and using that knowledge to build practical projects.</p>
              <p>From responsive websites to Python-based applications and AI-assisted learning tools, I like exploring different parts of software development. Each project is a chance to improve my problem-solving skills, experiment with ideas, and write better code.</p>
              <p>This portfolio is a snapshot of what I&apos;m building and learning. I&apos;m always looking for opportunities to collaborate, learn from other developers, and take on new challenges.</p>
            </div>
            <div className="about-note" data-reveal>
              <span className="note-icon" aria-hidden="true">✳</span>
              <p className="note-label">CURRENT APPROACH</p>
              <h3>Learn it.<br />Build it.<br />Make it better.</h3>
              <p>Small iterations, real projects, and a willingness to keep improving.</p>
            </div>
          </div>
        </section>

        <section className="section container" id="skills" aria-labelledby="skills-title">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">02 / TOOLKIT</p>
            <h2 id="skills-title">Tools I work with<span className="accent">.</span></h2>
            <p className="section-intro">Technologies reflected in my projects and current development practice.</p>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.number} data-reveal>
                <span className="skill-number">{skill.number}</span>
                <div className="skill-icon" aria-hidden="true">{skill.icon}</div>
                <h3>{skill.title}</h3>
                <p>{skill.details}</p>
                <div className="skill-line"><span style={{ width: `${skill.level}%` }} /></div>
              </article>
            ))}
          </div>
          <p className="skills-note">Skill bars are visual design elements, not formal proficiency ratings.</p>
        </section>

        <section className="section container" id="projects" aria-labelledby="projects-title">
          <div className="section-heading projects-heading" data-reveal>
            <div><p className="eyebrow">03 / SELECTED WORK</p><h2 id="projects-title">Things I&apos;ve been building<span className="accent">.</span></h2></div>
            <a className="text-link" href="https://github.com/Suryansh123-web?tab=repositories" target="_blank" rel="noopener noreferrer">All repositories <ExternalArrow /></a>
          </div>
          <div className="projects-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
          <p className="project-disclaimer">Project descriptions are summaries based on the public repository information. Visit each repository for implementation details and updates.</p>
        </section>

        <section className="section container contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-panel" data-reveal>
            <div className="contact-decoration" aria-hidden="true"><span /><span /><span /></div>
            <p className="eyebrow">04 / GET IN TOUCH</p>
            <h2 id="contact-title">Have an idea?<br /><span className="gradient-text">Let&apos;s build something.</span></h2>
            <p className="contact-copy">I&apos;m interested in connecting with fellow developers, learning from new challenges, and collaborating on useful projects.</p>
            <div className="contact-actions">
              <a className="button button-primary" href="https://www.linkedin.com/in/suryansh-chhetry/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn <ExternalArrow /></a>
              <a className="button button-secondary" href="https://github.com/Suryansh123-web" target="_blank" rel="noopener noreferrer">Find me on GitHub <ExternalArrow /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Brand footer />
          <p>Designed &amp; built with curiosity. <span aria-hidden="true">©</span> {new Date().getFullYear()} Suryansh Chhetry</p>
          <a className="back-top" href="#home">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

export default App;
