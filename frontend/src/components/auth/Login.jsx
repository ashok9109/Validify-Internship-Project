import logo from '../../images/logos.svg';
import background from '../../images/background.jpg';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from 'react-redux';
import { userLoginApi } from '../../features/actions/authActions';
import { toast } from 'react-toastify';

const Login = ({ setToggle }) => {

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("")
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const passwordValue = watch("password", "")

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = dispatch(userLoginApi(data));
      if (response) {
        console.log("User is login");
        toast.success("Login Successfully")
      } else {
        setServerError(response?.message || "Login  is Failed")
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
              onClick={() => setToggle((perv) => !perv)}
              type='button'
              className='text-blue-400 font-semibold underline'
            >
              Register
            </button>
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}
            className='space-y-1 flex flex-col gap-3 px-7  '>

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
              <button className='px-5 py-2 bg-[#098B85] rounded-lg font-bold hover:scale-[1.1] hover:bg-black hover:text-white transition' >{loading ? "Loading..." : "Login"}</button>
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

export default Login;
