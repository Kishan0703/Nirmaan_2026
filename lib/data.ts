type MenuItem = {
  index: string;
  label: string;
  href: string;
  color: string;
  external?: boolean;
};

type EventFlowCard = {
  title: string;
  subtitle: string;
  image: string;
  speed: "fast" | "slow";
  details: string[];
};

export type TrackType = "software" | "hardware";

type TrackCard = {
  title: string;
  prompt: string;
  color: string;
  type: TrackType;
};

type FaqItem = {
  question: string;
  answer: string;
};

export const menuItems: MenuItem[] = [
  { index: "01", label: "Overview", href: "#overview", color: "bg-blue text-white" },
  { index: "02", label: "Problem Statements", href: "#tracks", color: "bg-yellow text-ink" },
  { index: "03", label: "Timeline", href: "#schedule", color: "bg-orange text-white" },
  { index: "04", label: "Bug Game", href: "#game", color: "bg-red text-white", external: true },
  { index: "05", label: "Location", href: "#location", color: "bg-green text-ink" },
  { index: "06", label: "FAQ & Team", href: "#faq", color: "bg-green-light text-ink", external: true }
];

export const eventFlowCards: EventFlowCard[] = [
  {
    title: "Plan",
    subtitle: "Shape the build brief",
    image: "/assets/images/nirmaan-hero.png",
    speed: "fast",
    details: ["Tracks, rules, and rubrics", "Timeline and prize structure", "Challenge briefs published"]
  },
  {
    title: "Launch",
    subtitle: "Open the event cleanly",
    image: "/assets/images/nirmaan-mentors.png",
    speed: "slow",
    details: ["Registration opens", "Team creation and announcements", "Participant onboarding flow"]
  },
  {
    title: "Run",
    subtitle: "Keep the floor moving",
    image: "/assets/images/nirmaan-demo-day.png",
    speed: "fast",
    details: ["Check-ins and mentor slots", "Live support and checkpoints", "Submission windows that stay clear"]
  },
  {
    title: "Judge",
    subtitle: "Score without chaos",
    image: "/assets/images/nirmaan-mentors.png",
    speed: "slow",
    details: ["Reviewer assignment", "Rubric-led scoring", "Finalist selection and scoreboards"]
  },
  {
    title: "Showcase",
    subtitle: "Turn projects into proof",
    image: "/assets/images/nirmaan-demo-day.png",
    speed: "fast",
    details: ["Project gallery and demo links", "Winner archive", "Certificates and community follow-up"]
  }
];

export const eventStats = [
  { value: "24 hrs", label: "Build" },
  { value: "420", label: "Builders capacity" },
  { value: "18+", label: "Mentors on call" },
  { value: "₹8L", label: "Prize pool" }
];

export const liveMetrics = [
  ["Registrations", "0 / 420"],
  ["Teams formed", "0"],
  ["Submissions", "0 drafts"],
  ["Judges assigned", "0"]
];

export const scheduleItems = [
  { day: "Day 1 - Sept 25", time: "09:00", title: "Check-in opens", detail: "QR desk, badge pickup, team zones unlock", color: "bg-yellow" },
  { day: "Day 1 - Sept 25", time: "10:30", title: "Opening brief", detail: "Rules, tracks, sponsor prompts, judging rubric", color: "bg-blue text-white" },
  { day: "Day 1 - Sept 25", time: "13:00", title: "Team formation lock", detail: "Solo builders matched, team pages generated", color: "bg-green-light" },
  { day: "Day 1 - Sept 25", time: "18:00", title: "Mentor circuit", detail: "Design, AI, pitch, hardware, and business rooms", color: "bg-orange" },
  { day: "Day 1 - Sept 25", time: "23:30", title: "Checkpoint 01", detail: "Problem, prototype plan, risk notes, next actions", color: "bg-red text-white" },
  { day: "Day 2 - Sept 26", time: "09:30", title: "Submission freeze", detail: "Repos, decks, demo links, and project gallery", color: "bg-purple" },
  { day: "Day 2 - Sept 26", time: "12:00", title: "Judging round", detail: "Rubric scoring, reviewer sync, finalist shortlist", color: "bg-yellow" },
  { day: "Day 2 - Sept 26", time: "16:00", title: "Demo day", detail: "Final pitches, winners, certificates, archive", color: "bg-green text-white" }
];

export const sponsorTiers = [
  { name: "Blueprint Partner", slots: "2 slots", perks: ["Named challenge track", "Final judging seat", "Talent shortlist"] },
  { name: "Build Floor Sponsor", slots: "4 slots", perks: ["Mentor room", "Booth module", "Dataset/API brief"] },
  { name: "Community Backer", slots: "8 slots", perks: ["Prize support", "Workshop slot", "Project archive badge"] }
];

export const projectSubmissions = [
  { team: "Team Cantilever", track: "Embedded Systems", status: "Prototype live", score: "86" },
  { team: "Null Junction", track: "IoT & Automation", status: "Judge review", score: "91" },
  { team: "Ledger Lane", track: "Embedded Systems", status: "Demo ready", score: "78" },
  { team: "CareGrid", track: "Hardware Prototyping", status: "Needs mentor", score: "72" },
  { team: "Signal Forge", track: "Hardware Innovation", status: "Prototype live", score: "84" }
];

