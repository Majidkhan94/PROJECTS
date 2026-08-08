import { Heading, Paragraph, PageHeader } from "../Export.js";

export const Support = () => {
  return (
    <section className="mx-5 mt-5 mb-10">
      <PageHeader text="Support" />

      <div className="flex flex-col gap-6 mt-6 bg-background-color rounded-2xl p-10">
        <div className="flex flex-col gap-2">
          <Heading text="How Can We Help?" className="text-xl!" />
          <Paragraph text="Our support team is here to assist you with orders, product issues, returns, and general questions. We aim to respond to all inquiries within 24 hours." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Order Issues" className="text-xl!" />
          <Paragraph text="If your order hasn't arrived, arrived damaged, or you received the wrong item, please contact us with your order number and we will resolve it as quickly as possible." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Product Troubleshooting" className="text-xl!" />
          <Paragraph text="Having trouble pairing your headphones, setting up your microphone, or connecting your speaker? Reach out to our support team with your product model and a description of the issue for step-by-step assistance." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Returns & Exchanges" className="text-xl!" />
          <Paragraph text="Items can be returned or exchanged within 14 days of delivery, provided they are in original condition with packaging. Contact support to initiate a return." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Contact Us" className="text-xl!" />
          <Paragraph text="Email us at support@apexsound.com or use the Contact Us page to submit a request. Our team is available Monday to Saturday, 9 AM to 7 PM." />
        </div>
      </div>
    </section>
  );
};