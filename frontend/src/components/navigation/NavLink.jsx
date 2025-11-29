import { Home, } from "lucide-react";
import { NavLink as RouterNavLink, useLocation, useNavigate, } from "react-router";
import { useDispatch } from "react-redux";

const navLink = [
    { label: "Home", icon: Home, to: "/home" },
    { label: "Home", icon: Home, to: "/home" },
    { label: "Home", icon: Home, to: "/home" },
    { label: "Home", icon: Home, to: "/home" },
];


const NavLink = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()


    return (
        <>
            <div>
            {navLink.map(({label, icon:Icon, to}, Idx)=>{
                <RouterNavLink 
                key={label}
                to={to}
                 >
                <Icon/>
                <span>{label}</span>
                </RouterNavLink>
            })}

            </div>
        </>
    )
}

export default NavLink;
