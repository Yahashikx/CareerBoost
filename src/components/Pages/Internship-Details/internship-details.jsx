import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/header";
import { useInternship } from "../../store/internship-slice/internship-slice";
import WalletIcon from "../../../assets/img/wallet.svg";
import LocationIcon from "../../../assets/img/location-details-companie.svg";
import TimeWorkIcon from "../../../assets/img/time-work.svg";
import CloseIcon from "../../../assets/img/close.svg";
import RepostIcon from "../../../assets/img/repost.svg";
import ArrowIcon from "../../../assets/img/arrow.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function InternshipDetails() {
  const { id } = useParams();
  const { intern, getAllInternship, addToWork, isFetch } = useInternship();
  const [modalMenu, setModalMenu] = useState(false);
  const [coordinates, setCoordinates] = useState([51.505, -0.09]);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const interny = intern.find((internship) => internship.id === id);

  useEffect(() => {
    if (!isFetch && intern.length === 0) getAllInternship();
  }, [isFetch, getAllInternship, intern.length]);

  useEffect(() => {
    if (interny?.location) {
      getCoordinatesByAddress(interny.location).then(setCoordinates);
    }
  }, [interny]);

  useEffect(() => {
    if (isMapModalOpen && interny && coordinates.length > 0) {
      const initialMap = L.map("map").setView(coordinates, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        initialMap
      );

      const marker = L.marker(coordinates).addTo(initialMap);
      marker.bindPopup(`${interny.name}<br />${interny.location}`).openPopup();

      return () => initialMap.remove();
    }
  }, [isMapModalOpen, interny, coordinates]);

  const getCoordinatesByAddress = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${address}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data[0])
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } catch (error) {
      console.error("Ошибка при получении координат:", error);
    }
    return [51.505, -0.09];
  };

  const onHandleRepost = () => interny && addToWork(interny);
  return (
    <>
      <Header />
      <div className="bg-gray-200 h-[60px] flex items-center">
        <div className="ml-[10%]">
          <p>Job Details</p>
        </div>
      </div>

      <div className="flex flex-wrap ml-[30px] mt-[20px]">
        {interny.images?.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="interny"
            className="h-[100px] rounded-[60px]"
          />
        ))}
        <div className="flex flex-wrap items-center gap-[20px] ml-[20px]">
          <p className="text-[20px]">{interny.name}</p>
          <p className="text-center bg-red-200 h-[25px] w-[210px] px-[9px] rounded-[9px] text-red-600">
            {interny.profession}
          </p>
          <p className="text-center bg-blue-100 h-[25px] w-[120px] px-[9px] rounded-[9px] text-blue-600">
            {interny.time}
          </p>
        </div>
        <div className="flex items-center ml-[250px] gap-[10px]">
          <button
            onClick={onHandleRepost}
            className="bg-blue-100 p-[10px] rounded-[6px]"
          >
            <img
              className="flex items-center justify-center"
              src={RepostIcon}
              alt="Repost"
            />
          </button>
          <button
            className="bg-blue-600 text-white py-[8px] px-[40px] flex flex-wrap gap-[10px]"
            onClick={() => setModalMenu(!modalMenu)}
          >
            Подать заявку
            <img src={ArrowIcon} alt="Arrow" />
          </button>
          <button
            onClick={() => setIsMapModalOpen(true)}
            className="bg-green-600 text-white py-[8px] px-[40px] flex flex-wrap gap-[10px]"
          >
            Узнать местоположение
            <img src={ArrowIcon} alt="Arrow" />
          </button>
        </div>
      </div>
      <div className="border-blue-400 border-[1px] w-[400px] h-[270px] absolute left-[990px]">
        <div className="mt-[20px] ml-[20px]">
          <p className="text-[18px]">Обзор вакансии</p>
        </div>
        <div className="grid grid-cols-3 gap-[10px] mt-[20px] ml-[20px]">
          <div>
            <img src={WalletIcon} alt="Wallet" />
            <p className="text-gray-500">ЗАРПЛАТА:</p>
            <p>${interny.salary}k month</p>
          </div>
          <div>
            <img src={LocationIcon} alt="Location" />
            <p className="text-gray-500">ЛОКАЦИЯ:</p>
            <p>{interny.location}</p>
          </div>
          <div>
            <img src={TimeWorkIcon} alt="Time Work" />
            <p className="text-gray-500">ТИП РАБОТЫ:</p>
            <p>{interny.time}</p>
          </div>
          <div>
            <img src={TimeWorkIcon} alt="Experience" />
            <p className="text-gray-500">ОПЫТ:</p>
            <p>{interny.experience}</p>
          </div>
        </div>
      </div>

      <div className="ml-[30px] mt-[30px] w-[50%]">
        <p className="text-[20px]">Описание:</p>
        <p>{interny.description}</p>
      </div>
      <div className="w-[60%] ml-[30px] mt-[30px]">
        <div className="text-[20px]">Обязанности:</div>
        <ul className="list-disc pl-5">
          {interny.responsibilities &&
            Object.values(interny.responsibilities).map(
              (responsibility, index) => <li key={index}>{responsibility}</li>
            )}
        </ul>
      </div>
      {modalMenu && (
        <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
      )}
      {modalMenu && (
        <div className="fixed left-[30%] top-[30%] w-[40%] h-[51%] rounded-[9px] px-[20px] bg-white shadow-md z-20 opacity-90 modal">
          <button
            onClick={() => setModalMenu(false)}
            className="fixed top-[27%] left-[68%] rounded-full py-[10px] px-[10px] bg-blue-100"
          >
            <img src={CloseIcon} alt="Close" />
          </button>
          <div className="pt-[10px] text-[17px]">
            <p>Подать заявку:</p>
            <p>{interny.profession}</p>
          </div>
          <div className="pt-[10px]">
            <p>Выберите резюме</p>
            <select className="rounded-[5px] py-[10px] pl-[5px] pr-[485px] border-[1px] border-gray-600">
              <option value="">Select</option>
            </select>
          </div>
          <div className="pt-[10px]">
            <p>Сопроводительное письмо</p>
            <input
              className="rounded-[4px] w-[96%] pl-[5px] pt-[5px] pb-[100px] border-[1px] border-gray-600"
              type="text"
              placeholder="Напишите здесь свою биографию..."
            />
          </div>
          <div className="flex justify-between pt-[20px]">
            <button
              onClick={() => setModalMenu(false)}
              className="bg-blue-100 text-blue-700 py-[8px] px-[20px]"
            >
              Отмена
            </button>
            <button className="bg-blue-600 text-white py-[8px] px-[22px]">
              Подать заявку <img src={ArrowIcon} alt="Arrow" />
            </button>
          </div>
        </div>
      )}
      {isMapModalOpen && (
        <div className="fixed inset-0 bg-black opacity-70 z-10"></div>
      )}

      {isMapModalOpen && (
        <div className="fixed left-[30%] top-[30%] w-[40%] h-[51%] rounded-[9px] px-[20px] bg-white shadow-md z-20 opacity-90 modal">
          <button
            onClick={() => setIsMapModalOpen(false)} // Close map modal
            className="fixed top-[5%] right-[5%] rounded-full py-[10px] px-[10px] bg-blue-100"
          >
            <img src={CloseIcon} alt="Close" />
          </button>
          <div id="map" style={{ height: "100%", width: "100%" }}></div>
        </div>
      )}

    </>
  );
}

export default InternshipDetails;
