import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const sectionVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const PrivacyPage = () => {
  const sections = [
    {
      title: "Preamble",
      content: `At Lorepa, protecting your personal information is a top priority. This privacy policy is intended to clearly and transparently explain how we collect, use, share, retain, and protect your personal data when you use our website or mobile application. This policy applies to all users of our services, including renters, owners, and visitors. Lorepa is committed to complying with applicable privacy laws, including: The Act respecting the protection of personal information in the private sector (Quebec); The General Data Protection Regulation (GDPR), where applicable to users located in the European Union.`,
    },
    {
      title: "1. Definition of “Personal Information”",
      content: `Personal information refers to any data about an identifiable individual, including but not limited to: Name, address, email address, phone number, photo, driver’s license, geolocation, banking data, or any other document that directly or indirectly identifies a person.`,
    },
    {
      title: "2. Consent",
      content: `By accessing our services, you expressly consent to Lorepa collecting, using, storing, and sharing your personal information in accordance with this policy. You may withdraw your consent at any time, unless Lorepa is legally required to retain certain information. To withdraw your consent, please contact us (see Section 12).`,
    },
    {
      title: "3. Collection of Personal Information",
      content: (
        <>
          <p>We collect personal information when you:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Create an account (as a renter or owner);</li>
            <li>Complete or update your profile;</li>
            <li>Upload mandatory documents (driver’s license, proof of insurance FAQ27, vehicle/trailer registration);</li>
            <li>Post or book a trailer;</li>
            <li>Communicate with another user or our support team;</li>
            <li>Leave a review or rating;</li>
            <li>Participate in a survey, contest, or promotion;</li>
            <li>Browse our website or app (IP address, device type, operating system, etc.).</li>
          </ul>
          <p>Categories of information collected:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Identity: First name, last name, date of birth, profile photo;</li>
            <li>Contact details: Mailing address, email address, phone number;</li>
            <li>Documents: Driver’s license, proof of auto insurance, vehicle/trailer registration;</li>
            <li>Payments: Data required for transactions via Stripe;</li>
            <li>Geolocation: If you explicitly consent;</li>
            <li>User-generated content: Reviews, comments, trailer photos, inspection images.</li>
          </ul>
        </>
      ),
    },
    {
      title: "4. Use of Personal Information",
      content: `We use your personal information to: Provide and manage access to our rental platform; Verify your identity and validate uploaded documents; Enable communication between renters and owners; Generate and send rental agreements, including required photos; Manage payments, deposits, refunds, and disputes; Prevent fraud and ensure user safety; Respond to your support requests; Improve our services and user experience; Comply with Lorepa’s legal and regulatory obligations.`,
    },
    {
      title: "5. Sharing and Disclosure of Information",
      content: (
        <>
          <p>We do not sell or rent your personal information.</p>
          <p>However, we may share it with:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Service providers essential to platform operations (e.g., Stripe, AWS, Firebase);</li>
            <li>Authorities when required by law, legal proceedings, or to protect our rights;</li>
            <li>Other users, but only the information required to complete a transaction (e.g., first name, initial of last name, profile photo, phone number, trailer location).</li>
          </ul>
          <p>We contractually require all third parties to adhere to strict data protection standards.</p>
        </>
      ),
    },
    {
      title: "6. Data Retention",
      content: `We retain your personal information as long as necessary to fulfill the purposes outlined in this policy and to comply with our legal and contractual obligations. Once no longer needed, your data is securely deleted or anonymized.`,
    },
    {
      title: "7. Security Measures",
      content: `Lorepa implements robust measures to protect your data: SSL/TLS encryption for data transmission; Secure servers hosted by reputable providers (e.g., AWS, Google Cloud); Restricted access to data for authorized staff and service providers only; Strict internal cybersecurity procedures. However, no method of transmission or storage is entirely secure. Lorepa cannot guarantee absolute security.`,
    },
    {
      title: "8. Your Rights",
      content: (
        <>
          <p>Subject to applicable law, you have the following rights:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Access: View the personal data we hold about you;</li>
            <li>Rectification: Correct or update your information;</li>
            <li>Consent withdrawal: Withdraw your consent for certain processing;</li>
            <li>Deletion: Request the deletion of your data, unless legally required to retain it;</li>
            <li>Portability: Receive your data in a structured, machine-readable format;</li>
            <li>Objection/Restriction: Restrict or object to specific uses of your data.</li>
          </ul>
          <p>To exercise your rights, please contact us (see Section 12).</p>
        </>
      ),
    },
    {
      title: "9. Cookies",
      content: (
        <>
          <p>We use cookies to:</p>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Improve your Browse experience and personalize content;</li>
            <li>Analyze traffic on our website;</li>
            <li>Remember your preferences.</li>
          </ul>
          <p>You may configure your browser to block certain cookies. However, doing so may limit some site features.</p>
        </>
      ),
    },
    {
      title: "10. Third-Party Services",
      content: `Lorepa may include links to third-party services (e.g., Stripe, social media). We are not responsible for their privacy practices and encourage you to consult their respective policies.`,
    },
    {
      title: "11. Policy Updates",
      content: `Lorepa may update this privacy policy at any time. Any significant changes will be clearly communicated on our website or by email. The date of the most recent update is shown at the top of this document.`,
    },
    {
      title: "12. Contact Us",
      content: (
        <div className='ml-4'>
          <p>If you have any questions, concerns, or requests regarding your personal data, or if you wish to exercise your rights, please contact us at:</p>
          <p>Lorepa – Data Protection Officer</p>
          <p>📧 Email: mayukwa.rodrigue@gmail.com</p>
          <p>📬 Mailing address: 3910, Rue de Bellechasse, Montréal, H1X 1J4, Québec, Canada</p>
        </div>
      ),
    },
    {
      title: "Legal Notice – Lorepa",
      content: (
        <>
          <h3 className='font-semibold mt-2'>1. Website presentation</h3>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Owner: Lorepa – Sole Proprietorship (Entreprise Individuelle)</li>
            <li>Registered Address: 3910,Rue de Bellechasse, Montreal, Quebec, H1X 1J4</li>
            <li>Quebec Business Number (NEQ): 2279050480</li>
            <li>Publication Director: Rodrigue Mayukwa</li>
            <li>Website Creator: Rodrigue Mayukwa</li>
            <li>Hosting Provider: [Insert provider name and website here]</li>
          </ul>
          <h3 className='font-semibold mt-2'>2. Terms of use</h3>
          <p>By using the Lorepa website, users agree to the general terms of use described here. These terms may be updated at any time, so users are encouraged to review them regularly. Access to the website is generally available at all times. Interruptions may occur for technical maintenance, which Lorepa will try to communicate in advance.</p>
          <h3 className='font-semibold mt-2'>3. Description of services</h3>
          <p>Lorepa is a peer-to-peer trailer rental platform, connecting trailer owners with renters. We aim to provide accurate and up-to-date information. However, Lorepa shall not be held liable for omissions, inaccuracies, or delays in updates, whether from Lorepa or third-party partners.</p>
          <h3 className='font-semibold mt-2'>4. Technical limitations</h3>
          <p>The website uses modern technologies such as HTML5 and JavaScript. Users must access the site using an up-to-date device and browser. Lorepa is not liable for any damages resulting from incompatible or outdated hardware/software.</p>
          <h3 className='font-semibold mt-2'>5. Intellectual property</h3>
          <p>All elements on the site (text, images, logos, code, icons, etc.) are the intellectual property of Lorepa or licensed to Lorepa. Any reproduction or representation without prior written consent is strictly prohibited. Unauthorized use of any content may be considered infringement and prosecuted under applicable intellectual property laws.</p>
          <h3 className='font-semibold mt-2'>6. Limitation of liability</h3>
          <p>Lorepa is not liable for any direct or indirect damages caused to the user's hardware during website access, nor for any bugs, incompatibilities, or losses (market opportunities, data, etc.). Lorepa may moderate or remove any interactive content (e.g., contact forms, messages) deemed illegal or inappropriate under Quebec law.</p>
          <h3 className='font-semibold mt-2'>7. Personal data protection (Law 25 – Quebec)</h3>
          <p>Lorepa complies with Law 25 on the protection of personal information. Data is collected only when necessary and with the user's knowledge. Collected data may include IP address, browser information, and referral links. Users have the right to access, correct, or delete their personal data by sending a signed written request along with valid ID to: info@lorepa.ca. No personal data is shared or sold without user consent, except in case of a business transfer.</p>
          <h3 className='font-semibold mt-2'>8. Cookies</h3>
          <p>Cookies may be installed to enhance Browse and analyze traffic. Users may configure their browser to disable cookies. Doing so may limit access to certain features.</p>
          <h3 className='font-semibold mt-2'>9. External links</h3>
          <p>Lorepa may include links to third-party websites. We do not control or endorse the content of these sites and are not responsible for their practices or policies.</p>
          <h3 className='font-semibold mt-2'>10. Governing law</h3>
          <p>Any dispute related to the use of the Lorepa website is governed by Quebec law. The competent courts of the Province of Quebec shall have exclusive jurisdiction.</p>
          <h3 className='font-semibold mt-2'>11. Glossary</h3>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>User: Any individual Browse or interacting with the Lorepa website.</li>
            <li>Personal data: Any information allowing direct or indirect identification of a physical person.</li>
          </ul>
          <h3 className='font-semibold mt-2'>12. Financial information</h3>
          <p>All prices on Lorepa are in Canadian dollars (CAD) and include applicable taxes unless stated otherwise. Fees and commissions are clearly displayed before confirmation of any transaction. Lorepa reserves the right to change its pricing without prior notice.</p>
          <h3 className='font-semibold mt-2'>13. User-generated content</h3>
          <p>Users may publish content (listings, photos, reviews, etc.). By doing so, they confirm ownership of the rights and grant Lorepa a free, non-exclusive, global license to use such content as part of its services. Lorepa may remove any content violating its policies or applicable laws without prior notice.</p>
          <h3 className='font-semibold mt-2'>14. Force majeure</h3>
          <p>Lorepa shall not be held liable in case of non-performance due to events beyond its control (natural disaster, war, internet outage, strike, etc.).</p>
          <h3 className='font-semibold mt-2'>15. Data archiving – proof</h3>
          <p>Electronic records and backups kept by Lorepa will be considered valid proof of communications, transactions, and interactions between users and Lorepa. These records are stored on reliable and durable media.</p>
        </>
      ),
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='min-h-screen bg-white text-black'>
      <Navbar />

      <div className='px-4 sm:px-6 lg:px-[3.5rem] my-10'>
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
  );
};

export default PrivacyPage;