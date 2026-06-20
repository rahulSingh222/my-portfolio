import { useEffect, useRef } from 'react';

const portraitSrc =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 360 360%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%23F1EEE7%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22IBM Plex Mono,monospace%22 font-size=%2224%22 fill=%22%239A9890%22%3EPortrait%3C/text%3E%3C/svg%3E';

const sectionNames = {
  hero: 'init',
  experience: 'experience',
  stack: 'stack',
  projects: 'projects',
  awards: 'awards',
  certifications: 'certs',
  education: 'education',
  contact: 'contact'
};

const experiences = [
  {
    role: 'Senior Associate Consultant',
    date: 'Dec 2024 — Present',
    company: 'Infosys Pvt Ltd · Node.js + AWS Backend Developer',
    client: 'Toyota Motors North America',
    stack: ['NestJS', 'AWS Lambda', 'API Gateway', 'ECS', 'SQS', 'PostgreSQL', 'TypeORM', 'Jest'],
    bullets: [
      'Architected NestJS-based microservices integrated with AWS API Gateway, Lambda, S3, CloudWatch, IAM roles, and ECS',
      'Designed S3 trigger-based ECS workflows and the full system architecture for scheduled job processing',
      'Built Lambda functions triggered via SQS for reliable event-driven processing pipelines',
      'Engineered an automated daily report pipeline comparing two PostgreSQL databases, generating CSVs and dispatching them by email',
      'Optimized that report generation with pg-pool and p-limit for concurrency control, cutting execution time significantly',
      'Configured Swagger/OpenAPI docs, ran DAST security scans and load testing, and managed secrets via Parameter Store and Secrets Manager'
    ]
  },
  {
    role: 'Systems Engineer — Node.js Developer',
    date: 'Mar 2022 — Nov 2024',
    company: 'Tata Consultancy Services',
    client: 'Avis Budget Group',
    stack: ['NestJS', 'GraphQL', 'Docker', 'MongoDB', 'Kubernetes', 'Grafana'],
    bullets: [
      'Designed and deployed scalable server-side applications using Node.js, Express.js, and NestJS',
      'Built RESTful APIs and GraphQL endpoints within microservices for a high-traffic vehicle rental platform',
      'Worked across MongoDB and SQL databases; applied Kubernetes basics for container orchestration',
      'Monitored service health via Grafana and managed source control through Bitbucket workflows'
    ]
  },
  {
    role: 'L2 Analyst',
    date: 'Jul 2021 — Jan 2022',
    company: 'Tata Consultancy Services',
    client: 'Aberdeen',
    stack: ['Ab Initio', 'Linux', 'Autosys', 'ServiceNow', 'SQL'],
    bullets: [
      'Level 2 analyst for an ETL application (Ab Initio) — diagnosed failure logs to identify root causes of job failures',
      'Monitored job schedules and file processing pipelines, coordinating issue resolution through ServiceNow'
    ]
  }
];

const skillGroups = [
  {
    icon: '{ }',
    title: 'Backend',
    tags: ['Node.js', 'NestJS', 'Express.js', 'GraphQL', 'REST APIs', 'Microservices']
  },
  {
    icon: '☁',
    title: 'AWS',
    tags: ['API Gateway', 'Lambda', 'S3', 'ECS', 'SQS', 'CloudWatch', 'IAM', 'Secrets Manager']
  },
  {
    icon: '◫',
    title: 'Databases',
    tags: ['PostgreSQL', 'MongoDB', 'SQL', 'TypeORM']
  },
  {
    icon: '▣',
    title: 'Frontend',
    tags: ['React.js', 'Redux', 'HTML', 'CSS', 'Styled Components']
  },
  {
    icon: '⚙',
    title: 'DevOps / Tools',
    tags: ['Docker', 'Jest', 'Swagger', 'OpenAPI', 'Postman', 'GitHub', 'Bitbucket', 'Linux']
  },
  {
    icon: 'λ',
    title: 'Languages',
    tags: ['JavaScript', 'TypeScript', 'Core Java', 'Python (basic)']
  }
];

const projects = [
  {
    name: 'JobHunt',
    href: 'https://jobhunt.pages.dev/landing',
    description: 'A job-tracking web app with Redux for state management, debouncing and throttling for smoother input handling, and Recharts for visualizing application data.',
    stack: ['ReactJS', 'Redux', 'Axios', 'Recharts']
  },
  {
    name: 'The Fit Club',
    href: 'https://fitguiderahul.pages.dev/',
    description: 'A gym portfolio website built around smooth, deliberate UI motion — using Framer Motion to make every section transition feel intentional.',
    stack: ['ReactJS', 'Framer Motion', 'Undraw']
  }
];

