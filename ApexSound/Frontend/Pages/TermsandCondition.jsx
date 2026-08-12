import { Heading, Paragraph, PageHeader, Pagetitle } from "../Export.js";

const termsContent = [
  {
    heading: "1. Acceptance of Terms",
    text: "By accessing and using the ApexSound website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website or services.",
  },
  {
    heading: "2. Use of Website",
    text: "You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of, this site by any third party.",
  },
  {
    heading: "3. Product Information",
    text: "We strive to display accurate product details, pricing, and availability. However, we do not warrant that product descriptions or other content are entirely error-free.",
  },
  {
    heading: "4. Orders & Payments",
    text: "All orders are subject to acceptance and availability. Payment must be received in full before an order is processed and shipped.",
  },
  {
    heading: "5. Intellectual Property",
    text: "All content on this website, including logos, text, graphics, and product designs, is the property of ApexSound and protected by applicable copyright and trademark laws.",
  },
  {
    heading: "6. Limitation of Liability",
    text: "ApexSound shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website.",
  },
  {
    heading: "7. Changes to Terms",
    text: "We reserve the right to update these Terms & Conditions at any time. Continued use of the website after changes constitutes acceptance of the revised terms.",
  },
];

export const TermsandCondition = () => {

return (<>

    {/* Page Title  */}
   <Pagetitle title={"Terms and Conditions"} />

    <section className="mx-5 mt-5 mb-10">
      <PageHeader text="Terms & Conditions" />
      <div className="flex flex-col gap-6 mt-6 bg-background-color rounded-2xl p-10">
        {termsContent.map(({ heading, text }) => (
          <div key={heading} className="flex flex-col gap-2">
            <Heading text={heading} className="text-xl!" />
            <Paragraph text={text} />
          </div>
        ))}
      </div>
    </section>
  </>);
};