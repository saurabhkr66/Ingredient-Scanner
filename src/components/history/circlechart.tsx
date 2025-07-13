"use client";

import { useState, useEffect } from "react";

interface GaugeProps {
  score: number;
  maxScore?: number;
  showWarning?: boolean;
  warningMessage?: string;
}

export default function CircularGauge({
  score,
  maxScore = 100,
  showWarning = true,
  warningMessage,
}: GaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const startTime = Date.now();
    const startValue = animatedScore;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const easedProgress = easeOutQuad(progress);

      setAnimatedScore(startValue + (score - startValue) * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const percentage = (animatedScore / maxScore) * 100;
  const angle = (percentage / 100) * 180;
  const radius = 80;
  const centerX = 100;
  const centerY = 100;
  const startAngle = 180;
  const endAngle = 180 + angle;

  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;

  const startX = centerX + radius * Math.cos(startRad);
  const startY = centerY + radius * Math.sin(startRad);
  const endX = centerX + radius * Math.cos(endRad);
  const endY = centerY + radius * Math.sin(endRad);

  const largeArcFlag = angle > 180 ? 1 : 0;
  const arcPath = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

  const getColor = (score: number) => {
    if (score < 40) return "#FF3B30";
    if (score < 70) return "#FF9500";
    if (score < 90) return "#77c676";
    return "#34C759";
  };

  const arcColor = getColor(animatedScore);

  const generateTicks = () => {
    const ticks = [];
    const tickCount = 20;

    for (let i = 0; i <= tickCount; i++) {
      const tickAngle = 180 + (i / tickCount) * 180;
      const tickRad = (tickAngle * Math.PI) / 180;
      const innerRadius = radius + 5;
      const outerRadius = radius + 15;

      const innerX = centerX + innerRadius * Math.cos(tickRad);
      const innerY = centerY + innerRadius * Math.sin(tickRad);
      const outerX = centerX + outerRadius * Math.cos(tickRad);
      const outerY = centerY + outerRadius * Math.sin(tickRad);

      const isColored = (i / tickCount) * 100 <= percentage;
      const tickColor = isColored ? getColor((i / tickCount) * 100) : "#E5E5EA";

      ticks.push(
        <line
          key={i}
          x1={innerX}
          y1={innerY}
          x2={outerX}
          y2={outerY}
          stroke={tickColor}
          strokeWidth={3}
          strokeLinecap="round"
        />,
      );
    }

    return ticks;
  };

  let computedWarning = "";
  if (score < 50) computedWarning = "Not Fit For Use";
  else if (score < 75) computedWarning = "Use With Caution";
  else computedWarning = "Safe For Use";

  let warningDescription = "";
  if (score < 50) warningDescription = "product is not fit for use.";
  else if (score < 75) warningDescription = " product is safe but use with caution.";
  else warningDescription = " product is safe for use.";

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[200px] w-[200px]">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <path
            d={`M ${startX} ${startY} A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`}
            fill="none"
            stroke="#E5E5EA"
            strokeWidth={6}
            strokeLinecap="round"
          />
          <path d={arcPath} fill="none" stroke={arcColor} strokeWidth={6} strokeLinecap="round" />
          {generateTicks()}
          <circle cx={startX} cy={startY} r={4} fill={arcColor} />
          <circle cx={endX} cy={endY} r={4} fill={arcColor} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex h-[120px] w-[120px] flex-col items-center justify-center rounded-full bg-[#F2F7FF] shadow-sm dark:bg-black">
            <div className="text-3xl font-bold">{Math.round(animatedScore)}</div>
            <div className="text-sm text-gray-400">/ {maxScore}</div>
          </div>
        </div>
      </div>

      {showWarning && (
        <div
          className="mt-4 flex items-center rounded-full px-4 py-2"
          style={{
            backgroundColor: arcColor + "20", // adds transparency (lightens color)
            border: `1px solid ${arcColor}`,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-7v2h2v-2h-2zm0-8v6h2V7h-2z"
              fill="#FFCC00"
            />
          </svg>

          <span className="ml-2" style={{ color: arcColor }}>
            {warningMessage ?? computedWarning}
          </span>
        </div>
      )}
      <div className="mt-4 flex flex-col items-center">
        <span className="mt-4 mb-2 text-lg">
          <b>Summary Note</b>
        </span>
        <span>{warningDescription}</span>
      </div>
    </div>
  );
}
