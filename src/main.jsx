import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Landmark,
  Menu,
  MessageSquareText,
  Moon,
  Newspaper,
  Scale,
  Send,
  Shield,
  Sparkles,
  Sun,
  Monitor,
  Users,
  X,
} from 'lucide-react';
import logoUrl from '../IMG_1661.PNG';

const trustees = [
  { name: "Prakhar Raj Rastogi", img: "https://github.com/user-attachments/assets/1ff1faf4-3dc2-4c60-a242-c4f16c5b91d3", pos: "top" },
  { name: "Hardik Krishna", img: "https://github.com/user-attachments/assets/44bd00d4-8720-4472-a772-8413bb26ac90", pos: "top" },
  { name: "Dhruv Pandey", img: "https://github.com/user-attachments/assets/347cc2bc-ba32-4714-9a18-52fa22c2525e", pos: "top right" },
  { name: "Prabhat Mishra", img: "https://github.com/user-attachments/assets/caaba7f7-90fb-4fa7-bfa1-ce5fe50431be", pos: "top" },
  { name: "Maisra Husain", img: "https://github.com/user-attachments/assets/ea98ab7c-91d1-4f18-b85c-7620ed7688e1", pos: "center" },
  { name: "Tasmiah", img: "https://github.com/user-attachments/assets/5f615a1e-3f7d-42b8-84d8-c62a6a815145", pos: "center" },
  { name: "Devarchit Singh", img: "https://github.com/user-attachments/assets/31020e59-5be7-4b71-be3e-031e4c81d3ff", pos: "center" }
];

const coreMembers = [
  { name: "Prathamesh Jhingran", img: "https://github.com/user-attachments/assets/e964c95c-e314-4174-b536-174e824435b8", pos: "center" },
  { name: "Aryanajeet Singh", img: "https://github.com/user-attachments/assets/3a5416e6-7b9c-4d3e-b5eb-b1f06ff66e77", pos: "center" },
  { name: "Waqar Fatima", img: "https://github.com/user-attachments/assets/95004192-058e-49cd-a50f-5637f624d4b1", pos: "center" },
  { name: "Amrit Trivedi", img: "https://github.com/user-attachments/assets/e5d4c355-3429-4841-8f3d-b407e810fe99", pos: "center" },
  { name: "Aina Mishra", img: "https://github.com/user-attachments/assets/34feb279-bb71-4245-a620-24f9a7525023", pos: "center" },
  { name: "Mujtaba Ali Khan", img: "https://github.com/user-attachments/assets/50896a85-584e-4b38-84d7-f73dbcf06dd4", pos: "center" },
  { name: "Arpita Verma", img: "https://github.com/user-attachments/assets/d1f612e6-8ed0-45ad-9782-7bee00b82ec4", pos: "center" },
  { name: "Daksh Singh", img: "https://github.com/user-attachments/assets/314980ef-9f4a-40c3-96ed-ea8515278fb9", pos: "center" },
  { name: "Shourya Tiwari", img: "https://github.com/user-attachments/assets/35e497b7-c288-4562-b864-3026b0a97ccb", pos: "center" },
  { name: "Siddhi yadav", img: "https://github.com/user-attachments/assets/e4b2a975-ee62-4088-9230-fa3b18ac0cae", pos: "center" }
];
import './styles.css';

// Paste your GitHub Issue image links inside these quotes:
const galleryImages = [
  "https://github.com/user-attachments/assets/10f666ae-7eef-4093-9985-0e947eabdb84",
  "https://github.com/user-attachments/assets/05742ab5-1049-4291-af94-c6233d4d18dc",
  "https://github.com/user-attachments/assets/cbc392c1-1246-486f-87f8-1fb44015e7e2",
  "https://github.com/user-attachments/assets/3e4992a3-3f86-4d4e-9ede-8da02469ce38",
  "https://github.com/user-attachments/assets/53cd2d13-d08a-49fe-a9ff-94ddc6bb1b0f",
  "https://github.com/user-attachments/assets/f24a71fe-8a5a-49c4-992c-69f416eb90f6",
  "https://github.com/user-attachments/assets/4eed728f-bc69-4355-b35f-cacdf303fce3",
  "https://github.com/user-attachments/assets/0a79a401-8a84-4e24-ace3-bdefbe7eaf50",
  "https://github.com/user-attachments/assets/f38aad8e-9303-4e87-8493-229e64968a6f",
  "https://github.com/user-attachments/assets/e0bddf1a-0309-4782-bb8a-38f1868b0054",
  "https://github.com/user-attachments/assets/5ca39976-690d-446b-a1d4-9e342a17f803",
  "https://github.com/user-attachments/assets/e3b05b97-0544-415b-ab3b-cf93f92f8a03",
  "https://github.com/user-attachments/assets/0bd5024f-6dcc-4d3a-a4f6-ed14c777c47a",
  "https://github.com/user-attachments/assets/6b0529f4-11ad-4d37-b5bb-0fcfd3a63e76",
  "https://github.com/user-attachments/assets/9fd2a61a-bdf1-4da1-be88-699106ae5154",
  "https://github.com/user-attachments/assets/0df518c1-c881-4c88-b563-2849019bd14c",
  "https://github.com/user-attachments/assets/e90d49ae-dcf9-4d8d-8c99-fd8ed53b5a49",
  "https://github.com/user-attachments/assets/eb48fd01-b80c-4262-a3b7-4fd12f59bb55",
  "https://github.com/user-attachments/assets/50f155b4-2303-4c1f-a41d-82666df7f000",
  "https://github.com/user-attachments/assets/52e82b18-3c76-4a19-acfa-0ce9edef9a0f",
  "https://github.com/user-attachments/assets/f7b2daa7-2b99-4130-9d60-308e3b3ec6b1",
  "https://github.com/user-attachments/assets/15e02a66-7e4a-48eb-b653-04523f8261ab",
  "https://github.com/user-attachments/assets/5190cba8-ae97-4607-991e-dbbcdd52d982",
];

