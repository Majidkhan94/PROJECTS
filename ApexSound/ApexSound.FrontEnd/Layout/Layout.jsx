import { HeaderComponent } from "../Components/HeaderComponent.jsx";
import { FooterComponent } from "../Components/FooterComponent.jsx"
import { Outlet } from 'react-router-dom';

export const Layout = () => {
    return (<>

        <HeaderComponent />
        <Outlet />
        <FooterComponent  />

    </>);}


