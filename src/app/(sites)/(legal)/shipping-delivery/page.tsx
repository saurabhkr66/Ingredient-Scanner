import React from "react";

export default function page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            Service Delivery Policy
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Instant access to AI services upon credit activation
        </p>
      </div>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="bg-card text-card-foreground rounded-xl border-2 shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-zap text-primary h-6 w-6"
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
              </svg>
              <div className="leading-none font-semibold tracking-tight">
                Instant Service Access
              </div>
            </div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <p className="text-muted-foreground">
              Purley Scan provides immediate access to all services once your account has credits:
            </p>
            <ul className="text-muted-foreground list-disc space-y-2 pl-6">
              <li>Start using AI services immediately after credit activation</li>
              <li>No waiting period - instant access to all platform features</li>
              <li>Access all available AI models and tools instantly</li>
              <li>Begin creating and generating content right away</li>
            </ul>
          </div>
        </div>
        <div className="bg-card text-card-foreground rounded-xl border-2 shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-credit-card text-primary h-6 w-6"
              >
                <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                <line x1="2" x2="22" y1="10" y2="10"></line>
              </svg>
              <div className="leading-none font-semibold tracking-tight">Credit Activation</div>
            </div>
          </div>
          <div className="space-y-6 p-6 pt-0">
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock text-primary h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Subscription Credits
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>Monthly subscription credits activated immediately after payment</li>
                <li>Credits refresh automatically at the start of each billing cycle</li>
                <li>Access continues uninterrupted with active subscription</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 flex items-center gap-2 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-sparkles text-primary h-5 w-5"
                >
                  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                  <path d="M20 3v4"></path>
                  <path d="M22 5h-4"></path>
                  <path d="M4 17v2"></path>
                  <path d="M5 18H3"></path>
                </svg>
                One-Time Credits
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>One-time credit purchases added to your account instantly</li>
                <li>Credits available for immediate use after successful payment</li>
                <li>No activation delay or processing time</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-card text-card-foreground rounded-xl border-2 shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">Service Usage</div>
          </div>
          <div className="p-6 pt-0">
            <ul className="text-muted-foreground list-disc space-y-2 pl-6">
              <li>Use services 24/7 as long as you have available credits</li>
              <li>Credits deducted automatically as you use services</li>
              <li>Real-time credit balance updates</li>
              <li>Continue using services without interruption while credits last</li>
            </ul>
          </div>
        </div>
        <div className="bg-card text-card-foreground rounded-xl border-2 shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">Support Access</div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              Need help getting started? Contact our support team anytime at
              <span className="text-primary font-medium">support@lumovateintelligence.com</span>
            </p>
          </div>
        </div>
        <div className="text-muted-foreground mt-8 text-sm">
          <p>Last updated: January 21, 2025</p>
        </div>
      </div>
    </div>
  );
}
