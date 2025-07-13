export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          <span className="from-primary to-primary/60 bg-gradient-to-r bg-clip-text text-transparent">
            Terms and Conditions
          </span>
        </h1>
        <p className="text-muted-foreground text-xl">
          Please read these terms carefully before using our platform
        </p>
      </div>
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="p-6 pt-6">
            <p className="text-muted-foreground">
              These Terms and Conditions ("Terms") govern your access to and use of Lumovate
              Intelligence's platform and services. By using our platform, you agree to be bound by
              these Terms.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">1. Service Description</div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <p className="text-muted-foreground">
              Lumovate Intelligence provides a unified platform for scanning various ingredients and
              generating detailed reports using OpenAI's GPT-4.
            </p>
            <div>
              <h3 className="mb-2 font-semibold">1.1 Service Availability</h3>
              <p className="text-muted-foreground">
                While we strive to maintain high availability, our service depends on third-party AI
                providers. Service interruptions may occur due to:
              </p>
              <ul className="text-muted-foreground mt-2 list-disc pl-6">
                <li>Maintenance or updates</li>
                <li>Third-party AI service disruptions</li>
                <li>Technical issues beyond our control</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">1.2 Platform Updates</h3>
              <p className="text-muted-foreground">
                We continuously improve our platform and may add, modify, or remove features. We'll
                notify users about significant changes through email or platform announcements.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">2. Usage and Credits</div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div>
              <h3 className="mb-2 font-semibold">2.1 Credit System</h3>
              <p className="text-muted-foreground">
                Our platform operates on a credit-based system:
              </p>
              <ul className="text-muted-foreground mt-2 list-disc pl-6">
                <li>Credits are deducted based on scans and ingredient analysis</li>
                <li>Credits never expire</li>
                <li>No usage limits as long as you have available credits</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">2.2 Fair Usage</h3>
              <p className="text-muted-foreground">
                While we don't impose strict usage limits, we expect users to utilize the platform
                responsibly and not engage in activities that could harm the service or other users.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">
              3. Subscription and Payments
            </div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div>
              <h3 className="mb-2 font-semibold">3.1 Billing</h3>
              <ul className="text-muted-foreground list-disc pl-6">
                <li>Subscription fees are charged according to your chosen plan</li>
                <li>You can cancel your subscription at any time</li>
                <li>
                  After cancellation, you can use remaining credits until your billing period ends
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">3.2 Refund Policy</h3>
              <p className="text-muted-foreground">
                We do not offer refunds for purchased credits or subscription plans. You can cancel
                your subscription anytime to prevent future charges.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">4. Reports and Content</div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div>
              <h3 className="mb-2 font-semibold">4.1 User Rights</h3>
              <p className="text-muted-foreground">
                You retain full rights to use any scan reports or AI-generated analysis obtained
                through our platform.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">4.2 Content Disclaimer</h3>
              <p className="text-muted-foreground">
                We don't guarantee the accuracy, quality, or completeness of scan results. Users are
                responsible for verifying and validating the output before relying on it.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">
              5. Limitation of Liability
            </div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              Our service is provided "as is" without warranties of any kind. We are not liable for:
            </p>
            <ul className="text-muted-foreground list-disc pl-6">
              <li>Service interruptions or downtime</li>
              <li>Inaccuracies in scan results or analysis</li>
              <li>Third-party AI service disruptions</li>
              <li>Any indirect, consequential, or incidental damages</li>
            </ul>
          </div>
        </div>

        {/* Section 6 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">6. Governing Law</div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              These Terms are governed by the laws of India. Any disputes arising from these Terms
              or your use of the platform will be subject to the exclusive jurisdiction of the
              courts in India.
            </p>
          </div>
        </div>

        {/* Section 7 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">7. Changes to Terms</div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              We may update these Terms from time to time. We will notify users of any material
              changes via email or through the platform. Continued use of the platform after such
              changes constitutes acceptance of the new Terms.
            </p>
          </div>
        </div>

        {/* Section 8 */}
        <div className="bg-card text-card-foreground rounded-xl border shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <div className="leading-none font-semibold tracking-tight">8. Contact Us</div>
          </div>
          <div className="p-6 pt-0">
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at:
              <br />
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
