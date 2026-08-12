import { useEffect } from "react";

export const Pagetitle = ({title}) => {
    useEffect(() => {
        document.title = title ? `${title}`: "Apex Sound";
    }, [title]);
};