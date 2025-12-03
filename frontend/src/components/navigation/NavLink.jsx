import { FileCheck, FileUp, Home, Settings, ShieldCheck } from "lucide-react";
import logo from '../../images/validify-logo.png';
import { NavLink as RouterNavLink, useLocation, useNavigate, } from "react-router";
import { useDispatch } from "react-redux";
import { userLogoutApi } from "../../features/actions/authActions";

const navLink = [
    { label: "Home", icon: Home, to: "/home" },
    { label: "My Verifications", icon: ShieldCheck, to: "/home/my-verifications" },
    { label: "Upload Certificate", icon: FileUp, to: "/home/upload-certificate" },
    { label: "Document", icon: FileCheck, to: "/home/document" },
    { label: "Settings", icon: Settings, to: "/home/settings" },

];

const NavLink = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()

    const navigateHandler = async () => {
        navigate("/home/my-verifications");
    };

    const logoutUser = async () => {
        try {
            dispatch(userLogoutApi());
            navigate("/")
        } catch (error) {
            console.log("error in the logout ", error);
        };
    };

    return (
        <>
            <div className="h-full w-full flex flex-col items-center" >
                <div className="h-[30%] w-full flex flex-col items-center p-5" >
                    <div>

                        {/* logo */}
                        <img className='h-[80px] ' src={logo} alt="Validify-Logo" />
                        <h1 className="text-gray-500 text-sm" >Verify certificates instantly</h1>
                    </div>
                    <div className="bg-[#F3F8FE] p-5 rounded mt-3 " >
                        <h1 className="font-bold" >Verify Now</h1>
                        <p className="text-sm" >Paste certificate ID or upload PDF</p>
                        <button
                            onClick={navigateHandler}
                            className="w-full text-white bg-[#0A3D4C] py-2 mt-3 rounded hover:scale-[0.9] transition "
                        >
                            Start Verification
                        </button>

                    </div>
                </div>
                <div className="h-full w-full flex flex-col gap-8 p-7 font-bold text-xl mt-10 font1 " >
                    {navLink.map(({ label, icon: Icon, to }, Idx) => (
                        <RouterNavLink
                            key={label}
                            to={to}
                            className="flex gap-5"
                        >
                            <Icon
                                size={22}
                            />
                            <span>{label}</span>
                        </RouterNavLink>
                    ))}
                    <button
                        className="text-red-500"
                        onClick={logoutUser}
                    >logout</button>
                </div>
            </div>
        </>
    );
};

export default NavLink;
