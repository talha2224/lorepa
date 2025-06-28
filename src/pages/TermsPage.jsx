import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const sections = [
  { title: "Introduction", content: `This document outlines the terms and conditions governing your use of our platform. By accessing or using our services, you agree to be bound by these Terms of Use.` },
  { title: "Eligibility", content: `Our services are available only to individuals who are at least 18 years old and capable of forming legally binding contracts.` },
  { title: "User Account", content: `You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account.` },
  {
    title: "App Permissions & Device Access",
    content: (
      <ul className='list-disc list-inside space-y-1 ml-4'>
        <li>Camera (for profile/listing photos)</li>
        <li>Location (for nearby trailer search)</li>
        <li>Storage (saving app data/media)</li>
        <li>Network (for functionality)</li>
      </ul>
    ),
  },
  { title: "Banking and Payment", content: `All payments are securely handled via our payment provider. Lorepa does not store full card/bank details.` },
  { title: "Cancellations", content: `Policies vary by host. You’re encouraged to review specific cancellation rules before booking.` },
  { title: "Code of Conduct", content: `Respect other users and property. Prohibited: fraud, harassment, and illegal activity.` },
  { title: "Guarantees Fund and Insurance", content: `Optional insurance and Lorepa’s guarantee fund help protect renters and owners. Terms apply.` },
  { title: "Dispute Resolution", content: `Try resolving issues directly first. Lorepa offers mediation if needed.` },
  { title: "Limitations of Liability", content: `Lorepa’s liability is limited to what’s covered by our insurance or guarantee fund.` },
  { title: "Termination of Account", content: `Lorepa may suspend or terminate accounts for violations or fraudulent activity.` },
  { title: "Third-Party Services", content: `We integrate third-party services like payments/maps. Their policies apply separately.` },
  { title: "Force Majeure", content: `We’re not liable for delays or failures caused by external uncontrollable events.` },
  { title: "Jurisdiction and Applicable Law", content: `These terms follow Quebec law and disputes will be resolved in Quebec courts.` },
  {
    title: "Contact",
    content: (
      <div className='ml-4'>
        <p>Email: contact@lorepa.com</p>
        <p>Phone: +1 438 282 6718</p>
        <p>Address: 3910 Rue de Bellechasse, Montréal, Québec, H1X 1J4</p>
      </div>
    ),
  },
];

const TermsPage = () => {
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <div className='min-h-screen bg-white text-black'>
      <Navbar />

      <div className=' px-4 sm:px-6 lg:px-[3rem] '>
        <motion.h1
          className='text-3xl font-bold text-center mb-10'
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms of Use
        </motion.h1>

        <div className='space-y-10 text-sm leading-relaxed'>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h2 className='text-xl font-semibold mb-2'>{section.title}</h2>
              <div className='text-gray-800'>{section.content}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
