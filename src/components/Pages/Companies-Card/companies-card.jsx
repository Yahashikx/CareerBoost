import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const variants = {
  hidden: { opacity: 0 },
  visible: (index) => ({
    opacity: 1,
    transition: { delay: index * 0.3 },
  }),
};

function CompaniesCard({ companies, custom }) {
  const navigate = useNavigate();
  const navigateCompanie = () => {
    navigate(`/companie-details/${companies.id}`);
  };

  return (
    <motion.div
      variants={variants}
      custom={custom}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.1 }}
      translate="0.9"
      className="bg-white rounded-lg shadow-md border-[1px] h-[105%] border-blue-50 hover:border-blue-500 "
      onClick={navigateCompanie}
    >
      <div className="mt-[15px]">
        <div className="flex flex-wrap">
          {companies.images?.map((image, index) => (
            <img
              key={`${companies.id}-${index}`}
              className="ml-[10px] w-[60px] rounded-lg"
              src={image}
              alt=""
            />
          ))}
          <div className="ml-[14px]">
            <p className="text-[17px] text-gray-800">{companies.name}</p>
            <div className="flex flex-wrap">
              <img src="./location-companie.svg" alt="" className="mr-[5px]" />
              <p className="text-[14px] text-gray-500">{companies.location}</p>
            </div>
          </div>
        </div>
        <div className="ml-[20px] mt-[9px]">
          <div>
            <p className="text-blue-600 text-[19px]">{companies.profession}</p>
          </div>
          <div className="flex flex-wrap">
            <p className="text-gray-600 text-[14px] mr-[10px]">
              {companies.time}
            </p>
            <img src="./dot.svg" alt="" className="mr-[5px]" />
            <span className="text-[14px] text-gray-600">
              ${companies.salary}k
            </span>
          </div>
          <div>
            <span className="text-[14px] text-gray-600">
              {companies.experience}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CompaniesCard;