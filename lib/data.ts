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

export type ScheduleItem = {
  time: string;
  title: string;
  detail?: string;
  color: string;
};

export type ScheduleGroup = {
  date: string;
  items: ScheduleItem[];
};

export const scheduleTimeline: ScheduleGroup[] = [
  {
    date: "Aug 12",
    items: [
      { time: "10:00 PM", title: "Event period begins", color: "bg-yellow" }
    ]
  },
  {
    date: "Aug 16",
    items: [
      { time: "03:30 AM", title: "Submission of PPT opens", color: "bg-green-light" }
    ]
  },
  {
    date: "Sep 6",
    items: [
      { time: "05:29 AM", title: "Submission of PPT closes", color: "bg-red text-white" }
    ]
  },
  {
    date: "Sep 12",
    items: [
      { time: "09:00 PM – 10:00 PM", title: "Declaration of Round-1 Results", color: "bg-purple text-white" }
    ]
  },
  {
    date: "Sep 13",
    items: [
      { time: "03:30 AM", title: "Registration for Second Round opens", color: "bg-blue text-white" }
    ]
  },
  {
    date: "Sep 21",
    items: [
      { time: "03:30 AM", title: "Second Round Registration closes", color: "bg-orange text-white" }
    ]
  },
  {
    date: "Sep 25",
    items: [
      { time: "09:30 AM – 11:00 AM", title: "On-Site Check-In", color: "bg-yellow" },
      { time: "11:30 AM", title: "Grand Finale begins", color: "bg-green text-white" }
    ]
  },
  {
    date: "Sep 26",
    items: [
      { time: "12:30 PM", title: "Grand Finale ends", color: "bg-red text-white" },
      { time: "12:30 PM – 01:30 PM", title: "Prize Distribution", color: "bg-yellow" },
      { time: "04:00 PM", title: "Overall event period end", color: "bg-purple text-white" }
    ]
  }
];

export const scheduleItems = scheduleTimeline.flatMap((group) =>
  group.items.map((item) => ({ ...item, date: group.date }))
);

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
  { id: 1, date: "Aug 12, 2026 — 10:00 PM", tag: "START", content: "Event period officially begins nationwide!" },
  { id: 2, date: "Aug 16, 2026 — 03:30 AM", tag: "PPT OPEN", content: "Submission of Round-1 PPT officially opens nationwide." },
  { id: 3, date: "Sep 06, 2026 — 05:29 AM", tag: "PPT CLOSE", content: "Submission of Round-1 PPT closes. Evaluation phase begins." },
  { id: 4, date: "Sep 12, 2026 — 9:00 PM–10:00 PM", tag: "RESULTS", content: "Declaration of Round-1 Results! Shortlisted teams proceed to Round 2." },
  { id: 5, date: "Sep 13, 2026 — 03:30 AM", tag: "ROUND 2", content: "Registration for Second Round opens for shortlisted teams (Closes Sep 21 at 3:30 AM)." },
  { id: 6, date: "Sep 25, 2026 — 11:30 AM", tag: "FINALE", content: "Grand Finale begins on-site at BMSIT campus Bangalore! Check-in starts 9:30 AM." }
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
