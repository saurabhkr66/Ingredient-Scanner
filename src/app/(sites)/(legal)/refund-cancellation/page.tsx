export default function RefundAndCancellationPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            Refund & Cancellation Policy
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
          Understanding our no-refund policy and credit system
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <div
          role="alert"
          className="[&>svg]:text-foreground bg-background text-foreground border-primary/20 relative w-full rounded-lg border-2 px-4 py-3 text-sm [&>svg]:absolute [&>svg]:top-4 [&>svg]:left-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7"
        >
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
            className="lucide lucide-circle-alert text-primary h-5 w-5"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>
          <div className="text-muted-foreground mt-1.5 ml-2 text-sm [&_p]:leading-relaxed">
            Please note: We do not offer refunds for any payments made. All purchases are final.
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
                className="lucide lucide-ban text-primary h-6 w-6"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m4.9 4.9 14.2 14.2"></path>
              </svg>
              <div className="leading-none font-semibold tracking-tight">No-Refund Policy</div>
            </div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <p className="text-muted-foreground">
              At Purley Scan, we maintain a strict no-refund policy:
            </p>
            <ul className="text-muted-foreground list-disc space-y-2 pl-6">
              <li>
                All payments made for subscriptions or one-time credits are final and non-refundable
              </li>
              <li>We cannot process refunds for partially used subscription periods</li>
              <li>One-time credit purchases cannot be reversed or refunded</li>
              <li>Subscription payments cannot be refunded once processed</li>
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
                className="lucide lucide-wallet text-primary h-6 w-6"
              >
                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
              </svg>
              <div className="leading-none font-semibold tracking-tight">Credit Types</div>
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
                One-Time Credits
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>Purchased as a one-time payment</li>
                <li>Never expire - valid indefinitely</li>
                <li>Can be used anytime</li>
                <li>Cannot be converted back to cash</li>
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
                  className="lucide lucide-refresh-ccw text-primary h-5 w-5"
                >
                  <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                  <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                  <path d="M16 16h5v5"></path>
                </svg>
                Subscription Credits
              </h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>Part of monthly subscription plans</li>
                <li>Reset every billing cycle</li>
                <li>Expire at the end of each billing cycle</li>
                <li>Unused credits do not carry forward to next month</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border-2 shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">
              Subscription Cancellation
            </div>
          </div>
          <div className="space-y-6 p-6 pt-0">
            <div>
              <h3 className="mb-3 font-semibold">Cancellation Process</h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>Cancel anytime through your account dashboard</li>
                <li>Access Billings Page → Subscription Card → Cancel Subscription</li>
                <li>Subscription remains active until the current billing period ends</li>
                <li>No charges will be made from the next billing cycle</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">After Cancellation</h3>
              <ul className="text-muted-foreground list-disc space-y-2 pl-6">
                <li>
                  You can continue using your subscription credits until the end of the current
                  billing period
                </li>
                <li>
                  Any unused subscription credits will expire at the end of the billing period
                </li>
                <li>One-time credits remain valid and usable even after subscription ends</li>
                <li>You can reactivate your subscription at any time</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border-2 shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">Contact Support</div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              For questions about your subscription or credits, contact us at{" "}
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
