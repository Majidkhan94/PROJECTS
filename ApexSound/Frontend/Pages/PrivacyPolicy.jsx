import { Heading, Paragraph, PageHeader } from "../Export.js";

export const PrivacyPolicy = () => {
  return (
    <section className="mx-5 mt-5 mb-10">
      <PageHeader text="Privacy Policy" />

      <div className="flex flex-col gap-6 mt-6 bg-background-color rounded-2xl p-10">
        <div className="flex flex-col gap-2">
          <Heading text="1. Information We Collect" className="text-xl!" />
          <Paragraph text="We collect personal information such as your name, email address, phone number, and shipping address when you create an account, place an order, or contact our support team." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="2. How We Use Your Information" className="text-xl!" />
          <Paragraph text="Your information is used to process orders, provide customer support, send order updates, and improve our products and services. We do not sell your personal data to third parties." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="3. Cookies" className="text-xl!" />
          <Paragraph text="Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings at any time." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="4. Data Security" className="text-xl!" />
          <Paragraph text="We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="5. Third-Party Services" className="text-xl!" />
          <Paragraph text="We may use trusted third-party services for payment processing and delivery. These providers only access the information necessary to perform their services." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="6. Your Rights" className="text-xl!" />
          <Paragraph text="You have the right to access, update, or request deletion of your personal data at any time by contacting our support team." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="7. Policy Updates" className="text-xl!" />
          <Paragraph text="This Privacy Policy may be updated periodically. Any changes will be posted on this page with an updated revision date." />
        </div>
      </div>
    </section>
  );
};