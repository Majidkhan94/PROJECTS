import { Heading } from "../Export.js";


export const PageHeader = ({ text, slug, className }) => {
  const BaseClass = `uppercase tracking-widest ${className}`
  return (
    <section className="text-center p-5">
        {slug
        ? <Heading text={slug} className={BaseClass} />
        : <Heading text={text} className={BaseClass} /> }
    </section>
  );};