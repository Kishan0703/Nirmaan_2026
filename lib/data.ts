export const menuItems = [
  { index: "01", label: "Overview", href: "#overview", color: "bg-blue text-white" },
  { index: "02", label: "Problem Statements", href: "#tracks", color: "bg-yellow text-ink" },
  { index: "03", label: "Timeline", href: "#schedule", color: "bg-orange text-white" },
  { index: "04", label: "Bug Game", href: "#game", color: "bg-red text-white", external: true },
  { index: "05", label: "Location", href: "#location", color: "bg-green text-ink" },
  { index: "06", label: "FAQ & Team", href: "#faq", color: "bg-purple text-white", external: true }
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
  { value: "24 hrs", label: "Build" },
  { value: "420", label: "Builders capacity" },
  { value: "18+", label: "Mentors on call" },
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
  { team: "Team Cantilever", track: "Embedded Systems", status: "Prototype live", score: "86" },
  { team: "Null Junction", track: "IoT & Automation", status: "Judge review", score: "91" },
  { team: "Ledger Lane", track: "Embedded Systems", status: "Demo ready", score: "78" },
  { team: "CareGrid", track: "Hardware Prototyping", status: "Needs mentor", score: "72" },
  { team: "Signal Forge", track: "Hardware Innovation", status: "Prototype live", score: "84" }
];

export const trackCards = [
  // Software (Embedded Systems / IoT) Tracks
  { title: "Embedded Systems", prompt: "Blend of embedded computing, connectivity, and software", color: "bg-blue", type: "software" },
  { title: "IoT Multidisciplinary", prompt: "Connected devices, custom casing, and systems-level logic", color: "bg-yellow", type: "software" },
  { title: "Connectivity Networks", prompt: "Secure communications, edge nodes, and network protocols", color: "bg-purple", type: "software" },
  
  // Hardware Tracks
  { title: "Robotics & Devices", prompt: "Robotics, physical form factors, and device-based solutions", color: "bg-green", type: "hardware" },
  { title: "Hardware Prototyping", prompt: "Physical casings, sensing units, casters, and casing system", color: "bg-red", type: "hardware" },
  { title: "Automation Rigs", prompt: "Connected systems, physical actuators, and automation circuits", color: "bg-orange", type: "hardware" }
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
  { id: 1, date: "Aug 05, 2026", tag: "LAUNCH", content: "Round 1 Online PPT registration and submission is officially open!" },
  { id: 2, date: "Sept 07, 2026", tag: "SHORTS", content: "Round 1 evaluation results announced. Top selected teams proceed to Finale." },
  { id: 3, date: "Sept 18, 2026", tag: "FINALE", content: "Grand Finale: 24-hour on-site build-off begins at BMSIT campus Bangalore." }
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
