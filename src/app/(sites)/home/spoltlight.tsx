import React from "react";
import {
  ScanSearch,
  HeartPulse,
  ShieldCheck,
  AlertTriangle,
  History,
  Lock,
  TabletSmartphone,
  FileText,
} from "lucide-react";

export default function SPotlight() {
  return (
    <div className="w-full bg-blue-50 px-4 py-16 lg:min-w-[800px] lg:px-4 dark:bg-black">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Features That Keep You Informed
        </h2>
        <p className="mb-12 text-center text-gray-700 dark:text-gray-300">
          From AI insights to smart alerts, we've built tools that help you make better, safer
          decisions in seconds.
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Feature 1 */}
          <FeatureCard
            icon={<ScanSearch className="h-12 w-12 text-violet-400" />}
            title="AI Ingredient Scan"
            description="Get real-time analysis of ingredients using advanced AI. Understand what's inside – instantly and accurately."
          />

          {/* Feature 2 */}
          <FeatureCard
            icon={<HeartPulse className="h-12 w-12 text-violet-400" />}
            title="Smart Health Score"
            description="Each product gets a score based on safety, allergens, and toxicity. Simpler decisions, smarter choices."
          />

          {/* Feature 3 */}
          <FeatureCard
            icon={<ShieldCheck className="h-12 w-12 text-violet-400" />}
            title="Safe Alternatives"
            description="Suggests cleaner, safer products to replace harmful ones. Based on your scan history."
          />

          {/* Feature 4 */}
          <FeatureCard
            icon={<AlertTriangle className="h-12 w-12 text-violet-400" />}
            title="Toxin Detection"
            description="Instantly flags harmful or banned ingredients. Know exactly what to avoid."
          />

          {/* Feature 5 */}
          <FeatureCard
            icon={<History className="h-12 w-12 text-violet-400" />}
            title="Scan History Log"
            description="Access all your past scans and reports in one place. Track progress and patterns over time."
          />

          {/* Feature 6 */}
          <FeatureCard
            icon={<Lock className="h-12 w-12 text-violet-400" />}
            title="Privacy Protected"
            description="Your scans are encrypted and never shared. 100% secure and anonymous usage."
          />
          <FeatureCard
            icon={<TabletSmartphone className="h-12 w-12 text-violet-400" />}
            title="All in one app"
            description="Scan Food,Skincare,Haircare and makeup-all in one place.Designed for everyday convenience."
          />
          <FeatureCard
            icon={<FileText className="h-12 w-12 text-violet-400" />}
            title="Expert backed Result"
            description="Reports are curated with experts research and verified sources.Trusts the facts behind the feedback"
          />
        </div>

        <div className="mt-12 text-center">{/* Add CTA buttons here if needed */}</div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-gray-800">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="mb-2 text-center text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-center text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}
