import { Heading } from "../Export.js";


export const PageHeader = ({ text, slug, className ="" }) => {
  const BaseClass = `uppercase tracking-widest ${className}`.trim();
  return (
    <section className="text-center p-5">
        {slug
        ? <Heading text={slug} className={`text-2xl! ${BaseClass}`} />
        : <Heading text={text} className={`text-2xl! ${BaseClass}`} /> }
    </section>
  );};