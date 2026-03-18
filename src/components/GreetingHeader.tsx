import { useEffect, useState } from "react";

const LETTERS = "Happy Birthday".split("");

const GreetingHeader = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <h1
      className="font-display text-center select-none"
      style={{
        fontSize: "clamp(2.2rem, 7vw, 5.5rem)",
        fontWeight: 700,
        lineHeight: 1.2,
        position: "relative",
        zIndex: 10,
      }}
      aria-label="Happy Birthday"
    >
      {LETTERS.map((letter, i) => (
        <span
          key={i}
          className="inline-block relative"
          style={{
            background: "linear-gradient(135deg, #E1BEE7, #F48FB1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 2px 8px rgba(244,143,177,0.4))",
            animation: mounted
              ? `letter-wave 2.4s ease-in-out ${i * 0.1}s infinite`
              : "none",
            opacity: mounted ? 1 : 0,
            transition: `opacity 0.4s ${i * 0.05}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
          {/* Sparkle at peak */}
          <svg
            className="absolute"
            style={{
              top: "-8px",
              right: "-2px",
              width: "14px",
              height: "14px",
              animation: mounted
                ? `sparkle 2.4s ease-in-out ${i * 0.1 + 0.6}s infinite`
                : "none",
            }}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"
              fill="white"
              fillOpacity="0.9"
            />
          </svg>
        </span>
      ))}
    </h1>
  );
};

export default GreetingHeader;
