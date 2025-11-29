import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Eye, EyeOff, User, Mail, Lock, Phone } from "lucide-react";

const Login = ({ onRegistered }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: "onTouched" });

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const passwordValue = watch("password", "");

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPhotoPreview(null);
      setValue("photo", null);
      return;
    }
    // simple client-side file size check (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setServerError("Profile photo must be < 2MB");
      return;
    }
    setServerError("");
    setValue("photo", file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data) => {
    setServerError("");
    setLoading(true);
    try {
      // Build form-data for file support
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("password", data.password);
      if (data.photo) formData.append("photo", data.photo);

      // Replace this URL with your backend register endpoint
      const res = await axios.post("/api/auth/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Example success handling
      if (res.data?.success) {
        if (onRegistered) onRegistered(res.data.user);
      } else {
        setServerError(res.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Try again.";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        {/* Left - visual panel */}
        <div className="hidden md:flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0A3D4C] to-[#00BBA7] text-white">
          <h2 className="text-3xl font-extrabold mb-3">Join Work-On</h2>
          <p className="text-sm text-white/90 max-w-xs text-center">
            Create your account to apply to jobs, manage your profile, and connect
            with employers. Fast, secure and built with MERN stack.
          </p>

          <div className="mt-6 w-full max-w-xs">
            <img
              src="/images/signup-illustration.png"
              alt="signup illustration"
              className="w-full h-auto opacity-90"
            />
          </div>
        </div>

        {/* Right - form */}
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-1">Create an account</h3>
          <p className="text-sm text-gray-500 mb-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => onRegistered && onRegistered(null)}
              className="text-[#0A3D4C] font-semibold underline"
            >
              Sign in
            </button>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  {...register("fullName", {
                    required: "Full name is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                  })}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0A3D4C] ${errors.fullName ? "border-red-400" : "border-gray-200"
                    }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                {...register("username", {
                  required: "Username required",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0A3D4C] ${errors.username ? "border-red-400" : "border-gray-200"
                  }`}
                placeholder="yourusername"
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
                    })}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0A3D4C] ${errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile
                </label>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: { value: /^[0-9]{10}$/, message: "10 digits required" },
                    })}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0A3D4C] ${errors.mobile ? "border-red-400" : "border-gray-200"
                      }`}
                    placeholder="9876543210"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-red-500 mt-1">{errors.mobile.message}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password required",
                    minLength: { value: 8, message: "At least 8 characters" },
                  })}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0A3D4C] ${errors.password ? "border-red-400" : "border-gray-200"
                    }`}
                  placeholder="Enter a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Password length: {passwordValue.length} / 8
              </p>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile photo (optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="block w-full text-sm text-gray-600"
              />
              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="preview"
                  className="mt-2 w-20 h-20 object-cover rounded-full border"
                />
              )}
            </div>

            {/* Server error */}
            {serverError && <p className="text-sm text-red-500">{serverError}</p>}

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#0A3D4C] hover:bg-[#00796a] text-white font-semibold px-4 py-2 rounded-lg"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

              <button
                type="button"
                onClick={() => {
                  // reset to show login form
                  if (onRegistered) onRegistered(null);
                }}
                className="px-4 py-2 border rounded text-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="text-xs text-gray-500 mt-4">
            By creating an account you agree to the <span className="underline">Terms</span> and{" "}
            <span className="underline">Privacy Policy</span>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

