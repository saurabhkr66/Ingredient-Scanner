"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme = "system", setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Add transition class when theme changes
  useEffect(() => {
    if (!mounted) return;

    // Add the transition class that's already defined in your global.css
    document.documentElement.classList.add("transition");

    // Remove the transition class after the animation completes
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove("transition");
    }, 500); // Match this with your CSS transition duration

    return () => clearTimeout(timeout);
  }, [theme, mounted]);

  // Only render after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="icon"
      className="relative"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-500 dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
