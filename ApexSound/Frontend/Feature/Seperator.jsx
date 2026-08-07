import { Link } from "react-router-dom"
import {Heading, Paragraph} from "../Export.js";


export const Seperator = ({ Lefttext, Righttext, to }) => {
    return (<>
        <section className="flex items-center gap-3 w-full py-8 md:py-14 justify-between px-3 md:px-10">
            <Heading text={Lefttext} className={"text-sm! md:text-2xl! uppercase! "} />
            <div className="flex-1 h-px bg-text-color" />
            <Link to={to}><Paragraph text={Righttext} className={"font-semibold uppercase!"} /></Link>
        </section>
        </>)}