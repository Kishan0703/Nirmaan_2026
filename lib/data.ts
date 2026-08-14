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

export type TrackCard = {
  title: string;
  prompt: string;
  note?: string;
  color: string;
  badge?: string;
};

export const trackCards: TrackCard[] = [
  {
    title: "1. Cyber-Physical Security & Defense",
    prompt: "Explore innovative solutions that protect physical systems, devices, infrastructure, and digital environments from threats, misuse, tampering, and disruption. The track focuses on strengthening security, resilience, trust, and safety across the physical and digital world.",
    color: "bg-purple",
    badge: "SECURITY & DEFENSE",
  },
  {
    title: "2. Smart Mobility & Aerospace",
    prompt: "Reimagine how people, vehicles, machines, and aerial systems move and interact. This track focuses on making transportation and aerospace systems safer, smarter, more efficient, connected, and sustainable, while addressing real-world mobility challenges.",
    note: "Note: Drone-based projects must comply with applicable DGCA regulations, safety requirements, and permitted drone size/weight categories.",
    color: "bg-blue",
    badge: "MOBILITY & AERO",
  },
  {
    title: "3. HealthTech & Bio-Wearables",
    prompt: "Explore technology-driven solutions that improve healthcare, personal well-being, accessibility, and quality of life. The track covers challenges involving monitoring, assistance, prevention, rehabilitation, and personalized care.",
    note: "Note: Health-related projects must comply with applicable healthcare, safety, ethical, privacy, and regulatory requirements.",
    color: "bg-red",
    badge: "HEALTH & BIO",
  },
  {
    title: "4. Deep Tech & Edge AI",
    prompt: "Focus on applying advanced technologies and intelligent computing to solve complex real-world problems. The track encourages innovation in areas such as automation, robotics, intelligent machines, real-time systems, and technologies that can operate effectively with limited dependence on the cloud.",
    color: "bg-yellow",
    badge: "DEEP TECH & AI",
  },
  {
    title: "5. AgriTech",
    prompt: "Explore innovative technologies that address challenges across modern farming and agriculture. The track focuses on improving productivity, efficiency, resource utilization, monitoring, automation, and decision-making throughout the agricultural ecosystem.",
    color: "bg-green",
    badge: "AGRICULTURE TECH",
  },
  {
    title: "6. Open Innovation",
    prompt: "Hardware-aligned software solutions that address meaningful real-world challenges, bridging software innovation with hardware-driven and physical-world applications. Solutions may span AI, applications, platforms, data-driven systems, and emerging technologies, with a focus on relevant Sustainable Development Goals (SDGs), scalability, and tangible real-world impact.",
    note: "Note: We will select limited ideas from the Open Innovation track, so competition is high—please register accordingly. All the best!",
    color: "bg-orange",
    badge: "HIGH COMPETITION · LIMITED SELECTION",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

export const menuItems: MenuItem[] = [
  { index: "01", label: "Overview", href: "#overview", color: "bg-blue text-white" },
  { index: "02", label: "Domain Tracks", href: "#tracks", color: "bg-yellow text-ink" },
  { index: "03", label: "Timeline", href: "#schedule", color: "bg-orange text-white" },
  { index: "04", label: "Bug Game", href: "#game", color: "bg-red text-white", external: true },
  { index: "05", label: "Location", href: "#location", color: "bg-green text-ink" },
  { index: "06", label: "FAQ & Team", href: "#faq", color: "bg-green-light text-ink", external: true }
];

export const eventFlowCards: EventFlowCard[] = [
  {
    title: "Plan",
    subtitle: "Shape the build brief",
    image: "/assets/images/1.png",
    speed: "fast",
    details: ["Tracks, rules, and rubrics", "Timeline and prize structure", "Challenge briefs published"]
  },
  {
    title: "Launch",
    subtitle: "Open the event cleanly",
    image: "/assets/images/lounch.JPG",
    speed: "slow",
    details: ["Registration opens", "Team creation and announcements", "Participant onboarding flow"]
  },
  {
    title: "Run",
    subtitle: "Keep the floor moving",
    image: "/assets/images/run.JPG",
    speed: "fast",
    details: ["Check-ins and mentor slots", "Live support and checkpoints", "Submission windows that stay clear"]
  },
  {
    title: "Judge",
    subtitle: "Score without chaos",
    image: "/assets/images/judging.jpeg",
    speed: "slow",
    details: ["Reviewer assignment", "Rubric-led scoring", "Finalist selection and scoreboards"]
  },
  {
    title: "Showcase",
    subtitle: "Turn projects into proof",
    image: "/assets/images/showcase.jpg",
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
  ["Registrations", "11"],
  ["Teams formed", "4"],
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
    date: "Sep 25",
    items: [
      { time: "09:30 AM – 11:00 AM", title: "On-Site Check-In", detail: "Badge collection, desk assignment & kit allocation", color: "bg-yellow" },
      { time: "11:00 AM", title: "Grand Finale begins", detail: "24-hour hackathon build sprint officially launched", color: "bg-green text-white" }
    ]
  },
  {
    date: "Sep 26",
    items: [
      { time: "12:00 PM", title: "Grand Finale ends", detail: "Hacking & project submissions freeze", color: "bg-red text-white" },
      { time: "12:30 PM – 01:30 PM", title: "Prize Distribution", detail: "Judge evaluation scoring & award ceremony", color: "bg-yellow" },
      { time: "04:00 PM", title: "Overall event period end", detail: "Community wrap-up & departure", color: "bg-purple text-white" }
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

export const projectSubmissions: { team: string; track: string; status: string; score: string }[] = [];



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
  { id: 2, date: "Aug 15, 2026 — 10:00 PM", tag: "PPT OPEN", content: "Submission of Round-1 PPT officially opens nationwide." },
  { id: 3, date: "Sep 05, 2026 — 11:59 PM", tag: "PPT CLOSE", content: "Submission of Round-1 PPT closes. Evaluation phase begins." },
  { id: 4, date: "Sep 12, 2026 — 10:00 PM", tag: "RESULTS", content: "Declaration of Round-1 Results! Shortlisted teams proceed to Round 2." },
  { id: 5, date: "Sep 12, 2026 — 10:00 PM", tag: "ROUND 2", content: "Registration for Second Round opens for shortlisted teams." },
  { id: 6, date: "Sep 25, 2026 — 11:00 AM", tag: "FINALE", content: "Grand Finale begins on-site at BMSIT campus Bangalore! Check-in starts 9:30 AM." }
];

export const galleryImages = [
  { id: 1, src: "/assets/images/gallery/nirmaan-gallery-1.jpg", alt: "Nirmaan student builders organizing team in lab", category: "Organizing Team" },
  { id: 2, src: "/assets/images/gallery/nirmaan-gallery-2.jpg", alt: "Hardware & prototyping core team collaboration", category: "Hardware Team" },
  { id: 3, src: "/assets/images/gallery/nirmaan-gallery-3.jpg", alt: "Nirmaan participant cohort in lecture hall", category: "Participants" },
  { id: 4, src: "/assets/images/gallery/nirmaan-gallery-4.jpg", alt: "Team problem solving and strategy session", category: "Strategy & Dev" },
  { id: 5, src: "/assets/images/gallery/nirmaan-gallery-5.jpg", alt: "Nirmaan Round 3 event team gathering", category: "Event Floor" },
  { id: 6, src: "/assets/images/gallery/nirmaan-gallery-6.jpg", alt: "Core Team Varsity jackets in auditorium", category: "Core Team" },
  { id: 7, src: "/assets/images/gallery/nirmaan-gallery-7.jpg", alt: "Decode2Deploy judging evaluation round", category: "Judging Round" },
  { id: 8, src: "/assets/images/gallery/nirmaan-gallery-8.jpg", alt: "Decode2Deploy Day 1 stage ceremony", category: "Stage Ceremony" },
];

export const faqs: FaqItem[] = [
  {
    question: "Who can participate in Nirmaan?",
    answer: "Nirmaan is open to student builders and teams from colleges across India. Designers, developers, and hardware engineers are all welcome!"
  },
  {
    question: "What is the team size limit?",
    answer: "Teams must consist of 3 to 4 members."
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
    answer: "Round 1 (online PPT submission) is 100% free! If your team is shortlisted for the offline Grand Finale in Bangalore, a nominal registration fee of ₹800 per team will apply. This includes full catering (food & snacks), exclusive NIRMAAN swag kits & goodies, 24-hour venue access, and direct industry & mentor exposure that makes it completely worth it!"
  },
  {
    question: "What hardware tracks are available?",
    answer: "We support Hardware-Based Innovation (robotics, sensing, automation) and Embedded Systems/IoT Multidisciplinary builds."
  }
];
