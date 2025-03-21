import { motion } from "framer-motion";
import Header from "../Header/header";

const AboutUs = () => {
  return (
    <>
    <Header/>
      <div className="max-w-7xl mx-auto p-8">
        <div className="relative h-72 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <motion.h1
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              О нашей компании
            </motion.h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
