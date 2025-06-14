import React from 'react'
import Navbar from '../components/Navbar' 
import Footer from '../components/Footer'

const PrivacyPage = () => {
    return (
        <div className='min-h-screen bg-white text-black'>
            <Navbar />
            <div className='p-5'>
                <h1 className='text-3xl font-bold text-center mb-10'>Privacy Policy</h1>

                <div className='space-y-6 text-sm leading-relaxed'>
                    <h2 className='text-xl font-semibold mb-2'>Introduction</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    <h2 className='text-xl font-semibold mb-2'>Data We Collect</h2>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>Personal identification information (Name, email address, phone number, etc.)</li>
                        <li>Financial data (credit card information, bank account details for payouts)</li>
                        <li>Transaction history and rental details</li>
                        <li>Usage data (IP address, browser type, operating system, etc.)</li>
                        <li>Location data (for trailer search and rental)</li>
                        <li>Communication data (messages between users)</li>
                        <li>Information from third-party services (if you link social media accounts)</li>
                    </ul>

                    <h2 className='text-xl font-semibold mb-2'>How We Use Your Data</h2>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>To facilitate trailer rentals and bookings</li>
                        <li>To process payments and manage transactions</li>
                        <li>To verify user identities and ensure safety</li>
                        <li>To provide customer support and respond to inquiries</li>
                        <li>To improve our services and platform functionality</li>
                        <li>To personalize user experience and recommendations</li>
                        <li>To send important updates, notifications, and marketing communications (with consent)</li>
                        <li>To comply with legal obligations and enforce our terms and conditions</li>
                    </ul>

                    <h2 className='text-xl font-semibold mb-2'>Sharing of Personal Data</h2>
                    <p>We may share your personal data with:</p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>Other users (e.g., owner’s name to renter, renter’s contact info to owner for pickup)</li>
                        <li>Payment processors</li>
                        <li>Service providers (e.g., cloud hosting, customer support tools)</li>
                        <li>Legal and regulatory authorities (when required by law)</li>
                        <li>Third parties for marketing purposes (with your explicit consent)</li>
                    </ul>

                    <h2 className='text-xl font-semibold mb-2'>Optional Damage Insurance</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                    <h2 className='text-xl font-semibold mb-2'>Cookies and Tracking Technologies</h2>
                    <p>We use cookies and similar tracking technologies to enhance your experience by:</p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>Remembering your preferences and settings</li>
                        <li>Analyzing site traffic and user behavior</li>
                        <li>Personalizing content and advertisements</li>
                        <li>Enabling social media features</li>
                    </ul>
                    <p>You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of certain parts of our website.</p>

                    <h2 className='text-xl font-semibold mb-2'>Compliance with Quebec's Law 25</h2>
                    <p>Lorepa is committed to protecting your personal information in accordance with the Act respecting the protection of personal information in the private sector (Law 25) in Quebec. Our compliance measures include:</p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>Appointing a Privacy Officer responsible for data governance and compliance</li>
                        <li>Implementing strict data security measures to protect your information from unauthorized access, use, or disclosure</li>
                        <li>Providing transparent communication about our data handling practices</li>
                        <li>Obtaining explicit consent for the collection and use of sensitive personal information</li>
                        <li>Granting individuals the right to access, rectify, and delete their personal data</li>
                        <li>Conducting privacy impact assessments (PIAs) for new projects or systems that involve personal data</li>
                        <li>Notifying individuals and the Commission d'accès à l'information (CAI) in case of a confidentiality incident</li>
                        <li>Ensuring accountability and regular auditing of our privacy practices</li>
                    </ul>

                    <h2 className='text-xl font-semibold mb-2'>Privacy Officer</h2>
                    <p>We have appointed a Privacy Officer who is responsible for overseeing our data protection practices and ensuring compliance with Law 25. For any privacy-related inquiries or requests, please contact:</p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>[Privacy Officer Name/Title]</li>
                        <li>[Email Address]</li>
                        <li>[Phone Number (optional)]</li>
                    </ul>

                    <h2 className='text-xl font-semibold mb-2'>Security Measures</h2>
                    <p>We employ industry-standard security measures, including encryption, firewalls, and secure server facilities, to protect your personal data from unauthorized access, alteration, disclosure, or destruction.</p>

                    <h2 className='text-xl font-semibold mb-2'>Privacy Impact Assessments (PIAs)</h2>
                    <p>Before implementing any new systems or projects that involve the collection, use, or disclosure of personal information, we conduct Privacy Impact Assessments (PIAs) to identify and mitigate potential privacy risks, ensuring compliance with Law 25.</p>

                    <h2 className='text-xl font-semibold mb-2'>Automated Decision-Making</h2>
                    <p>We do not use automated decision-making processes that produce legal effects or significantly affect you. If we were to implement such processes in the future, we would obtain your explicit consent and provide transparency about the logic involved.</p>

                    <h2 className='text-xl font-semibold mb-2'>Data Storage and Security</h2>
                    <p>Your data is stored on secure servers located within Quebec (or in a jurisdiction with comparable privacy laws) and is protected by robust security measures to prevent unauthorized access or breaches.</p>

                    <h2 className='text-xl font-semibold mb-2'>Your Rights and Choices</h2>
                    <p>You have the right to:</p>
                    <ul className='list-disc list-inside space-y-1 ml-4'>
                        <li>Access your personal data</li>
                        <li>Rectify inaccurate or incomplete data</li>
                        <li>Delete your personal data (right to be forgotten)</li>
                        <li>Withdraw consent for certain data processing</li>
                        <li>Object to the processing of your personal data</li>
                        <li>Lodge a complaint with the Commission d'accès à l'information (CAI)</li>
                    </ul>

                    <h2 className='text-xl font-semibold mb-2'>Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                    <p className='ml-4'>Email: contact@lorepa.com</p>
                    <p className='ml-4'>Phone: +1 438 282 6718</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default PrivacyPage;
