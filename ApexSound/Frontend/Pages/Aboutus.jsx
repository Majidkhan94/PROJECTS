import { Heading, Paragraph, PageHeader, Pagetitle } from "../Export.js";

const aboutContent = [
  {
    heading: "Who We Are",
    text: "ApexSound was founded with a simple mission: to make premium audio accessible to everyone. From studio-grade microphones to immersive headphones and powerful speakers, we design every product to deliver sound the way it was meant to be heard.",
  },
  {
    heading: "Our Story",
    text: "What started as a small team of audio engineers has grown into a brand trusted by creators, gamers, and music lovers around the world. We believe great sound shouldn't come with a compromise on quality, comfort, or price.",
  },
  {
    heading: "Our Mission",
    text: "We are committed to crafting products that blend cutting-edge technology with everyday usability. Every headphone, microphone, and speaker we release goes through rigorous testing to ensure it meets our standard of excellence.",
  },
  {
    heading: "Why Choose ApexSound",
    text: "From podcasters recording their next episode to gamers immersed in competitive play, ApexSound products are built for real-world performance. We stand behind every product with reliable support and a customer-first approach.",
  },
];

export const Aboutus = () => {

return (<>
    
    {/* Page Title  */}
   <Pagetitle title={"Aboutus"} />
    
    <section className="mx-5 mt-5 mb-10">
      <PageHeader text="About Us" />
      <div className="flex flex-col gap-6 mt-6 bg-background-color rounded-2xl p-10">
        {aboutContent.map(({ heading, text }) => (
          <div key={heading} className="flex flex-col gap-2">
            <Heading text={heading} className="text-xl!" />
            <Paragraph text={text} />
          </div>
        ))}
      </div>
    </section>
  </>);
};