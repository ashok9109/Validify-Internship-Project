import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { axiosinstance } from '../config/axiosinstance';
import { useDispatch } from 'react-redux';
import { changePasswordApi } from '../features/actions/authActions';

const SettingPage = () => {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword === !formData.confirmPassword) {
      toast.error("New password and confirm password is not matched",{
        theme:"dark"
      })
    }

    try {
      setIsLoading(true);

      const response = await dispatch(changePasswordApi(formData));
      if (response) {
        toast.success("Password change successfully",{
          theme:"dark"
        });
      }
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    } catch (error) {
      toast.error(error.response?.data || "error changing is password",{
        theme:"dark"
      }); 

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex-1 min-h-screen bg-slate-950 text-slate-50 px-10 py-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-semibold mb-1">Account Settings</h1>
          <p className="text-sm text-slate-400 mb-6">
            Update your password to keep your Validify account secure.
          </p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-medium mb-4">Change Password</h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Current password</label>
                <input
                  type="password"
                  name='currentPassword'
                  value={formData.currentPassword}
                  onChange={handlchange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">New password</label>
                <input
                  type="password"
                  name='newPassword'
                  value={formData.newPassword}
                  onChange={handlchange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="Enter new password"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Must be at least 8 characters.
                </p>
              </div>

              <div>
                <label className="block text-sm mb-1">Confirm new password</label>
                <input
                  type="password"
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handlchange}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="Re-enter new password"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-sm font-medium text-slate-950 hover:bg-emerald-400 transition"
                >
                  {isLoading ? "...loading":"Update password"}
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-slate-700 text-sm text-slate-300 hover:bg-slate-900 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage

