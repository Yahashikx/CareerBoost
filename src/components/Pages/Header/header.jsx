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
import Arrow from "../../../assets/img/arrow.svg";

const Header = () => {
  const [modalMenu, setModalMenu] = useState(false);
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

  const toggleModal = () => {
    setModalMenu(!modalMenu);
  };

  const isAdmin = user?.isAdmin;

  return (
    <motion.div
      className="flex flex-wrap h-[60px] p-4 z-20 opacity-90"
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
      <div className="block lg:hidden ml-[53%]">
        <img onClick={toggleModal} src={BurgerMenu} alt="" />
      </div>
      {modalMenu && (
        <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
      )}
      {modalMenu && (
        <>
          <div className="bg-white z-20 opacity-90 px-[3px] grid grid-cols-1 gap-[3px] text-[20px] fixed top-[10%] h-[49%] w-[94%] rounded-bl-[25px] rounded-br-[25px]">
            <Link
              to={"/vacancies"}
              className="h-[70%] mt-[10px] px-[20px] border rounded-[9px] flex flex-wrap items-center gap-[70%]"
            >
              <motion.p whileHover={{ scale: 1.1 }}>Вакансии</motion.p>
              <img className="bg-gray-600 rounded-[50px]" src={Arrow} alt="" />
            </Link>
            <Link
              to={"/internship"}
              className="h-[70%] px-[20px] border rounded-[9px] flex flex-wrap items-center gap-[65.2%]"
            >
              <motion.p whileHover={{ scale: 1.1 }}>Стажировки</motion.p>
              <img className="bg-gray-600 rounded-[50px]" src={Arrow} alt="" />
            </Link>
            <Link
              to={"/events"}
              className="h-[70%] px-[20px] border rounded-[9px] flex flex-wrap items-center gap-[63%]"
            >
              <motion.p whileHover={{ scale: 1.1 }}>Мероприятия</motion.p>
              <img className="bg-gray-600 rounded-[50px]" src={Arrow} alt="" />
            </Link>
            <Link
              to={"/profile"}
              className="h-[70%] px-[20px] border rounded-[9px] flex flex-wrap items-center gap-[71%]"
            >
              <motion.p whileHover={{ scale: 1.1 }}>Профиль</motion.p>
              <img className="bg-gray-600 rounded-[50px]" src={Arrow} alt="" />
            </Link>
            <Link
              to={"/about-us"}
              className="h-[70%] px-[20px] border rounded-[9px] flex flex-wrap items-center gap-[77%]"
            >
              <motion.p whileHover={{ scale: 1.1 }}>О нас</motion.p>
              <img className="bg-gray-600 rounded-[50px]" src={Arrow} alt="" />
            </Link>
            {isAdmin && (
              <Link
                to={"/admin-panel"}
                className="h-[70%] px-[20px] border rounded-[9px] flex flex-wrap items-center gap-[70%]"
              >
                <motion.p whileHover={{ scale: 1.1 }}>Админ Панель</motion.p>
                <img className="bg-gray-600 rounded-[50px]" src={Arrow} alt="" />
              </Link>
            )}
          </div>
        </>
      )}
      <div className={`ml-[22%] lg:flex items-center gap-[30px] hidden`}>
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
        {isAdmin && (
          <Link to={"/admin-panel"}>
            <motion.p whileHover={{ scale: 1.1 }}>Админ Панель</motion.p>
          </Link>
        )}
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
