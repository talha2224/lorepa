import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TuroVsLorepaImg from "../assets/hero.png";
import { motion } from 'framer-motion';

const translations = {
    en: {
        title: "Turo vs. Lorepa Comparison",
        postedBy: "By Lorepa Staff | Posted on Oct 25, 2024",
        introParagraph: "Given its past triumphs, the short-term rental market needs little to no introduction. From Airbnb and VRBO for residential units to Turo for vehicles, the landscape has been well-covered and those looking for additional income or diversifying investments have followed up on a profitable side hustle.",
        turoTitle: "Turo",
        turoParagraph1: "Turo operates as a car-sharing platform, similar to Airbnb but for cars, offering a wide range of over 850 models...",
        turoParagraph2: "Turo provides comprehensive insurance coverage for hosts and renters...",
        lorepaTitle: "Lorepa",
        lorepaParagraph1: "In contrast, Lorepa focuses on trailer rentals...",
        lorepaParagraph2: "The key difference is Lorepa's easy-to-use interface...",
        lorepaParagraph3: "As Lorepa grows its community...",
        lorepaParagraph4: "Whether considering whether to invest in a parcel...",
        investmentTitle: "Investment and Storage",
        investmentParagraph1: "Renting out a vehicle for a short time is less than it takes for sale and on the market...",
        investmentParagraph2: "Investment for a user is less than that of purchasing an entire asset...",
        investmentListItem1: "Renting only has a small one time payment for 1250-2000$.",
        investmentListItem2: "Can then easily use for business, and you can buy it in the end...",
        maintenanceTitle: "Maintenance and usage",
        maintenanceParagraph1: "Trailers typically require less maintenance compared to vehicles...",
        marketNicheTitle: "Market Niche",
        marketNicheParagraph1: "While Turo caters to a broad car-sharing market, Lorepa focuses on a specific niche...",
        flexibilityTitle: "Flexibility and Predictability",
        flexibilityParagraph1: "Renting a car is a more everyday, general purpose rental than renting a specialty item...",
        uniqueIncomeTitle: "Unique Income Opportunity",
        uniqueIncomeParagraph1: "While both platforms offer income opportunities...",
        uniqueIncomeParagraph2: "The key difference is Lorepa's easy-to-use interface...",
        uniqueIncomeParagraph3: "Lorepa provides owners with a straightforward way to monetize their trailers...",
        turoROITableTitle: "Turo return on investment",
        lorepaROITableTitle: "Lorepa return on investment",
        newCarHeader: "New Car",
        newTrailerHeader: "New Trailer",
        purchasePriceHeader: "Purchase price",
        dailyRentalRateHeader: "Daily rental rate",
        costHeader: "Cost (monthly maintenance & insurance)",
        incomeHeader: "Income (yearly, assuming 15 rental days/month)",
        turoData: [
            ["2022 Chevrolet Cruze", "$25,000", "$40", "$375", "$7,200"],
            ["2020 Honda Civic", "$22,000", "$35", "$350", "$6,300"],
            ["2023 Toyota Corolla", "$24,000", "$38", "$360", "$6,840"],
            ["2021 Nissan Altima", "$23,000", "$37", "$355", "$6,660"],
            ["2024 Kia Forte", "$21,000", "$33", "$340", "$5,940"]
        ],
        lorepaData: [
            ["6x12 Utility Trailer", "$3,500", "$50", "$100", "$7,200"],
            ["7x14 Enclosed Trailer", "$7,500", "$80", "$150", "$12,600"],
            ["18ft Car Hauler", "$5,000", "$70", "$120", "$10,440"],
            ["10ft Dump Trailer", "$9,000", "$95", "$180", "$14,760"],
            ["5x8 Cargo Trailer", "$2,500", "$40", "$80", "$5,760"]
        ]
    },
    es: {
        title: "Comparación Turo vs. Lorepa",
        postedBy: "Por el personal de Lorepa | Publicado el 25 de octubre de 2024",
        introParagraph: "Dado sus triunfos pasados, el mercado de alquiler a corto plazo necesita poca o ninguna presentación. Desde Airbnb y VRBO para unidades residenciales hasta Turo para vehículos, el panorama ha estado bien cubierto y aquellos que buscan ingresos adicionales o diversificar inversiones han seguido un negocio secundario rentable.",
        turoTitle: "Turo",
        turoParagraph1: "Turo opera como una plataforma para compartir coches, similar a Airbnb pero para coches, ofreciendo una amplia gama de más de 850 modelos...",
        turoParagraph2: "Turo ofrece una cobertura de seguro completa para anfitriones e inquilinos...",
        lorepaTitle: "Lorepa",
        lorepaParagraph1: "Por el contrario, Lorepa se centra en el alquiler de remolques...",
        lorepaParagraph2: "La diferencia clave es la interfaz fácil de usar de Lorepa...",
        lorepaParagraph3: "A medida que Lorepa crece su comunidad...",
        lorepaParagraph4: "Ya sea que se considere invertir en un paquete...",
        investmentTitle: "Inversión y Almacenamiento",
        investmentParagraph1: "Alquilar un vehículo por un corto tiempo es menos de lo que se necesita para la venta y en el mercado...",
        investmentParagraph2: "La inversión para un usuario es menor que la de comprar un activo completo...",
        investmentListItem1: "El alquiler solo tiene un pequeño pago único de 1250-2000$.",
        investmentListItem2: "Luego se puede usar fácilmente para negocios, y se puede comprar al final...",
        maintenanceTitle: "Mantenimiento y uso",
        maintenanceParagraph1: "Los remolques suelen requerir menos mantenimiento en comparación con los vehículos...",
        marketNicheTitle: "Nicho de Mercado",
        marketNicheParagraph1: "Mientras que Turo atiende a un amplio mercado de coches compartidos, Lorepa se centra en un nicho específico...",
        flexibilityTitle: "Flexibilidad y Previsibilidad",
        flexibilityParagraph1: "Alquilar un coche es un alquiler de propósito general más cotidiano que alquilar un artículo especializado...",
        uniqueIncomeTitle: "Oportunidad de Ingresos Única",
        uniqueIncomeParagraph1: "Si bien ambas plataformas ofrecen oportunidades de ingresos...",
        uniqueIncomeParagraph2: "La diferencia clave es la interfaz fácil de usar de Lorepa...",
        uniqueIncomeParagraph3: "Lorepa ofrece a los propietarios una forma sencilla de monetizar sus remolques...",
        turoROITableTitle: "Retorno de la inversión de Turo",
        lorepaROITableTitle: "Retorno de la inversión de Lorepa",
        newCarHeader: "Coche Nuevo",
        newTrailerHeader: "Remolque Nuevo",
        purchasePriceHeader: "Precio de compra",
        dailyRentalRateHeader: "Tarifa de alquiler diaria",
        costHeader: "Costo (mantenimiento y seguro mensuales)",
        incomeHeader: "Ingresos (anuales, asumiendo 15 días de alquiler/mes)",
        turoData: [
            ["Chevrolet Cruze 2022", "$25,000", "$40", "$375", "$7,200"],
            ["Honda Civic 2020", "$22,000", "$35", "$350", "$6,300"],
            ["Toyota Corolla 2023", "$24,000", "$38", "$360", "$6,840"],
            ["Nissan Altima 2021", "$23,000", "$37", "$355", "$6,660"],
            ["Kia Forte 2024", "$21,000", "$33", "$340", "$5,940"]
        ],
        lorepaData: [
            ["Remolque utilitario 6x12", "$3,500", "$50", "$100", "$7,200"],
            ["Remolque cerrado 7x14", "$7,500", "$80", "$150", "$12,600"],
            ["Transportador de coches de 18 pies", "$5,000", "$70", "$120", "$10,440"],
            ["Remolque volquete de 10 pies", "$9,000", "$95", "$180", "$14,760"],
            ["Remolque de carga 5x8", "$2,500", "$40", "$80", "$5,760"]
        ]
    },
    cn: {
        title: "Turo 与 Lorepa 对比",
        postedBy: "Lorepa 团队 | 发布于 2024 年 10 月 25 日",
        introParagraph: "鉴于其过去的辉煌，短期租赁市场无需过多介绍。从用于住宅单元的 Airbnb 和 VRBO 到用于车辆的 Turo，市场格局已被充分覆盖，那些寻求额外收入或多样化投资的人也紧随其后，进行有利可图的副业。",
        turoTitle: "Turo",
        turoParagraph1: "Turo 作为一个汽车共享平台运营，类似于 Airbnb，但针对汽车，提供超过 850 种车型...",
        turoParagraph2: "Turo 为车主和租车人提供全面的保险...",
        lorepaTitle: "Lorepa",
        lorepaParagraph1: "相比之下，Lorepa 专注于拖车租赁...",
        lorepaParagraph2: "关键区别在于 Lorepa 易于使用的界面...",
        lorepaParagraph3: "随着 Lorepa 社区的发展...",
        lorepaParagraph4: "无论是考虑是否投资一个包裹...",
        investmentTitle: "投资与存储",
        investmentParagraph1: "短期租赁车辆所需的时间比销售和上市所需的时间要少...",
        investmentParagraph2: "用户的投资少于购买整个资产的投资...",
        investmentListItem1: "租赁只需一次性支付 1250-2000 美元的小额费用。",
        investmentListItem2: "然后可以轻松用于商业用途，并且最终可以购买...",
        maintenanceTitle: "维护与使用",
        maintenanceParagraph1: "与车辆相比，拖车通常需要更少的维护...",
        marketNicheTitle: "市场利基",
        marketNicheParagraph1: "虽然 Turo 迎合了广泛的汽车共享市场，但 Lorepa 专注于一个特定的利基市场...",
        flexibilityTitle: "灵活性与可预测性",
        flexibilityParagraph1: "租车是一种更日常、更通用的租赁，而不是租赁特殊物品...",
        uniqueIncomeTitle: "独特的收入机会",
        uniqueIncomeParagraph1: "虽然两个平台都提供收入机会...",
        uniqueIncomeParagraph2: "关键区别在于 Lorepa 易于使用的界面...",
        uniqueIncomeParagraph3: "Lorepa 为车主提供了一种直接的方式来将其拖车货币化...",
        turoROITableTitle: "Turo 投资回报率",
        lorepaROITableTitle: "Lorepa 投资回报率",
        newCarHeader: "新车",
        newTrailerHeader: "新拖车",
        purchasePriceHeader: "购买价格",
        dailyRentalRateHeader: "每日租金",
        costHeader: "成本（每月维护和保险）",
        incomeHeader: "收入（每年，假设每月租赁 15 天）",
        turoData: [
            ["2022 雪佛兰科鲁兹", "$25,000", "$40", "$375", "$7,200"],
            ["2020 本田思域", "$22,000", "$35", "$350", "$6,300"],
            ["2023 丰田卡罗拉", "$24,000", "$38", "$360", "$6,840"],
            ["2021 日产天籁", "$23,000", "$37", "$355", "$6,660"],
            ["2024 起亚福瑞迪", "$21,000", "$33", "$340", "$5,940"]
        ],
        lorepaData: [
            ["6x12 多功能拖车", "$3,500", "$50", "$100", "$7,200"],
            ["7x14 封闭式拖车", "$7,500", "$80", "$150", "$12,600"],
            ["18 英尺运车拖车", "$5,000", "$70", "$120", "$10,440"],
            ["10 英尺自卸拖车", "$9,000", "$95", "$180", "$14,760"],
            ["5x8 货运拖车", "$2,500", "$40", "$80", "$5,760"]
        ]
    },
    fr: {
        title: "Comparaison Turo vs. Lorepa",
        postedBy: "Par l'équipe Lorepa | Publié le 25 oct. 2024",
        introParagraph: "Compte tenu de ses succès passés, le marché de la location à court terme n'a guère besoin d'être présenté. Des unités résidentielles d'Airbnb et VRBO aux véhicules de Turo, le paysage a été bien couvert et ceux qui recherchent un revenu supplémentaire ou qui diversifient leurs investissements ont suivi une activité secondaire rentable.",
        turoTitle: "Turo",
        turoParagraph1: "Turo fonctionne comme une plateforme de partage de voitures, similaire à Airbnb mais pour les voitures, offrant une large gamme de plus de 850 modèles...",
        turoParagraph2: "Turo offre une couverture d'assurance complète pour les hôtes et les locataires...",
        lorepaTitle: "Lorepa",
        lorepaParagraph1: "En revanche, Lorepa se concentre sur la location de remorques...",
        lorepaParagraph2: "La principale différence est l'interface facile à utiliser de Lorepa...",
        lorepaParagraph3: "À mesure que Lorepa développe sa communauté...",
        lorepaParagraph4: "Que l'on envisage ou non d'investir dans une parcelle...",
        investmentTitle: "Investissement et Stockage",
        investmentParagraph1: "Louer un véhicule pour une courte période est moins cher que de le vendre et de le mettre sur le marché...",
        investmentParagraph2: "L'investissement pour un utilisateur est inférieur à celui de l'achat d'un actif entier...",
        investmentListItem1: "La location n'a qu'un petit paiement unique de 1250 à 2000$.",
        investmentListItem2: "Peut ensuite être facilement utilisé pour les affaires, et vous pouvez l'acheter à la fin...",
        maintenanceTitle: "Entretien et utilisation",
        maintenanceParagraph1: "Les remorques nécessitent généralement moins d'entretien que les véhicules...",
        marketNicheTitle: "Niche de Marché",
        marketNicheParagraph1: "Bien que Turo s'adresse à un vaste marché du partage de voitures, Lorepa se concentre sur une niche spécifique...",
        flexibilityTitle: "Flexibilité et Prévisibilité",
        flexibilityParagraph1: "Louer une voiture est une location plus quotidienne et à usage général que la location d'un article spécialisé...",
        uniqueIncomeTitle: "Opportunité de Revenu Unique",
        uniqueIncomeParagraph1: "Bien que les deux plateformes offrent des opportunités de revenus...",
        uniqueIncomeParagraph2: "La principale différence est l'interface facile à utiliser de Lorepa...",
        uniqueIncomeParagraph3: "Lorepa offre aux propriétaires un moyen simple de monétiser leurs remorques...",
        turoROITableTitle: "Retour sur investissement Turo",
        lorepaROITableTitle: "Retour sur investissement Lorepa",
        newCarHeader: "Nouvelle voiture",
        newTrailerHeader: "Nouvelle remorque",
        purchasePriceHeader: "Prix d'achat",
        dailyRentalRateHeader: "Tarif de location journalier",
        costHeader: "Coût (entretien et assurance mensuels)",
        incomeHeader: "Revenu (annuel, en supposant 15 jours de location/mois)",
        turoData: [
            ["Chevrolet Cruze 2022", "$25 000", "$40", "$375", "$7 200"],
            ["Honda Civic 2020", "$22 000", "$35", "$350", "$6 300"],
            ["Toyota Corolla 2023", "$24 000", "$38", "$360", "$6 840"],
            ["Nissan Altima 2021", "$23 000", "$37", "$355", "$6 660"],
            ["Kia Forte 2024", "$21 000", "$33", "$340", "$5 940"]
        ],
        lorepaData: [
            ["Remorque utilitaire 6x12", "$3 500", "$50", "$100", "$7 200"],
            ["Remorque fermée 7x14", "$7 500", "$80", "$150", "$12 600"],
            ["Transporteur de voitures 18 pieds", "$5 000", "$70", "$120", "$10 440"],
            ["Remorque benne 10 pieds", "$9 000", "$95", "$180", "$14 760"],
            ["Remorque cargo 5x8", "$2 500", "$40", "$80", "$5 760"]
        ]
    }
};

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
    const [translationsData, setTranslationsData] = useState(() => {
        const storedLang = localStorage.getItem('lang');
        return translations[storedLang] || translations.en;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const storedLang = localStorage.getItem('lang');
            setTranslationsData(translations[storedLang] || translations.en);
        };

        window.addEventListener('storage', handleStorageChange);
        handleStorageChange(); // Call on mount to get initial language

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const contentSections = [
        {
            title: '',
            paragraphs: [
                translationsData.introParagraph
            ]
        },
        {
            title: translationsData.turoTitle,
            paragraphs: [
                translationsData.turoParagraph1,
                translationsData.turoParagraph2
            ]
        },
        {
            title: translationsData.lorepaTitle,
            paragraphs: [
                translationsData.lorepaParagraph1,
                translationsData.lorepaParagraph2,
                translationsData.lorepaParagraph3,
                translationsData.lorepaParagraph4
            ]
        },
        {
            title: translationsData.investmentTitle,
            paragraphs: [
                translationsData.investmentParagraph1,
                translationsData.investmentParagraph2
            ],
            list: [
                translationsData.investmentListItem1,
                translationsData.investmentListItem2
            ]
        },
        {
            title: translationsData.maintenanceTitle,
            paragraphs: [
                translationsData.maintenanceParagraph1
            ]
        },
        {
            title: translationsData.marketNicheTitle,
            paragraphs: [
                translationsData.marketNicheParagraph1
            ]
        },
        {
            title: translationsData.flexibilityTitle,
            paragraphs: [
                translationsData.flexibilityParagraph1
            ]
        },
        {
            title: translationsData.uniqueIncomeTitle,
            paragraphs: [
                translationsData.uniqueIncomeParagraph1,
                translationsData.uniqueIncomeParagraph2,
                translationsData.uniqueIncomeParagraph3
            ]
        }
    ];

    const roiTables = [
        { title: translationsData.turoROITableTitle, id: "turo", data: translationsData.turoData, newHeader: translationsData.newCarHeader },
        { title: translationsData.lorepaROITableTitle, id: "lorepa", data: translationsData.lorepaData, newHeader: translationsData.newTrailerHeader }
    ];

    return (
        <div className="min-h-screen flex flex-col font-inter text-black">
            <Navbar currentLanguage={translationsData} />

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
                    <motion.h1 className="text-4xl mb-2" variants={sectionDelay(1)}>{translationsData.title}</motion.h1>
                    <motion.p className="text-black text-sm mb-8" variants={sectionDelay(2)}>{translationsData.postedBy}</motion.p>

                    {contentSections.map((section, index) => (
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
                    {roiTables.map((section, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={sectionDelay(index + contentSections.length + 1)} // Adjust delay based on previous sections
                        >
                            <h2 className="text-3xl mt-8 mb-4">{section.title}</h2>
                            <div className="overflow-x-auto mb-8">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">
                                                {section.newHeader}
                                            </th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">{translationsData.purchasePriceHeader}</th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">{translationsData.dailyRentalRateHeader}</th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">{translationsData.costHeader}</th>
                                            <th className="py-2 px-4 border text-left text-xs font-medium text-black">{translationsData.incomeHeader}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {section.data.map((row, rowIndex) => (
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