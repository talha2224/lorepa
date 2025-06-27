import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

const PrivacyPage = () => {
  const sections = [
    { title: "Introduction", content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...` },
    {
      title: "Data We Collect",
      content: (
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Financial data (credit card information, bank account details for payouts)</li>
          <li>Transaction history and rental details</li>
          <li>Usage data (IP address, browser type, operating system, etc.)</li>
          <li>Location data (for trailer search and rental)</li>
          <li>Communication data (messages between users)</li>
          <li>Information from third-party services (if you link social media accounts)</li>
        </ul>
      )
    },
    {
      title: "How We Use Your Data",
      content: (
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>To facilitate trailer rentals and bookings</li>
          <li>To process payments and manage transactions</li>
          <li>To verify user identities and ensure safety</li>
          <li>To provide customer support and respond to inquiries</li>
          <li>To improve our services and platform functionality</li>
          <li>To personalize user experience and recommendations</li>
          <li>To send updates and marketing communications (with consent)</li>
          <li>To comply with legal obligations and enforce our terms and conditions</li>
        </ul>
      )
    },
    {
      title: "Sharing of Personal Data",
      content: (
        <>
          <p>We may share your personal data with:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Other users (e.g., owner's name to renter, renter's contact info to owner)</li>
            <li>Payment processors</li>
            <li>Service providers (e.g., cloud hosting, support tools)</li>
            <li>Legal and regulatory authorities</li>
            <li>Marketing partners (with your consent)</li>
          </ul>
        </>
      )
    },
    {
      title: "Optional Damage Insurance",
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...`
    },
    {
      title: "Cookies and Tracking Technologies",
      content: (
        <>
          <p>We use cookies and similar tracking technologies to enhance your experience by:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Remembering preferences and settings</li>
            <li>Analyzing traffic and behavior</li>
            <li>Personalizing content and ads</li>
            <li>Enabling social media features</li>
          </ul>
          <p>You can manage cookie preferences in your browser settings.</p>
        </>
      )
    },
    {
      title: "Compliance with Quebec's Law 25",
      content: (
        <>
          <p>Lorepa complies with Law 25 in Quebec. Our measures include:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Appointing a Privacy Officer</li>
            <li>Strict data security controls</li>
            <li>Clear communication of data use</li>
            <li>Consent collection for sensitive data</li>
            <li>Data access, rectification, and deletion rights</li>
            <li>Conducting privacy impact assessments</li>
            <li>Breach notification protocols</li>
            <li>Regular audits and accountability</li>
          </ul>
        </>
      )
    },
    {
      title: "Privacy Officer",
      content: (
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>[Privacy Officer Name/Title]</li>
          <li>[Email Address]</li>
          <li>[Phone Number]</li>
        </ul>
      )
    },
    {
      title: "Security Measures",
      content: `We use encryption, firewalls, and secure servers to protect your personal data.`
    },
    {
      title: "Privacy Impact Assessments (PIAs)",
      content: `We conduct PIAs before launching any system involving personal data.`
    },
    {
      title: "Automated Decision-Making",
      content: `We do not use automated decisions that impact you legally. If this changes, you will be informed.`
    },
    {
      title: "Data Storage and Security",
      content: `Data is stored securely in Quebec or regions with equivalent laws.`
    },
    {
      title: "Your Rights and Choices",
      content: (
        <>
          <p>You have the right to:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Access, rectify, or delete personal data</li>
            <li>Withdraw consent or object to processing</li>
            <li>File a complaint with the CAI</li>
          </ul>
        </>
      )
    },
    {
      title: "Contact Us",
      content: (
        <>
          <p className='ml-4'>Email: contact@lorepa.com</p>
          <p className='ml-4'>Phone: +1 438 282 6718</p>
        </>
      )
    },
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='min-h-screen bg-white text-black'>
      <Navbar />

      <div className='p-5 max-w-4xl mx-auto'>
        <motion.h1
          className='text-3xl font-bold text-center mb-10'
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>

        <div className='space-y-10 text-sm leading-relaxed'>
          {sections.map((section, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariant}
            >
              <h2 className='text-xl font-semibold mb-2'>{section.title}</h2>
              <div className='text-gray-800'>{section.content}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default PrivacyPage
