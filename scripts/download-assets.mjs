import { createWriteStream, existsSync, mkdirSync } from "node:fs";
import { basename, join } from "node:path";
import { pipeline } from "node:stream/promises";

const base = "https://units.gr";

const files = [
  ["/wp-content/uploads/2026/05/Lounge-Area.jpg", "public/assets/images/Lounge-Area.jpg"],
  ["/wp-content/uploads/2026/04/Header_Homepage-mobile.jpg", "public/assets/images/Header_Homepage-mobile.jpg"],
  ["/wp-content/uploads/2026/04/1__Community_Living_Spaces.jpg", "public/assets/images/1__Community_Living_Spaces.jpg"],
  ["/wp-content/uploads/2026/01/2.-Security-e1777987828492.jpg", "public/assets/images/2.-Security-e1777987828492.jpg"],
  ["/wp-content/uploads/2026/01/3.-Support-1-e1768497722592.jpg", "public/assets/images/3.-Support-1-e1768497722592.jpg"],
  ["/wp-content/uploads/2026/01/Asset-1@2x-100.jpg", "public/assets/images/Asset-1@2x-100.jpg"],
  ["/wp-content/uploads/2026/05/Community_1.jpg", "public/assets/images/Community_1.jpg"],
  ["/wp-content/uploads/2026/05/Community_2.jpg", "public/assets/images/Community_2.jpg"],
  ["/wp-content/uploads/2026/01/mdi_living-room-outline-1.svg", "public/assets/icons/mdi_living-room-outline-1.svg"],
  ["/wp-content/uploads/2026/01/streamline_workspace-desk-1.svg", "public/assets/icons/streamline_workspace-desk-1.svg"],
  ["/wp-content/uploads/2026/01/noun-kitchen-6600449-1-1.svg", "public/assets/icons/noun-kitchen-6600449-1-1.svg"],
  ["/wp-content/uploads/2026/01/iconoir_bathroom-1.svg", "public/assets/icons/iconoir_bathroom-1.svg"],
  ["/wp-content/uploads/2026/01/hugeicons_tv-smart-1.svg", "public/assets/icons/hugeicons_tv-smart-1.svg"],
  ["/wp-content/uploads/2026/01/mynaui_air-conditioner-1.svg", "public/assets/icons/mynaui_air-conditioner-1.svg"],
  ["/wp-content/uploads/2026/01/humbleicons_wifi-1.svg", "public/assets/icons/humbleicons_wifi-1.svg"],
  ["/wp-content/uploads/2026/01/material-symbols-light_balcony-rounded-1.svg", "public/assets/icons/material-symbols-light_balcony-rounded-1.svg"],
  ["/wp-content/uploads/2026/05/people.svg", "public/assets/icons/people.svg"],
  ["/wp-content/uploads/2026/04/home-pencil-1.svg", "public/assets/icons/home-pencil-1.svg"],
  ["/wp-content/uploads/2026/04/home-Hart-1.svg", "public/assets/icons/home-Hart-1.svg"],
  ["/wp-content/themes/units/public/dist/fonts/AeonikPro/aeonikpro-regular.woff2", "public/assets/fonts/aeonik/aeonikpro-regular.woff2"],
  ["/wp-content/themes/units/public/dist/fonts/AeonikPro/aeonikpro-bold.woff2", "public/assets/fonts/aeonik/aeonikpro-bold.woff2"],
  ["/wp-content/themes/units/public/dist/fonts/Bunch/Bunch-Bold.woff2", "public/assets/fonts/bunch/Bunch-Bold.woff2"]
];

const gallery = [
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
];

for (const name of gallery) {
  files.push([`/wp-content/uploads/2026/01/${name}`, `public/assets/gallery/${name}`]);
}

for (const [, target] of files) {
  mkdirSync(join(process.cwd(), target, ".."), { recursive: true });
}

for (const [source, target] of files) {
  const targetPath = join(process.cwd(), target);
  if (existsSync(targetPath)) {
    console.log(`skip ${target}`);
    continue;
  }
  const response = await fetch(`${base}${source}`);
  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${source}: ${response.status}`);
  }
  await pipeline(response.body, createWriteStream(targetPath));
  console.log(`saved ${basename(target)}`);
}
