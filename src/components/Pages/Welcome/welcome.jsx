import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/header";
import { motion } from "framer-motion";
import Human from "../../../assets/img/human.svg";
import Create from "../../../assets/img/create.svg";
import Upload from "../../../assets/img/upload.svg";
import Search from "../../../assets/img/search.svg";
import Apply from "../../../assets/img/apply.svg";
import Arrow from "../../../assets/img/arrow.svg"
import Footer from "../Footer/footer";
import CompaniesCard from "../../Pages/Companies-Card/companies-card";
import { useCompanies } from "../../store/companies-slice/companies-slice";

const Welcome = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { companie, isFetch, getAllCompanies } = useCompanies();
  const itemsPerPage = 3;
  useEffect(() => {
    getAllCompanies();
  }, [getAllCompanies]);
  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = companie.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(companie.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
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
      <div className="px-[5%] mb-[5%]">
        <p className="text-[30px] font-bold mt-5">Популярные Вакансии</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px] mt-5">
          {isFetch
            ? "Загрузка..."
            : currentCompanies.map((company, index) => (
                <CompaniesCard
                  key={company.id}
                  companies={company}
                  custom={index}
                />
              ))}
        </div>
        <div className="flex justify-center mt-5">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`mx-2  p-3 rounded-full ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              {}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center gap-[5%] mb-[5%]">
        <div className="w-[30%] h-auto bg-gray-300 p-[2%] rounded-[14px]">
          <div>
            <p className="text-[30px]">Стать Кандидатом</p>
          </div>
          <div className="my-[4%]">
            <p>
              Найдите работу, о которой всегда мечтали! Мы поможем вам найти
              работу, которая идеально соответствует вашим интересам и навыкам.
              Присоединяйтесь и начните свой карьерный путь прямо сейчас!
            </p>
          </div>
          <Link to={'/registration'}>
            <button className="p-3 rounded-[7px] bg-[#0851A3] text-white flex flex-wrap gap-3">
              Зарегестрироваться
              <img src={Arrow} alt="" />
            </button>
          </Link>
        </div>
        <div className="w-[30%] bg-[#0851A3] p-[2%] rounded-[14px]">
          <div>
            <p className="text-[30px] text-white">Стать Работадателем</p>
          </div>
          <div className="my-[4%]">
            <p className="text-white">
              Мы поможем вам найти идеальных сотрудников для вашего бизнеса!
              Наша платформа соединяет вас с талантами, которые ищут работу
              именно в вашей сфере. Привлекайте лучших кандидатов с помощью
              нашей удобной системы.
            </p>
          </div>
          <div>
            <button className="p-3 rounded-[7px] bg-gray-300 text-[#0851A3] flex flex-wrap gap-3">
              Зарегестрироваться
              <img src={Arrow} alt="" />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
