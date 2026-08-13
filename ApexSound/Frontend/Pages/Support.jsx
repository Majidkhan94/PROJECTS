import { Heading, Paragraph, PageHeader, Pagetitle } from "../Export.js";

const supportContent = [
  {
    heading: "How Can We Help?",
    text: "Our support team is here to assist you with orders, product issues, returns, and general questions. We aim to respond to all inquiries within 24 hours.",
  },
  {
    heading: "Order Issues",
    text: "If your order hasn't arrived, arrived damaged, or you received the wrong item, please contact us with your order number and we will resolve it as quickly as possible.",
  },
  {
    heading: "Product Troubleshooting",
    text: "Having trouble pairing your headphones, setting up your microphone, or connecting your speaker? Reach out to our support team with your product model and a description of the issue for step-by-step assistance.",
  },
  {
    heading: "Returns & Exchanges",
    text: "Items can be returned or exchanged within 14 days of delivery, provided they are in original condition with packaging. Contact support to initiate a return.",
  },
  {
    heading: "Contact Us",
    text: "Email us at support@apexsound.com or use the Contact Us page to submit a request. Our team is available Monday to Saturday, 9 AM to 7 PM.",
  },
];

export const Support = () => {

return (<>
  {/* Page Title  */}
  <Pagetitle title={"Support"} />
  
  <section className="m-5">
    <PageHeader text="Support" />
    <div className="flex flex-col gap-6 my-10 px-10 md:px-50">
      {supportContent.map(({ heading, text }) => (
        <div key={heading} className="flex flex-col gap-2">
          <Heading text={heading} className="text-2xl!" />
          <Paragraph text={text} />
        </div>
      ))}
    </div>
  </section>
</>);
};