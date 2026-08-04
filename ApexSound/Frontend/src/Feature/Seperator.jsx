import { Heading } from "../Feature/Heading.jsx"
import { Paragraph } from "../Feature/Paragraph.jsx"
import { Link } from "react-router-dom"

export const Seperator = ({ Lefttext, Righttext }) => {
    return (<>
        <section className="flex items-center gap-3 w-full py-8 md:py-14 justify-between px-3 md:px-10">
            <Heading text={Lefttext} className={"text-sm! md:text-2xl! "} />
            <div className="flex-1 h-px bg-text-color" />
            <Link to={"/products"}><Paragraph text={Righttext} className={"font-semibold"} /></Link>
        </section>
        </>)}