import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar"
import Footer from "./Footer";


const MainLayout = () => {
    return (
        <>
            <NavBar />

            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
