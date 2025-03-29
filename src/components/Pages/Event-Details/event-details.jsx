import { useEvents } from "../../store/events-slice/events-slice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/header";
import { Spin, Space } from 'antd';
import { motion } from "motion/react";
import { LoadingOutlined } from '@ant-design/icons';

const loadingIcon = <LoadingOutlined style={{ fontSize: 124 }} spin />;
const EventDetails = () => {
  const { events, getAllEvents, error, isFetch, addParticipant } = useEvents();
  const { id } = useParams();
  const [event, setEventDetails] = useState(null);
  const [ModalOpen, setIsModalOpen] = useState(false);
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (events.length === 0) {
      getAllEvents();
    }
  }, [events, getAllEvents]);

  useEffect(() => {
    if (events.length > 0) {
      const event = events.find((item) => item.id === id);
      setEventDetails(event);
    }
  }, [events, id]);

  const toggleModal = () => {
    setIsModalOpen(!ModalOpen);
  };

  const handleJoinEvent = async () => {
    if (!participantName || !participantEmail) {
      setMessage("Please enter both name and email!");
      return;
    }

    const success = await addParticipant(
      event.id,
      participantName,
      participantEmail
    );
    if (success) {
      setMessage("You have successfully joined the event!");
      setIsModalOpen(false);
    } else {
      setMessage("Failed to join the event.");
    }
  };

  if (isFetch) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

if (!event) {
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
      <div className="mt-[20px] rounded-[12px]">
        <div className="flex flex-wrap relative">
          <img
            className="w-[99%] h-[550px] bg-black scale-z-90 blur-md object-cover filter brightness-40"
            src={event.images[0]}
            alt={event.name}
          />
          <div className="absolute top-[17%] left-[60%]">
            <img
              className="w-[90%] h-[300px] object-cover"
              src={event.images[0]}
              alt={event.name}
            />
          </div>
          <div className="absolute top-[7%] left-[5%]">
            <h1 className="text-[30px] text-[white]">{event.name}</h1>
          </div>
          <div className="absolute top-[80%] left-[5%]">
            <p className="text-[20px] text-[white]">
              <strong>Когда:</strong> <p>{event.time}</p>
            </p>
          </div>
          <div className="absolute top-[80%] left-[25%]">
            <p className="text-[20px] text-[white]">
              <strong>Организатор:</strong> <p>{event.organizer}</p>
            </p>
          </div>
          <div className="absolute top-[80%] left-[45%]">
            <p className="text-[20px] text-[white]">
              <strong>Локация:</strong> <p>{event.location}</p>
            </p>
          </div>
          <div className="absolute top-[80%] left-[85%]">
            <button
              className="px-[18px] py-[15px] rounded-[9px] bg-blue-400 text-white"
              onClick={toggleModal}
            >
              Участвовать
            </button>
          </div>
        </div>
      </div>
      {ModalOpen && (
        <div className="p-[30px] rounded-[12px] bg-white shadow-2xs fixed top-[35%] left-[40%]">
          <h3 className="text-[22px] text-center mb-4 font-semibold text-blue-500">
            Записаться на мероприятие
          </h3>
          <input
            type="text"
            placeholder="Ваше имя"
            className="p-3 rounded-md border border-gray-300 w-full mb-4"
            value={participantName}
            onChange={(e) => setParticipantName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Ваш email"
            className="p-3 rounded-md border border-gray-300 w-full mb-4"
            value={participantEmail}
            onChange={(e) => setParticipantEmail(e.target.value)}
          />
          <div className="flex justify-between">
            <button
              className="px-[38px] py-[15px] rounded-[9px] bg-gray-300 text-white"
              onClick={toggleModal}
            >
              Отмена
            </button>
            <button
              className="px-[38px] py-[15px] rounded-[9px] bg-blue-400 text-white"
              onClick={handleJoinEvent}
            >
              Участвовать
            </button>
          </div>
        </div>
      )}
      {message && (
        <div className="mt-4 text-green-500 text-center">{message}</div>
      )}
    </>
  );
};

export default EventDetails;