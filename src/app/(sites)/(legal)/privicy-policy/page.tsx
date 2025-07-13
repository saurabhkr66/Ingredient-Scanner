import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            Privacy Policy
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto max-w-4xl text-xl">
          Your privacy is important to us. This policy explains how we collect, use, and protect
          your data when you use Purley Scan, a service provided by Lumovate Intelligence. By using
          our service, you agree to the collection and use of information in accordance with this
          policy.
        </p>
      </div>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="p-6 pt-6">
            <p className="text-muted-foreground">
              This Privacy Policy explains how we collect, use, and protect your information when
              you use Purley Scan. By using our service, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">
              1. Information We Collect
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">1.1 Account Information</h3>
                <p className="text-muted-foreground">
                  We use Clerk for authentication services, which manages:
                </p>
                <ul className="text-muted-foreground mt-2 list-disc pl-6">
                  <li>Email address and authentication credentials</li>
                  <li>Profile information (name, profile picture)</li>
                  <li>Account preferences and settings</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">
                  1.2 Access to Your Scan History and Editing History
                </h3>
                <p className="text-muted-foreground">
                  We store your scan and editing history to provide:
                </p>
                <ul className="text-muted-foreground mt-2 list-disc pl-6">
                  <li>Access to your scan history</li>
                  <li>Continuity in editing and reference to previous scans</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">1.3 Payment Information</h3>
                <p className="text-muted-foreground">
                  Payment processing is handled securely through Razorpay and PayPal. We do not
                  store your sensitive payment details (such as credit card numbers) on our servers.
                  We only store transaction records (transaction IDs and relevant details) for
                  accounting purposes.
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">1.4 Usage Information</h3>
                <p className="text-muted-foreground">
                  We collect data about how you use our platform, including:
                </p>
                <ul className="text-muted-foreground mt-2 list-disc pl-6">
                  <li>AI model interactions and requests</li>
                  <li>Features and tools used</li>
                  <li>Technical information about your browser and device</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">
              2. How We Use Your Information
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">2.1 Service Provision</h3>
                <ul className="text-muted-foreground list-disc pl-6">
                  <li>To process your requests and provide services</li>
                  <li>To maintain your scan history and preferences</li>
                  <li>To handle payments and subscriptions</li>
                  <li>To provide customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">2.2 Communications</h3>
                <p className="text-muted-foreground">We may send you emails about:</p>
                <ul className="text-muted-foreground mt-2 list-disc pl-6">
                  <li>New features, tools, and AI models</li>
                  <li>Platform updates and changes</li>
                  <li>Subscription status and renewals</li>
                  <li>Service-related announcements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">
              3. Data Control and Retention
            </div>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">3.1 Your Control Over Data</h3>
                <p className="text-muted-foreground">
                  You have full control over your data. You can:
                </p>
                <ul className="text-muted-foreground mt-2 list-disc pl-6">
                  <li>Manage your profile information through Clerk</li>
                  <li>Request account deletion at any time</li>
                  <li>Opt out of marketing communications</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">3.2 Data Retention</h3>
                <p className="text-muted-foreground">
                  We retain your payment and scan history until you opt out of our services. Once
                  you opt out, your data will be permanently deleted from our systems and cannot be
                  recovered.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">4. Security</div>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                We implement various security measures to protect your information, including:
              </p>
              <ul className="text-muted-foreground list-disc pl-6">
                <li>Secure authentication through Clerk</li>
                <li>Encrypted data transmission using TLS</li>
                <li>Secure payment processing through Razorpay and PayPal</li>
                <li>Regular security updates and monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">5. Cookies</div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              We use cookies to store essential information for the functioning of our platform.
              These cookies may store user preferences and session information to improve your
              experience. No personal information is stored in cookies.
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">
              6. Changes to This Policy
            </div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new privacy policy on this page and updating the "Last Updated" date.
            </p>
          </div>
        </div>

        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">7. Contact Us</div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at: <br />
              <span className="font-medium">support@lumovateintelligence.com</span>
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
