import React, { useState, useContext } from 'react';
import { validateEmail } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const SignUpPage = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // role dropdown state
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (!role) {
      setError("Please select a role");
      return;
    }
    setError("");

    // SignUp API call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        role
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center">
        <h3 className="font-extrabold text-2xl">Create Your Account</h3>
        <p className="font-mono">Please enter your details to SignUp</p>
      </div>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Supratim Deb"
          type="text"
        />

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

      
        {error && <p className="text-sm text-red-600 leading-0">{error}</p>}

        <button
          type="submit"
          className="border-2 border-b-6 border-r-3 rounded-lg bg-green-300 w-full py-3 font-extrabold cursor-pointer"
        >
          Create Account
        </button>

        <h5 className="font-sans">
          Already have an account?{" "}
          <button
            type="button"
            className="text-cyan-600 font-medium cursor-pointer"
            onClick={() => setCurrentPage("sign-in")}
          >
            SignIn
          </button>
        </h5>
      </form>
    </div>
  );
};

export default SignUpPage;
