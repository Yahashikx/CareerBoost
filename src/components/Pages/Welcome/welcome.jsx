import { Link } from "react-router-dom";
import Header from "../Header/header";
import { motion } from "framer-motion";
import Human from "../../../assets/img/human.svg";
import Create from "../../../assets/img/create.svg";
import Upload from "../../../assets/img/upload.svg";
import Search from "../../../assets/img/search.svg";
import Apply from "../../../assets/img/apply.svg";
import Footer from "../Footer/footer";

const Welcome = () => {
  return (
    <>
      <Header />
      <div>
        <motion.div
          className="relative top-[200px] left-[50px] w-[90%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p className="text-[47px] w-[63%]">
            Найдите работу, которая соответствует вашим интересам и навыкам
          </p>
          <p className="text-[gray] w-[33%]">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
            in scelerisque leo, eget sollicitudin velit vestibulum.
          </p>
        </motion.div>
        <motion.div
          className="relative left-[990px] w-[30%]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={Human} alt="" />
        </motion.div>
      </div>

      <div>
        <motion.div
          className="bg-[#F1F2F4] h-[450px] w-[100%] mt-[80px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <p className="flex justify-center items-center text-[30px] relative top-[50px]">
            Как работает jobpilot
          </p>
          <div className="grid grid-cols-4 relative top-[90px] gap-[30px]">
            <Link to={"/registration"}>
              <motion.div
                className="relative left-[30px] hover:bg-gray-200 w-[84%] rounded-[18px] p-[10px] flex justify-center items-center"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <img src={Create} alt="Create Icon" />
              </motion.div>
            </Link>
            <Link to={"/profile"}>
              <motion.div
                className="hover:bg-gray-200 w-[80%] rounded-[18px] p-[10px] flex justify-center items-center"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <img src={Upload} alt="Upload Icon" />
              </motion.div>
            </Link>
            <Link to={"/companies"}>
              <motion.div
                className="hover:bg-gray-200 w-[80%] rounded-[18px] p-[10px] flex justify-center items-center"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <img src={Search} alt="Search Icon" />
              </motion.div>
            </Link>
            <Link to={"/companies"}>
              <motion.div
                className="hover:bg-gray-200 w-[80%] rounded-[18px] p-[10px] flex justify-center items-center"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <img src={Apply} alt="Apply Icon" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer/>
    </>
  );
};

export default Welcome;
