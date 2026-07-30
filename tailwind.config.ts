import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#f4e9e1",
        white: "#ffffff",
        blue: "#0072e3",
        yellow: "#ffb200",
        orange: "#ff6100",
        red: "#ef333a",
        "red-light": "#f2343d",
        green: "#00aa3c",
        "green-light": "#1be349",
        purple: "#ab54f7",
        "purple-light": "#c79dfc",
        gray: "#b2b2b2"
      },
      fontFamily: {
        aeonik: ["Aeonik Pro", "Arial", "sans-serif"],
        display: ["Bunch", "Alfabet", "Arial", "sans-serif"]
      },
      borderRadius: {
        brand: "clamp(30px,2.604vw,50px)",
        pill: "999px"
      },
      spacing: {
        rail: "clamp(142px,9.375vw,180px)",
        gap: "clamp(10px,1.563vw,30px)",
        box: "clamp(25px,2.083vw,40px)"
      },
      fontSize: {
        "hero": ["clamp(54px,5vw,96px)", { lineHeight: "1", fontWeight: "900" }],
        "section": ["clamp(34px,2.292vw,44px)", { lineHeight: "1", fontWeight: "900" }],
        "card": ["clamp(26px,1.771vw,34px)", { lineHeight: "1", fontWeight: "900" }],
        "body-xl": ["clamp(18px,1.042vw,20px)", { lineHeight: "1.2" }],
        "body-lg": ["clamp(16px,0.938vw,18px)", { lineHeight: "1.8" }],
        "rail": ["clamp(16px,0.833vw,16px)", { lineHeight: "1.2", fontWeight: "700" }]
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        driftUp: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" }
        },
        driftDown: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(18px)" }
        },
        reveal: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        nudgeRight: {
          "0%,100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" }
        },
        nudgeLeft: {
          "0%,100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-5px)" }
        }
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        "drift-up": "driftUp 5s ease-in-out infinite",
        "drift-down": "driftDown 6s ease-in-out infinite",
        reveal: "reveal 700ms cubic-bezier(.19,1,.22,1) both",
        "nudge-right": "nudgeRight 1s ease-in-out infinite",
        "nudge-left": "nudgeLeft 1s ease-in-out infinite"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0,0,0,.18)"
      }
    }
  },
  plugins: []
};

export default config;