// Automatically split them for the two editions
const validImages = galleryImages.filter(url => !url.includes("PASTE_GITHUB_IMAGE_URL"));
const editionOne = validImages.slice(0, Math.ceil(validImages.length / 2));
const editionTwo = validImages.slice(Math.ceil(validImages.length / 2));

const FALLBACK_ORION_KEY = 'YOUR_GROQ_API_KEY';
const ORION_MODEL = 'llama-3.3-70b-versatile';

const orgContext = `
You are OA 1 by Matebricks, integrated as Orion AI on the Sambhav Foundation website.
SAMBHAV means "Possible" in Hindi. It is a youth-driven, non-profit foundational platform dedicated to grooming future public leaders, diplomats, and policymakers through experiential learning.
Sambhav teaches democratic and diplomatic literacy, negotiation for consensus, youth-led execution, public speaking, policy drafting, crisis management, and strategic networking.
SWARASHTRA means "Our Nation" and is Sambhav Foundation's flagship MUN and Youth Parliament conference series.
Evolution: 2022 SAMBHAV Summit founding conference, 2024 Global Youth Summit, 2024 Swarashtra 1.0, 2025 Sambhav Summit & Swarashtra 2.0 themed "Voices that Shape Tomorrow", and 2026 Swarashtra 3.0 as the most ambitious edition.
Swarashtra 3.0 committees include LOK SABHA, LAW COMMISSION OF INDIA, UNCLOS, UNGA, JCC, International Press, and IPL.
The venue for the MUN is Central Law College, Sushant Golf City, Lucknow.
The dates are 8th - 9th August, 2026. Cash Pool of 1,00,000+ INR.
Perks: Substantial Cash Prizes, Curated Trophies, Special Awards, Official Certificates signed by esteemed leaders, elite Executive Board panel, High-octane Socials with gourmet food stalls, Unrivaled networking opportunities, Comprehensive training sessions.
Registration Details: UN & Indian Committees (Including IP): 2400 INR. IPL Team Registration (4 Members): 9000 INR. IPL Individual Registration: 2400 INR (Individual IPL registrants will be assigned to a team on a random basis).
Contact Secretariat Queries: swarashtra@sambhavfoundation.co.in, Prakhar Raj Rastogi (President): +91 7007502227, Hardik Krishna (General Sec): +91 8542814136.
Answer warmly, beautifully, and concisely. Help students understand registration, committees, preparation, diplomacy, and Sambhav's mission. Never claim final dates or registration deadlines unless provided by the website or user.
`;

const navItems = [
  ['Mission', '#mission'],
  ['Swarashtra', '#swarashtra'],
  ['Committees', '#committees'],
  ['Gallery', '#gallery'],
  ['Orion AI', '#orion'],
  ['Register', '#register'],
];

// Smooth fade-up animation
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// ── Theme Hook ──
function useTheme() {
  // 'system' | 'light' | 'dark'
  const [preference, setPreference] = useState(() => {
    try {
      return localStorage.getItem('theme-preference') || 'system';
    } catch {
      return 'system';
    }
  });

  const getSystemTheme = useCallback(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }, []);

  const resolvedTheme = preference === 'system' ? getSystemTheme() : preference;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (preference === 'system') {
        document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [preference]);

  const cycle = useCallback(() => {
    const order = ['system', 'light', 'dark'];
    const next = order[(order.indexOf(preference) + 1) % order.length];
    setPreference(next);
    try {
      localStorage.setItem('theme-preference', next);
    } catch {
      // ignore
    }
  }, [preference]);

  return { preference, resolvedTheme, cycle };
}

function Preloader({ progress }) {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="preloader-content">
        <motion.h1
          className="preloader-title"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="word">नीति</span>
          <span className="dot">•</span>
          <span className="word">नेतृत्व</span>
          <span className="dot">•</span>
          <span className="word">राष्ट्र</span>
        </motion.h1>
        <div className="preloader-bar">
          <motion.div 
            className="preloader-fill"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          />
        </div>
        <p>Preparing Swarashtra 3.0... {Math.round(progress)}%</p>
      </div>
      
      <motion.a 
        href="https://matebricks.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="preloader-footer"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <img src="/matebrickslogo.png" alt="Matebricks" className="preloader-mb-logo" />
        <span>Built inside Matebricks</span>
      </motion.a>
    </motion.div>
  );
}

