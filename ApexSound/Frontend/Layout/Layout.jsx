import { Outlet } from 'react-router-dom';
import {Header, Footer} from "../Export.js";


export const Layout = () => {
    return (<>
        <Header />
        <main> <Outlet /></main>
        <Footer />
    </>);
};