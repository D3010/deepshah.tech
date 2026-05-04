"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CAPABILITIES, type Capability, type CapabilityVisual } from "@/lib/constants";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Capabilities() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative scroll-mt-24 py-32 md:py-40"
    >
      <div className="container-page">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 flex max-w-3xl flex-col gap-5"
        >
          <SectionLabel number="02" label="What I Do" />
          <h2 id="capabilities-heading" className="heading">
            Build the boring parts of AI well.
          </h2>
          <p className="text-base text-[var(--text-secondary)] md:text-lg">
            Production-grade infrastructure for the agentic era — not demos,
            not slideware.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid auto-rows-[minmax(220px,_auto)] grid-cols-1 gap-4 md:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className={cn(c.span)}
            >
              <Tile capability={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tile({ capability }: { capability: Capability }) {
  return (
    <div className="group gradient-border relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-surface p-8 transition-all duration-300 hover:-translate-y-1">
      <div className="relative z-10 flex h-full flex-col gap-6">
        <div className="flex h-32 items-center justify-start opacity-90 transition-opacity duration-300 group-hover:opacity-100">
          <CapabilityVisualSvg variant={capability.visual} />
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <h3 className="text-[22px] font-semibold tracking-tight text-fg">
            {capability.title}
          </h3>
          <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
            {capability.body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Animated SVG visuals — pure SVG + CSS for GPU-friendly motion        */
/* ------------------------------------------------------------------ */

function CapabilityVisualSvg({ variant }: { variant: CapabilityVisual }) {
  switch (variant) {
    case "nodes":
      return (
        <svg viewBox="0 0 240 120" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="vn-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#ff3d8a" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* Connecting paths */}
          <path
            d="M30 60 Q90 20 120 60 T210 60"
            stroke="url(#vn-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.7"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-20"
              dur="3s"
              repeatCount="indefinite"
            />
          </path>
          <path
            d="M30 60 Q90 100 150 80 T210 60"
            stroke="url(#vn-grad)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="20"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
          {/* Nodes */}
          {[
            [30, 60],
            [90, 35],
            [120, 60],
            [150, 80],
            [180, 50],
            [210, 60],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill="#fafafa"
                opacity="0.95"
              />
              <circle
                cx={cx}
                cy={cy}
                r="9"
                fill="#ff3d8a"
                opacity="0.18"
              >
                <animate
                  attributeName="r"
                  values="6;12;6"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.25;0.05;0.25"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </svg>
      );

    case "browser":
      return (
        <svg viewBox="0 0 240 120" className="h-full w-full" fill="none">
          {/* Browser frame */}
          <rect
            x="20"
            y="14"
            width="200"
            height="92"
            rx="8"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <line
            x1="20"
            y1="34"
            x2="220"
            y2="34"
            stroke="rgba(255,255,255,0.12)"
          />
          {[28, 38, 48].map((cx) => (
            <circle
              key={cx}
              cx={cx}
              cy={24}
              r="2"
              fill="rgba(255,255,255,0.3)"
            />
          ))}
          {/* Page lines */}
          <rect
            x="34"
            y="50"
            width="120"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.12)"
          />
          <rect
            x="34"
            y="62"
            width="160"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.08)"
          />
          <rect
            x="34"
            y="74"
            width="80"
            height="4"
            rx="2"
            fill="rgba(255,255,255,0.08)"
          />
          {/* Cursor */}
          <g>
            <path
              d="M0 0 L0 14 L4 11 L7 17 L10 16 L7 10 L13 10 Z"
              fill="#fafafa"
              transform="translate(40,55)"
            >
              <animateTransform
                attributeName="transform"
                type="translate"
                values="40,55; 110,72; 175,58; 145,85; 40,55"
                dur="6s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
              />
            </path>
          </g>
        </svg>
      );

    case "layers":
      return (
        <svg viewBox="0 0 240 120" className="h-full w-full" fill="none">
          {[0, 1, 2].map((row) => (
            <g key={row} opacity={0.6 + row * 0.15}>
              {Array.from({ length: 18 }).map((_, col) => {
                const cx = 25 + col * 11;
                const cy = 35 + row * 22;
                return (
                  <circle
                    key={`${row}-${col}`}
                    cx={cx}
                    cy={cy}
                    r="2"
                    fill="#fafafa"
                  >
                    <animate
                      attributeName="opacity"
                      values="0.3;1;0.3"
                      dur={`${2 + ((row + col) % 4) * 0.3}s`}
                      begin={`${(row + col) * 0.05}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}
            </g>
          ))}
        </svg>
      );

    case "gauge":
      return (
        <svg viewBox="0 0 240 120" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="g-bar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(30, ${20 + i * 22})`}>
              <rect
                width="180"
                height="6"
                rx="3"
                fill="rgba(255,255,255,0.06)"
              />
              <rect width="180" height="6" rx="3" fill="url(#g-bar)" opacity="0.85">
                <animate
                  attributeName="width"
                  values={`${30 + i * 15};${120 + (i % 2) * 30};${60 + i * 10}`}
                  dur={`${3 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          ))}
        </svg>
      );

    case "globe":
      return (
        <svg viewBox="0 0 240 120" className="h-full w-full" fill="none">
          <g transform="translate(120, 60)">
            <circle r="42" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <ellipse
              rx="42"
              ry="14"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
            />
            <ellipse
              rx="14"
              ry="42"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="1"
            />
            <ellipse
              rx="42"
              ry="28"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            {/* Pulse points */}
            {[
              [-22, -18],
              [18, -22],
              [-12, 26],
              [28, 12],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="2" fill="#ff3d8a" />
                <circle cx={cx} cy={cy} r="2" fill="#ff3d8a" opacity="0.4">
                  <animate
                    attributeName="r"
                    values="2;14;2"
                    dur={`${2 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.5;0;0.5"
                    dur={`${2 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            ))}
          </g>
        </svg>
      );

    case "flow":
      return (
        <svg viewBox="0 0 720 120" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="f-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff6b6b" />
              <stop offset="50%" stopColor="#ff3d8a" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="#ff3d8a" />
            </marker>
          </defs>
          {/* Boxes */}
          {[
            { x: 30, label: "Audit" },
            { x: 200, label: "Prototype" },
            { x: 370, label: "Harden" },
            { x: 550, label: "Ship" },
          ].map((b, i) => (
            <g key={i}>
              <rect
                x={b.x}
                y={42}
                width="120"
                height="36"
                rx="18"
                stroke="rgba(255,255,255,0.18)"
                fill="rgba(255,255,255,0.02)"
              />
              <text
                x={b.x + 60}
                y={65}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="11"
                fill="rgba(250,250,250,0.7)"
                letterSpacing="1.4"
              >
                {b.label.toUpperCase()}
              </text>
            </g>
          ))}
          {/* Arrows */}
          {[150, 320, 490].map((x, i) => (
            <path
              key={i}
              d={`M${x} 60 Q${x + 25} ${i % 2 === 0 ? 40 : 80} ${x + 50} 60`}
              stroke="url(#f-grad)"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#arrowhead)"
              strokeDasharray="3 4"
              opacity="0.85"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-14"
                dur={`${2.5 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </path>
          ))}
        </svg>
      );

    default:
      return null;
  }
}
