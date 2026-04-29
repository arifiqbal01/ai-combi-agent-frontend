import { Stack, Text } from '@/ui'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Stack gap="xs">
      <Text weight="semibold">{title}</Text>
      <div className="space-y-2 text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </Stack>
  )
}

export function PrivacyContent() {
  return (
    <div className="max-w-3xl">

      <Stack gap="lg">

        <Text as="h1" size="xl" weight="bold">
          Privacy Policy
        </Text>

        <Text size="sm" tone="secondary">
          Effective date: {new Date().getFullYear()}
        </Text>

        {/* 1 */}
        <Section title="1. Introduction">
          <p>
            This Privacy Policy explains how we collect, use, process, and protect user data
            when you use our Unified Inbox platform (“the Service”).
          </p>
          <p>
            By using the Service, you agree to the practices described in this policy.
          </p>
        </Section>

        {/* 2 */}
        <Section title="2. Information We Access">
          <p>
            When you connect your Google account, we may access certain data through Google APIs, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Gmail message content</li>
            <li>Email metadata (sender, recipient, timestamps)</li>
            <li>Email addresses involved in conversations</li>
          </ul>
          <p>
            We only request access to the minimum data required to provide the Service.
          </p>
        </Section>

        {/* 3 */}
        <Section title="3. How We Use Information">
          <p>We use the accessed data solely to provide core functionality, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Displaying messages in a unified inbox</li>
            <li>Enabling users to read and send replies</li>
            <li>Organizing and managing conversations</li>
            <li>Supporting AI-assisted features such as classification and response generation</li>
          </ul>
          <p>All data usage is limited to delivering user-facing features.</p>
        </Section>

        {/* 4 */}
        <Section title="4. AI Processing and Automation">
          <p>
            The Service includes AI-powered features that assist users in managing and responding to messages.
          </p>
          <p>When enabled, message content may be processed to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Classify messages</li>
            <li>Determine response requirements</li>
            <li>Generate suggested or automated replies</li>
          </ul>
          <p>
            Selected data may be securely transmitted to trusted AI providers (e.g., OpenAI) solely
            to provide functionality.
          </p>
          <p>
            We do not use this data for advertising, profiling, resale, or training generalized AI models
            without explicit consent.
          </p>
        </Section>

        {/* 5 */}
        <Section title="5. Data Isolation and Multi-Tenant Architecture">
          <ul className="list-disc pl-5 space-y-1">
            <li>Each tenant’s data is logically isolated</li>
            <li>Data is not accessible across tenants</li>
            <li>Access controls are enforced at application and database levels</li>
          </ul>
        </Section>

        {/* 6 */}
        <Section title="6. Data Sharing and Disclosure">
          <p>
            We do not sell or share user data for advertising or marketing purposes.
          </p>
          <p>Data may only be shared in limited cases:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>With trusted service providers necessary for functionality</li>
            <li>To comply with legal obligations</li>
            <li>To detect or prevent security issues</li>
          </ul>
        </Section>

        {/* 7 */}
        <Section title="7. Data Storage and Security">
          <p>We use industry-standard practices to protect user data, including:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access control mechanisms</li>
            <li>Secure data storage systems</li>
            <li>Application and network-level protections</li>
          </ul>
        </Section>

        {/* 8 */}
        <Section title="8. Data Retention">
          <p>
            Data is retained only as long as necessary to provide the Service and fulfill legitimate
            business purposes.
          </p>
          <p>
            Users may request deletion of their data at any time, subject to legal obligations.
          </p>
        </Section>

        {/* 9 */}
        <Section title="9. User Control">
          <ul className="list-disc pl-5 space-y-1">
            <li>Disconnect your Google account at any time</li>
            <li>Disable or configure AI features</li>
            <li>Request deletion of your data</li>
          </ul>
        </Section>

        {/* 10 */}
        <Section title="10. Google API Services User Data Policy">
          <p>
            Our use of Google API data complies with the Google API Services User Data Policy,
            including Limited Use requirements.
          </p>
        </Section>

        {/* 11 */}
        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy periodically. Updates will be reflected on this page.
          </p>
        </Section>

        {/* 12 */}
        <Section title="12. Contact Information">
          <p>
            If you have any questions regarding this Privacy Policy, please contact us at:
          </p>
          <p className="font-medium">support@aicombiagent.com</p>
        </Section>

      </Stack>
    </div>
  )
}