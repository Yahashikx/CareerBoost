import { useEffect, useState } from "react";
import { useCompanies } from "../../store/companies-slice/companies-slice";
import { useAuth } from "../../store/auth-slice/auth-slice"; // Импортируем useAuth для обновления аватара
import Header from "../Header/header";
import User from "../../../assets/img/user.svg";
import { Link } from "react-router-dom";

function Profile() {
  const { work, getWork } = useCompanies();
  const { user, updateAvatar } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || User);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
    getWork();
  }, [getWork]);
  const onHandleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatarUrl = reader.result;
        setAvatar(newAvatarUrl);
        updateAvatar(newAvatarUrl);
        localStorage.setItem("avatar", newAvatarUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <Header />
      <div className="mt-[2%]">
        <div className="flex justify-center">
          <img
            className="w-[10%] h-[10%] bg-gray-500 rounded-[80px]"
            src={avatar}
            alt="Avatar"
          />
        </div>
        <div className="flex justify-center mt-[20px]">
          <input
            type="file"
            onChange={onHandleAvatarChange}
            className="text-white p-[10px] bg-blue-400 rounded-[12px]"
          />
        </div>
        <div className="mt-[2%] ml-[5%] grid grid-cols-3 gap-x-[10px] gap-y-[50px]">
          {work && work.length > 0 ? (
            work.map((item, index) => (
              <Link to={`/companie-details/${item.id}`}
                key={index}
                className="border-blue-400 border-[3px] w-[80%] p-4 rounded-[15px] shadow-md"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-20 w-20 rounded-full"
                />
                <p className="text-lg font-bold">{item.name}</p>
                <p>{item.profession}</p>
              </Link>
            ))
          ) : (
            <>
            <div></div>
            <div className="grid grid-cols-1 gap-y-3 text-center  p-4">
              <div>
                <p className="text-xl text-gray-600">
                  У вас пока нет сохранённых компаний!
                </p>
              </div>
              <div>
                <p className="text-[19px] text-gray-400 mt-2">
                  Добавьте компанию, чтобы начать следить за обновлениями и
                  получать уведомления.
                </p>
              </div>
              <Link to={'/vacancies'}>
                <button className="bg-blue-400 p-3 rounded-[9px] text-white">Поискать Работы</button>
              </Link>
            </div>
            <div></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