const awards = [
  {
    date: 'Jan 2023',
    title: 'ElevateWings1 — TCS',
    description: 'HI-Talent award for clearing the Wings1 digital certification.'
  },
  {
    date: 'Sep 2022',
    title: 'On The Spot Award — TCS',
    description: 'Recognized as a top-performing associate.'
  },
  {
    date: '2021',
    title: 'Fresco Play Miles Award × 2',
    description: 'Awarded for completing the SQL Hackathon.'
  }
];

const certifications = [
  {
    date: '2026',
    title: 'Infosys Certified Node.js Expert',
    description: 'Internal certification validating advanced Node.js proficiency.'
  }
];

const education = {
  degree: 'B.Tech, Computer Science & Engineering',
  school: 'SKITM, Indore · 2017 – 2021',
  cgpa: '7.6'
};

const contactChannels = [
  {
    label: 'Email',
    value: 'rsingh.rahul224@gmail.com',
    href: 'mailto:rsingh.rahul224@gmail.com',
    external: false
  },
  {
    label: 'Phone',
    value: '+91 90090 12642',
    href: 'tel:+919009012642',
    external: false
  },
  {
    label: 'GitHub',
    value: 'rahulSingh222',
    href: 'https://github.com/rahulSingh222',
    external: true
  },
  {
    label: 'LinkedIn',
    value: 'rahul-singh-4678b5180',
    href: 'https://linkedin.com/in/rahul-singh-4678b5180',
    external: true
  }
];

