export const menuItems = [
  { index: "01", label: "Overview", href: "#overview", color: "bg-blue" },
  { index: "02", label: "Tracks", href: "#tracks", color: "bg-yellow" },
  { index: "03", label: "Timeline", href: "#schedule", color: "bg-orange" },
  { index: "04", label: "Bug Game", href: "#game", color: "bg-red text-white" },
  { index: "05", label: "Location", href: "#location", color: "bg-green text-white" },
  { index: "06", label: "FAQ & Team", href: "#faq", color: "bg-purple text-white" }
];

export const eventFlowCards = [
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
  { value: "36 hrs", label: "Build" },
  { value: "420", label: "Builders capacity" },
  { value: "18", label: "Mentors on call" },
  { value: "₹8L", label: "Prize pool" }
];

export const liveMetrics = [
  ["Registrations", "312 / 420"],
  ["Teams formed", "64"],
  ["Submissions", "118 drafts"],
  ["Judges assigned", "24"]
];

export const scheduleItems = [
  { time: "09:00", title: "Check-in opens", detail: "QR desk, badge pickup, team zones unlock", color: "bg-yellow" },
  { time: "10:30", title: "Opening brief", detail: "Rules, tracks, sponsor prompts, judging rubric", color: "bg-blue text-white" },
  { time: "13:00", title: "Team formation lock", detail: "Solo builders matched, team pages generated", color: "bg-green-light" },
  { time: "18:00", title: "Mentor circuit", detail: "Design, AI, pitch, hardware, and business rooms", color: "bg-orange" },
  { time: "23:30", title: "Checkpoint 01", detail: "Problem, prototype plan, risk notes, next actions", color: "bg-red text-white" },
  { time: "09:30", title: "Submission freeze", detail: "Repos, decks, demo links, and project gallery", color: "bg-purple" },
  { time: "12:00", title: "Judging round", detail: "Rubric scoring, reviewer sync, finalist shortlist", color: "bg-yellow" },
  { time: "16:00", title: "Demo day", detail: "Final pitches, winners, certificates, archive", color: "bg-green text-white" }
];

export const sponsorTiers = [
  { name: "Blueprint Partner", slots: "2 slots", perks: ["Named challenge track", "Final judging seat", "Talent shortlist"] },
  { name: "Build Floor Sponsor", slots: "4 slots", perks: ["Mentor room", "Booth module", "Dataset/API brief"] },
  { name: "Community Backer", slots: "8 slots", perks: ["Prize support", "Workshop slot", "Project archive badge"] }
];

export const projectSubmissions = [
  { team: "Team Cantilever", track: "Climate + Cities", status: "Prototype live", score: "86" },
  { team: "Null Junction", track: "AI + Automation", status: "Judge review", score: "91" },
  { team: "Ledger Lane", track: "FinTech", status: "Demo ready", score: "78" },
  { team: "CareGrid", track: "Health", status: "Needs mentor", score: "72" },
  { team: "Signal Forge", track: "Hardware", status: "Prototype live", score: "84" }
];

export const trackCards = [
  // Software (S/W) Tracks
  { title: "AI + Automation", prompt: "Agents, workflows, and operational leverage", color: "bg-blue", type: "software" },
  { title: "FinTech", prompt: "Payments, trust, credit, and accessible finance", color: "bg-yellow", type: "software" },
  { title: "Open Innovation", prompt: "Wildcard builds with clear outcome metrics", color: "bg-purple", type: "software" },
  { title: "Social Impact", prompt: "Community tools with measurable local value", color: "bg-paper", type: "software" },
  
  // Hardware (H/W) Tracks
  { title: "Climate + Cities", prompt: "Resilient campuses, mobility, and public systems", color: "bg-green", type: "hardware" },
  { title: "Health & Triage", prompt: "Care access, diagnostics, and smart bio-wearables", color: "bg-red", type: "hardware" },
  { title: "Design Systems", prompt: "Reusable physical form factors, enclosures, and casings", color: "bg-orange", type: "hardware" },
  { title: "Hardware Rigs", prompt: "Connected devices, custom controllers, and IoT nodes", color: "bg-green-light", type: "hardware" }
];

export const values = [
  {
    title: "Built for Teams",
    mark: "01",
    copy: "Clear tracks, rules, mentor checkpoints, and submission expectations help teams build with focus from day one."
  },
  {
    title: "Built for Builders",
    mark: "02",
    copy: "Participants get clear rules, team formation, track context, and submissions that feel simple under pressure."
  },
  {
    title: "Built for Outcomes",
    mark: "03",
    copy: "Judging, demos, winner archives, and follow-up community loops turn one event into durable momentum."
  }
];

export const announcements = [
  { id: 1, date: "Nov 01, 2026", tag: "INFO", content: "Registrations are officially open! Select your quest path." },
  { id: 2, date: "Nov 03, 2026", tag: "BOUNTY", content: "Prize pool increased to ₹8L with community tracks added." },
  { id: 3, date: "Nov 05, 2026", tag: "RULES", content: "Submission rules and GitHub workflow briefs published." }
];

export const galleryImages = [
  { src: "/assets/images/nirmaan-hero.png", alt: "Active building floor", caption: "Team brainstorming session" },
  { src: "/assets/images/nirmaan-mentors.png", alt: "Mentor review sessions", caption: "Live engineering checkpoints" },
  { src: "/assets/images/nirmaan-demo-day.png", alt: "Final pitching stage", caption: "Shortlist project demos" },
  { src: "/assets/images/nirmaan-hero.png", alt: "Showcase winner ceremony", caption: "Loot award distribution" }
];

export const faqs = [
  {
    question: "Who can participate in Nirmaan?",
    answer: "Any student currently enrolled in an undergraduate or postgraduate program. Both designers and developers are welcome!"
  },
  {
    question: "What is the team size limit?",
    answer: "Teams can consist of 1 to 4 members. Matchmaking rooms will be available for solo builders."
  },
  {
    question: "Are there registration fees?",
    answer: "No, registration for Nirmaan Hackathon is completely free, including food and workshop slots."
  },
  {
    question: "Will the event be online or offline?",
    answer: "It is an in-person, offline hackathon hosted at the BMSIT campus in Bangalore, India."
  },
  {
    question: "What do I need to bring?",
    answer: "Your laptop, chargers, extension boxes, and hardware dev kits if you are in the Hardware track."
  }
];
