import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth-slice/auth-slice";
import { motion } from "framer-motion";
import Header from "../Header/header";
import Google from '../../../assets/img/google.svg'
import Facebook from '../../../assets/img/facebook.svg'

const Registration = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RepeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { registerUser, loginGoogle, loginFacebook, isFetch } = useAuth();
  const navigate = useNavigate();

  const Register = async () => {
    if (Password !== RepeatPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    setPasswordError("");
    await registerUser(Email, Password);
    navigate("/");
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-[#4e73df] to-[#1a202c] min-h-screen flex justify-center items-center">
        <div className="relative w-full max-w-[450px] p-8 bg-white rounded-xl shadow-lg">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-semibold text-gray-800">
              Create Account
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4e73df] font-semibold">
                Log in
              </Link>
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div>
              <label className="text-gray-700">Email</label>
              <motion.input
                placeholder="Enter your email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                type="text"
              />
            </div>
            <div>
              <label className="text-gray-700">Password</label>
              <motion.input
                placeholder="Enter your password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                type="password"
              />
            </div>
            <div>
              <label className="text-gray-700">Confirm Password</label>
              <motion.input
                placeholder="Confirm your password"
                value={RepeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                type="password"
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <motion.button
              className="w-full bg-[#4e73df] text-white p-3 rounded-lg mt-4 hover:bg-[#365b8c] focus:outline-none focus:ring-2 focus:ring-[#2c5c8e] active:scale-95 transition duration-200"
              type="button"
              onClick={Register}
              disabled={isFetch}
            >
              {isFetch ? "Creating..." : "Create Account"}
            </motion.button>

            <div className="mt-6 flex justify-between items-center">
              <motion.button
                onClick={loginGoogle}
                className="flex items-center text-gray-800 bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition duration-200"
                disabled={isFetch}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                <img
                  src={Google}
                  alt="Google logo"
                  className="w-5 h-5 mr-2"
                />
                Google
              </motion.button>
              <motion.button
                onClick={loginFacebook}
                className="flex items-center text-gray-800 bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition duration-200"
                disabled={isFetch}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <img
                  src={Facebook}
                  alt="Facebook logo"
                  className="w-5 h-5 mr-2"
                />
                Facebook
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Registration;