export const trackCards: TrackCard[] = [
  // ── SOFTWARE TRACKS ──
  { title: "AI & Intelligent Systems", prompt: "Generative AI, LLM agentic workflows, predictive engines, and intelligent web applications", color: "bg-blue", type: "software" },
  { title: "Web & App Innovation", prompt: "High-performance fullstack web apps, developer tools, FinTech, and cloud platforms", color: "bg-purple", type: "software" },
  { title: "Cyber Security & Open Tech", prompt: "Threat telemetry dashboards, secure network protocols, civic software, and open innovation", color: "bg-yellow", type: "software" },
  
  // ── HARDWARE TRACKS ──
  { title: "Embedded Systems & IoT", prompt: "Microcontroller logic (ESP32/STM32), wireless sensor nodes, edge telemetry, and smart IoT", color: "bg-green", type: "hardware" },
  { title: "Robotics & Automation", prompt: "Autonomous robotic rigs, motor actuation setups, ROS control loops, and physical mechatronics", color: "bg-red", type: "hardware" },
  { title: "Hardware Prototyping & Health", prompt: "Biometric sensor hardware, wearable health devices, CAD enclosures, and circuit prototypes", color: "bg-orange", type: "hardware" }
];

export const values = [
  {
    title: "Innovation & Creativity",
    mark: "01",
    copy: "How unique and original is the approach? Does it solve a real problem in an inventive way?"
  },
  {
    title: "Feasibility & Impact",
    mark: "02",
    copy: "Is the solution practical and scalable? Can it make a real-world impact beyond the hackathon stage?"
  },
  {
    title: "Technical Implementation",
    mark: "03",
    copy: "Is the working prototype technically sound? Quality of coding, hardware components, and overall integration."
  },
  {
    title: "Presentation & Demo",
    mark: "04",
    copy: "Clarity of the pitch, demonstration of the working prototype, and the team's ability to answer questions."
  }
];

export const announcements = [
  { id: 1, date: "Aug 12, 2026 (10 PM)", tag: "REGISTRATION", content: "Round 1 Online Registration is officially open!" },
  { id: 2, date: "Aug 15, 2026 (10 PM)", tag: "PPT START", content: "Round 1 PPT Submission portal opens for all teams!" },
  { id: 3, date: "Sept 05, 2026", tag: "PPT DEADLINE", content: "Round 1 PPT Submission window closes." },
  { id: 4, date: "Sept 12, 2026", tag: "RESULTS", content: "Round 1 evaluation results announced. Top selected teams proceed to Finale." },
  { id: 5, date: "Sept 25–26, 2026", tag: "FINALE", content: "Grand Finale: 24-hour on-site build-off at BMSIT campus Bangalore." }
];

export const galleryImages = [
  { id: 1, src: "/assets/images/nirmaan-hero.png", alt: "Active building floor", category: "Build Floor" },
  { id: 2, src: "/assets/images/nirmaan-mentors.png", alt: "Mentor review sessions", category: "Mentorship" },
  { id: 3, src: "/assets/images/nirmaan-demo-day.png", alt: "Final pitching stage", category: "Demo Day" },
  { id: 4, src: "/assets/images/nirmaan-hero.png", alt: "Showcase winner ceremony", category: "Awards" },
  { id: 5, src: "/assets/images/nirmaan-mentors.png", alt: "Hardware prototyping desk", category: "Hardware Track" },
  { id: 6, src: "/assets/images/nirmaan-demo-day.png", alt: "Keynote presentation stage", category: "Keynote" },
  { id: 7, src: "/assets/images/nirmaan-hero.png", alt: "Midnight coding jam", category: "Build Floor" },
  { id: 8, src: "/assets/images/nirmaan-mentors.png", alt: "Team strategy whiteboarding", category: "Mentorship" },
];

export const faqs: FaqItem[] = [
  {
    question: "Who can participate in Nirmaan?",
    answer: "Nirmaan is open to student builders and teams from colleges across India. Designers, developers, and hardware engineers are all welcome!"
  },
  {
    question: "What is the team size limit?",
    answer: "Teams must consist of 2 to 4 members."
  },
  {
    question: "What is the structure of the event?",
    answer: "It is a two-round challenge: Round 1 is an online PPT submission (open nationwide). Shortlisted teams then proceed to the Grand Finale, an on-site 24-hour build-off in Bangalore."
  },
  {
    question: "Where is the Grand Finale venue?",
    answer: "It will be hosted at the BMS Institute of Technology and Management, Yelahanka, Bangalore, India."
  },
  {
    question: "Are there registration fees?",
    answer: "No, registration for Nirmaan is completely free."
  },
  {
    question: "What hardware tracks are available?",
    answer: "We support Hardware-Based Innovation (robotics, sensing, automation) and Embedded Systems/IoT Multidisciplinary builds."
  }
];
