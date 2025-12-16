import { Database, FileCheck, FileUp, Home, Settings, ShieldCheck } from "lucide-react";
import logo from '../../images/logo-image.png';
import { NavLink as RouterNavLink, useLocation, useNavigate, } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutApi } from "../../features/actions/authActions";
import { Bounce, toast } from "react-toastify";

const navLink = [
    { label: "Home", icon: Home, to: "/home" },
    { label: "My Verifications", icon: ShieldCheck, to: "/home/my-verifications" },
    { label: "Upload Data", icon: Database, to: "/home/upload-data" },
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

    const { user } = useSelector((state) => state.auth);
    const role = user?.role;

    const logoutUser = async () => {
        try {
            dispatch(userLogoutApi());
            navigate("/")
            toast.success("Logout successfully", {
                theme: "dark",
                transition: Bounce
            })
        } catch (error) {
            console.log("error in the logout ", error);
        };
    };

    return (
        <>
            <section className="min-h-screen w-full flex flex-col items-center bg-gray-900 text-white" >
                <div className="h-[30%] w-full flex flex-col items-center p-5" >
                    <div>

                        {/* logo */}
                        <img className='h-[80px] ' src={logo} alt="Validify-Logo" />
                        <h1 className="text-gray-350 text-sm" >Verify certificates instantly</h1>
                    </div>
                    <div className="bg-[#F3F8FE] p-5 rounded mt-3 bg-slate-950 backdrop-blur shadow-lg border-2 border-slate-600" >
                        <h1 className="font-bold text-[#004BA8]" >Verify Now</h1>
                        <p className="text-sm" >Paste certificate ID or upload PDF</p>
                        <button
                            onClick={navigateHandler}
                            className="w-full text-white bg-[#0A3D4C] py-2 mt-3 rounded hover:scale-[0.9] transition "
                        >
                            Start Verification
                        </button>

                    </div>
                </div>
                <div className="h-full w-full flex flex-col gap-6 p-7 font-bold text-xl text-gray-100 font1 " >
                    {navLink.map(({ label, icon: Icon, to }, Idx) => {

                        if (role === "user" & (label === "Upload Data")) {
                            return null
                        }
                        return (
                            <RouterNavLink
                                key={label}
                                to={to}
                                className={({ isActive }) => `flex gap-5 ${to === location.pathname ? "text-emerald-500" : ""} `}
                            >
                                <Icon
                                    size={22}
                                />
                                <span className="hover:scale-[1.1] transition-all" >{label}</span>
                            </RouterNavLink>
                        )
                    })}
                    <button
                        className="text-red-500 hover:scale-[1.1] transition-all"
                        onClick={logoutUser}
                    >logout</button>
                </div>
            </section>
        </>
    );
};

export default NavLink;
