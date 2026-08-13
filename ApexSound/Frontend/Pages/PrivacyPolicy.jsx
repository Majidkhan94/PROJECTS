import { Heading, Paragraph, PageHeader, Pagetitle } from "../Export.js";

const privacyContent = [
  {
    heading: "1. Information We Collect",
    text: "We collect personal information such as your name, email address, phone number, and shipping address when you create an account, place an order, or contact our support team.",
  },
  {
    heading: "2. How We Use Your Information",
    text: "Your information is used to process orders, provide customer support, send order updates, and improve our products and services. We do not sell your personal data to third parties.",
  },
  {
    heading: "3. Cookies",
    text: "Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze site traffic. You can disable cookies in your browser settings at any time.",
  },
  {
    heading: "4. Data Security",
    text: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.",
  },
  {
    heading: "5. Third-Party Services",
    text: "We may use trusted third-party services for payment processing and delivery. These providers only access the information necessary to perform their services.",
  },
  {
    heading: "6. Your Rights",
    text: "You have the right to access, update, or request deletion of your personal data at any time by contacting our support team.",
  },
  {
    heading: "7. Policy Updates",
    text: "This Privacy Policy may be updated periodically. Any changes will be posted on this page with an updated revision date.",
  },
];

export const PrivacyPolicy = () => {

return (<>
  {/* Page Title  */}
  <Pagetitle title={"Privacy Policy"} />
  
  <section className="m-5">
    <PageHeader text="Privacy Policy" />
    <div className="flex flex-col gap-6 my-10 px-10 md:px-50">
      {privacyContent.map(({ heading, text }) => (
        <div key={heading} className="flex flex-col gap-2">
          <Heading text={heading} className="text-2xl!" />
          <Paragraph text={text} />
        </div>
      ))}
    </div>
  </section>
</>);
};