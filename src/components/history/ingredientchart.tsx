"use client";

import { useEffect, useRef } from "react";

interface IngredientChartProps {
  Concerns: number;
  Allergens: number;
  Safe: number;
}

export default function IngredientChart({ Concerns, Allergens, Safe }: IngredientChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate total for proportions
    const total = Concerns + Allergens + Safe;
    if (total === 0) return;

    // Draw white circle background
    ctx.beginPath();
    ctx.arc(centerX, centerY, width * 0.45, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw the arcs
    const drawArc = (
      startAngle: number,
      endAngle: number,
      radius: number,
      color: string,
      lineWidth: number,
    ) => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    };

    // Calculate angles based on proportions
    const potentialConcernsRatio = Concerns / total;
    const commonAllergensRatio = Allergens / total;
    const generallySafeRatio = Safe / total;

    // Starting angle (top of circle)
    const startAngle = -Math.PI / 2;

    // Draw background arcs (lighter versions of the colors)
    drawArc(0, Math.PI * 2, width * 0.35, "rgba(239, 68, 68, 0.1)", 20); // Red - Potential Concerns
    drawArc(0, Math.PI * 2, width * 0.28, "rgba(250, 204, 21, 0.1)", 20); // Yellow - Common Allergens
    drawArc(0, Math.PI * 2, width * 0.21, "rgba(34, 197, 94, 0.1)", 20); // Green - Generally Safe

    // Draw data arcs
    if (Concerns > 0) {
      const potentialConcernsAngle = startAngle + Math.PI * 2 * potentialConcernsRatio;
      drawArc(startAngle, potentialConcernsAngle, width * 0.35, "rgb(239, 68, 68)", 20); // Red
    }

    if (Allergens > 0) {
      const commonAllergensAngle = startAngle + Math.PI * 2 * commonAllergensRatio;
      drawArc(startAngle, commonAllergensAngle, width * 0.28, "rgb(250, 204, 21)", 20); // Yellow
    }

    if (Safe > 0) {
      const generallySafeAngle = startAngle + Math.PI * 2 * generallySafeRatio;
      drawArc(startAngle, generallySafeAngle, width * 0.21, "rgb(34, 197, 94)", 20); // Green
    }

    // Add labels
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "right";
    // ctx.fillText("Potential Concerns", centerX - width * 0.05, centerY - width * 0.15)

    ctx.textAlign = "right";
    // ctx.fillText("Common Allergens", centerX - width * 0.05, centerY)

    ctx.textAlign = "right";
    // ctx.fillText("Generally Safe", centerX - width * 0.05, centerY + width * 0.15)
  }, [Concerns, Allergens, Safe]);

  return <canvas ref={canvasRef} width={400} height={400} className="h-full w-full" />;
}
