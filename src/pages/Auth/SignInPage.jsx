import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input'
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const SignInPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // no default
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid Email Id");
      return;
    }
    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (!role) {
      setError("Please select a role");
      return;
    }
    setError("");

    try {
      // calling login API with role
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password, role });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        // redirect based on role
        if (role === "supplier") {
          navigate("/dashboard/supplier");
        } else if (role === "manufacturer") {
          navigate("/dashboard/manufacturer");
        } 
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className='flex flex-col gap-4 px-2'>
        <div className='flex flex-col justify-center items-center'>
          <h3 className="font-extrabold text-2xl">Welcome Back</h3>
          <p className='font-mono'>Please enter your details to Login</p>
        </div>

        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="supratimdeb04@gmail.com"
            type="text"
          />

          {/* Dropdown menu for role selection */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2 bg-white"
            >
              <option value="" disabled>
                -- Select Role --
              </option>
              <option value="supplier">Supplier</option>
              <option value="manufacturer">Manufacturer</option>
            </select>
          </div>

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Minimum 8 Characters"
            type="password"
          />

          {error && <p className='text-red-600 text-xs leading-0'>{error}</p>}

          <button
            type="submit"
            className='border-2 border-b-6 border-r-3 rounded-lg bg-green-300 w-full py-3 font-extrabold cursor-pointer'
          >
            LOGIN
          </button>

          <h5 className='font-sans'>
            Don't have an account?{" "}
            <button
              type="button"
              className='text-cyan-600 font-medium cursor-pointer'
              onClick={() => setCurrentPage("sign-up")}
            >
              SignUp
            </button>
          </h5>
        </form>
      </div>
    </>
  )
}

export default SignInPage;
