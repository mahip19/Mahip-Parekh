"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function RpmGauge() {
  const gaugeRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [rpmValue, setRpmValue] = useState(0);

  useEffect(() => {
    const element = gaugeRef.current;
    if (!element) return;

    const stopAnimation = () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };

    const startAnimation = () => {
      stopAnimation();
      setRpmValue(0);

      const keyframes = [
        // Launch / 1st gear: very fast rev
        { time: 0, value: 0 },
        { time: 0.08, value: 900 },

        // 1st gear: fast pull
        { time: 0.34, value: 6500 },

        // Shift 1 -> 2: quick realistic drop
        { time: 0.4, value: 4500 },

        // 2nd gear: medium pull
        { time: 0.68, value: 6800 },

        // Shift 2 -> 3
        { time: 0.74, value: 5200 },

        // 3rd gear: slower final climb
        { time: 1, value: 7000 },
      ];

      const duration = 3600;
      const startTime = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const getRpmAtProgress = (progress: number) => {
        for (let i = 0; i < keyframes.length - 1; i++) {
          const current = keyframes[i];
          const next = keyframes[i + 1];

          if (progress >= current.time && progress <= next.time) {
            const localProgress =
              (progress - current.time) / (next.time - current.time);

            const easedProgress =
              next.value < current.value
                ? localProgress // quick linear drop during shift
                : easeOutCubic(localProgress); // smooth acceleration

            return current.value + (next.value - current.value) * easedProgress;
          }
        }

        return 7000;
      };

      const tick = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const nextValue = Math.round(getRpmAtProgress(rawProgress));

        setRpmValue(nextValue);

        if (rawProgress < 1) {
          animationRef.current = requestAnimationFrame(tick);
        }
      };

      animationRef.current = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
          setRpmValue(0);
        }
      },
      {
        threshold: 0.45,
      },
    );

    observer.observe(element);

    return () => {
      stopAnimation();
      observer.disconnect();
    };
  }, []);

  const progress = rpmValue / 7000;

  // 0 RPM = left side, 7000 RPM = right side
  const needleAngle = 180 + progress * 180;

  return (
    <motion.div
      ref={gaugeRef}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.45 }}
      className="relative z-10 mx-auto mb-10 h-44 w-[20rem] md:w-[24rem]"
    >
      <svg viewBox="0 0 320 190" className="h-full w-full">
        <defs>
          <linearGradient
            id="rpmGradient"
            x1="60"
            y1="145"
            x2="260"
            y2="145"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#f5f5f5" />
            <stop offset="72%" stopColor="#f5f5f5" />
            <stop offset="84%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        {/* Base outer arc */}
        <path
          d="M 60 145 A 100 100 0 0 1 260 145"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Dotted inner arc */}
        <path
          d="M 78 145 A 82 82 0 0 1 242 145"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="2 8"
        />

        {/* Active progress arc */}
        <path
          d="M 60 145 A 100 100 0 0 1 260 145"
          fill="none"
          stroke="rgba(255,255,255,0.88)"
          strokeWidth="10"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - progress}
        />
        {/* Danger zone band */}
        <path
          d="M 222 94 A 100 100 0 0 2 260 145"
          fill="none"
          stroke="rgba(239,68,68,0.35)"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Focus zone accent */}
        {/* <path
          d="M 225 91 A 100 100 0 0 1 260 145"
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="5"
          strokeLinecap="round"
        /> */}
        {/* Active progress arc */}
        <path
          d="M 60 145 A 100 100 0 0 1 260 145"
          fill="none"
          stroke="url(#rpmGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={1 - progress}
        />

        {/* Tick marks */}
        {/* Tick marks */}
        {Array.from({ length: 21 }).map((_, index) => {
          const angle = Math.PI - (index / 20) * Math.PI;
          const cx = 160;
          const cy = 145;
          const outerRadius = 108;
          const innerRadius = index % 5 === 0 ? 90 : 97;

          const x1 = cx + outerRadius * Math.cos(angle);
          const y1 = cy - outerRadius * Math.sin(angle);
          const x2 = cx + innerRadius * Math.cos(angle);
          const y2 = cy - innerRadius * Math.sin(angle);

          let strokeColor = "rgba(255,255,255,0.22)";

          if (index >= 18) {
            strokeColor = "rgba(239,68,68,0.85)";
          } else if (index >= 16) {
            strokeColor = "rgba(245,158,11,0.8)";
          } else if (index % 5 === 0) {
            strokeColor = "rgba(255,255,255,0.5)";
          }

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeColor}
              strokeWidth={index % 5 === 0 ? "2" : "1"}
              strokeLinecap="round"
            />
          );
        })}

        {/* RPM labels */}
        {/* RPM labels */}
        {[
          { label: "0", x: 62, y: 157, color: "#71717a" },
          { label: "2", x: 96, y: 87, color: "#71717a" },
          { label: "4", x: 160, y: 56, color: "#71717a" },
          { label: "6", x: 224, y: 87, color: "#f59e0b" },
          { label: "7", x: 258, y: 157, color: "#ef4444" },
        ].map((item) => (
          <text
            key={item.label}
            x={item.x}
            y={item.y}
            textAnchor="middle"
            fill={item.color}
            fontSize="10"
            fontWeight="500"
          >
            {item.label}
          </text>
        ))}

        {/* Center number */}
        <text
          x="160"
          y="95"
          textAnchor="middle"
          className="fill-white text-[28px] font-semibold tracking-tight"
        >
          {rpmValue}
        </text>

        <text
          x="160"
          y="120"
          textAnchor="middle"
          className="fill-zinc-500 text-[10px] tracking-[0.32em]"
        >
          RPM x1000
        </text>

        <text
          x="160"
          y="175"
          textAnchor="middle"
          className="fill-zinc-500 text-[9px] tracking-[0.35em]"
        >
          FOCUS ZONE
        </text>

        {/* Needle */}
        <g transform={`rotate(${needleAngle} 160 145)`}>
          <line
            x1="160"
            y1="145"
            x2="238"
            y2="145"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="160"
            y1="145"
            x2="145"
            y2="145"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>

        {/* Center hub */}
        <circle
          cx="160"
          cy="145"
          r="10"
          fill="#09090b"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        <circle cx="160" cy="145" r="6" fill="white" />
      </svg>
    </motion.div>
  );
}

