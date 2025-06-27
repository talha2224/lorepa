import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../assets/landing/hero.png";
import Img from "../assets/landing/img.png";
import Host1 from "../assets/landing/host.svg";
import Host2 from "../assets/landing/host2.png";
import Users from "../assets/landing/user.png";
import Imgs from "../assets/landing/imgs.png";
import Card1 from "../assets/landing/card1.png";
import Card2 from "../assets/landing/card2.png";
import Card3 from "../assets/landing/card3.png";
import Card4 from "../assets/landing/card4.png";
import {
  FaAngleDown,
  FaAngleUp,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
} from "react-icons/fa";
import { guestFAQs, hostFAQs } from "../../constants/constant";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeInDown = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

const flipIn = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 1 } },
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 1 } },
};

const zoomBounce = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 1.2 },
  },
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2 },
  },
};

const rotateIn = {
  hidden: { rotate: -180, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="rounded-md mb-3 bg-white"
    >
      <button
        className="w-full flex justify-between items-center p-4 text-left font-medium text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question} {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-[#D1D5DB] text-gray-700">
          {answer}
        </div>
      )}
    </motion.div>
  );
};

const AnimatedText = ({ text, variant, className = "" }) => (
  <motion.h1
    variants={variant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={`text-center ${className}`}
  >
    {text}
  </motion.h1>
);

const LandingPage = () => {
  return (
    <div className="w-screen min-h-screen bg-[#fff] flex flex-col overflow-x-hidden">
      <motion.div variants={fadeInDown} initial="hidden" animate="visible">
        <Navbar />
      </motion.div>

      <div
        style={{ backgroundImage: `url(${Hero})` }}
        className="relative min-h-screen w-screen bg-cover"
      >
        <motion.div
          variants={zoomBounce}
          initial="hidden"
          animate="visible"
          className="w-full flex justify-center items-center flex-col"
        >
          <AnimatedText
            text="Trailer rental reinvented"
            variant={fadeInUp}
            className="text-white text-xl md:text-3xl mt-10"
          />
          <AnimatedText
            text="Rent the trailer you want, wherever you want!"
            variant={fadeIn}
            className="text-white text-sm"
          />
          <motion.div
            variants={blurIn}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-md p-3 sm:w-[80%] w-[98%] mx-20 my-10 flex justify-center items-center flex-wrap"
          >
            {["Where", "From", "Until"].map((label, index) => (
              <div
                key={index}
                className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]"
              >
                <h1 className="text-sm mb-1">{label}</h1>
                <div className="flex justify-between items-center gap-x-1">
                  <input
                    type="date"
                    className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1"
                  />
                  <input
                    type="date"
                    className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1"
                  />
                </div>
              </div>
            ))}
            <div className="w-[3rem] h-[3rem] bg-[#2563EB] rounded-full flex justify-center items-center text-white">
              <FaSearch />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center items-center flex-col my-10 p-3"
      >
        <AnimatedText
          text="The new way to rent a trailer 24/7!"
          variant={flipIn}
          className="text-2xl text-black"
        />
        <AnimatedText
          text="Discover the premier platform for trailer sharing between individuals in Qubec."
          variant={fadeInUp}
          className="text-xs text-black mt-1"
        />
        <motion.img variants={scaleIn} src={Img} alt="" className="mt-6" />
      </motion.div>

      <div className="bg-[#2563EB] px-3 py-5">
        <AnimatedText
          text="Whether You Need a Trailer or Have One to Share"
          variant={fadeInDown}
          className="text-3xl text-white font-semibold my-10"
        />
        <div className="flex justify-center items-center flex-wrap gap-x-5">
          {[Host1, Host2].map((src, i) => (
            <motion.div
              key={i}
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <img src={src} alt="Host" className="mt-5" />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        variants={rotateIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center items-center flex-col bg-[#E9EFFD] p-3 mt-10"
      >
        <AnimatedText
          text="Trusted by 1000 +"
          variant={fadeInDown}
          className="text-2xl text-black font-semibold mt-10"
        />
        <AnimatedText
          text="Our company is the leading sharing platform..."
          variant={fadeInUp}
          className="text-xs text-black mt-1"
        />
        <motion.img variants={zoomBounce} src={Users} alt="" className="mt-4" />
        <AnimatedText
          text="You are one of 1000 + people who trust us completely, Thank you!"
          variant={blurIn}
          className="text-sm font-bold text-black mt-3"
        />
      </motion.div>

      <motion.div
        variants={flipIn}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center items-center flex-col p-3"
      >
        <AnimatedText
          text="Popular Locations"
          variant={scaleIn}
          className="text-2xl text-black font-semibold mt-10"
        />
        <motion.img variants={zoomBounce} src={Imgs} alt="" className="mt-6" />
      </motion.div>

      <motion.div
        variants={zoomBounce}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center items-center flex-col bg-[#0A0F18] p-3 text-white"
      >
        <div className="flex justify-between items-center mt-10 w-full flex-wrap">
          <AnimatedText
            text="Trailers by categories"
            variant={fadeInUp}
            className="text-2xl font-semibold mt-2"
          />
          <div className="flex justify-between items-center gap-x-3 mt-2">
            {[FaAngleLeft, FaAngleRight].map((Icon, i) => (
              <div
                key={i}
                className="bg-white w-[2rem] h-[2rem] rounded-full text-black flex justify-center items-center"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center overflow-x-auto">
          {[Card1, Card2, Card3, Card4].map((src, i) => (
            <img key={i} src={src} alt="" className="mt-4" />
          ))}
        </div>
      </motion.div>

      <div className="px-5 py-5 text-black">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-between items-center mt-10 w-full flex-wrap text-black"
        >
          <AnimatedText
            text="Frequently asked questions"
            variant={fadeInUp}
            className="text-lg sm:text-2xl font-semibold mt-2"
          />
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">
            See all FAQ
          </button>
        </motion.div>
        <div className="flex flex-wrap justify-between gap-x-5 mt-8">
          {[guestFAQs, hostFAQs].map((data, i) => (
            <motion.div
              key={i}
              variants={flipIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0"
            >
              <AnimatedText
                text={i === 0 ? "Guests" : "Hosts"}
                variant={fadeInUp}
                className="text-xl font-semibold mb-4"
              />
              {data.map((faq, index) => (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default LandingPage;
