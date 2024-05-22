import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar"


const MainLayout = () => {
    return (
        <>
            <NavBar />

            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