{
  /* philosophy */
}

{
  /* <section className="border-y border-zinc-800 bg-zinc-950 px-5 py-20 text-center text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
          The 7,000 RPM Philosophy
        </p>

        <blockquote className="mx-auto max-w-4xl text-2xl font-medium leading-relaxed tracking-tight text-zinc-100 md:text-4xl">
          “There is a point where the noise fades and the system becomes clear.”
        </blockquote>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400">
          Coding feels the same to me. When I am fully locked in, the distractions
          disappear. I stop seeing isolated files and start seeing the flow of the
          entire application — how data moves, where logic breaks, and how each
          piece connects.
        </p>

        <p className="mt-8 font-mono text-lg text-zinc-200">
          &lt;That is the zone I chase every time I open my editor. /&gt;
        </p>
      </div>
      </section> */
}
{
  /* <section className="relative overflow-hidden border-y border-zinc-800 bg-zinc-950 px-5 py-24 text-center text-white md:px-8">
  <motion.div
    initial={{ opacity: 0.35, scale: 1.1 }}
    whileInView={{ opacity: 0.12, scale: 1 }}
    transition={{ duration: 1.4, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.45 }}
    className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[120px]"
  />

  <motion.div
    initial={{ opacity: 0.16 }}
    whileInView={{ opacity: 0.05 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.45 }}
    className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)] [background-size:26px_26px]"
  />

  <div className="absolute inset-0">
    {[...Array(24)].map((_, index) => (
      <motion.span
        key={index}
        className="absolute h-1 w-1 rounded-full bg-white/30"
        style={{
          left: `${8 + ((index * 37) % 84)}%`,
          top: `${12 + ((index * 29) % 74)}%`,
        }}
        animate={{
          opacity: [0.15, 0.45, 0.1],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3 + (index % 5),
          repeat: Infinity,
          delay: index * 0.08,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>

  <motion.div
    initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    viewport={{ once: false, amount: 0.45 }}
    className="relative z-10 mx-auto max-w-5xl"
  >
    <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
      The 7,000 RPM Philosophy
    </p>

    <blockquote className="mx-auto max-w-4xl text-2xl font-medium leading-relaxed tracking-tight text-zinc-100 md:text-4xl">
      “There is a point where the noise fades and the system becomes clear.”
    </blockquote>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.45 }}
      className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-zinc-400"
    >
      Coding feels the same to me. When I am fully locked in, the distractions
      disappear. I stop seeing isolated files and start seeing the flow of the
      entire application — how data moves, where logic breaks, and how each
      piece connects.
    </motion.p>

    <motion.p
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.38, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.45 }}
      className="mt-8 font-mono text-lg text-zinc-200"
    >
      &lt;That is the zone I chase every time I open my editor. /&gt;
    </motion.p>
  </motion.div>
</section> */
}
