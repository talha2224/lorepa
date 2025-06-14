import React from 'react';
import Navbar from '../components/Navbar'; // Assuming Navbar component exists
import Footer from '../components/Footer'; // Assuming Footer component exists

const TermsPage = () => {
  return (
    <div className='min-h-screen bg-white text-black'>
      <Navbar />

      <div className='p-5'>
        <h1 className='text-3xl font-bold text-center mb-10'>Terms of use</h1>

        <div className='space-y-6 text-sm leading-relaxed'>
          <h2 className='text-xl font-semibold mb-2'>Introduction</h2>
          <p>This document outlines the terms and conditions governing your use of our platform. By accessing or using our services, you agree to be bound by these Terms of Use.</p>

          <h2 className='text-xl font-semibold mb-2'>Eligibility</h2>
          <p>Our services are available only to individuals who are at least 18 years old and capable of forming legally binding contracts. By using our platform, you represent and warrant that you meet these eligibility requirements.</p>

          <h2 className='text-xl font-semibold mb-2'>User Account</h2>
          <p>You may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>

          <h2 className='text-xl font-semibold mb-2'>App Permissions & Device Access</h2>
          <ul className='list-disc list-inside space-y-1 ml-4'>
            <li>Access to your device's camera (optional, for profile pictures or listing photos)</li>
            <li>Access to your device's location (optional, for nearby trailer search)</li>
            <li>Storage access (for saving app data and media)</li>
            <li>Network access (for platform functionality)</li>
          </ul>

          <h2 className='text-xl font-semibold mb-2'>Banking and Payment</h2>
          <p>All payments and financial transactions are handled securely through our integrated payment processor. By using our payment services, you agree to their terms and conditions. Lorepa does not store your full banking or credit card details.</p>

          <h2 className='text-xl font-semibold mb-2'>Cancellations</h2>
          <p>Cancellation policies vary based on the type of booking and the host's preferences. Please review the specific cancellation policy before confirming your rental. In case of unforeseen emergencies, Lorepa may offer assistance with rescheduling or alternative solutions.</p>

          <h2 className='text-xl font-semibold mb-2'>Code of Conduct</h2>
          <p>Users are expected to adhere to our community guidelines and act respectfully towards other users and their property. Prohibited activities include, but are not limited to, fraud, harassment, and illegal use of trailers.</p>

          <h2 className='text-xl font-semibold mb-2'>Guarantees Fund and Insurance</h2>
          <p>Lorepa offers a Guarantee Fund and optional insurance to provide peace of mind for both renters and owners. These programs may help cover damages or losses incurred during a rental. Specific terms and conditions apply.</p>

          <h2 className='text-xl font-semibold mb-2'>Dispute Resolution</h2>
          <p>In the event of a dispute, we encourage users to first attempt to resolve the issue amicably. If a resolution cannot be reached, Lorepa offers a dispute resolution service to mediate and facilitate a fair outcome.</p>

          <h2 className='text-xl font-semibold mb-2'>Limitations of Liability</h2>
          <p>Lorepa is not responsible for any damages or losses during the rental period beyond what is covered by our Guarantee Fund or additional insurance policies. Our liability is limited to the extent permitted by law.</p>

          <h2 className='text-xl font-semibold mb-2'>Termination of Account</h2>
          <p>Lorepa reserves the right to suspend or terminate accounts that violate our Terms of Use or engage in fraudulent, harmful, or illegal activities.</p>

          <h2 className='text-xl font-semibold mb-2'>Third-Party Services</h2>
          <p>Our platform may integrate with third-party services (e.g., payment gateways, mapping services). These services have their own terms and conditions, and Lorepa is not responsible for their practices.</p>

          <h2 className='text-xl font-semibold mb-2'>Force Majeure</h2>
          <p>Lorepa is not liable for any failure or delay in performance due to acts beyond our reasonable control, including, but not limited to, natural disasters, war, or government restrictions.</p>

          <h2 className='text-xl font-semibold mb-2'>Jurisdiction and Applicable Law</h2>
          <p>These Terms of Use are governed by the laws of Quebec, Canada. Any disputes arising hereunder shall be resolved in the courts of Quebec.</p>

          <h2 className='text-xl font-semibold mb-2'>Contact</h2>
          <p>For any questions about these Terms of Use, please contact us at:</p>
          <p className='ml-4'>Email: contact@lorepa.com</p>
          <p className='ml-4'>Phone: +1 438 282 6718</p>
          <p className='ml-4'>Address: 3910 Rue de Bellechasse, Montréal, Québec, H1X 1J4</p>
        </div>
      </div>

      {/* Placeholder for Footer */}
      <Footer />
    </div>
  );
};

export default TermsPage;
