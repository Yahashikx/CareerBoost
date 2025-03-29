import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/vacancies-auth-slice/vacancies-auth-slice";
import { motion } from "framer-motion";
import Header from "../Header/header";

const RegistrationCompany = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RepeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [Responsibilities, setResponsibilities] = useState([""]);
  const [Description, setDescription] = useState("");
  const [Experience, setExperience] = useState("");
  const [Images, setImages] = useState(null);
  const [Location, setLocation] = useState("");
  const [Name, setName] = useState("");
  const [Profession, setProfession] = useState("");
  const [Salary, setSalary] = useState("");
  const [Time, setTime] = useState("");

  const { registerUser, isFetch, error } = useAuth();
  const navigate = useNavigate();

  const handleResponsibilityChange = (index, value) => {
    const updatedResponsibilities = [...Responsibilities];
    updatedResponsibilities[index] = value;
    setResponsibilities(updatedResponsibilities);
  };

  const addResponsibilityInput = () => {
    setResponsibilities([...Responsibilities, ""]);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages(file);
    }
  };

  const Register = async () => {
    if (Password !== RepeatPassword) {
      setPasswordError("Пароли не совпадают");
      return;
    }
    setPasswordError("");

    try {
      const companyData = {
        companyName: Name,
        description: Description,
        experience: Experience,
        location: Location,
        name: Name,
        profession: Profession,
        responsibilities: Responsibilities.filter((item) => item.trim() !== ""),
        salary: Salary,
        time: Time,
      };
      const formData = new FormData();
      formData.append("email", Email);
      formData.append("password", Password);
      formData.append("companyData", JSON.stringify(companyData));
      if (Images) {
        formData.append("image", Images);
      }

      await registerUser(formData);
      navigate("/");
    } catch (err) {
      console.error("Ошибка регистрации:", err);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-r from-[#4e73df] to-[#1a202c] min-h-screen flex justify-center items-center">
        <div className="relative w-full max-w-[450px] p-8 bg-white rounded-xl shadow-lg mt-[20px]">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-semibold text-gray-800">
              Создать Вакансию
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Уже есть аккаунт?{" "}
              <Link to="/login" className="text-[#4e73df] font-semibold">
                Войти
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
              <label className="text-gray-700">Название Вакансии</label>
              <motion.input
                placeholder="Введите название вашей компании"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                type="text"
              />
            </div>
            <div>
              <label className="text-gray-700">Email</label>
              <motion.input
                placeholder="Введите ваш email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                type="email"
              />
            </div>
            <div>
              <label className="text-gray-700">Пароль</label>
              <motion.input
                placeholder="Введите ваш пароль"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                type="password"
              />
            </div>
            <div>
              <label className="text-gray-700">Подтверждение пароля</label>
              <motion.input
                placeholder="Подтвердите пароль"
                value={RepeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                type="password"
              />
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>
            <div>
              <label className="text-gray-700">Обязанности</label>
              {Responsibilities.map((responsibility, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) =>
                      handleResponsibilityChange(index, e.target.value)
                    }
                    placeholder={`Обязанность ${index + 1}`}
                    className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4e73df] focus:border-[#4e73df] transition duration-200"
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addResponsibilityInput}
                className="mt-2 text-[#4e73df] font-semibold"
              >
                Добавить обязанность
              </button>
            </div>
            <div>
              <label className="text-gray-700">Описание компании</label>
              <input
                type="text"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Описание компании"
              />
            </div>
            <div>
              <label className="text-gray-700">Опыт работы</label>
              <input
                type="text"
                value={Experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Опыт работы"
              />
            </div>
            <div>
              <label className="text-gray-700">Локация</label>
              <input
                type="text"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Локация"
              />
            </div>
            <div>
              <label className="text-gray-700">Профессия</label>
              <input
                type="text"
                value={Profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Профессия"
              />
            </div>
            <div>
              <label className="text-gray-700">Заработная плата</label>
              <input
                type="number"
                value={Salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Заработная плата"
              />
            </div>
            <div>
              <label className="text-gray-700">Время</label>
              <input
                type="text"
                value={Time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
                placeholder="Время"
              />
            </div>
            <div>
              <label className="text-gray-700">Логотип компании</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg"
              />
            </div>

            <motion.button
              className="w-full bg-[#4e73df] text-white p-3 rounded-lg mt-4 hover:bg-[#365b8c] focus:outline-none focus:ring-2 focus:ring-[#2c5c8e] active:scale-95 transition duration-200"
              type="button"
              onClick={Register}
              disabled={isFetch}
            >
              {isFetch ? "Создание..." : "Создать аккаунт компании"}
            </motion.button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RegistrationCompany;