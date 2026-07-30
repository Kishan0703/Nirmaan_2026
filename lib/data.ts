export const menuItems = [
  { index: "01", label: "Student Homes", href: "#units", color: "bg-blue" },
  { index: "02", label: "Our way of living", href: "#living", color: "bg-yellow" },
  { index: "03", label: "Community", href: "#community", color: "bg-orange" },
  { index: "04", label: "Contact", href: "#contact", color: "bg-green" }
];

export const livingCards = [
  {
    title: "Community living spaces",
    subtitle: "Open access, 24/7",
    image: "/assets/images/1__Community_Living_Spaces.jpg",
    speed: "fast",
    details: ["Fully equipped gym", "Self-service laundry room", "Social areas"]
  },
  {
    title: "Security",
    subtitle: "Day and night",
    image: "/assets/images/2.-Security-e1777987828492.jpg",
    speed: "slow",
    details: [
      "24/7 CCTV Surveillance",
      "7/7 Night patrol",
      "High-security entrance door with electronic lock",
      "Smart and secure access control"
    ]
  },
  {
    title: "Support",
    subtitle: "We've got you covered",
    image: "/assets/images/3.-Support-1-e1768497722592.jpg",
    speed: "fast",
    details: [
      "24/7 Resident support",
      "Check-in & Onboarding assistance",
      "Fast request handling",
      "Fast maintenance support",
      "Continuous experience improvements"
    ]
  },
  {
    title: "Smart Living",
    subtitle: "Designed for everyday ease",
    image: "/assets/images/Asset-1@2x-100.jpg",
    speed: "slow",
    details: [
      "Digital mobile key",
      "Shared spaces reservations",
      "Maintenance ticketing system",
      "Laundry - EasyPay",
      "Digital intercom"
    ]
  }
];

export const unitFeatures = [
  ["Fully furnished", "/assets/icons/mdi_living-room-outline-1.svg"],
  ["Private workspace", "/assets/icons/streamline_workspace-desk-1.svg"],
  ["Private kitchen", "/assets/icons/noun-kitchen-6600449-1-1.svg"],
  ["Private bathroom", "/assets/icons/iconoir_bathroom-1.svg"],
  ["Smart TV", "/assets/icons/hugeicons_tv-smart-1.svg"],
  ["Air-Conditioning", "/assets/icons/mynaui_air-conditioner-1.svg"],
  ["Super-Fast WiFi", "/assets/icons/humbleicons_wifi-1.svg"],
  ["Balcony", "/assets/icons/material-symbols-light_balcony-rounded-1.svg"]
];

export const galleryImages = [
  "Flex_1-1-300x200.jpg",
  "Vibe_4-1-300x200.jpg",
  "Flex_2-1-300x200.jpg",
  "Boost_4-1-300x200.jpg",
  "02_Boost_1-300x200.jpg",
  "5_Laundry-272x300.jpg",
  "2_Gym-300x183.jpg",
  "Flex_1-300x200.jpg",
  "04_Vibe_2-300x200.jpg",
  "02_Boost_4-300x200.jpg",
  "03_Flex_3-300x200.jpg",
  "01_Kick_1-300x200.jpg"
].map((name) => `/assets/gallery/${name}`);

export const values = [
  {
    title: "For People",
    image: "/assets/icons/people.svg",
    copy: "Everything starts with how it feels to live here. From private spaces to shared experiences, people always come first."
  },
  {
    title: "By Design",
    image: "/assets/icons/home-pencil-1.svg",
    copy: "Nothing is accidental. Every detail is designed to support the way you live and the way you feel, every day."
  },
  {
    title: "With Care",
    image: "/assets/icons/home-Hart-1.svg",
    copy: "At the heart of everything we do. We care for the people who live here, the spaces we create, and the city we're part of."
  }
];
