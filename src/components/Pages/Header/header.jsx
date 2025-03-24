import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Backpack from "../../../assets/img/backpack.svg";
import User from "../../../assets/img/user.svg";
import { useAuth } from "../../store/auth-slice/auth-slice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../utils/firebase/firebase-config";
import { useEffect, useState } from "react";
import Exit from "../../../assets/img/exit.svg";
import Login from "../../../assets/img/login.svg";
import BurgerMenu from "../../../assets/img/burger-menu.svg";

const Header = () => {
  const { user, isFetch } = useAuth();
  const avatar = user?.avatar || localStorage.getItem("avatar") || User;
  const [setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const onHandleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  return (
    <motion.div
      className="flex flex-wrap h-[60px] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center">
        <motion.img
          src={Backpack}
          alt="Logo"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
        <Link to={"/"}>
          <motion.p
            className="text-xl ml-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            CareerBoost
          </motion.p>
        </Link>
      </div>
      <div className="block md:hidden ml-auto">
        <img src={BurgerMenu} alt="" />
      </div>
      <div className={`ml-[22%] md:flex items-center gap-[30px] hidden`}>
        <Link to={"/vacancies"}>
          <motion.p whileHover={{ scale: 1.1 }}>Вакансии</motion.p>
        </Link>
        <Link to={"/internship"}>
          <motion.p whileHover={{ scale: 1.1 }}>Стажировки</motion.p>
        </Link>
        <Link to={"/events"}>
          <motion.p whileHover={{ scale: 1.1 }}>Мероприятия</motion.p>
        </Link>
        <Link to={"/profile"}>
          <motion.p whileHover={{ scale: 1.1 }}>Профиль</motion.p>
        </Link>
        <Link to={"/about-us"}>
          <motion.p whileHover={{ scale: 1.1 }}>О нас</motion.p>
        </Link>
      </div>
      <div className="ml-auto flex justify-center items-center gap-2">
        <motion.img
          className="bg-gray-500 rounded-full w-[40px] h-[40px]"
          src={avatar}
          alt="Avatar"
        />
        <div>
          {user ? (
            <div onClick={onHandleLogout}>
              {isFetch ? (
                <div>Logging out...</div>
              ) : (
                <img src={Exit} alt="Exit" />
              )}
            </div>
          ) : (
            <Link to="/login">
              <img src={Login} alt="Login" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
