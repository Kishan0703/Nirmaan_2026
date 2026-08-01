export const menuItems = [
  { index: "01", label: "Overview", href: "#overview", color: "bg-blue" },
  { index: "02", label: "Quests", href: "#tracks", color: "bg-yellow" },
  { index: "03", label: "Timeline", href: "#schedule", color: "bg-orange" },
  { index: "04", label: "Guilds", href: "#sponsors", color: "bg-green" }
];

export const eventFlowCards = [
  {
    title: "Spawn",
    subtitle: "Define the Quest Brief",
    image: "/assets/images/nirmaan-hero.png",
    speed: "fast",
    details: ["Select challenge paths & boss rules", "Inspect the loot pool & timelines", "Challenge parameters unlocked"]
  },
  {
    title: "Lobby",
    subtitle: "Assemble Your Party",
    image: "/assets/images/nirmaan-mentors.png",
    speed: "slow",
    details: ["Join matchmaking & build profiles", "Guild creation & registration lock", "Onboarding tutorial complete"]
  },
  {
    title: "Speedrun",
    subtitle: "36-Hour Continuous Build",
    image: "/assets/images/nirmaan-demo-day.png",
    speed: "fast",
    details: ["Check-in gates & power-up buffers", "Live developer support & mentor slots", "Milestone checkpoints with zero lag"]
  },
  {
    title: "Boss Fight",
    subtitle: "Scoreboards and Judging",
    image: "/assets/images/nirmaan-mentors.png",
    speed: "slow",
    details: ["Game Master allocations", "Rubric-led scoring algorithms", "Shortlists & final scoreboards synced"]
  },
  {
    title: "Hall of Fame",
    subtitle: "Climb the High Score Board",
    image: "/assets/images/nirmaan-demo-day.png",
    speed: "fast",
    details: ["Live demo arena & public stream", "Claim tokens, badges & certificate loot", "Ongoing community guild matchmaking"]
  }
];

export const eventStats = [
  { value: "36 HR", label: "Speedrun" },
  { value: "420", label: "Lobby Slots" },
  { value: "18", label: "Game Masters" },
  { value: "₹8L", label: "Loot Pool" }
];

export const liveMetrics = [
  ["Lobby Capacity", "312 / 420"],
  ["Guilds Joined", "64 Parties"],
  ["Draft Builds", "118 Submissions"],
  ["Game Masters", "24 Active"]
];

export const scheduleItems = [
  { time: "09:00", title: "Matchmaking Open", detail: "QR check-in, grab badges, setup rigs in zone", color: "bg-yellow" },
  { time: "10:30", title: "Quest Briefing", detail: "Opening tutorial, challenge paths, rules of play", color: "bg-blue text-white" },
  { time: "13:00", title: "Party Formation Lock", detail: "Assemble final teams, solo matchmaking ends", color: "bg-green-light" },
  { time: "18:00", title: "Mentor Power-ups", detail: "Design, AI, pitch, and hardware rooms active", color: "bg-orange" },
  { time: "23:30", title: "Save Point 01", detail: "Prototype logs, tech stack verification check", color: "bg-red text-white" },
  { time: "09:30", title: "Submit Build", detail: "Repos frozen, slide decks uploaded, demo loops active", color: "bg-purple" },
  { time: "12:00", title: "Boss Trial", detail: "Scoring algorithms, Game Master reviews", color: "bg-yellow" },
  { time: "16:00", title: "Hall of Fame Ceremony", detail: "Final presentations, loot distribution", color: "bg-green text-white" }
];

export const sponsorTiers = [
  { name: "Blueprint Guild", slots: "2 slots", perks: ["Named challenge track", "Final judge seat", "Developer recruitment portal"] },
  { name: "Build Floor Sponsor", slots: "4 slots", perks: ["Custom power-up room", "Sandbox booth", "API/Dataset brief"] },
  { name: "Loot Contributor", slots: "8 slots", perks: ["Prize support", "Technical workshop slot", "Community archive badge"] }
];

export const projectSubmissions = [
  { team: "Cyber Cantilever", track: "Cyberpunk + Cities", status: "Demo active", score: "86" },
  { team: "Null Junction", track: "AI + Autopilot", status: "GM review", score: "91" },
  { team: "Ledger Lane", track: "DeFi Guild", status: "Ready to play", score: "78" },
  { team: "CareGrid", track: "Bio-Hacks", status: "Need potion", score: "72" },
  { team: "Signal Forge", track: "Hardware Rig", status: "Demo active", score: "84" }
];

export const trackCards = [
  { title: "AI + Autopilot", prompt: "Autonomous agents, deep learning, operational bots", color: "bg-blue" },
  { title: "Cyberpunk + Cities", prompt: "Smart campus nodes, public systems, mesh networks", color: "bg-green" },
  { title: "DeFi Guilds", prompt: "Crypto billing, micropayments, digital loot assets", color: "bg-yellow" },
  { title: "Bio-Hacks", prompt: "Diagnostics, focus trackers, biosensors, wellness", color: "bg-red" },
  { title: "Open Sandbox", prompt: "Wildcard builds with clear score parameters", color: "bg-purple" },
  { title: "Interface Craft", prompt: "Design tokens, game UI elements, high craft interfaces", color: "bg-orange" },
  { title: "Hardware Rig", prompt: "Controllers, sensor rigs, IoT, physical gadgets", color: "bg-green-light" },
  { title: "Social Lobby", prompt: "Community hubs, local impact, campus utilities", color: "bg-paper" }
];

export const values = [
  {
    title: "Co-Op Ready",
    mark: "01",
    copy: "Structured timelines, matchmaking guides, and active Game Masters keep your party aligned."
  },
  {
    title: "Infinite Sandbox",
    mark: "02",
    copy: "Clean specifications, sandbox rules, and challenge prompts let you build exactly what you want."
  },
  {
    title: "High Score Legacy",
    mark: "03",
    copy: "Judging transparency, public build showrooms, and continuous loot keep the momentum going."
  }
];
