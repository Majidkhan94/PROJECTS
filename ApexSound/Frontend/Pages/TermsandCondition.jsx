import { Heading, Paragraph, PageHeader } from "../Export.js";

export const TermsandCondition = () => {
  return (
    <section className="mx-5 mt-5 mb-10">
      <PageHeader text="Terms & Conditions" />

      <div className="flex flex-col gap-6 mt-6 bg-background-color rounded-2xl p-10">
        <div className="flex flex-col gap-2">
          <Heading text="1. Acceptance of Terms" className="text-xl!" />
          <Paragraph text="By accessing and using the ApexSound website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="2. Use of Website" className="text-xl!" />
          <Paragraph text="You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, this site by any third party." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="3. Product Information" className="text-xl!" />
          <Paragraph text="We strive to display accurate product details, pricing, and availability. However, we do not warrant that product descriptions or other content are entirely error-free." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="4. Orders & Payments" className="text-xl!" />
          <Paragraph text="All orders are subject to acceptance and availability. Payment must be received in full before an order is processed and shipped." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="5. Intellectual Property" className="text-xl!" />
          <Paragraph text="All content on this website, including logos, text, graphics, and product designs, is the property of ApexSound and protected by applicable copyright and trademark laws." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="6. Limitation of Liability" className="text-xl!" />
          <Paragraph text="ApexSound shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="7. Changes to Terms" className="text-xl!" />
          <Paragraph text="We reserve the right to update these Terms & Conditions at any time. Continued use of the website after changes constitutes acceptance of the revised terms." />
        </div>
      </div>
    </section>
  );
};