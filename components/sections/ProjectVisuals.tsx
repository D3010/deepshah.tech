/**
 * Bespoke animated SVG visuals for the Featured Work cards.
 * Each one is themed to its project's name. Pure SVG + SMIL — no JS, no
 * canvas, no dependency on the parent Framer Motion lifecycle.
 */

import type { ProjectVisual } from "@/lib/constants";

export function ProjectVisualSvg({ variant }: { variant: ProjectVisual }) {
  switch (variant) {
    case "browser-qa":
      return <BrowserQa />;
    case "agent-network":
      return <AgentNetwork />;
    case "voice-tasks":
      return <VoiceTasks />;
    case "inbox-triage":
      return <InboxTriage />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* 1. Browser-Use Agent for E-commerce QA                              */
/*    Stylized browser frame, cursor moves across products + clicks    */
/* ------------------------------------------------------------------ */

function BrowserQa() {
  return (
    <svg
      viewBox="0 0 480 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="bq-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d0d12" />
          <stop offset="100%" stopColor="#161620" />
        </linearGradient>
        <linearGradient id="bq-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a22" />
          <stop offset="100%" stopColor="#0f0f15" />
        </linearGradient>
        <linearGradient id="bq-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ff3d8a" />
        </linearGradient>
      </defs>
      <rect width="480" height="600" fill="url(#bq-bg)" />

      {/* Browser chrome */}
      <g transform="translate(40 60)">
        <rect
          width="400"
          height="380"
          rx="14"
          fill="rgba(255,255,255,0.025)"
          stroke="rgba(255,255,255,0.10)"
        />
        {/* traffic-light dots */}
        <circle cx="22" cy="22" r="5" fill="#ff6b6b" />
        <circle cx="40" cy="22" r="5" fill="#ffb347" opacity="0.85" />
        <circle cx="58" cy="22" r="5" fill="#7dd3a3" opacity="0.85" />
        {/* URL bar */}
        <rect
          x="90"
          y="13"
          width="270"
          height="20"
          rx="10"
          fill="rgba(255,255,255,0.06)"
        />
        <text
          x="104"
          y="27"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="rgba(250,250,250,0.55)"
          letterSpacing="0.5"
        >
          shop.example.com/cart
        </text>

        {/* Page divider */}
        <line
          x1="0"
          y1="48"
          x2="400"
          y2="48"
          stroke="rgba(255,255,255,0.06)"
        />

        {/* Product grid */}
        {[0, 1, 2].map((i) => {
          const x = 18 + i * 124;
          return (
            <g key={i} transform={`translate(${x} 70)`}>
              <rect
                width="110"
                height="130"
                rx="10"
                fill="url(#bq-card)"
                stroke="rgba(255,255,255,0.08)"
              />
              <rect
                x="10"
                y="10"
                width="90"
                height="70"
                rx="6"
                fill="rgba(255,107,107,0.10)"
              />
              <rect
                x="10"
                y="90"
                width="60"
                height="6"
                rx="3"
                fill="rgba(255,255,255,0.18)"
              />
              <rect
                x="10"
                y="103"
                width="40"
                height="5"
                rx="2.5"
                fill="rgba(255,255,255,0.10)"
              />
            </g>
          );
        })}

        {/* "Add to cart" CTA */}
        <g transform="translate(110 220)">
          <rect
            width="180"
            height="32"
            rx="16"
            fill="url(#bq-accent)"
            opacity="0.95"
          />
          <text
            x="90"
            y="21"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fontWeight="600"
            fill="#fff"
            letterSpacing="1.2"
          >
            ADD TO CART
          </text>
        </g>

        {/* Pulse ring on the CTA after click */}
        <g transform="translate(200 236)">
          <circle r="10" fill="none" stroke="#ff3d8a" strokeWidth="1.5">
            <animate
              attributeName="r"
              values="10;28;10"
              dur="3.6s"
              keyTimes="0;0.5;1"
              begin="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;0.6;0"
              dur="3.6s"
              keyTimes="0;0.5;1"
              begin="2.4s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* "Ticket filed" badge */}
        <g opacity="0">
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur="1.6s"
            begin="3.0s"
            repeatCount="indefinite"
          />
          <rect
            x="240"
            y="290"
            width="140"
            height="32"
            rx="16"
            fill="rgba(125, 211, 163, 0.14)"
            stroke="rgba(125, 211, 163, 0.5)"
          />
          <text
            x="310"
            y="310"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fill="#7dd3a3"
            letterSpacing="1"
          >
            ✓ TICKET FILED
          </text>
        </g>

        {/* Animated cursor — visits each product + the CTA */}
        <g>
          <path
            d="M0 0 L0 16 L4.5 12.5 L8 19 L11 17.5 L7.5 11 L13.5 11 Z"
            fill="#fafafa"
            stroke="#08080a"
            strokeWidth="0.8"
          >
            <animateMotion
              dur="3.6s"
              repeatCount="indefinite"
              keyTimes="0;0.18;0.36;0.55;0.75;1"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              calcMode="spline"
              path="M 60 100 L 60 100 L 184 100 L 308 100 L 200 232 L 60 100 Z"
            />
          </path>
        </g>
      </g>

      {/* Caption strip */}
      <g transform="translate(40 480)">
        <text
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.4)"
          letterSpacing="2"
        >
          AGENT.RUN()
        </text>
        <text
          y="18"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.7)"
          letterSpacing="2"
        >
          → CHECKOUT.OK
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Multi-agent Research Pipeline                                    */
/*    Central hub + 6 satellite agents, animated dashed connections    */
/* ------------------------------------------------------------------ */

function AgentNetwork() {
  const cx = 240;
  const cy = 300;
  const r = 130;
  const agents = ["search", "summarize", "fact-check", "synthesize", "cite", "draft"];
  return (
    <svg
      viewBox="0 0 480 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="an-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1a1430" />
          <stop offset="100%" stopColor="#08080a" />
        </radialGradient>
        <linearGradient id="an-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff3d8a" />
          <stop offset="50%" stopColor="#d946ef" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="480" height="600" fill="url(#an-bg)" />

      {/* Faint orbital rings */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r - 36}
        fill="none"
        stroke="rgba(255,255,255,0.03)"
      />

      {/* Connections */}
      {agents.map((_, i) => {
        const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        return (
          <line
            key={`l-${i}`}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            stroke="url(#an-line)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.55"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-30"
              dur={`${3 + (i % 3) * 0.4}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}

      {/* Center hub */}
      <g>
        <circle cx={cx} cy={cy} r="22" fill="rgba(255,61,138,0.18)" />
        <circle cx={cx} cy={cy} r="14" fill="#ff3d8a" />
        <circle cx={cx} cy={cy} r="14" fill="none" stroke="#fafafa" strokeWidth="1" opacity="0.4">
          <animate
            attributeName="r"
            values="14;26;14"
            dur="2.8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.5;0;0.5"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Satellites */}
      {agents.map((label, i) => {
        const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        // Stagger pulse rings so they cycle through agents one at a time
        const begin = `${i * 0.5}s`;
        return (
          <g key={`s-${i}`} transform={`translate(${x} ${y})`}>
            <circle r="20" fill="rgba(15,15,18,0.95)" stroke="rgba(255,255,255,0.18)" />
            <circle r="6" fill="#fafafa" />
            <circle r="6" fill="none" stroke="#ff3d8a" strokeWidth="1.5" opacity="0">
              <animate
                attributeName="r"
                values="6;22;6"
                dur="3s"
                begin={begin}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.9;0;0.9"
                dur="3s"
                begin={begin}
                repeatCount="indefinite"
              />
            </circle>
            <text
              y="36"
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="10"
              fill="rgba(250,250,250,0.7)"
              letterSpacing="1.4"
            >
              {label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Caption */}
      <g transform="translate(40 480)">
        <text
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.4)"
          letterSpacing="2"
        >
          ORCHESTRATOR
        </text>
        <text
          y="18"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.7)"
          letterSpacing="2"
        >
          → 6 SPECIALIZED AGENTS
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Voice-to-Workflow                                                */
/*    Mic → animated waveform → task list (checkboxes filling)         */
/* ------------------------------------------------------------------ */

function VoiceTasks() {
  const bars = Array.from({ length: 16 });
  return (
    <svg
      viewBox="0 0 480 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="vt-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0e1a" />
          <stop offset="100%" stopColor="#08080a" />
        </linearGradient>
        <linearGradient id="vt-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6b6b" />
          <stop offset="100%" stopColor="#ff3d8a" />
        </linearGradient>
      </defs>
      <rect width="480" height="600" fill="url(#vt-bg)" />

      {/* Microphone glyph */}
      <g transform="translate(60 200)">
        <rect
          x="-2"
          y="0"
          width="40"
          height="60"
          rx="20"
          fill="none"
          stroke="rgba(250,250,250,0.85)"
          strokeWidth="2"
        />
        <path
          d="M-14 50 A28 28 0 0 0 50 50"
          fill="none"
          stroke="rgba(250,250,250,0.85)"
          strokeWidth="2"
        />
        <line
          x1="18"
          y1="78"
          x2="18"
          y2="92"
          stroke="rgba(250,250,250,0.85)"
          strokeWidth="2"
        />
        <line
          x1="6"
          y1="92"
          x2="30"
          y2="92"
          stroke="rgba(250,250,250,0.85)"
          strokeWidth="2"
        />
        {/* Pulse rings around the mic */}
        <circle cx="18" cy="40" r="40" fill="none" stroke="#ff3d8a" strokeWidth="1" opacity="0">
          <animate
            attributeName="r"
            values="40;72;40"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Animated waveform — bars rise + fall in a wave */}
      <g transform="translate(140 260)">
        {bars.map((_, i) => {
          const x = i * 10;
          const phase = i * 0.18;
          return (
            <rect
              key={i}
              x={x}
              y="0"
              width="5"
              height="20"
              rx="2.5"
              fill="url(#vt-bar)"
              transform="translate(0 0)"
            >
              <animate
                attributeName="height"
                values="8;48;14;36;10;30;8"
                keyTimes="0;0.16;0.32;0.48;0.66;0.83;1"
                dur="1.6s"
                begin={`${phase}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="y"
                values="20;8;17;10;19;13;20"
                keyTimes="0;0.16;0.32;0.48;0.66;0.83;1"
                dur="1.6s"
                begin={`${phase}s`}
                repeatCount="indefinite"
              />
            </rect>
          );
        })}
      </g>

      {/* Arrow */}
      <g transform="translate(330 280)">
        <line
          x1="0"
          y1="0"
          x2="32"
          y2="0"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="1.5"
        />
        <path d="M28 -5 L34 0 L28 5 Z" fill="rgba(255,255,255,0.5)" />
      </g>

      {/* Task list — three rows that appear in sequence */}
      <g transform="translate(60 360)">
        {[0, 1, 2].map((i) => {
          const begin = i * 1.4;
          const checkBegin = begin + 0.6;
          return (
            <g key={i} transform={`translate(0 ${i * 46})`} opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;1"
                keyTimes="0;0.15;1"
                dur="4.2s"
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
              <rect
                width="360"
                height="34"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.08)"
              />
              <rect
                x="10"
                y="9"
                width="16"
                height="16"
                rx="4"
                fill="none"
                stroke="rgba(250,250,250,0.55)"
                strokeWidth="1.5"
              />
              {/* Check fill */}
              <rect
                x="10"
                y="9"
                width="16"
                height="16"
                rx="4"
                fill="url(#vt-bar)"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;1;1"
                  keyTimes="0;0.1;1"
                  dur="3.6s"
                  begin={`${checkBegin}s`}
                  repeatCount="indefinite"
                />
              </rect>
              <path
                d="M14 17 l4 4 l8 -8"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0"
              >
                <animate
                  attributeName="opacity"
                  values="0;1;1"
                  keyTimes="0;0.1;1"
                  dur="3.6s"
                  begin={`${checkBegin}s`}
                  repeatCount="indefinite"
                />
              </path>
              <rect
                x="40"
                y="13"
                width={[180, 220, 150][i]}
                height="8"
                rx="4"
                fill="rgba(255,255,255,0.15)"
              />
              <rect
                x="40"
                y="13"
                width="40"
                height="8"
                rx="4"
                fill="rgba(255,107,107,0.5)"
              />
            </g>
          );
        })}
      </g>

      {/* Caption */}
      <g transform="translate(60 540)">
        <text
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.4)"
          letterSpacing="2"
        >
          30S OF AUDIO
        </text>
        <text
          y="18"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.7)"
          letterSpacing="2"
        >
          → 3 ASSIGNED TASKS
        </text>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* 4. AI Inbox Triage                                                  */
/*    Envelopes flow from a stack → AI hub → 3 categorized piles       */
/* ------------------------------------------------------------------ */

function InboxTriage() {
  return (
    <svg
      viewBox="0 0 480 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="it-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0e0a1a" />
          <stop offset="100%" stopColor="#08080a" />
        </linearGradient>
        <linearGradient id="it-env" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#dbd9e0" />
        </linearGradient>
      </defs>
      <rect width="480" height="600" fill="url(#it-bg)" />

      {/* Inbox stack — left */}
      <g transform="translate(40 200)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 4} ${i * 4})`} opacity={0.6 + i * 0.13}>
            <rect
              width="80"
              height="56"
              rx="6"
              fill="url(#it-env)"
              opacity="0.85"
            />
            <path
              d="M0 0 L40 32 L80 0"
              fill="none"
              stroke="rgba(8,8,10,0.45)"
              strokeWidth="1.5"
            />
          </g>
        ))}
        <text
          y="100"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="rgba(250,250,250,0.5)"
          letterSpacing="1.4"
        >
          INBOX · 247
        </text>
      </g>

      {/* AI hub — center */}
      <g transform="translate(240 226)">
        <circle r="42" fill="rgba(139,92,246,0.10)" stroke="rgba(139,92,246,0.4)" />
        <circle r="42" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.7">
          <animate
            attributeName="r"
            values="42;58;42"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.6;0;0.6"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Rotating dot ring */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="9s"
            repeatCount="indefinite"
          />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <circle
                key={i}
                cx={Math.cos(a) * 28}
                cy={Math.sin(a) * 28}
                r="2"
                fill="#d946ef"
              />
            );
          })}
        </g>
        <text
          textAnchor="middle"
          y="5"
          fontFamily="ui-monospace, monospace"
          fontSize="13"
          fontWeight="700"
          fill="#fafafa"
          letterSpacing="2"
        >
          AI
        </text>
      </g>

      {/* Right piles */}
      {[
        { y: 60, label: "URGENT", color: "#ff6b6b", count: 12 },
        { y: 200, label: "REPLY", color: "#ff3d8a", count: 41 },
        { y: 340, label: "ARCHIVE", color: "#8b5cf6", count: 194 },
      ].map((cat) => (
        <g key={cat.label} transform={`translate(360 ${cat.y})`}>
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 3} ${i * 3})`}>
              <rect
                width="74"
                height="50"
                rx="6"
                fill="url(#it-env)"
                opacity={0.55 + i * 0.15}
              />
              <line
                x1="6"
                y1="14"
                x2="40"
                y2="14"
                stroke={cat.color}
                strokeWidth="2"
                opacity="0.85"
              />
              <line
                x1="6"
                y1="22"
                x2="60"
                y2="22"
                stroke="rgba(8,8,10,0.3)"
                strokeWidth="1"
              />
            </g>
          ))}
          <text
            y="76"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            fill="rgba(250,250,250,0.65)"
            letterSpacing="1.6"
          >
            {cat.label} · {cat.count}
          </text>
        </g>
      ))}

      {/* Flying envelopes — three offset paths to each pile */}
      {[
        { begin: 0, path: "M 100 230 Q 200 180 220 230 T 360 80", color: "#ff6b6b" },
        { begin: 1.6, path: "M 100 230 Q 200 240 220 230 T 360 220", color: "#ff3d8a" },
        { begin: 3.2, path: "M 100 230 Q 200 290 220 230 T 360 360", color: "#8b5cf6" },
      ].map((p, i) => (
        <g key={i}>
          <g>
            <rect
              x="-22"
              y="-15"
              width="44"
              height="30"
              rx="4"
              fill="url(#it-env)"
            />
            <path
              d="M-22 -15 L0 3 L22 -15"
              fill="none"
              stroke="rgba(8,8,10,0.4)"
              strokeWidth="1.2"
            />
            <line
              x1="-14"
              y1="-2"
              x2="14"
              y2="-2"
              stroke={p.color}
              strokeWidth="2"
            />
            <animateMotion
              dur="4.8s"
              begin={`${p.begin}s`}
              repeatCount="indefinite"
              path={p.path}
              keyTimes="0;0.4;1"
              keyPoints="0;0.5;1"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur="4.8s"
              begin={`${p.begin}s`}
              repeatCount="indefinite"
            />
          </g>
        </g>
      ))}

      {/* Caption */}
      <g transform="translate(40 540)">
        <text
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.4)"
          letterSpacing="2"
        >
          200+/DAY · 94% ACCURATE
        </text>
        <text
          y="18"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          fill="rgba(250,250,250,0.7)"
          letterSpacing="2"
        >
          → SORTED, DRAFTED, SCHEDULED
        </text>
      </g>
    </svg>
  );
}
