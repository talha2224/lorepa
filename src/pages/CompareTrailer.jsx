import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TuroVsLorepaImg from "../assets/hero.png";
import { motion } from 'framer-motion';

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const sectionDelay = (i = 0) => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.1 * i, duration: 0.6, ease: 'easeOut' }
    },
});

const CompareTrailer = () => {
    return (
        <div className="min-h-screen flex flex-col font-inter text-black">
            <Navbar />

            <main className="flex-grow px-4 sm:px-6 lg:px-[3rem] mt-10">
                {/* Animated Banner Image */}
                <motion.img
                    src={TuroVsLorepaImg}
                    alt="Turo vs Lorepa Comparison"
                    className="w-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                />

                {/* Content Section */}
                <motion.div
                    className="px-4 sm:px-6 lg:px-[3rem] mt-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <motion.h1 className="text-4xl mb-2" variants={sectionDelay(1)}>Turo vs. Lorepa Comparison</motion.h1>
                    <motion.p className="text-black text-sm mb-8" variants={sectionDelay(2)}>By Lorepa Staff | Posted on Oct 25, 2024</motion.p>

                    {[
                        {
                            title: '',
                            paragraphs: [
                                `Given its past triumphs, the short-term rental market needs little to no introduction. From Airbnb and VRBO for residential units to Turo for vehicles, the landscape has been well-covered and those looking for additional income or diversifying investments have followed up on a profitable side hustle.`
                            ]
                        },
                        {
                            title: 'Turo',
                            paragraphs: [
                                `Turo operates as a car-sharing platform, similar to Airbnb but for cars, offering a wide range of over 850 models...`,
                                `Turo provides comprehensive insurance coverage for hosts and renters...`
                            ]
                        },
                        {
                            title: 'Lorepa',
                            paragraphs: [
                                `In contrast, Lorepa focuses on trailer rentals...`,
                                `The key difference is Lorepa's easy-to-use interface...`,
                                `As Lorepa grows its community...`,
                                `Whether considering whether to invest in a parcel...`
                            ]
                        },
                        {
                            title: 'Investment and Storage',
                            paragraphs: [
                                `Renting out a vehicle for a short time is less than it takes for sale and on the market...`,
                                `Investment for a user is less than that of purchasing an entire asset...`
                            ],
                            list: [
                                `Renting only has a small one time payment for 1250-2000$.`,
                                `Can then easily use for business, and you can buy it in the end...`
                            ]
                        },
                        {
                            title: 'Maintenance and usage',
                            paragraphs: [
                                `Trailers typically require less maintenance compared to vehicles...`
                            ]
                        },
                        {
                            title: 'Market Niche',
                            paragraphs: [
                                `While Turo caters to a broad car-sharing market, Lorepa focuses on a specific niche...`
                            ]
                        },
                        {
                            title: 'Flexibility and Predictability',
                            paragraphs: [
                                `Renting a car is a more everyday, general purpose rental than renting a specialty item...`
                            ]
                        },
                        {
                            title: 'Unique Income Opportunity',
                            paragraphs: [
                                `While both platforms offer income opportunities...`,
                                `The key difference is Lorepa's easy-to-use interface...`,
                                `Lorepa provides owners with a straightforward way to monetize their trailers...`
                            ]
                        }
                    ].map((section, index) => (
                        <motion.div
                            key={index}
                            className="mb-6"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={sectionDelay(index + 1)}
                        >
                            {section.title && <h2 className="text-3xl mt-8 mb-4">{section.title}</h2>}
                            {section.paragraphs.map((para, i) => (
                                <p key={i} className="mb-4 text-black">{para}</p>
                            ))}
                            {section.list && (
                                <ul className="list-disc list-inside ml-4 text-black mb-4">
                                    {section.list.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            )}
                        </motion.div>
                    ))}

                    {/* ROI Tables with Animation */}
                    {[
                        { title: "Turo return on investment", id: "turo" },
                        { title: "Lorepa return on investment", id: "lorepa" }
                    ].map((section, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={sectionDelay(index + 10)}
                        >
                            <h2 className="text-3xl mt-8 mb-4">{section.title}</h2>
                            <div className="overflow-x-auto mb-8">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">
                                                {section.id === "turo" ? "New Car" : "New Trailer"}
                                            </th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">Purchase price</th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">Daily rental rate</th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">Cost (monthly maintenance & insurance)</th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">Income (yearly, assuming 15 rental days/month)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(section.id === "turo" ? [
                                            ["2022 Chevrolet Cruze", "$25,000", "$40", "$375", "$7,200"],
                                            ["2020 Honda Civic", "$22,000", "$35", "$350", "$6,300"],
                                            ["2023 Toyota Corolla", "$24,000", "$38", "$360", "$6,840"],
                                            ["2021 Nissan Altima", "$23,000", "$37", "$355", "$6,660"],
                                            ["2024 Kia Forte", "$21,000", "$33", "$340", "$5,940"]
                                        ] : [
                                            ["6x12 Utility Trailer", "$3,500", "$50", "$100", "$7,200"],
                                            ["7x14 Enclosed Trailer", "$7,500", "$80", "$150", "$12,600"],
                                            ["18ft Car Hauler", "$5,000", "$70", "$120", "$10,440"],
                                            ["10ft Dump Trailer", "$9,000", "$95", "$180", "$14,760"],
                                            ["5x8 Cargo Trailer", "$2,500", "$40", "$80", "$5,760"]
                                        ]).map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="py-2 px-4 border text-sm text-black">{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </main>

            <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <Footer />
            </motion.div>
        </div>
    );
};

export default CompareTrailer;
