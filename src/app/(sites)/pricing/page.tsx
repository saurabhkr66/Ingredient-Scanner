// app/pricing/page.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Plan = {
  title: string;
  monthly: string;
  yearly: string;
  description: string;
  features: string[];
  isPopular?: boolean;
};

const plans: Plan[] = [
  {
    title: "Free",
    monthly: "$0",
    yearly: "$0",
    description: "Get started with basic features.",
    features: ["Basic Scanning", "Limited History", "Community Support"],
  },
  {
    title: "Pro",
    monthly: "$12",
    yearly: "$120",
    description: "For individuals who need more power.",
    features: ["Unlimited Scanning", "Detailed Reports", "Priority Support"],
    isPopular: true,
  },
  {
    title: "Enterprise",
    monthly: "$30",
    yearly: "$300",
    description: "Advanced features for businesses.",
    features: ["Team Access", "Custom AI Model", "Dedicated Manager"],
  },
];

const PricingCard = ({
  plan,
  isYearly,
}:{
  plan: Plan;
  isYearly: boolean;
}) => {
  const price = isYearly ? plan.yearly : plan.monthly;

  return (
    <Card
      className={`relative transition-all hover:scale-105 ${
        plan.isPopular ? "border-primary shadow-lg ring-2 ring-primary/30" : ""
      }`}
    >
      {plan.isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-medium text-white shadow">
          Most Popular
        </span>
      )}
      <CardHeader className="text-center pb-3">
        <CardTitle className="text-2xl">{plan.title}</CardTitle>
        <div className="mt-3 text-4xl font-bold text-primary">{price}</div>
        <CardDescription className="mt-1 text-gray-500">{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <Button
          className={`w-full ${
            plan.isPopular
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
              : ""
          }`}
          variant={plan.isPopular ? "default" : "outline"}
        >
          Choose {plan.title}
        </Button>

        <ul className="space-y-2 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-muted-foreground">
              <Check className="mt-0.5 h-4 w-4 text-green-500" /> {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background px-4 py-20 md:px-10 lg:px-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Simple Pricing for Every Need
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Switch plans anytime. No hidden fees.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <span className={`text-sm font-medium ${!isYearly ? "text-primary" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Toggle pressed={isYearly} onPressedChange={setIsYearly} className="border">
            <div className="w-10 h-5 bg-gray-200 rounded-full relative">
              <div
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  isYearly ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
          </Toggle>
          <span className={`text-sm font-medium ${isYearly ? "text-primary" : "text-muted-foreground"}`}>
            Yearly
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.title} plan={plan} isYearly={isYearly} />
        ))}
      </div>
    </div>
  );
}
