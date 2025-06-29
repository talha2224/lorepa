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
  {
    title: "1. Purpose of the Terms of Use",
    content: `These Terms of Use (hereinafter the "Terms") are intended to define the terms and conditions under which the company operating Lorepa (hereinafter the "Company") provides users (hereinafter the "Users" or "User") access to the Lorepa platform, available via its website and mobile application (hereinafter the "Platform"), as well as the conditions for using the services offered.`,
  },
  {
    title: "2. Acceptance of the Terms of Use",
    content: `By accessing and/or using the Platform, the User acknowledges having read and unconditionally accepted these Terms. If the User does not accept all or part of the Terms, they are requested not to use the Platform.`,
  },
  {
    title: "3. Modification of the Terms",
    content: `The Company reserves the right to modify these Terms at any time. Any modification takes effect immediately upon being posted on the Platform. Users are encouraged to regularly review the Terms to stay informed of any updates. Continued use of the Platform after such modifications constitutes implicit acceptance of the revised Terms.`,
  },
  {
    title: "4. Access to the Platform",
    content: `The Platform is accessible free of charge to any User with Internet access. All costs related to access to the Platform (hardware, software, Internet connection, etc.) are borne exclusively by the User. The Company reserves the right, without prior notice or compensation, to temporarily or permanently shut down access to all or part of the Platform, especially for updates, maintenance, or content changes.`,
  },
  {
    title: "5. Registration and Account Creation",
    content: (
      <>
        <h3 className='font-semibold mt-2'>5.1. Registration Requirements</h3>
        <p>To access trailer rental services or offer a trailer for rent via the Platform, the User must create a personal account by providing accurate, complete, and up-to-date information. Registration is reserved for individuals aged 18 or older who have the legal capacity to enter into a contract.</p>
        <h3 className='font-semibold mt-2'>5.2. Account Obligations</h3>
        <p>The User agrees to:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Maintain the confidentiality of their login credentials;</li>
          <li>Immediately notify the Company of any unauthorized use of their account;</li>
          <li>Not create or use other accounts without prior authorization.</li>
        </ul>
      </>
    ),
  },
  {
    title: "6. Services Offered by the Platform",
    content: `Lorepa connects trailer owners (hereinafter "Owners") with renters (hereinafter "Renters") for peer-to-peer trailer rentals. The Platform allows: Owners to publish listings for their trailers; Renters to search for and book trailers; Management of payments, electronic signing of rental agreements, and email delivery of rental documents (PDF contracts, photos, etc.).`,
  },
  {
    title: "7. Specific Conditions for Renters",
    content: (
      <>
        <h3 className='font-semibold mt-2'>7.1. Required Documents</h3>
        <p>To rent a trailer via the Platform, the Renter must provide the following documents during registration:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>A valid copy of their driver’s license;</li>
          <li>Proof of automobile insurance including endorsement FAQ 27 (coverage for non-owned vehicles);</li>
          <li>The vehicle registration certificate.</li>
        </ul>
        <p>These documents must be valid, legible, and approved by the Company before any booking can be made.</p>
        <h3 className='font-semibold mt-2'>7.2. Renter Obligations</h3>
        <p>The Renter agrees to:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Use the trailer in accordance with its intended purpose and applicable laws;</li>
          <li>Return the trailer on the agreed date and location in its original condition;</li>
          <li>Report any damage or incident occurring during the rental.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Specific Conditions for Owners",
    content: (
      <>
        <h3 className='font-semibold mt-2'>8.1. Required Documents</h3>
        <p>To list a trailer on the Platform, the Owner must provide:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>A valid copy of their driver’s license;</li>
          <li>Proof of insurance covering the trailer;</li>
          <li>The trailer registration certificate.</li>
        </ul>
        <h3 className='font-semibold mt-2'>8.2. Owner Obligations</h3>
        <p>The Owner agrees to:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Offer a trailer in good working condition, safe, and compliant with applicable standards;</li>
          <li>Provide truthful and up-to-date information about the trailer's condition;</li>
          <li>Be available for trailer pickup and return according to the agreed schedule.</li>
        </ul>
      </>
    ),
  },
  {
    title: "9. Pricing and Payment",
    content: (
      <>
        <h3 className='font-semibold mt-2'>9.1. Commission and Service Fees</h3>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>A 15% commission is charged on each transaction made by an Owner;</li>
          <li>A 5% service fee is applied to each transaction paid by a Renter.</li>
        </ul>
        <h3 className='font-semibold mt-2'>9.2. Payment Terms</h3>
        <p>Payments are processed online via the Stripe platform. The rental amount is charged at the time of booking. After deducting applicable commissions and fees, the funds are transferred to the Owner according to Stripe’s processing timelines.</p>
        <h3 className='font-semibold mt-2'>9.3. Taxes and Additional Fees</h3>
        <p>Displayed prices include applicable taxes. Additional fees may apply for optional services or in cases of non-compliance with rental terms (e.g., late return, damage, etc.).</p>
      </>
    ),
  },
  {
    title: "10. Security Deposit and Guarantee Fund",
    content: (
      <>
        <h3 className='font-semibold mt-2'>10.1. Security Deposit</h3>
        <p>Lorepa reserves the right to pre-authorize or charge a security deposit to the Renter’s credit card to cover potential damages, theft, delays, or additional charges.</p>
        <p>The deposit amount varies depending on several factors, such as the trailer’s value, rental type, user behavior, and whether the optional Lorepa insurance is selected.</p>
        <p>If the Renter chooses the optional Lorepa insurance, the deposit amount is reduced. Without this insurance, a higher deposit is required to cover potential risks. The exact amount is communicated at the time of booking and must be accepted for the rental to be confirmed.</p>
        <p>Lorepa reserves the right to retain all or part of the deposit in case of damage, breach of these Terms, or unpaid fees. The deposit is generally refunded within 5 to 10 business days after the end of the rental, pending inspection.</p>
        <p>Owners may also require a security deposit to cover potential damage or loss. The amount is listed in the rental listing.</p>
        <h3 className='font-semibold mt-2'>10.2. Security Deposit and Insurance</h3>
        <p>A security deposit may be required for each rental. The exact amount is confirmed upon reservation and may vary depending on the trailer and total rental value.</p>
        <p>The deposit is temporarily charged or held on the Renter’s payment method at the time of the rental and serves to cover any costs resulting from damage, loss, theft, delay, or other violations of the Terms.</p>
        <h4 className='font-semibold mt-2'>Lorepa Insurance and Impact on Deposit</h4>
        <p>If the Renter selects Lorepa’s optional insurance, the required deposit may be reduced. Otherwise, a higher deposit may apply. This policy follows industry standards of platforms such as Turo, Towlos, and Neighbor Trailers.</p>
        <p>Lorepa may use all or part of the deposit to cover expenses related to any breach of these Terms. Any unused portion of the deposit will be refunded within a reasonable timeframe after the rental, once verification is complete.</p>
        <h3 className='font-semibold mt-2'>10.3. Insurance and Guarantee Fund</h3>
        <p>Lorepa offers additional coverage for damage or theft through a guarantee fund accessible via an optional insurance at $10 per rental day. This option can be activated at the time of booking.</p>
        <h3 className='font-semibold mt-2'>10.4. Use of the Guarantee Fund</h3>
        <p>The guarantee fund is used solely in the case of a reported and documented incident (with photos and reports). Activation of this mechanism is subject to approval by the Company.</p>
      </>
    ),
  },
  {
    title: "11. User Responsibility",
    content: `Each User is solely responsible for their use of the Platform, the information they provide, and the goods they rent. The User agrees to indemnify Lorepa for any damage, loss, or expense resulting from a violation of the Terms or any illegal activity conducted through the Platform.`,
  },
  {
    title: "12. Eligibility Requirements",
    content: (
      <>
        <p>To use the Lorepa platform, you must:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Be at least 21 years old.</li>
          <li>Be a resident of Canada with a valid government-issued ID.</li>
          <li>Hold a valid driver’s license (appropriate class) if you are a renter or an owner who will tow the trailer.</li>
          <li>In the case of owners, hold valid trailer registration and liability insurance.</li>
        </ul>
        <p>Lorepa reserves the right to deny access or suspend an account if these conditions are not met.</p>
      </>
    ),
  },
  {
    title: "13. User Registration",
    content: (
      <>
        <p>Registration on Lorepa is free. Users must provide accurate, up-to-date, and complete information, including:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Full name,</li>
          <li>Valid email address,</li>
          <li>Verified phone number,</li>
          <li>Complete mailing address.</li>
        </ul>
        <p>To complete the registration, certain verifications may be required, including but not limited to:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Uploading a driver’s license,</li>
          <li>Proof of insurance (FAQ 27 endorsement for renters),</li>
          <li>Vehicle or trailer registration document.</li>
        </ul>
        <p>Lorepa reserves the right to suspend or delete any account in the event of false statements or attempts to bypass verification requirements.</p>
      </>
    ),
  },
  {
    title: "14. Listing and Managing Trailers",
    content: (
      <>
        <p>Any owner wishing to list a trailer on Lorepa must:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Create a complete listing with real photos,</li>
          <li>Provide technical specifications and usage conditions,</li>
          <li>Set a daily rental price,</li>
          <li>Set availability.</li>
        </ul>
        <p>The owner is responsible for:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>The accuracy of the information provided,</li>
          <li>Regular updates to their listing,</li>
          <li>Honoring all commitments related to accepted reservations.</li>
        </ul>
      </>
    ),
  },
  {
    title: "15. Booking Process",
    content: `All trailer bookings must be made exclusively through the Lorepa platform. The process includes: A booking request by the renter, Manual or automatic acceptance by the owner, Secure payment by credit card, Trailer handover as per the agreed terms. Any attempt to arrange rentals outside the platform is a serious breach of these Terms of Use and will result in immediate account suspension.`,
  },
  {
    title: "16. Security Deposit",
    content: (
      <>
        <p>A security deposit is charged for every reservation. This amount:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Is held on the renter’s credit card for the duration of the rental,</li>
          <li>Is used to cover damages, late returns, or violations,</li>
          <li>Is automatically refunded within 5 to 10 business days if no issues are reported.</li>
        </ul>
        <p>Lorepa may, at the owner’s request or after evaluation, withhold part or all of the deposit in the event of damages or contract violations.</p>
      </>
    ),
  },
  {
    title: "17. Additional Charges and Damages",
    content: (
      <>
        <p>The renter is responsible for any damage, theft, or loss incurred during the rental period.</p>
        <p>The owner must report any incident within 24 hours of the trailer's return, including photos and a description.</p>
        <p>Lorepa reserves the right to:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Charge the renter for repair costs,</li>
          <li>Use the security deposit to cover such costs,</li>
          <li>Remove users who repeatedly cause incidents or abuse the service.</li>
        </ul>
      </>
    ),
  },
  {
    title: "18. Insurance",
    content: `Lorepa is not an insurance provider. Renters must provide proof of personal auto insurance including the FAQ 27 endorsement, which covers trailer rentals. Owners must maintain valid liability insurance for their trailer. In the absence of adequate insurance, the user is personally liable for any property or bodily damage incurred.`,
  },
  {
    title: "19. Owner Responsibilities",
    content: `Owners are solely responsible for ensuring that their trailers meet safety standards, are properly maintained, insured, and registered in compliance with applicable laws. The owner must provide accurate information about the trailer, including its specifications, conditions, and availability. Lorepa reserves the right to remove any trailer from the platform if these requirements are not met.`,
  },
  {
    title: "20. Renter Responsibilities",
    content: `Renters agree to use trailers in a careful, lawful, and responsible manner. They must inspect the trailer before use, report any pre-existing damage, and return it in the same condition as received. Any negligence, misuse, or damage may result in additional fees.`,
  },
  {
    title: "21. Pre- and Post-Rental Inspection and Documentation",
    content: `Before each rental, the renter must upload clear photos of the trailer (front, rear, both sides) to document its condition. The same photos must be provided at the end of the rental. These images form part of the rental agreement and may be used as evidence in the event of a dispute.`,
  },
  {
    title: "22. Insurance and Coverage",
    content: `Renters are required to provide valid proof of automobile insurance including the FAQ 27 endorsement. Owners must also provide proof of insurance covering the trailer. Lorepa may, at its discretion, offer optional coverage or a damage protection fund, but does not guarantee its effectiveness or legal applicability. All coverage is subject to full compliance with these Terms of Use.`,
  },
  {
    title: "23. Late Return Penalties",
    content: `If the trailer is not returned by the renter at the agreed date and time, if the renter fails to cooperate in arranging the trailer's return, or if the required recovery fees are not paid in advance, the renter will be charged a minimum penalty of $500, plus $7 per kilometer traveled (round trip) to retrieve the trailer. These amounts may be increased at the discretion of the owner. Lorepa reserves the right to impose or collect these fees as applicable.`,
  },
  {
    title: "24. No Warranty",
    content: `The renter acknowledges that the trailer is rented “as is,” with no express or implied warranty regarding its functionality, mechanical condition, or fitness for a particular purpose. Neither the owner nor Lorepa guarantees that the trailer will meet the renter’s expectations or needs, nor that it will be free from mechanical or cosmetic defects.`,
  },
  {
    title: "25. Rental Agreement",
    content: (
      <>
        <p>An electronic rental agreement is emailed at the beginning of each booking. This document governs the relationship between the owner and the renter. Lorepa is not a party to any verbal or written agreement between users beyond this rental contract.</p>
        <p>If an owner uses a personal agreement in addition to this contract, it must not contradict or override these Terms of Use or any Lorepa policies.</p>
      </>
    ),
  },
  {
    title: "26. Communication Rules and Platform Circumvention Prohibition",
    content: (
      <>
        <p>Using the Lorepa platform implies professional and respectful behavior. Abusive, offensive, or threatening language will result in immediate or permanent account suspension.</p>
        <p>Users are strictly prohibited from bypassing the platform, including by sharing direct contact information (e.g., phone number, email address, website URL, social media handle, company name, logo, etc.) before a reservation is accepted.</p>
        <p>Any content violating this rule will be removed without notice, and the user may face permanent suspension or other actions under Lorepa’s service abuse policy.</p>
      </>
    ),
  },
  {
    title: "27. Fees and Commissions",
    content: (
      <>
        <p>Trailer listings are free.</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>A 15% commission is charged on each reservation (excluding the security deposit), payable by the owner.</li>
        </ul>
        <p>The renter pays:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>A 5% service fee.</li>
        </ul>
        <p>These fees support the platform's maintenance, customer service, security, and visibility.</p>
      </>
    ),
  },
  {
    title: "28. Trailer Listing Standards",
    content: (
      <>
        <p>Listings must include:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>A detailed description of at least 200 characters.</li>
          <li>A minimum of 4 actual and unique photos of the trailer.</li>
          <li>The precise location (city) in Québec.</li>
          <li>A fair and competitive rate.</li>
        </ul>
        <p>Images and descriptions must not contain direct contact information, business logos, trade names, or any detail allowing users to bypass the platform. Manufacturer logos are permitted if they contain no contact information.</p>
        <p>Lorepa reserves the right to modify or remove any listing that fails to comply with these standards and to use the photos for advertising purposes under the rights granted upon submission.</p>
        <p>It is prohibited to list a trailer solely for promoting a transport service or if the trailer has a salvage title.</p>
      </>
    ),
  },
  {
    title: "29. Trailer Owner Obligations",
    content: (
      <>
        <p>Owners must:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Read the “Getting Started” and “Rental Process” guides available in their dashboard.</li>
          <li>Manage their bookings, extensions, and communications themselves.</li>
          <li>Respond to inquiries promptly (ideally within 1 hour).</li>
          <li>Accept or decline requests within 24 hours. After this period, the request may be automatically declined.</li>
        </ul>
        <p>Once a booking is accepted, the owner is contractually obligated to provide the trailer as agreed. In the case of an unjustified cancellation by the owner, Lorepa reserves the right to charge the full service fees, including credit card and advertising costs.</p>
        <p>The owner must be present at both handover and return, take at least 4 photos before and after each rental, and document any damages during the rental period using the procedure provided in the user dashboard.</p>
        <p>The owner is responsible for:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Starting the rental using the “Start Rental” option,</li>
          <li>Ending the rental using the “End Rental” option, once the trailer has been returned.</li>
        </ul>
      </>
    ),
  },
  {
    title: "30. Failure to Comply with Rental Procedures",
    content: (
      <>
        <p>Failure to comply with required procedures (e.g., not starting or ending the rental within the required timeframe) constitutes a breach of these terms.</p>
        <p>Lorepa may:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Cancel any active or accepted booking,</li>
          <li>Suspend or delete the user’s account,</li>
          <li>Withhold payments related to the transaction,</li>
          <li>Apply penalties at its discretion, depending on the circumstances and proof of trailer possession by the renter.</li>
        </ul>
      </>
    ),
  },
  {
    title: "31. Trailer Maintenance and Safety",
    content: (
      <>
        <p>The owner agrees to provide a trailer that is:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Mechanically safe, functional, and clean,</li>
          <li>Registered with a valid license plate,</li>
          <li>Displaying a VIN sticker and weight specifications,</li>
          <li>Compliant with safety standards, including a valid DOT inspection if applicable.</li>
        </ul>
        <p>The owner is responsible for ensuring the proper condition of all components, including tires, bearings, brakes, springs, electrical systems, hitch, chains, lights, frame, and structure.</p>
        <p>The owner agrees to indemnify Lorepa for any failure, accident, or miscommunication related to trailer maintenance or specifications.</p>
      </>
    ),
  },
  {
    title: "32. Owner Payments",
    content: (
      <>
        <p>Lorepa manages all payments owed to owners. Once an owner selects the “End Rental” button associated with a completed booking, a payment is automatically initiated the following Monday. This payment is made via Interac e-Transfer, and the funds are deposited into the owner’s designated bank account.</p>
        <p>To receive payment, the owner must register their banking information under the “My Bank Account” section in their user profile.</p>
        <p>Lorepa reserves the right to withhold any payment related to a booking deemed fraudulent or suspicious, or involved in a dispute resolved in favor of the cardholder. If a payment has already been issued under such circumstances, the corresponding amount will be deducted from future payments to the owner.</p>
      </>
    ),
  },
  {
    title: "33. Owner Cancellations",
    content: (
      <>
        <p>Owners are entitled to two (2) free cancellations within any rolling six (6)-month period. Any additional cancellations will incur a fee of CAD $100, provided the cancellation is made at least 48 hours before the scheduled start of the rental.</p>
        <p>Cancellation fees are automatically deducted from the Owner’s next payout. Cancellations are not permitted once the rental has commenced or once the rental process has been initiated through the platform.</p>
        <p>Cancellations are only permitted in cases of unavoidable circumstances, as determined solely by Lorepa. Any attempt to use cancellations as a means to bypass the platform constitutes a violation of these Terms.</p>
      </>
    ),
  },
  {
    title: "34. Platform Circumvention and Abuse",
    content: (
      <>
        <p>Use of the Lorepa platform strictly prohibits any attempts to bypass the reservation system.</p>
        <p>It is expressly forbidden for an Owner to:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Exchange contact information prior to an approved reservation;</li>
          <li>Arrange a meeting location outside the platform;</li>
          <li>Solicit a Renter to complete a rental transaction outside of Lorepa;</li>
          <li>Persuade a Renter to cancel a reservation to finalize the rental off-platform.</li>
        </ul>
        <p>Any such violation will result in immediate consequences, including but not limited to:</p>
        <ul className='list-disc list-inside space-y-1 ml-4'>
          <li>Full charge of applicable fees and commissions;</li>
          <li>Account suspension or termination;</li>
          <li>Permanent ban from the Lorepa platform.</li>
        </ul>
      </>
    ),
  },
  {
    title: "35. Intellectual Property",
    content: `All content on the Platform (texts, images, videos, logos, trademarks, etc.) is the exclusive property of the Company or its partners and is protected by intellectual property laws. Any reproduction, representation, modification, publication, or adaptation, in whole or in part, of the elements of the Platform, regardless of the means or process used, is prohibited without prior written authorization from the Company.`,
  },
  {
    title: "36. Privacy and Data Protection",
    content: `The Company is committed to protecting the personal data of its Users. All information collected is processed in accordance with the Company's Privacy Policy, which is an integral part of these Terms. Users have the right to access, rectify, delete, and object to the processing of their personal data.`,
  },
  {
    title: "37. Limitation of Liability",
    content: `Lorepa acts as an intermediary platform, connecting owners and renters. The Company is not responsible for the quality, safety, or legality of the trailers listed, nor for the conduct of Users. Lorepa's liability is limited to direct damages proven to be attributable to a fault on its part in the provision of the Platform's services.`,
  },
  {
    title: "38. Indemnification",
    content: `The User agrees to indemnify, defend, and hold harmless Lorepa, its affiliates, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses (including reasonable attorney fees) arising from or in any way connected with their access to or use of the Platform, their violation of these Terms, or their violation of any third-party rights.`,
  },
  {
    title: "39. Governing Law and Jurisdiction",
    content: `These Terms are governed by and construed in accordance with the laws of the Province of Quebec, Canada. Any dispute arising out of or in connection with these Terms shall be submitted to the exclusive jurisdiction of the courts of Quebec, Canada.`,
  },
  {
    title: "40. Contact Us",
    content: (
      <div className='ml-4'>
        <p>For any questions regarding these Terms, please contact us:</p>
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

      <div className='px-4 sm:px-6 lg:px-[3.5rem] my-10'>
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