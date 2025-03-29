import { useEffect, useState } from "react";
import Header from "../Header/header";
import { useCompanies } from "../../store/companies-slice/companies-slice";
import VacanciesCard from "../Vacancies-Card/vacancies-card";
import { motion } from "framer-motion";
import Search from "../../../assets/img/search-companie.svg";
import Location from "../../../assets/img/location.svg";
import Profession from "../../../assets/img/profession.svg";
import { Link } from "react-router-dom";
import { Spin, Space } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const loadingIcon = <LoadingOutlined style={{ fontSize: 124 }} spin />;
export const Main = () => {
  const [nameCompanie, setNameCompanie] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [experience, setExperience] = useState("");
  const [profession, setProfession] = useState("");
  const [buttonSearch, setButtonSearch] = useState("");
  const [buttonLocation, setButtonLocation] = useState("");
  const [buttonTime, setButtonTime] = useState("");
  const { getAllCompanies, isFetch, companie, error } = useCompanies();
  const [modalMenu, setModalMenu] = useState(false);
  const [cardContainer, setCardContainer] = useState("square");
  const [filterSalary, setFilterSalary] = useState("");
  const [filterSExperience, setFilterExperience] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [companiesPerPage] = useState(9);

  useEffect(() => {
    if (!companie.length) {
      getAllCompanies();
    }
  }, [getAllCompanies, companie.length]);

  const filterCompanies = companie.filter((company) => {
    const searchName = company.name
      .toLowerCase()
      .includes(buttonSearch.toLowerCase());
    const searchLocation = company.location
      .toLowerCase()
      .includes(buttonLocation.toLowerCase());
    const searchTime = company.time
      .toLowerCase()
      .includes(buttonTime.toLocaleLowerCase());
    const searchProfession = profession
      ? company.profession.toLowerCase() === profession.toLowerCase()
      : true;
    let searchSalary = true;
    if (filterSalary) {
      const companySalary = parseInt(company.salary);
      const [minSalary, maxSalary] = filterSalary.split("-").map(Number);

      if (maxSalary) {
        searchSalary = companySalary >= minSalary && companySalary <= maxSalary;
      } else {
        searchSalary = companySalary >= minSalary;
      }
    }
    let searchExperience = true;
    if (filterSExperience) {
      const companyExperience = parseInt(company.experience);
      const [minExperience, maxExperience] = filterSExperience
        .split("-")
        .map(Number);
      if (maxExperience) {
        searchExperience =
          companyExperience >= minExperience &&
          companyExperience <= maxExperience;
      } else {
        searchExperience = companyExperience >= minExperience;
      }
    }

    return (
      searchName &&
      searchLocation &&
      searchTime &&
      searchProfession &&
      searchSalary &&
      searchExperience
    );
  });

  const SearchCompanies = () => {
    setButtonSearch(nameCompanie);
    setButtonLocation(location);
    setButtonTime(time);
    setFilterSalary(salaryRange);
    setFilterExperience(experience);
  };

  const toggleCardContainer = (mode) => {
    setCardContainer(mode);
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filterCompanies.slice(
    indexOfFirstCompany,
    indexOfLastCompany
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const professions = [
    ...new Set(companie.map((company) => company.profession)),
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const professionsToShow = professions.slice(currentIndex, currentIndex + 5);
  const handleNext = () => {
    if (currentIndex + 5 < professions.length) {
      setCurrentIndex(currentIndex + 5);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 5 >= 0) {
      setCurrentIndex(currentIndex - 5);
    }
  };

  if (isFetch) {
    return (
      <motion.h1
        className="text-center text-xl font-semibold mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.h1>
    );
  }

  if (error) {
    return (
      <motion.div
        className="flex justify-center items-center h-[100vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Space size="large">
          <Spin indicator={loadingIcon} />
        </Space>
      </motion.div>
    );
  }

  return (
    <>
      <Header />
      <motion.div
        className="bg-gray-200 h-[130px] flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="relative bottom-[35px] left-[70px] text-[18px]">
          Find Job
        </p>
        <div className="flex flex-wrap gap-[10px] bg-white mt-[30px] h-[66px] rounded-t-[6px] z-20 opacity-90">
          <div className="flex flex-wrap items-center justify-center gap-[10px]">
            <img src={Search} alt="" />
            <input
              onChange={(e) => setNameCompanie(e.target.value)}
              value={nameCompanie}
              type="text"
              className="h-[40px] py-[5px] text-[18px]"
              placeholder="Название Компании"
            />
          </div>
          <div className="flex flex-wrap items-center gap-[10px]">
            <img src={Location} alt="" />
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              type="text"
              className="h-[40px] py-[5px] text-[18px]"
              placeholder="Локация"
            />
          </div>
          <div
            className="flex flex-wrap items-center gap-[10px]"
            onClick={() => setModalMenu(!modalMenu)}
          >
            <img src={Profession} alt="" />
            Расширенный фильтр
          </div>
          <div className="flex items-center">
            <button
              className="bg-blue-700 py-[9px] px-[19px] rounded-[4px] text-white"
              onClick={SearchCompanies}
            >
              Найти работу
            </button>
          </div>
          <div className="border-[1px] flex flex-wrap justify-center items-center w-[5%] h-[101%]">
            <div className="flex flex-wrap justify-center items-center gap-[6px] w-[75%]">
              <motion.div
                className="border-[1px]"
                onClick={() => toggleCardContainer("square")}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <>
                  <div className="grid grid-cols-2 grid-rows-2 gap-xy-1">
                    <div
                      className={`w-[8px] h-[8px] bg-[#939AAD] m-0.5 ${
                        cardContainer === "square"
                          ? "bg-blue-400"
                          : " w-[8px] h-[8px] bg-[#939AAD] m-0.5"
                      }`}
                    ></div>
                    <div
                      className={`w-[8px] h-[8px] bg-[#939AAD] m-0.5 ${
                        cardContainer === "square"
                          ? "bg-blue-400"
                          : "w-[8px] h-[8px] bg-[#939AAD] m-0.5"
                      }`}
                    ></div>
                    <div
                      className={`w-[8px] h-[8px] bg-[#939AAD] m-0.5 ${
                        cardContainer === "square"
                          ? "bg-blue-400"
                          : "w-[8px] h-[8px] bg-[#939AAD] m-0.5"
                      }`}
                    ></div>
                    <div
                      className={`w-[8px] h-[8px] bg-[#939AAD] m-0.5 ${
                        cardContainer === "square"
                          ? "bg-blue-400"
                          : "w-[8px] h-[8px] bg-[#939AAD] m-0.5"
                      }`}
                    ></div>
                  </div>
                </>
              </motion.div>
              <motion.div
                className="border-[1px]"
                onClick={() => toggleCardContainer("line")}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="grid grid-cols-2 grid-rows-2 gap-xy-1">
                  <div
                    className={`w-2 h-2 bg-[#939AAD] my-0.5 ml-1 ${
                      cardContainer === "line"
                        ? "bg-blue-400"
                        : ' "w-2 h-2 bg-[#191F33] my-0.5 ml-1"'
                    }`}
                  ></div>
                  <div
                    className={`w-2 h-2 bg-[#939AAD] my-0.5 ${
                      cardContainer === "line"
                        ? "bg-blue-400"
                        : ' "w-2 h-2 bg-[#191F33] my-0.5"'
                    }`}
                  ></div>
                  <div
                    className={`w-2 h-2 bg-[#939AAD] my-0.5 ml-1 ${
                      cardContainer === "line"
                        ? "bg-blue-400"
                        : ' "w-2 h-2 bg-[#191F33] my-0.5 ml-1"'
                    }`}
                  ></div>
                  <div
                    className={`w-2 h-2 bg-[#939AAD] my-0.5 ${
                      cardContainer === "line"
                        ? "bg-blue-400"
                        : ' "w-2 h-2 bg-[#191F33] my-0.5"'
                    }`}
                  ></div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
      {modalMenu && (
        <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
      )}
      {modalMenu && (
        <div className="rounded-b-[9px] shadow-md w-[76.83%] absolute top-[23.6%] left-[13.7%] grid grid-cols-3 gap-[200px] bg-white z-20 opacity-90">
          <div
            className="grid grid-cols-1 ml-[200px]"
            onChange={(e) => setExperience(e.target.value)}
            value={experience}
          >
            <p>Опыт</p>
            <label>
              <input type="radio" name="experience" value="" /> Any Experience
            </label>
            <label>
              <input type="radio" name="experience" value="1-2" /> 1-2 years
            </label>
            <label>
              <input type="radio" name="experience" value="2-3" /> 2-3 years
            </label>
            <label>
              <input type="radio" name="experience" value="3-4" /> 3-4 years
            </label>
          </div>
          <div
            className="grid grid-cols-1"
            onChange={(e) => setSalaryRange(e.target.value)}
            value={salaryRange}
          >
            <p>Зарплата</p>
            <label>
              <input type="radio" name="salary" value="" /> Any salary
            </label>
            <label>
              <input type="radio" name="salary" value="10-20" /> $10000 - $20000
            </label>
            <label>
              <input type="radio" name="salary" value="20-30" /> $20000 - $30000
            </label>
          </div>
          <div
            className="grid grid-cols-1"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <p>Тип Работы</p>
            <label>
              <input type="checkbox" name="time" value="" /> All
            </label>
            <label>
              <input type="checkbox" name="time" value="Full Time" /> Full Time
            </label>
            <label>
              <input type="checkbox" name="time" value="Part Time" /> Part Time
            </label>
            <label>
              <input type="checkbox" name="time" value="Internship" />{" "}
              Internship
            </label>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mt-6 gap-4">
        {professions.length >= 1 && (
          <>
            <div className="flex justify-between mt-2 gap-5">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="bg-black text-white px-3 py-1 rounded-[15px]"
              >
                Назад
              </button>
              <div className=" px-4 py-2 rounded">
                <div className=" max-h-[60px] w-auto grid grid-cols-5 gap-3">
                  {professionsToShow.map((prof, index) => (
                    <p
                      key={index}
                      onClick={() => setProfession(prof)}
                      className="p-2 bg-gray-500 flex justify-center text-white hover:bg-blue-600 rounded"
                    >
                      {prof}
                    </p>
                  ))}
                </div>
              </div>
              <button
                onClick={handleNext}
                disabled={currentIndex + 5 >= professions.length}
                className="bg-black text-white px-3 py-1 rounded-[15px]"
              >
                Вперед
              </button>
              <div className="flex justify-center items-center">
                <button
                  className=" bg-blue-950 px-3 py-3 text-white rounded-[15px]"
                  onClick={() => setProfession()}
                >
                  Сбросить
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Link
        to={"/registration-vacancies"}
        className="flex justify-center items-center mt-[1%]"
      >
        <button className="bg-blue-500 p-4 rounded-[12px] text-white">
          Создать Вакансию
        </button>
      </Link>
      <div className="w-[80%] ml-[10%] mt-[30px]">
        <motion.div
          className={`grid ${
            cardContainer === "line" ? "grid-cols-1" : "grid-cols-3"
          } gap-[60px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentCompanies.map((item, index) => (
            <motion.div
              key={index}
              className={
                cardContainer === "line" ? "w-[99%] h-[99%]" : "w-[90%]"
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              <VacanciesCard companies={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      {filterCompanies.length > companiesPerPage && (
        <div className="flex justify-center my-[50px]">
          <button
            className="bg-blue-500 p-3 rounded-l-[12px]"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Предыдущий
          </button>
          <span className="bg-blue-950 px-3 text-white text-[22px] flex justify-center items-center">
            {currentPage}
          </span>
          <button
            className="bg-blue-500 p-3 rounded-r-[12px]"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filterCompanies.length / companiesPerPage)
            }
          >
            Следующий
          </button>
        </div>
      )}
    </>
  );
};

export default Main;