function MastermindsSection({ setCurrentPage }) {
  return (
    <section className="section masterminds-section" id="team">
      <motion.div
        className="wide-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
        }}
      >
        <p className="eyebrow">The Visionaries</p>
        <h2>Masterminds behind Sambhav & Swarashtra.</h2>
        <p className="mm-desc">
          Meet the dedicated team that works behind the scenes to orchestrate 
          the finest diplomatic simulation in the region.
        </p>
        <button 
          className="mm-btn" 
          onClick={() => { setCurrentPage('team'); window.scrollTo(0,0); }}
        >
          Meet the Team
        </button>
      </motion.div>
    </section>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const { preference, resolvedTheme, cycle } = useTheme();

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = loading ? 'hidden' : (menuOpen ? 'hidden' : '');
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading, menuOpen]);

  useEffect(() => {
    const imagesToPreload = [
      logoUrl, 
      ...validImages,
      ...trustees.map(t => t.img),
      ...coreMembers.map(c => c.img)
    ];
    let loadedCount = 0;
    let done = false;

    // Start with a small base so it never looks stuck at 0
    setProgress(5);

    const finish = () => {
      if (done) return;
      done = true;
      setProgress(100);
      setTimeout(() => setLoading(false), 600);
    };

    const handleImageLoad = () => {
      loadedCount++;
      const real = (loadedCount / imagesToPreload.length) * 100;
      setProgress(Math.max(10, real));
      if (loadedCount === imagesToPreload.length) {
        finish();
      }
    };

    if (imagesToPreload.length === 0) {
      setLoading(false);
      return;
    }

    // Safety timeout — dismiss after 8s max even if some images are still loading
    const timeout = setTimeout(finish, 8000);

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = src;
    });

    return () => clearTimeout(timeout);
  }, []);

  const themeIcon = preference === 'system'
    ? <Monitor size={14} />
    : preference === 'dark'
      ? <Moon size={14} />
      : <Sun size={14} />;

  const themeLabel = preference === 'system'
    ? 'System'
    : preference === 'dark'
      ? 'Dark'
      : 'Light';

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" progress={progress} />
        ) : (
          <motion.div
            key="app-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="scroll-progress"
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
            />

            {currentPage === 'home' ? (
              <>
                <header className="site-header">
                  <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
                    <img src={logoUrl} alt="Sambhav Foundation logo" />
                    <img src="/navbar-logo.jpeg" alt="Swarashtra Logo" style={{ marginLeft: '-4px' }} />
                    <span>
                      <strong>Sambhav</strong>
                      <small>Foundation</small>
                    </span>
                  </a>

                  <nav className="desktop-nav" aria-label="Primary navigation">
                    {navItems.map(([label, href]) => (
                      <motion.a
                        key={href}
                        href={href}
                        whileHover={{ y: -2, color: 'var(--accent)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        {label}
                      </motion.a>
                    ))}
                  </nav>

                  <button className="icon-button nav-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </header>

                <nav className={`mobile-nav ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
                  {navItems.map(([label, href]) => (
                    <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                      {label}
                    </a>
                  ))}
                </nav>

                <main>
                  <Hero />
                  <Mission />
                  <Swarashtra />
                  <Committees />
                  <UnifiedGallery />
                  <OrionAI />
                  <MastermindsSection setCurrentPage={setCurrentPage} />
                  <Register />
                  <Venue />
                </main>
              </>
            ) : currentPage === 'team' ? (
              <TeamPage onBack={() => { setCurrentPage('home'); window.scrollTo(0,0); }} />
            ) : (
              <PrivacyPolicy onBack={() => { setCurrentPage('home'); window.scrollTo(0,0); }} />
            )}

            <Footer setCurrentPage={(page) => { setCurrentPage(page); window.scrollTo(0,0); }} />

      {/* Bottom Bar with Theme Toggle */}
      <div className="bottom-bar">
        <span>© 2026 Sambhav Foundation</span>
        <button className="theme-toggle" onClick={cycle} aria-label="Toggle theme">
          {themeIcon}
          {themeLabel}
        </button>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="hero" id="home">
      <motion.div className="hero-media" aria-hidden="true" style={{ y, opacity: 0.42 }}>
        {editionTwo.slice(0, 8).map((src, index) => (
          <img key={src} src={src} alt="" style={{ '--i': index }} />
        ))}
      </motion.div>
      <div className="hero-shade" />

      <motion.div
        className="hero-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
      >
        <motion.div className="hero-kicker" variants={fadeUp}>
          <img src={logoUrl} alt="" />
          Presented by Sambhav Foundation
        </motion.div>
        <motion.h1 variants={fadeUp}>
          Swarashtra <span>3.0</span>
        </motion.h1>
        <motion.p variants={fadeUp}>
          India&apos;s youth-led diplomacy and policy forum, where delegates negotiate crises, write policy,
          build consensus, and step into the work of public leadership.
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="button primary" href="#register">
            Register Interest <ArrowRight size={18} />
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="button secondary" href="#orion">
            Ask Orion AI <img src="/orion-logo.png" alt="Orion AI Logo" style={{ width: 18, height: 18, objectFit: 'contain' }} />
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.aside
        className="hero-panel"
        aria-label="Swarashtra highlights"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} whileHover={{ x: -10, backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
          <Stat value="5" label="Chapters of growth" />
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ x: -10, backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
          <Stat value="2026" label="Swarashtra 3.0" />
        </motion.div>
        <motion.div variants={fadeUp} whileHover={{ x: -10, backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
          <Stat value="7" label="Committees" />
        </motion.div>
      </motion.aside>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <>
      <strong>{value}</strong>
      <span>{label}</span>
    </>
  );
}

function Mission() {
  const pillars = [
    ['Democratic Literacy', 'Understand governance, international relations, and legislative systems by practicing them.'],
    ['Negotiation', 'Move beyond winning arguments and learn how durable consensus is built.'],
    ['Youth Leadership', 'A youth-run ecosystem spanning logistics, partnerships, research, and public-facing execution.'],
    ['Skill Incubation', 'Public speaking, policy drafting, crisis response, research, and strategic networking.'],
  ];

  return (
    <section className="section mission" id="mission">
      <motion.div
        className="section-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div>
          <p className="eyebrow">What is Sambhav?</p>
          <h2>Making public leadership feel possible.</h2>
        </div>
        <div className="section-copy">
          <p>
            SAMBHAV means <strong>Possible</strong>. The foundation is a youth-driven, non-profit platform
            that prepares students to become thoughtful diplomats, policymakers, journalists, and civic leaders.
          </p>
          <p>
            It replaces rote learning with real simulation: high school and university students step into global
            crises, national debates, press rooms, and negotiation chambers.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="pillar-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {pillars.map(([title, text]) => (
          <motion.article
            className="pillar-card"
            key={title}
            variants={fadeUp}
            whileHover={{ y: -12, scale: 1.02, boxShadow: "var(--card-hover-shadow)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span />
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}

function Swarashtra() {
  const timeline = [
    ['2024', 'Global Youth Summit', 'Elevating the discourse with global agendas and multilateral cooperation.'],
    ['2024', 'Swarashtra 1.0', 'The flagship identity takes shape, establishing the core MUN experience.'],
    ['2025', 'Sambhav Summit & Swarashtra 2.0', 'Voices that Shape Tomorrow scales the conference with sharper crisis simulations.'],
    ['2026', 'Swarashtra 3.0', 'The most polished and ambitious edition yet.'],
  ];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 860);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const unsub = scrollYProgress.on("change", (v) => {
      const idx = Math.min(Math.floor(v * timeline.length), timeline.length - 1);
      setActive(idx);
    });
    return unsub;
  }, [scrollYProgress, isMobile, timeline.length]);

  // Mobile: simple stacked cards
  if (isMobile) {
    return (
      <section className="section swarashtra" id="swarashtra">
        <motion.div
          className="wide-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="eyebrow">Flagship Conference</p>
          <h2>Swarashtra is where diplomacy becomes lived experience.</h2>
        </motion.div>
        <div className="stl-mobile-list">
          {timeline.map(([year, title, text], i) => (
            <motion.div
              key={`${year}-${title}`}
              className={`stl-m-card ${i === timeline.length - 1 ? 'stl-m-highlight' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="stl-m-dot" />
              <span className="stl-m-year">{year}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop: sticky scroll
  return (
    <section
      ref={sectionRef}
      className="stl-scroll-section"
      id="swarashtra"
      style={{ height: `${(timeline.length + 1) * 100}vh` }}
    >
      <div className="stl-sticky">
        <div className="stl-left">
          <p className="eyebrow">Flagship Conference</p>
          <h2>Swarashtra is where diplomacy becomes lived experience.</h2>

          <div className="stl-progress">
            {timeline.map(([year], i) => (
              <button
                key={i}
                className={`stl-step ${i <= active ? 'stl-step-on' : ''} ${i === active ? 'stl-step-current' : ''}`}
              >
                <span className="stl-step-dot" />
                <span className="stl-step-label">{year}</span>
              </button>
            ))}
            <div className="stl-rail">
              <motion.div
                className="stl-rail-fill"
                animate={{ scaleY: (active + 1) / timeline.length }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="stl-counter">
            <span className="stl-counter-num">{String(active + 1).padStart(2, '0')}</span>
            <span className="stl-counter-sep">/</span>
            <span className="stl-counter-total">{String(timeline.length).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="stl-right">
          <AnimatePresence mode="wait">
            {timeline.map(([year, title, text], i) =>
              i === active ? (
                <motion.div
                  key={`${year}-${title}`}
                  className={`stl-display-card ${i === timeline.length - 1 ? 'stl-display-highlight' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="stl-display-year">{year}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Committees() {
  const committees = [
    {
      icon: Landmark,
      title: 'LOK SABHA',
      agenda: 'Deliberation upon the failures of the Indian Education System with special emphasis on the implementation and challenges of the National Education Policy (NEP).',
    },
    {
      icon: Scale,
      title: 'LAW COMMISSION OF INDIA',
      agenda: 'Deliberation to review the working of the Constitution with special emphasis on electoral and judicial reforms based on the 2002 NCRWC Report.',
    },
    {
      icon: Globe2,
      title: 'UNCLOS',
      fullTitle: 'United Nations Convention on the Law of the Sea',
      agenda: "Deliberation on the legal and security implications of Iran's Strait of Hormuz restrictions and their impact on global maritime oil trade.",
    },
    {
      icon: Shield,
      title: 'UNGA',
      fullTitle: 'United Nations General Assembly',
      agenda: 'Deliberation upon the Apprehension of the President of Venezuela by the United States of America and its Repercussions on State Sovereignty, International Law, Diplomatic Norms, and the Maintenance of International Peace and Security.',
    },
    {
      icon: MessageSquareText,
      title: 'JCC',
      fullTitle: 'Joint Crisis Committee',
      agenda: 'Classified.',
    },
    {
      icon: Newspaper,
      title: 'INTERNATIONAL PRESS (IP)',
      agenda: null,
      roles: 'Journalism, Photography, and Caricature.',
    },
    {
      icon: Users,
      title: 'INDIAN PREMIER LEAGUE (IPL)',
      agenda: null,
      roles: 'Auction House: Historic IPL 2008 Auction (Team of 4).',
    },
  ];

  return (
    <section className="section committees" id="committees">
      <motion.div
        className="committees-top"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <p className="eyebrow">Inside 3.0</p>
        <h2>Committees &amp; Agendas</h2>
        <p className="committees-subtitle">From the floor of the parliament to international waters — choose your arena.</p>
      </motion.div>

      <motion.div
        className="committees-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {committees.map((c) => {
          const Icon = c.icon;
          return (
            <motion.article
              key={c.title}
              className="committee-card"
              variants={fadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="committee-card-header">
                <div className="committee-icon-wrapper">
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3>{c.title}</h3>
                  {c.fullTitle && <span className="committee-full-title">{c.fullTitle}</span>}
                </div>
              </div>
              <div className="committee-card-body">
                {c.agenda && (
                  <div className="committee-agenda">
                    <span className="agenda-label">Agenda</span>
                    <p>{c.agenda}</p>
                  </div>
                )}
                {c.roles && (
                  <div className="committee-agenda">
                    <span className="agenda-label">Roles</span>
                    <p>{c.roles}</p>
                  </div>
                )}
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}

function UnifiedGallery() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const activeImages = galleryImages;
  const movingThumbs = [...activeImages, ...activeImages];

  useEffect(() => {
    if (paused || fullscreenImage) return undefined;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % activeImages.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [activeImages.length, paused, fullscreenImage]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setFullscreenImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [fullscreenImage]);

  const next = () => setIndex((value) => (value + 1) % activeImages.length);
  const prev = () => setIndex((value) => (value - 1 + activeImages.length) % activeImages.length);
  const nearbyImages = [-2, -1, 0, 1, 2].map((offset) => {
    const imageIndex = (index + offset + activeImages.length) % activeImages.length;
    return { src: activeImages[imageIndex], imageIndex, offset };
  });

  return (
    <section className="section gallery" id="gallery">
      <motion.div
        className="gallery-top"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div>
          <p className="eyebrow">Gallery</p>
          <h2>Moments from Swarashtra.</h2>
        </div>
      </motion.div>

      <motion.div
        className="gallery-stage"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-100px" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <button className="icon-button gallery-arrow left" type="button" onClick={prev} aria-label="Previous photo">
          <ChevronLeft size={22} />
        </button>
        <div className="gallery-focus" aria-live="polite">
          {nearbyImages.map(({ src, imageIndex, offset }) => (
            <button
              key={`${src}-${offset}`}
              type="button"
              className={`focus-card focus-card-${offset + 2} ${offset === 0 ? 'active' : ''}`}
              onClick={() => {
                if (offset === 0) setFullscreenImage(src);
                else setIndex(imageIndex);
              }}
              aria-label={offset === 0 ? `View photo ${imageIndex + 1} full screen` : `Open photo ${imageIndex + 1}`}
              style={{ '--offset': offset, cursor: offset === 0 ? 'zoom-in' : 'pointer' }}
            >
              <img src={src} alt={offset === 0 ? `Swarashtra gallery photo ${index + 1}` : ''} />
            </button>
          ))}
        </div>
        <button className="icon-button gallery-arrow right" type="button" onClick={next} aria-label="Next photo">
          <ChevronRight size={22} />
        </button>
        <div className="gallery-caption">
          <strong>Photo {String(index + 1).padStart(2, '0')}</strong>
          <span>Sambhav Foundation and Swarashtra in action.</span>
          <small>
            {String(activeImages.length).padStart(2, '0')} images
          </small>
        </div>
      </motion.div>

      {/* Wrap thumb-strip so motion's transform doesn't override the CSS keyframe animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div
          className={`thumb-strip ${paused ? 'paused' : ''}`}
          aria-label="Gallery thumbnails"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {movingThumbs.map((src, thumbIndex) => {
            const realIndex = thumbIndex % activeImages.length;
            return (
              <button
                key={`${src}-${thumbIndex}`}
                type="button"
                className={realIndex === index ? 'active' : ''}
                onClick={() => setIndex(realIndex)}
                aria-label={`Open photo ${realIndex + 1}`}
              >
                <img src={src} alt="" />
              </button>
            );
          })}
        </div>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {fullscreenImage && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFullscreenImage(null)}
              role="dialog"
              aria-modal="true"
              aria-label="Fullscreen image preview"
            >
              <button className="icon-button close-button" type="button" aria-label="Close fullscreen">
                <X size={24} />
              </button>
              <motion.img
                src={fullscreenImage}
                alt="Fullscreen gallery view"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

function OrionAI() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Namaste, I am OA 1 by Matebricks, your Orion AI guide for Sambhav Foundation and Swarashtra 3.0. Ask me about committees, preparation, diplomacy, or the journey from Sambhav to Swarashtra.',
    },
  ]);
  const [input, setInput] = useState('Which committee should I choose as a first-time delegate?');
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: panelRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(event) {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) return;

    const userMessage = { role: 'user', content: prompt };
    setMessages((items) => [...items, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const reply = await askOrion([...messages, userMessage]);
      setMessages((items) => [...items, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages((items) => [
        ...items,
        {
          role: 'assistant',
          content:
            'I could not reach Orion AI just now. You can still ask about Sambhav, Swarashtra, committees, or delegate preparation, and I will try again when the connection settles.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section orion-section" id="orion">
      <div className="orion-shell">
        <motion.div
          className="orion-copy"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="eyebrow">Orion AI</p>
          <h2>Meet OA 1 by Matebricks.</h2>
          <p>
            A built-in conference guide that understands Sambhav Foundation, the Swarashtra journey, MUN
            committees, Youth Parliament energy, and how delegates can prepare with confidence.
          </p>
          <div className="orion-chips">
            <motion.span whileHover={{ scale: 1.05 }}><Bot size={16} /> Committee guidance</motion.span>
            <motion.span whileHover={{ scale: 1.05 }}><MessageSquareText size={16} /> Delegate prep</motion.span>
            <motion.span whileHover={{ scale: 1.05 }}><Users size={16} /> Sambhav context</motion.span>
          </div>
          <a 
            href="https://ai.matebricks.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="orion-try-link"
          >
            Try Orion AI <ArrowRight size={14} />
          </a>
        </motion.div>

        <motion.div
          className="orion-panel"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="orion-header">
            <div className="orion-mark">
              <img src="/orion-logo.png" alt="Orion AI Logo" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div>
              <strong>OA 1</strong>
              <span>by Matebricks</span>
            </div>
          </div>

          <div className="messages" ref={panelRef}>
            <AnimatePresence>
              {messages.map((message, messageIndex) => (
                <motion.article
                  key={`${message.role}-${messageIndex}`}
                  className={`message ${message.role}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatMessage(message.content)}
                </motion.article>
              ))}
              {loading && (
                <motion.article
                  className="message assistant loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Orion is composing a thoughtful reply...
                </motion.article>
              )}
            </AnimatePresence>
          </div>

          <form className="orion-form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about Sambhav, Swarashtra, committees, or preparation"
              aria-label="Ask Orion AI"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="icon-button send-button"
              type="submit"
              aria-label="Send message"
              disabled={loading}
            >
              <Send size={18} />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

async function askOrion(history) {
  const apiKey = import.meta.env.VITE_ORION_AI_KEY || FALLBACK_ORION_KEY;
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: ORION_MODEL,
      temperature: 0.75,
      max_tokens: 700,
      messages: [
        { role: 'system', content: orgContext },
        ...history.map((item) => ({ role: item.role, content: item.content })),
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Orion request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || 'I am here, but I need a clearer question to help well.';
}

function formatMessage(content) {
  return content.split('\n').map((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return null;
    if (/^[-*]\s+/.test(trimmed)) {
      return <p key={index} className="bullet-line">{trimmed.replace(/^[-*]\s+/, '')}</p>;
    }
    return <p key={index}>{trimmed.replace(/\*\*/g, '')}</p>;
  });
}

function Register() {
  return (
    <section className="section register" id="register">
      <motion.div
        className="register-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="register-content">
          <p className="eyebrow">Swarashtra 3.0 Perks & Registration</p>
          <h2>Leave a legacy. Uniting minds, inspiring change.</h2>
          <div className="event-meta">
            <p><strong>Dates:</strong> 8th - 9th August, 2026</p>
          </div>
          
          <div className="cash-pool-banner" style={{ background: 'var(--accent)', color: 'var(--bg)', padding: '16px 24px', borderRadius: '12px', margin: '24px 0', fontWeight: '800', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(var(--accent-rgb), 0.2)' }}>
            <span style={{ fontSize: '1.8rem' }}>🏆</span>
            <div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.9 }}>Massive Reward</div>
              <div>Cash Pool: 1,00,000+ INR</div>
            </div>
          </div>

          <ul className="perks-list">
            <li>Substantial Cash Prizes, Curated Trophies, and Special Awards.</li>
            <li>Official Certificates signed by esteemed leaders to elevate your CV.</li>
            <li>A highly experienced, elite Executive Board panel.</li>
            <li>High-octane, energetic Socials paired with gourmet food stalls.</li>
            <li>Unrivaled networking opportunities with the circuit's top delegates.</li>
            <li>Comprehensive training sessions to sharpen your diplomatic edge.</li>
          </ul>

          <div className="registration-fees">
            <h3>Registration Details</h3>
            <p><strong>UN & Indian Committees (Including IP):</strong> 2400 INR</p>
            <p><strong>IPL Team Registration (4 Members):</strong> 9000 INR</p>
            <p><strong>IPL Individual Registration:</strong> 2400 INR</p>
            <small>(Note: Individual IPL registrants will be assigned to a team on a random basis.)</small>
          </div>
        </div>

        <div className="register-actions">
          <div className="action-buttons">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSctuFOtNQU4T-K25cyWxNTCfoRK_UM4dtkOLNY6FTrvrTx3Zg/viewform?pli=1" target="_blank" rel="noopener noreferrer" className="button primary">
              Register Now <CalendarDays size={18} style={{ marginLeft: 8 }} />
            </a>
            <a href="https://linktr.ee/swarashtra?utm_source=linktree_profile_share&ltsid=bbd70b45-0978-4a7f-b734-3404e0701454" target="_blank" rel="noopener noreferrer" className="button secondary">
              Explore Linktree
            </a>
          </div>

          <div className="contact-info">
            <h4>Contact Secretariat</h4>
            <p><strong>Queries:</strong> <a href="mailto:swarashtra@sambhavfoundation.co.in">swarashtra@sambhavfoundation.co.in</a></p>
            <p><strong>Prakhar Raj Rastogi (President):</strong> +91 7007502227</p>
            <p><strong>Hardik Krishna (General Sec):</strong> +91 8542814136</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Venue() {
  return (
    <section className="section venue" id="venue">
      <motion.div
        className="venue-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <div className="venue-info">
          <p className="eyebrow">Venue</p>
          <h2>Central Law College, Sushant Golf City, Lucknow</h2>
          <p>
            The diplomatic hub for Swarashtra 3.0. A space designed for deep negotiation,
            strategic dialogue, and impactful resolutions.
          </p>
          <a
            href="https://share.google/hUfppw9FJWaMYF0Nv"
            target="_blank"
            rel="noopener noreferrer"
            className="button secondary"
          >
            Open in Google Maps
          </a>
        </div>
        <div className="venue-map">
          <iframe
            src="https://maps.google.com/maps?q=Central%20Law%20College,%20Sushant%20Golf%20City,%20Lucknow&t=&z=14&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '12px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Swarashtra 3.0 Venue Map"
          />
        </div>
      </motion.div>
    </section>
  );
}

function Footer({ setCurrentPage }) {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logoUrl} alt="Sambhav Foundation logo" />
          <span>
            <strong>Sambhav</strong>
            <small>Foundation</small>
          </span>
        </div>
        <p>Swarashtra 3.0, a youth-led MUN and Indian Youth Parliament conference series.</p>
        <div className="footer-links">
          <button type="button" onClick={() => setCurrentPage('privacy')} className="footer-link">
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}

function TeamPage({ onBack }) {
  const randomizedMembers = useMemo(() => [...coreMembers].sort(() => Math.random() - 0.5), []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); onBack(); }}>
          <img src={logoUrl} alt="Sambhav Foundation logo" />
          <img src="/navbar-logo.jpeg" alt="Swarashtra Logo" style={{ marginLeft: '-4px' }} />
          <span>
            <strong>Sambhav</strong>
            <small>Foundation</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Team page navigation">
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); onBack(); }}
            whileHover={{ y: -2, color: 'var(--accent)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <ChevronLeft size={14} style={{ marginRight: 4 }} /> Back to Home
          </motion.a>
        </nav>
      </header>

      <main className="team-content">
        <motion.div 
          className="team-hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">The Visionaries</p>
          <h1>The Masterminds</h1>
          <p className="team-subtitle">
            Meet the dedicated team behind Sambhav Foundation & Swarashtra, working tirelessly to 
            bring diplomacy and leadership to the youth.
          </p>
        </motion.div>

        <div className="team-section">
          <h2 className="team-section-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>Trustees</h2>
          <div className="team-grid">
            {trustees.map((member, i) => (
              <motion.div 
                className="team-card" 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <div className="team-img-wrap">
                  <img src={member.img} alt={member.name} style={{ objectPosition: member.pos || 'center' }} />
                </div>
                <div className="team-info" style={{ textAlign: 'center' }}>
                  <h3 style={{ margin: 0 }}>{member.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="team-section" style={{ marginTop: '5rem' }}>
          <h2 className="team-section-title" style={{ textAlign: 'center', marginBottom: '2rem', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--fg)', fontFamily: 'var(--font-display)' }}>Core Team</h2>
          <div className="team-grid">
            {randomizedMembers.map((member, i) => (
              <motion.div 
                className="team-card" 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 + (i % 3) * 0.1 }}
              >
                <div className="team-img-wrap">
                  <img src={member.img} alt={member.name} style={{ objectPosition: member.pos || 'center' }} />
                </div>
                <div className="team-info" style={{ textAlign: 'center' }}>
                  <h3 style={{ margin: 0 }}>{member.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

function PrivacyPolicy({ onBack }) {
  return (
    <div className="privacy-policy-page">
      <header className="privacy-header">
        <div className="pp-logo-wrap">
          <img src={logoUrl} alt="Sambhav Foundation logo" className="pp-logo" />
          <span className="pp-label">Sambhav Foundation</span>
        </div>
        <div className="pp-logo-wrap">
          <span className="pp-label">Powered by Matebricks</span>
          <img src="/matebrickslogo.png" alt="Matebricks logo" className="pp-logo" />
        </div>
      </header>

      <main className="privacy-content">
        <button className="back-btn" onClick={onBack}>
          <ChevronLeft size={18} /> Back to Home
        </button>

        <div className="pp-hero">
          <h1>Privacy Policy</h1>
          <p className="pp-subtitle">Your privacy matters to us. This document explains how we collect, use, and protect your information.</p>
          <div className="pp-meta">
            <span>Effective Date: July 5, 2026</span>
            <span>Last Updated: July 5, 2026</span>
          </div>
        </div>

        <div className="policy-sections">
          <div className="policy-section">
            <h3><span className="section-num">01</span> Introduction</h3>
            <p>
              Welcome to the official website of Swarashtra 3.0, organized by the Sambhav Foundation.
              We are committed to protecting your privacy and ensuring complete transparency in how your data is collected, stored, and used.
              By accessing or using this website, you agree to the terms outlined in this Privacy Policy.
            </p>
          </div>

          <div className="policy-section">
            <h3><span className="section-num">02</span> Information We Collect</h3>
            <p>
              We may collect certain information when you interact with our website, including but not limited to:
            </p>
            <ul>
              <li>Personal details you voluntarily provide through registration forms (name, email, phone number, institution).</li>
              <li>Messages and queries submitted to the Orion AI assistant.</li>
              <li>Usage data such as browser type, device information, and pages visited, collected via standard analytics.</li>
            </ul>
          </div>

          <div className="policy-section">
            <h3><span className="section-num">03</span> Orion AI &amp; Data Usage</h3>
            <p>
              This website features Orion AI, an intelligent conversational agent designed to assist delegates,
              answer queries about Swarashtra 3.0, committees, registration, and the Sambhav Foundation.
              Conversations of users with Orion AI may be transmitted to Matebricks for training and audit purposes.
              No personally identifiable information is intentionally retained beyond the scope of the conversation session
              unless explicitly provided by the user.
            </p>
          </div>

          <div className="policy-section">
            <h3><span className="section-num">04</span> Cookies &amp; Tracking</h3>
            <p>
              This website may use cookies or local storage to remember your theme preference (light/dark mode)
              and improve your browsing experience. We do not use cookies for advertising or cross-site tracking purposes.
            </p>
          </div>

          <div className="policy-section">
            <h3><span className="section-num">05</span> Third-Party Services</h3>
            <p>
              Our website integrates with the following third-party services:
            </p>
            <ul>
              <li>Google Fonts for typography rendering.</li>
              <li>Google Maps for venue location display.</li>
              <li>Google Forms for delegate registration.</li>
              <li>Groq API for powering the Orion AI assistant.</li>
            </ul>
            <p>
              Each of these services operates under its own privacy policy and terms of service.
              We encourage you to review them independently.
            </p>
          </div>

          <div className="policy-section">
            <h3><span className="section-num">06</span> Development &amp; Authorship</h3>
            <p>
              This website was conceptualized, designed, and developed inside Matebricks
              and was forever given to Sambhav Foundation. All intellectual property rights
              pertaining to the website design, codebase, and Orion AI integration are shared
              between Matebricks and Sambhav Foundation as per mutual agreement.
            </p>
          </div>

          <div className="policy-section">
            <h3><span className="section-num">07</span> Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy,
              please reach out to us:
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:swarashtra@sambhavfoundation.co.in">swarashtra@sambhavfoundation.co.in</a><br/>
              <strong>President:</strong> Prakhar Raj Rastogi — +91 7007502227<br/>
              <strong>General Secretary:</strong> Hardik Krishna — +91 8542814136
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
