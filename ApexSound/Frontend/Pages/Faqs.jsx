import { Heading, Paragraph, PageHeader, Pagetitle } from "../Export.js";

const faqsContent = [
  {
    heading: "What products does ApexSound offer?",
    text: "We offer a wide range of audio products including headphones, microphones, and speakers, designed for gaming, music, streaming, and everyday use.",
  },
  {
    heading: "How long does shipping take?",
    text: "Standard delivery typically takes 3 to 7 business days depending on your location. You will receive a tracking link once your order is shipped.",
  },
  {
    heading: "Do your products come with a warranty?",
    text: "Yes, all ApexSound products come with a 12-month manufacturer warranty covering defects in materials and workmanship.",
  },
  {
    heading: "Can I return a product if I change my mind?",
    text: "Yes, unused items in original packaging can be returned within 14 days of delivery for a full refund or exchange.",
  },
  {
    heading: "Are your headphones compatible with all devices?",
    text: "Most of our headphones support Bluetooth and wired connections, making them compatible with smartphones, laptops, gaming consoles, and tablets.",
  },
  {
    heading: "How do I track my order?",
    text: "Once your order ships, you'll receive a confirmation email with a tracking number and link so you can monitor delivery in real time.",
  },
  {
    heading: "Do you offer bulk or business orders?",
    text: "Yes, we accommodate bulk orders for businesses, studios, and events. Contact our support team for pricing and availability.",
  },
];

export const Faqs = () => {

return (<>
  {/* Page Title  */}
  <Pagetitle title={"FAQs"} />
  
  <section className="m-5">
    <PageHeader text="Frequently Asked Questions" />
    <div className="flex flex-col gap-6 my-10 px-10 md:px-50">
      {faqsContent.map(({ heading, text }) => (
        <div key={heading} className="flex flex-col gap-2">
          <Heading text={heading} className="text-2xl!" />
          <Paragraph text={text} />
        </div>
      ))}
    </div>
  </section>
</>);
};