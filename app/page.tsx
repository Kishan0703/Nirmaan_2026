"use client";

import { useEffect, useState } from "react";
import { SiteExperience } from "@/components/site-experience";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <SiteExperience />;
}
