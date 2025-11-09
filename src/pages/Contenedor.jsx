// import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink, Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar";
import { TogglePlan } from "./TogglePlan";

export const Contenedor = () => {

    // const logueado = useSelector(state => state.user.logged);

    // const navigate = useNavigate();
    // const dispatch = useDispatch()

    // const cerrarSesion = () => {
    //     localStorage.clear();
    //     dispatch(desloguear())
    //     navigate("/");
    // }

    return (
        <div className="flex">
            <div style={{position:"absolute", right:"10px", top:"10px"}}>
            <TogglePlan />
            </div>
            <Sidebar />

            <Outlet />

        </div>
    )
}

