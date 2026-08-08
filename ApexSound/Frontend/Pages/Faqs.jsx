import { Heading, Paragraph, PageHeader } from "../Export.js";

export const Faqs = () => {
  return (
    <section className="mx-5 mt-5 mb-10">
      <PageHeader text="Frequently Asked Questions" />

      <div className="flex flex-col gap-6 mt-6 bg-background-color rounded-2xl p-10">
        <div className="flex flex-col gap-2">
          <Heading text="What products does ApexSound offer?" className="text-xl!" />
          <Paragraph text="We offer a wide range of audio products including headphones, microphones, and speakers, designed for gaming, music, streaming, and everyday use." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="How long does shipping take?" className="text-xl!" />
          <Paragraph text="Standard delivery typically takes 3 to 7 business days depending on your location. You will receive a tracking link once your order is shipped." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Do your products come with a warranty?" className="text-xl!" />
          <Paragraph text="Yes, all ApexSound products come with a 12-month manufacturer warranty covering defects in materials and workmanship." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Can I return a product if I change my mind?" className="text-xl!" />
          <Paragraph text="Yes, unused items in original packaging can be returned within 14 days of delivery for a full refund or exchange." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Are your headphones compatible with all devices?" className="text-xl!" />
          <Paragraph text="Most of our headphones support Bluetooth and wired connections, making them compatible with smartphones, laptops, gaming consoles, and tablets." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="How do I track my order?" className="text-xl!" />
          <Paragraph text="Once your order ships, you'll receive a confirmation email with a tracking number and link so you can monitor delivery in real time." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Do you offer bulk or business orders?" className="text-xl!" />
          <Paragraph text="Yes, we accommodate bulk orders for businesses, studios, and events. Contact our support team for pricing and availability." />
        </div>
      </div>
    </section>
  );
};