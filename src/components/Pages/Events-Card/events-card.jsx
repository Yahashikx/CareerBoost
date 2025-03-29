import { motion } from "framer-motion";
import { useEvents } from "../../store/events-slice/events-slice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const variants = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 },
  }),
};

const EventsCard = () => {
  const { events, getAllEvents, isFetch, error } = useEvents();

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  if (isFetch) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>Error fetching events: {error}</p>;
  }

  return (
    <motion.div
      variants={variants}
      custom={0}
      initial="hidden"
      animate="visible"
      className="px-[10%] mt-[30px]"
    >
      {events.map((item, index) => (
        <motion.div
          key={index}
          variants={variants}
          custom={index}
          initial="hidden"
          animate="visible"
          className="relative w-full h-[530px] mb-6 rounded-lg overflow-hidden shadow-lg"
        >
          <Link
            to={`/event-details/${item.id}`}
            className="relative w-full h-full"
          >
            <motion.div
              className="relative w-full h-[70%]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                className="w-full h-[520px] bg-black scale-z-90 blur-md object-cover filter brightness-40"
                src={item.images[0]}
                alt={item.name}
              />
            </motion.div>
            <div className="relative left-[40px]">
              <div className="relative bottom-[300px]  ">
                <p className=" text-[28px] text-white">{item?.time}</p>
              </div>
              <div className="relative bottom-[130px] lg:bottom-[50px]">
              <p className="text-[26px] font-semibold text-white">
                {item?.name}
              </p>
              </div>
              <div className="relative bottom-[120px] lg:bottom-[40px] flex flex-wrap gap-[30px]">
                <div>
                  <p className="text-[20px] text-white">Организатор:</p>
                  <p className="text-[20px] text-white">{item?.organizer}</p>
                </div>
                <div>
                  <p className="text-[20px] text-white">Локация:</p>
                  <p className="text-[20px] text-white">{item?.location}</p>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EventsCard;
