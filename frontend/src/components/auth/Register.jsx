import logo from '../../images/logos.svg';
import background from '../../images/background.jpg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from 'react-redux';
import { userRegisterApi } from '../../features/actions/authActions';
import { toast } from 'react-toastify';

const Register = ({ setToggle }) => {

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const passwordValue = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = dispatch(userRegisterApi(data));
      if (response) {
        console.log("User is registered");
        toast.success("Registered Successfully");
      } else {
        setServerError(response?.message || "Registartion is Failed");
      }

    } catch (error) {
      console.log("error in submit", error);
      const msg = error?.response?.error || error?.message || "soming wrong try again later";
      setServerError(msg);
    } finally {
      setLoading(false);
      reset();
    };
  };

  return (
    <>
      <section className='min-h-screen w-full relative flex items-center justify-center bg-gray-50 '>
        <img className='h-full w-full object-cover absolute inset-0' src={background} alt="background image" />
        <div className='rounded-lg relative shadow-6xl shadow-black z-10 bg-gradient-to-br from-[#181A19] to-[#104B4A] rounded-lg p-5 mb-20' >
          <h3 className='text-2xl font-bold md-1 text-black' >Create an account</h3>
          <p className=' text-sm text-gray-500 mb-6 '>
            Already have an account?{" "}
            <button
              onClick={() => setToggle((prev) => !prev)}
              type='button'
              className='text-blue-400 font-semibold underline'
            >
              Login
            </button>
          </p>

          {/* form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-1 flex flex-col gap-3 px-7  '>

            {/* Full name */}
            <label className='text-sm font-bold text-[#07988E]' >Full Name</label>
            <div className='flex gap-5' >
              <h1 className="text-xl text-black " ><i className="ri-user-fill"></i></h1>
              <input
                {...register("fullName", {
                  required: "Full Name is required",
                  minLength: { value: 3, message: "At least 3 charater" }
                })}
                className={`w-full border rounded-lg p-2 pl-2  focus:outline-none focus:ring-4 focus:ring-[#07988E] ${errors.fullName ? "border-[#07988E]" : "border-black"}`}
                type="text" placeholder='Ashok Yadav' />
            </div>
            {errors.fullName && (
              <p className='text-red-500 mt-1' >{errors.fullName.message}</p>
            )}

            {/* username */}
            <label className='text-sm text-[#07988E] font-bold' >username</label>
            <div className='flex gap-5' >
              <h1 className="text-xl text-black " ><i className="ri-user-fill"></i></h1>
              <input
                {...register("username", {
                  required: "User Name is required",
                  minLength: { value: 3, message: "At least 3 charater" }
                })}
                className={`w-full border rounded-lg p-2 pl-2 focus:outline-none focus:ring-4 focus:ring-[#07988E] ${errors.username ? "border-[#07988E]" : "border-black"}`}
                type="text" placeholder='ashokyadav' />
            </div>
            {errors.username && (
              <p className='text-red-500 mt-1' >{errors.username.message}</p>
            )}

            {/* email & mobile */}
            <div className=' grid grid-cols-1 md:grid-cols-2 gap-4  px-2' >
              <div>

                {/* email */}
                <label className='text-sm text-[#07988E] font-bold ' >Email</label>
                <div className='flex gap-2 pt-2' >
                  <h1 className="text-xl text-black " ><i className="ri-mail-fill"></i></h1>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
                    })}
                    className={`w-full border rounded-lg p-2 pl-2 px-1 focus:outline-none focus:ring-4 focus:ring-[#07988E] ${errors.email ? "border-[#07988E]" : "border-black"}`}
                    type="email" placeholder='ashokyadavrtp200@gmail.com' />
                </div>
                {errors.email && (
                  <p className='text-red-500 mt-1' >{errors.email.message}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className='text-sm text-[#07988E] font-bold ' >Mobile</label>
                <div className='flex gap-2 pt-2' >
                  <h1 className="text-xl text-black " ><i className="ri-cellphone-fill"></i></h1>
                  <input
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: { value: /^[0-9]{10}$/, message: "10 digits is required" }
                    })}
                    className={`w-full border rounded-lg p-2 pl-2 px-1 focus:outline-none focus:ring-4 focus:ring-[#07988E] ${errors.mobile ? "border-[#07988E]" : "border-black"}`}
                    type="tel" placeholder='2334234354' />
                </div>
                {errors.mobile && (
                  <p className='text-red-500 mt-1' >{errors.mobile.message}</p>
                )}
              </div>
            </div>

            {/* password */}
            <label className='text-sm text-[#07988E] font-bold' >Password</label>
            <div className='flex gap-5' >
              <h1 className="text-xl text-black " ><i className="ri-lock-fill"></i></h1>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 charaters" }
                })}
                className={`w-full border rounded-lg p-2 pl-2  focus:outline-none focus:ring-4 focus:ring-[#07988E] ${errors.password ? "border-[#07988E]" : "border-black"}`}
                placeholder='Enter a strong password' />
              <button
                type='button'
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide Password" : "Show password"}
              >
                {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
              </button>
            </div>
            <p className='text-sm' >Password Value : {passwordValue.length}/8 </p>
            {errors.password && (
              <p className='text-red-500 mt-1' >{errors.password.message}</p>
            )}

            {/* server error */}
            {serverError && <p className='text-red-500' >{serverError}</p>}

            {/* submit button */}
            <div className='text-center'>
              <button className='px-5 py-2 bg-[#098B85] rounded-lg font-bold hover:scale-[1.1] hover:bg-black hover:text-white transition' >{loading ? "Creating Account..." : "Create Account"}</button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              By creating an account you agree to the <span className="underline text-blue-500 ">Terms</span> and{" "}
              <span className="underline text-blue-500">Privacy Policy</span>.
            </div>
          </form>

          {/* logo */}
        </div>
        <div className='absolute bottom-0 md:flex hidden z-10 '>
          <img className='h-[80px]' src={logo} alt="Validify-Logo" />
        </div>
      </section>
    </>
  );
};

export default Register;
