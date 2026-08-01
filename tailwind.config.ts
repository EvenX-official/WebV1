import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand — mirrored from evenx-website-v4 and app.evenx.co.uk
        brand: {
          blue: "#2563EB",
          "blue-strong": "#1D4FD8",
          "blue-soft": "#E8F0FE",
          purple: "#7C5CFA",
          "purple-soft": "#EFEBFE",
          amber: "#F5B547",
          green: "#10B981",
          "green-soft": "#E7F7EF",
        },
        // Dashboard "dark island" surface — matches app dark navy
        ink: {
          950: "#08101F",
          900: "#0B1220",
          850: "#0F1A2E",
          800: "#152340",
          700: "#1E2C4A",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7F8FA",
          subtle: "#F1F3F7",
          border: "#E6E8EE",
          "border-strong": "#D3D7E0",
        },
        content: {
          DEFAULT: "#0B0F17",
          strong: "#000000",
          muted: "#4A5262",
          subtle: "#727A88",
          onDark: "#F5F7FB",
          "onDark-muted": "#9AA7BE",
        },
        risk: {
          high: "#EF4444",
          med: "#F59E0B",
          low: "#10B981",
        },
      },
      borderRadius: {
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,15,23,0.04), 0 12px 32px -12px rgba(11,15,23,0.08)",
        "card-lg": "0 2px 4px rgba(11,15,23,0.05), 0 28px 64px -20px rgba(11,15,23,0.14)",
        eva: "0 30px 80px -30px rgba(37,99,235,0.35), 0 0 0 1px rgba(255,255,255,0.06) inset",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
    },
  },
} satisfies Config;
