import { Heading } from "./Heading.jsx"

export const PageHeader = ({ text, slug }) => {
  return (
    <section className="text-center p-5">
        {slug
        ? <Heading text={slug} className={"uppercase tracking-widest"} />
        : <Heading text={text} className={"uppercase tracking-widest"} /> }
    </section>
  );};