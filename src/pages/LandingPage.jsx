import React, { useState } from "react";
import Navbar from "../components/Navbar";
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

import { FaAngleDown, FaAngleUp, FaAngleLeft, FaAngleRight, FaSearch, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoLogoAppleAppstore } from "react-icons/io5";
import { FaGooglePlay } from "react-icons/fa";
import { MdLanguage } from "react-icons/md";
import Footer from "../components/Footer";

const guestFAQs = [
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
];

const hostFAQs = [
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
  {
    question: "Question people asked us goes here",
    answer: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.S.",
  },
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-md mb-3 bg-white">
      <button className="w-full flex justify-between items-center p-4 text-left font-medium text-black" onClick={() => setIsOpen(!isOpen)}>{question} {isOpen ? <FaAngleUp /> : <FaAngleDown />}</button>
      {isOpen && (
        <div className="p-4 border-t border-[#D1D5DB] text-gray-700">{answer}</div>
      )}
    </div>
  );
};

const LandingPage = () => {



  return (
    <div className="w-screen min-h-screen bg-[#fff] flex flex-col">
      <Navbar />

      <div style={{ backgroundImage: `url(${Hero})` }} className="relative w-screen bg-cover h-full">
        <div className="w-full flex justify-center items-center flex-col">
          <h1 className="text-white tex-xl md:text-[2rem] text-center mt-10">
            Trailer rental reinvented
          </h1>
          <p className="text-white text-center text-sm">
            Rent the trailer you want, wherever you want!.
          </p>
          <div className="bg-white rounded-md p-3 sm:w-[80%] w-[98%] mx-20 my-10 flex justify-center items-center flex-wrap">
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm mb-1">Where</h1>
              <input
                type="text"
                placeholder="City, airport, hotel"
                className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] text-[13px]"
              />
            </div>
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm mb-1">From</h1>
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
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm mb-1">Until</h1>
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
            <div className="w-[3rem] h-[3rem] bg-[#2563EB] rounded-full flex justify-center items-center text-white">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>

      <div data-aos="fade-right" className="flex justify-center items-center flex-col my-10 p-3">
        <h1 className="text-2xl text-center text-black">The new way to rent a trailer 24/7!</h1>
        <h1 className="text-xs text-center text-black mt-1">Discover the premier platform for trailer sharing between individuals in Qubec.</h1>
        <img src={Img} alt="" className="mt-6" />
      </div>

      <div data-aos="flip-left" className="bg-[#2563EB] px-3 py-5">
        <h1 className="text-center text-3xl text-white font-semibold my-10">Whether You Need a Trailer or Have One to Share</h1>
        <div className="flex justify-center items-center flex-wrap gap-x-5">
          <img src={Host1} alt="Host 1" className="mt-5" />
          <img src={Host2} alt="Host 2" className="mt-5" />
        </div>
      </div>

      <div data-aos="flip-right" className="flex justify-center items-center flex-col bg-[#E9EFFD] p-3">
        <h1 className="text-center text-2xl text-black font-semibold mt-10">Trusted by 1000 +</h1>
        <p className="text-center text-xs text-black mt-1">Our company is the leading sharing platform where you can book any type of trailer from private individuals, whatever <br /> the occasion, with a dynamic community of trusted hosts.</p>
        <img src={Users} alt="" className="mt-4" />
        <p className="text-sm font-bold text-center text-black mt-3">You are one of 1000 + people who trust us completely, Thank you!</p>
      </div>

      <div data-aos="flip-up" className="flex justify-center items-center flex-col p-3">
        <h1 className="text-center text-2xl text-black font-semibold mt-10">Popular Locations</h1>
        <img src={Imgs} alt="" className="mt-6" />
      </div>


      <div data-aos="flip-down" className="flex justify-center items-center flex-col bg-[#0A0F18] p-3 text-white">
        <div className="flex justify-between items-center mt-10 w-full flex-wrap">
          <h1 className="text-2xl font-semibold mt-2">Trailers by categories</h1>
          <div className="flex justify-between items-center gap-x-3 mt-2">
            <div className="bg-white w-[2rem] h-[2rem] rounded-full text-black flex justify-center items-center">
              <FaAngleLeft />
            </div>
            <div className="bg-white w-[2rem] h-[2rem] rounded-full text-black flex justify-center items-center">
              <FaAngleRight />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center overflow-x-auto">
          <img src={Card1} alt="" className="mt-4" />
          <img src={Card2} alt="" className="mt-4" />
          <img src={Card3} alt="" className="mt-4" />
          <img src={Card4} alt="" className="mt-4" />
        </div>
      </div>

      <div className="px-5 py-5 text-black">

        <div className="flex justify-between items-center mt-10 w-full flex-wrap text-black">
          <h1 className="text-lg sm:text-2xl font-semibold mt-2">Frequently asked questions</h1>
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">See all FAQ</button>
        </div>


        <div className="flex flex-wrap justify-between gap-x-5 mt-8">
          <div data-aos="flip-left"className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Guests</h2>
            {guestFAQs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div data-aos="flip-right" className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0">
            <h2 className="text-xl font-semibold mb-4">Hosts</h2>
            {hostFAQs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>


      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