function App() {
  const pipelineTrackRef = useRef(null);
  const pipelineProgressRef = useRef(null);
  const mainRef = useRef(null);

  useEffect(() => {
    const revealEls = Array.from(document.querySelectorAll('.reveal, .reveal-stagger'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = pipelineTrackRef.current;
    const progress = pipelineProgressRef.current;
    const main = mainRef.current;
    if (!track || !progress || !main) return;

    const sections = Array.from(main.querySelectorAll('section'));

    const buildNodes = () => {
      track.querySelectorAll('.pipeline-node').forEach((node) => node.remove());
      track.style.height = `${document.documentElement.scrollHeight}px`;

      sections.forEach((sec) => {
        const id = sec.id;
        if (!sectionNames[id]) return;
        const rect = sec.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const node = document.createElement('div');
        node.className = 'pipeline-node';
        node.style.top = `${top}px`;
        node.dataset.section = id;
        const label = document.createElement('span');
        label.className = 'node-label';
        label.textContent = sectionNames[id];
        node.appendChild(label);
        track.appendChild(node);
      });
    };

    const updatePipeline = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      progress.style.height = `${pct}%`;

      const nodes = Array.from(track.querySelectorAll('.pipeline-node'));
      const probe = scrollTop + window.innerHeight * 0.35;
      let activeId = null;
      sections.forEach((sec) => {
        const top = sec.offsetTop;
        const bottom = top + sec.offsetHeight;
        if (probe >= top && probe < bottom) {
          activeId = sec.id;
        }
      });

      nodes.forEach((node) => {
        node.classList.toggle('active', node.dataset.section === activeId);
      });
    };

    const onResize = () => {
      buildNodes();
      updatePipeline();
    };

    const onScroll = () => updatePipeline();

    const onLinkClick = (event) => {
      const link = event.currentTarget;
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetId = href.slice(1);
      const targetEl = targetId === '' ? document.body : document.getElementById(targetId);
      if (!targetEl) return;
      event.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${targetId}`);
    };

    const hashLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    hashLinks.forEach((link) => link.addEventListener('click', onLinkClick));

    buildNodes();
    updatePipeline();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
      hashLinks.forEach((link) => link.removeEventListener('click', onLinkClick));
    };
  }, []);

  return (
    <>
      <div className="bg-grid" />
      <div className="pipeline-track" ref={pipelineTrackRef}>
        <div className="pipeline-progress" ref={pipelineProgressRef} />
      </div>

      <nav>
        <div className="nav-inner">
          <a href="#top" className="logo">
            <span className="dot" />rahul.singh
          </a>
          <div className="nav-links">
            <a href="#experience">experience</a>
            <a href="#stack">stack</a>
            <a href="#projects">projects</a>
            <a href="#certifications">certifications</a>
          </div>
          <a href="#contact" className="nav-cta">
            get in touch
          </a>
        </div>
      </nav>

      <main className="shell" id="top" ref={mainRef}>
        <section className="hero" id="hero">
          <div className="hero-grid">
            <div className="hero-text">
              <div className="eyebrow">backend engineer · indore, india</div>
              <h1 className="hero-name">Rahul Singh</h1>
              <p className="hero-role">
                Senior Backend Developer <span className="sep">/</span> Node.js <span className="sep">·</span> AWS <span className="sep">·</span> Microservices
              </p>
              <p className="hero-desc">
                I design <strong>event-driven backend systems</strong> that hold up in production — from Lambda pipelines triggered off SQS queues to multi-database reporting jobs that used to take hours. <strong>5 years</strong> building for global clients including Toyota Motors North America and Avis Budget Group.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-primary">
                  Get in touch ↗
                </a>
                <a href="#experience" className="btn btn-ghost">
                  View the work
                </a>
              </div>
              <div className="hero-meta">
                <span>
                  <span className="pulse" /> Indore, MP, India
                </span>
                <span>5 yrs experience</span>
                <span>Currently @ Infosys</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="portrait-frame">
                <div className="portrait-scan" />
                <img src={portraitSrc} alt="Portrait" />
                <div className="portrait-tag">
                  <span>Rahul Singh</span>
                  <span className="ok">Indore, India</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="section-head reveal">
            <div className="eyebrow">experience.log</div>
            <h2 className="section-title">Where I've shipped things</h2>
            <p className="section-sub">
              Four years across two companies, moving from infra support into owning backend architecture for production systems used by global clients.
            </p>
          </div>
          {experiences.map((item) => (
            <div className="reveal log-entry" key={item.role}>
              <div className="log-head">
                <span className="log-role">{item.role}</span>
                <span className="log-date">{item.date}</span>
              </div>
              <div className="log-company">
                {item.company} <span className="client-tag">// client: {item.client}</span>
              </div>
              <div className="log-stack">
                {item.stack.map((tag) => (
                  <span className="chip" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <ul className="log-list">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="stack">
          <div className="section-head reveal">
            <div className="eyebrow">system.architecture</div>
            <h2 className="section-title">What I build with</h2>
            <p className="section-sub">
              The toolkit behind everything above — grouped the way I actually reach for it: services, infrastructure, data, and the tools that keep it all shipping safely.
            </p>
          </div>

          <div className="skills-grid reveal-stagger">
            {skillGroups.map((group) => (
              <div className="skill-card" key={group.title}>
                <div className="skill-card-head">
                  <div className="skill-icon">{group.icon}</div>
                  <div className="skill-card-title">{group.title}</div>
                </div>
                <div className="skill-tags">
                  {group.tags.map((tag) => (
                    <span className="skill-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects">
          <div className="section-head reveal">
            <div className="eyebrow">projects.deployed</div>
            <h2 className="section-title">Things I've built on the side</h2>
            <p className="section-sub">
              Frontend-leaning side projects — where I get to play with the UI layer I don't always touch at work.
            </p>
          </div>

          <div className="projects-grid reveal-stagger">
            {projects.map((project) => (
              <div className="project-card" key={project.name}>
                <div className="project-top">
                  <span className="project-name">{project.name}</span>
                  <a
                    href={project.href}
                    className="project-link"
                    target="_blank"
                    rel="noopener"
                    aria-label={`View ${project.name} live site`}
                  >
                    ↗
                  </a>
                </div>
                <p className="project-desc">{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="awards">
          <div className="section-head reveal">
            <div className="eyebrow">awards.log</div>
            <h2 className="section-title">Recognition along the way</h2>
          </div>

          <div className="awards-list reveal">
            {awards.map((award) => (
              <div className="award-row" key={award.title}>
                <span className="award-date">{award.date}</span>
                <div>
                  <div className="award-title">{award.title}</div>
                  <div className="award-desc">{award.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications">
          <div className="section-head reveal">
            <div className="eyebrow">certifications.log</div>
            <h2 className="section-title">Certified, formally</h2>
          </div>
          <div className="reveal awards-list">
            {certifications.map((cert) => (
              <div className="award-row" key={cert.title}>
                <span className="award-date">{cert.date}</span>
                <div>
                  <div className="award-title">{cert.title}</div>
                  <div className="award-desc">{cert.description}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education">
          <div className="section-head reveal">
            <div className="eyebrow">education.config</div>
            <h2 className="section-title">Foundation</h2>
          </div>
          <div className="reveal edu-card">
            <div>
              <div className="edu-degree">{education.degree}</div>
              <div className="edu-school">{education.school}</div>
            </div>
            <div className="edu-stat">
              <span className="num">{education.cgpa}</span>
              <span className="lbl">CGPA</span>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-grid">
            <div className="reveal">
              <div className="eyebrow">connection.open</div>
              <h2 className="contact-big">
                Building something that needs <span className="accent-text">backend that doesn't break?</span>
              </h2>
              <p className="section-sub">
                I'm currently open to new opportunities. The fastest way to reach me is email — I usually reply within a day.
              </p>
            </div>
            <div className="reveal contact-channels">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="channel-row"
                  target={channel.external ? '_blank' : undefined}
                  rel={channel.external ? 'noopener' : undefined}
                >
                  <div>
                    <div className="channel-label">{channel.label}</div>
                    <div className="channel-value">{channel.value}</div>
                  </div>
                  <span className="channel-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        Built with care in <span className="accent-text">Indore, MP</span> — Rahul Singh © 2026
      </footer>
    </>
  );
}

export default App;
