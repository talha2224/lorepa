import React from 'react'
import { FaGooglePlay, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { IoLogoAppleAppstore } from 'react-icons/io5'
import { MdLanguage } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-[#F1F1F1] text-black p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* Section 1: Lorepa */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Lorepa</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/who" className="hover:underline">About</Link></li>
                        <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
                    </ul>
                </div>

                {/* Section 2: Get Started */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Get Started</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/login" className="hover:underline">Create account</Link></li>
                        <li><Link to="/trailers" className="hover:underline">Find a Trailer</Link></li>
                        <li><Link to="/host" className="hover:underline">Become a Host</Link></li>
                    </ul>
                </div>

                {/* Section 3: Locations */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Locations</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="#" className="hover:underline">Montreal</Link></li>
                        <li><Link to="#" className="hover:underline">Quebec city</Link></li>
                        <li><Link to="#" className="hover:underline">Gatineau</Link></li>
                        <li><Link to="#" className="hover:underline">Sherbrooke</Link></li>
                        <li><Link to="#" className="hover:underline">Levis</Link></li>
                    </ul>
                </div>

                {/* Section 4: Support */}
                <div>
                    <h3 className="text-lg font-medium mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="#" className="hover:underline">Help center</Link></li>
                        <li><Link to="#" className="hover:underline">Contact us</Link></li>
                    </ul>
                </div>

                {/* Section 5: Social Media and App Downloads */}
                <div className="lg:col-span-1 flex flex-col items-center md:items-end">
                    <div className="flex space-x-4 mb-6">
                        <Link to="#" aria-label="Instagram" className="text-black"><FaInstagram size={24} /></Link>
                        <Link to="#" aria-label="LinkedIn" className="text-black"><FaLinkedinIn size={24} /></Link>
                        <Link to="#" aria-label="Twitter" className="text-black"><FaTwitter size={24} /></Link>
                    </div>

                    <div className="flex items-center gap-x-4 bg-slate-50">
                        <div className="flex bg-black rounded-md text-white px-3 py-2">
                            <IoLogoAppleAppstore className="mr-2" size={24} />
                            <p className="text-xs text-nowrap">Download on the <br /> App Store</p>
                        </div>
                        <div className="flex bg-black rounded-md text-white px-3 py-2">
                            <FaGooglePlay className="mr-2" size={24} />
                            <p className="text-xs text-nowrap">Download on <br /> the Google Play</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-6 text-gray-400 hover:text-white cursor-pointer">
                        <MdLanguage className="mr-2" size={20} />
                        <span className="text-sm">English</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-black space-y-4 md:space-y-0">
                <p className="text-center md:text-left">3910 Rue de Bellechasse, Montréal, Québec, H1X 1J4</p>
                <p className="text-center md:text-left">© 2025 Lorepa. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                    <a href="/terms" className="hover:underline">Terms of Service</a>
                    <a href="#" className="hover:underline">Cookie Policy</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
