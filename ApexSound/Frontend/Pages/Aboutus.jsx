import { Heading, Paragraph, PageHeader } from "../Export.js";

export const Aboutus = () => {
  return (
    <section className="mx-5 mt-5 mb-10">
      <PageHeader text="About Us" />

      <div className="flex flex-col gap-6 mt-6 bg-background-color rounded-2xl p-10">
        <div className="flex flex-col gap-2">
          <Heading text="Who We Are" className="text-xl!" />
          <Paragraph text="ApexSound was founded with a simple mission: to make premium audio accessible to everyone. From studio-grade microphones to immersive headphones and powerful speakers, we design every product to deliver sound the way it was meant to be heard." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Our Story" className="text-xl!" />
          <Paragraph text="What started as a small team of audio engineers has grown into a brand trusted by creators, gamers, and music lovers around the world. We believe great sound shouldn't come with a compromise on quality, comfort, or price." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Our Mission" className="text-xl!" />
          <Paragraph text="We are committed to crafting products that blend cutting-edge technology with everyday usability. Every headphone, microphone, and speaker we release goes through rigorous testing to ensure it meets our standard of excellence." />
        </div>

        <div className="flex flex-col gap-2">
          <Heading text="Why Choose ApexSound" className="text-xl!" />
          <Paragraph text="From podcasters recording their next episode to gamers immersed in competitive play, ApexSound products are built for real-world performance. We stand behind every product with reliable support and a customer-first approach." />
        </div>
      </div>
    </section>
  );
};