import { Home, Settings } from "lucide-react";
import { NavLink as RouterNavLink, useLocation, useNavigate, } from "react-router";
import { useDispatch } from "react-redux";
import { userLogoutApi } from "../../features/actions/authActions";

const navLink = [
    { label: "Home", icon: Home, to: "/home" },
    { label: "Settings", icon: Settings, to: "/home/settings" },

];


const NavLink = () => {
    
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    
    
    const logoutUser = async()=>{
        try {
              dispatch(userLogoutApi());
              navigate("/")
        } catch (error) {
            console.log("error in the logout ", error);
        };
    };
    return (
        <>
            <div>
            {navLink.map(({label, icon:Icon, to}, Idx)=>(
                <RouterNavLink 
                key={label}
                to={to}
                 >
                <Icon/>
                <span>{label}</span>
                </RouterNavLink>
            ))}
            <button
            onClick={logoutUser}
            >logout</button>
            </div>
        </>
    )
}

export default NavLink;
