"use client";

import { useEffect, useState } from "react";

const KEY = "evenx_cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(KEY);
      if (!consent) setVisible(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — do nothing
    }
  }, []);

  const setChoice = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(KEY, value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#0F172A",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "13px",
          lineHeight: 1.5,
          color: "rgba(255,255,255,0.8)",
          maxWidth: "640px",
        }}
      >
        We use cookies to improve your experience and analyse site usage.{" "}
        <a
          href="/cookie-policy"
          style={{
            color: "#2563EB",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
          }}
        >
          Cookie Policy
        </a>
      </p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={() => setChoice("declined")}
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
            borderRadius: "7px",
            padding: "7px 16px",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => setChoice("accepted")}
          style={{
            background: "#2563EB",
            border: "none",
            color: "white",
            borderRadius: "7px",
            padding: "7px 16px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
