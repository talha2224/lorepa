import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import config from '../config';
import manImage from '../assets/man.png'

const fadeVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};


const singleTrailerTranslations = {
  en: {
    signupsignin: "Sign in / Sign up",
    loading: "Loading trailer details...",
    trailerNotFound: "Trailer not found.",
    failedToFetch: "Failed to fetch trailer details",
    noImage: "No Image",
    basicInfo: "Basic Info",
    trailerId: "Trailer ID",
    nameOfOwner: "Name of owner",
    category: "Category",
    trailerTitleStatus: "Trailer title status",
    detailedDescription: "Detailed description",
    pricingRentalTerms: "Pricing & Rental Terms",
    daily: "Daily:",
    weekly: "Weekly:",
    monthly: "Monthly:",
    cleaningFee: "Cleaning Fee:",
    securityDeposit: "Security Deposit:",
    insuranceDeductible: "Insurance Deductible:",
    trailerDetails: "Trailer Details",
    hitchType: "Hitch type",
    ballSize: "Ball size",
    weightCapacity: "Weight Capacity",
    lightPlugConfiguration: "Light plug configuration",
    trailerDimension: "Trailer dimension",
    year: "Year",
    make: "Make",
    model: "Model",
    vin: "VIN",
    finalSetup: "Final Setup",
    trailerValue: "Trailer Value:",
    chatWithOwner: "Chat with owner",
    downloadApp: "Download App",
    rentThisTrailer: "Rent this trailer",
    faqTitle: "Frequently asked questions",
    seeAllFaq: "See all FAQ",
    guests: "Guests",
    hosts: "Hosts",
    unknownOwner: "Unknown Owner",
    ratingsAndReviews: "Ratings and reviews",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    belowAverage: "Below average",
    poor: "Poor",
    dayAgo: "day ago",
    wasAnExcellentRenter: "was an excellent renter! They communicated clearly, picked up and returned the trailer on time, and took great care of the equipment. Everything was returned in perfect condition. Highly recommended for future rentals!",
    smoothTransactionWith: "Smooth transaction with lorepa! They were punctual, polite, and treated the trailer as if it were their own. Highly recommended.",
    isATrustworthyRenter: "is a trustworthy renter. The trailer was returned in excellent shape, and the entire process was hassle-free. 5 stars!",
    outstandingExperience: "Outstanding experience! lorepa was easy to work with, followed all instructions, and ensured the trailer stayed in great condition.",
    highlyRecommendedRenter: "Highly recommended renter. lorepa was organized, courteous, and took excellent care of the trailer during their hire.",
    readMore: "Read more",
    // FAQ for Renters (Guests)
    faqRenter1Q: "What do I need to rent a trailer on Lorepa?",
    faqRenter1A: "To rent a trailer, you must be at least 21 years old, hold a valid driver’s license, and provide proof of insurance. You will also need a verified Lorepa account.",
    faqRenter2Q: "How does the rental process work?",
    faqRenter2A: "You browse available trailers, send a request to the owner, and once approved, confirm your booking. A rental contract and inspection photos are generated automatically.",
    faqRenter3Q: "Is insurance included in my rental?",
    faqRenter3A: "No. You are required to provide valid auto insurance that covers towing. Additional optional protection may be offered during checkout.",
    faqRenter4Q: "Can I cancel my booking?",
    faqRenter4A: "Yes, you can cancel under the terms described in our cancellation policy. Refunds may vary depending on when the cancellation is made relative to the start date.",
    faqRenter5Q: "What happens if I return the trailer late?",
    faqRenter5A: "Late returns may incur a flat penalty fee, as outlined in the Terms of Use. Always notify the owner in case of delay to avoid disputes.",
    faqRenter6Q: "What if the trailer is damaged during my trip?",
    faqRenter6A: "You are responsible for any damage during the rental period. Damage costs may be deducted from your deposit or charged directly, depending on the severity and proof.",
    faqRenter7Q: "How are payments and deposits handled?",
    faqRenter7A: "Payments are processed securely through Stripe. A security deposit is held during the rental period and released within 7 days if no issues are reported.",
    faqRenter8Q: "Where can I tow the trailer?",
    faqRenter8A: "Most trailers can be towed within Canada. If cross-border travel (e.g., to the USA) is planned, check with the owner first and mention it in your request.",
    faqRenter9Q: "Do I need a special towing license?",
    faqRenter9A: "In most Canadian provinces, a standard Class 5 license is enough for small trailers. However, it's your responsibility to ensure you meet local requirements and that your vehicle is rated to tow the selected trailer.",
    faqRenter10Q: "What kind of trailers are available?",
    faqRenter10A: "Lorepa offers utility trailers, enclosed cargo trailers, car haulers, motorcycle trailers, and more. You can filter by category, size, or location.",
    faqRenter11Q: "Can I rent a trailer for a one-way trip?",
    faqRenter11A: "Most rentals are round-trip. If you need one-way rental, contact the owner directly or check listings with flexible return options.",
    faqRenter12Q: "Are there any hidden fees?",
    faqRenter12A: "No hidden fees. All charges are shown upfront. Some extras (e.g., cleaning, extra days, mileage overage) may be added if not respected.",
    faqRenter13Q: "How do I contact customer support?",
    faqRenter13A: "You can reach our support team via the chat feature on the app or website, or by email at support@lorepa.ca. Response time is typically under 24h.",

    // FAQ for Owners (Hosts)
    faqOwner1Q: "How do I list my trailer?",
    faqOwner1A: "You can list your trailer by signing up, filling in key details (description, availability, pricing), uploading photos, and providing required documents (registration, insurance).",
    faqOwner2Q: "How much can I earn with Lorepa?",
    faqOwner2A: "You keep 85% of the rental price. The remaining 15% covers Lorepa’s service fee. Payouts are processed automatically via Stripe within 3–5 business days after the rental ends.",
    faqOwner3Q: "Can I cancel a reservation?",
    faqOwner3A: "Yes, but owners are allowed only 2 free cancellations every 6 months. After that, a $100 CAD penalty applies if the cancellation is within policy. Abuse of cancellations is subject to account review.",
    faqOwner4Q: "What if my trailer is returned late or damaged?",
    faqOwner4A: "You can report any issue via the platform within 24 hours. Lorepa can assist with deducting penalties or damage costs from the renter’s deposit.",
    faqOwner5Q: "Do I need special insurance as an owner?",
    faqOwner5A: "You must maintain valid trailer insurance. Lorepa does not provide direct coverage to owners. However, optional protection programs may be introduced in future.",
    faqOwner6Q: "Can I choose who rents my trailer?",
    faqOwner6A: "Yes. You can review the renter’s profile, documents, and ratings before accepting a request. You are under no obligation to accept every booking.",
    faqOwner7Q: "How are taxes handled?",
    faqOwner7A: "You are responsible for reporting your earnings and managing your taxes. Lorepa may provide annual income summaries, but does not remit taxes on your behalf.",
    faqOwner8Q: "Can I rent out multiple trailers?",
    faqOwner8A: "Absolutely. Lorepa supports multiple listings per user. You can manage your fleet under one account and adjust availability per unit.",
    faqOwner9Q: "Can I require a cleaning fee or extra conditions?",
    faqOwner9A: "Yes. You may set your own rules (cleaning fees, towing restrictions, penalties for misuse), but they must be clearly disclosed in your listing.",
    faqOwner10Q: "How can I improve my trailer visibility?",
    faqOwner10A: "Use high-quality photos, detailed descriptions, fair pricing, and maintain a good response rate. Verified owners with good ratings appear higher in search results.",
    faqOwner11Q: "How do I handle fuel or equipment returns?",
    faqOwner11A: "You can specify in your listing whether fuel/equipment must be returned in the same condition. Always document the condition at pickup and return.",
    faqOwner12Q: "Can I report a bad renter?",
    faqOwner12A: "Yes. After the rental ends, you can leave a review and report any serious incident to Lorepa’s trust & safety team. Repeated abuse may result in renter bans.",

    // Global FAQ (Both)
    faqGlobal1Q: "Who is responsible in case of accident or theft?",
    faqGlobal1A: "Renters are liable for any damages or loss during the rental. In serious cases, police reports, insurance claims, and platform mediation may apply.",
    faqGlobal2Q: "Does Lorepa offer insurance coverage?",
    faqGlobal2A: "Currently, Lorepa does not directly offer insurance but may require proof of third-party coverage. Dedicated insurance options may be added soon.",
    faqGlobal3Q: "Is Lorepa available in the USA?",
    faqGlobal3A: "Lorepa is currently focused on Canada. Cross-border use is only allowed with owner consent and proper documentation.",
    chatWithOwner: "Download the app to chat",
  },
  es: {
    signupsignin: "Iniciar sesión / Registrarse",
    chatWithOwner: "Descarga la aplicación para chatear",
    loading: "Cargando detalles del remolque...",
    trailerNotFound: "Remolque no encontrado.",
    failedToFetch: "Error al obtener los detalles del remolque",
    noImage: "Sin imagen",
    basicInfo: "Información básica",
    trailerId: "ID del remolque",
    nameOfOwner: "Nombre del propietario",
    category: "Categoría",
    trailerTitleStatus: "Estado del título del remolque",
    detailedDescription: "Descripción detallada",
    pricingRentalTerms: "Precios y Términos de Alquiler",
    daily: "Diario:",
    weekly: "Semanal:",
    monthly: "Mensual:",
    cleaningFee: "Tarifa de Limpieza:",
    securityDeposit: "Depósito de Seguridad:",
    insuranceDeductible: "Deducible de Seguro:",
    trailerDetails: "Detalles del remolque",
    hitchType: "Tipo de enganche",
    ballSize: "Tamaño de la bola",
    weightCapacity: "Capacidad de peso",
    lightPlugConfiguration: "Configuración del enchufe de luz",
    trailerDimension: "Dimensión del remolque",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    vin: "VIN",
    finalSetup: "Configuración final",
    trailerValue: "Valor del remolque:",
    chatWithOwner: "Chatear con el propietario",
    downloadApp: "Descargar aplicación",
    rentThisTrailer: "Alquilar este remolque",
    faqTitle: "Preguntas frecuentes",
    seeAllFaq: "Ver todas las preguntas frecuentes",
    guests: "Invitados",
    hosts: "Anfitriones",
    unknownOwner: "Propietario Desconocido",
    ratingsAndReviews: "Calificaciones y reseñas",
    excellent: "Excelente",
    good: "Bien",
    average: "Promedio",
    belowAverage: "Por debajo del promedio",
    poor: "Pobre",
    dayAgo: "día atrás",
    wasAnExcellentRenter: "¡fue un excelente inquilino! Se comunicaron claramente, recogieron y devolvieron el remolque a tiempo, y cuidaron muy bien el equipo. Todo fue devuelto en perfectas condiciones. ¡Muy recomendable para futuros alquileres!",
    smoothTransactionWith: "¡Transacción fluida con lorepa! Fueron puntuales, educados y trataron el remolque como si fuera suyo. Muy recomendable.",
    isATrustworthyRenter: "es un inquilino de confianza. El remolque fue devuelto en excelentes condiciones, y todo el proceso fue sin problemas. ¡5 estrellas!",
    outstandingExperience: "¡Experiencia sobresaliente! lorepa fue fácil de trabajar, siguió todas las instrucciones y se aseguró de que el remolque se mantuviera en excelentes condiciones.",
    highlyRecommendedRenter: "Inquilino muy recomendado. lorepa fue organizado, cortés y cuidó excelentemente el remolque durante su alquiler.",
    readMore: "Leer más",
    // FAQ for Renters (Guests)
    faqRenter1Q: "¿Qué necesito para alquilar un remolque en Lorepa?",
    faqRenter1A: "Para alquilar un remolque, debe tener al menos 21 años, poseer una licencia de conducir válida y proporcionar prueba de seguro. También necesitará una cuenta verificada de Lorepa.",
    faqRenter2Q: "¿Cómo funciona el proceso de alquiler?",
    faqRenter2A: "Usted busca remolques disponibles, envía una solicitud al propietario y, una vez aprobada, confirma su reserva. Un contrato de alquiler y fotos de inspección se generan automáticamente.",
    faqRenter3Q: "¿El seguro está incluido en mi alquiler?",
    faqRenter3A: "No. Se le exige que proporcione un seguro de automóvil válido que cubra el remolque. Es posible que se ofrezca protección opcional adicional durante el proceso de pago.",
    faqRenter4Q: "¿Puedo cancelar mi reserva?",
    faqRenter4A: "Sí, puede cancelar según los términos descritos en nuestra política de cancelación. Los reembolsos pueden variar dependiendo de cuándo se realice la cancelación en relación con la fecha de inicio.",
    faqRenter5Q: "¿Qué sucede si devuelvo el remolque tarde?",
    faqRenter5A: "Las devoluciones tardías pueden incurrir en una tarifa de penalización fija, como se describe en los Términos de uso. Siempre notifique al propietario en caso de retraso para evitar disputas.",
    faqRenter6Q: "¿Qué pasa si el remolque se daña durante mi viaje?",
    faqRenter6A: "Usted es responsable de cualquier daño durante el período de alquiler. Los costos de los daños pueden deducirse de su depósito o cargarse directamente, dependiendo de la gravedad y la prueba.",
    faqRenter7Q: "¿Cómo se manejan los pagos y los depósitos?",
    faqRenter7A: "Los pagos se procesan de forma segura a través de Stripe. Se retiene un depósito de seguridad durante el período de alquiler y se libera dentro de los 7 días si no se informan problemas.",
    faqRenter8Q: "¿Dónde puedo remolcar el remolque?",
    faqRenter8A: "La mayoría de los remolques se pueden remolcar dentro de Canadá. Si se planea viajar a través de la frontera (por ejemplo, a EE. UU.), consulte primero con el propietario y menciónelo en su solicitud.",
    faqRenter9Q: "¿Necesito una licencia de remolque especial?",
    faqRenter9A: "En la mayoría de las provincias canadienses, una licencia estándar de Clase 5 es suficiente para remolques pequeños. Sin embargo, es su responsabilidad asegurarse de cumplir con los requisitos locales y de que su vehículo esté clasificado para remolcar el remolque seleccionado.",
    faqRenter10Q: "¿Qué tipo de remolques están disponibles?",
    faqRenter10A: "Lorepa ofrece remolques utilitarios, remolques de carga cerrados, transportadores de automóviles, remolques de motocicletas y más. Puede filtrar por categoría, tamaño o ubicación.",
    faqRenter11Q: "¿Puedo alquilar un remolque para un viaje de ida?",
    faqRenter11A: "La mayoría de los alquileres son de ida y vuelta. Si necesita un alquiler de ida, comuníquese directamente con el propietario o consulte las listas con opciones de devolución flexibles.",
    faqRenter12Q: "¿Hay tarifas ocultas?",
    faqRenter12A: "No hay tarifas ocultas. Todos los cargos se muestran por adelantado. Algunos extras (por ejemplo, limpieza, días adicionales, exceso de kilometraje) pueden agregarse si no se respetan.",
    faqRenter13Q: "¿Cómo contacto al soporte al cliente?",
    faqRenter13A: "Puede comunicarse con nuestro equipo de soporte a través de la función de chat en la aplicación o el sitio web, o por correo electrónico a support@lorepa.ca. El tiempo de respuesta es generalmente inferior a 24 horas.",

    // FAQ for Owners (Hosts)
    faqOwner1Q: "¿Cómo publico mi remolque?",
    faqOwner1A: "Puede publicar su remolque registrándose, completando los detalles clave (descripción, disponibilidad, precios), subiendo fotos y proporcionando los documentos requeridos (registro, seguro).",
    faqOwner2Q: "¿Cuánto puedo ganar con Lorepa?",
    faqOwner2A: "Usted conserva el 85% del precio del alquiler. El 15% restante cubre la tarifa de servicio de Lorepa. Los pagos se procesan automáticamente a través de Stripe dentro de 3 a 5 días hábiles después de que finaliza el alquiler.",
    faqOwner3Q: "¿Puedo cancelar una reserva?",
    faqOwner3A: "Sí, pero los propietarios solo tienen permitidas 2 cancelaciones gratuitas cada 6 meses. Después de eso, se aplica una penalización de $100 CAD si la cancelación está dentro de la política. El abuso de las cancelaciones está sujeto a revisión de la cuenta.",
    faqOwner4Q: "¿Qué pasa si mi remolque se devuelve tarde o dañado?",
    faqOwner4A: "Puede informar cualquier problema a través de la plataforma dentro de las 24 horas. Lorepa puede ayudar con la deducción de multas o costos por daños del depósito del inquilino.",
    faqOwner5Q: "¿Necesito un seguro especial como propietario?",
    faqOwner5A: "Debe mantener un seguro de remolque válido. Lorepa no proporciona cobertura directa a los propietarios. Sin embargo, es posible que se introduzcan programas de protección opcionales en el futuro.",
    faqOwner6Q: "¿Puedo elegir quién alquila mi remolque?",
    faqOwner6A: "Sí. Puede revisar el perfil del inquilino, los documentos y las calificaciones antes de aceptar una solicitud. No está obligado a aceptar todas las reservas.",
    faqOwner7Q: "¿Cómo se gestionan los impuestos?",
    faqOwner7A: "Usted es responsable de declarar sus ganancias y gestionar sus impuestos. Lorepa puede proporcionar resúmenes anuales de ingresos, pero no remite los impuestos en su nombre.",
    faqOwner8Q: "¿Puedo alquilar varios remolques?",
    faqOwner8A: "Absolutamente. Lorepa admite múltiples listados por usuario. Puede administrar su flota bajo una sola cuenta y ajustar la disponibilidad por unidad.",
    faqOwner9Q: "¿Puedo exigir una tarifa de limpieza o condiciones adicionales?",
    faqOwner9A: "Sí. Puede establecer sus propias reglas (tarifas de limpieza, restricciones de remolque, sanciones por mal uso), pero deben divulgarse claramente en su listado.",
    faqOwner10Q: "¿Cómo puedo mejorar la visibilidad de mi remolque?",
    faqOwner10A: "Utilice fotos de alta calidad, descripciones detalladas, precios justos y mantenga una buena tasa de respuesta. Los propietarios verificados con buenas calificaciones aparecen más arriba en los resultados de búsqueda.",
    faqOwner11Q: "¿Cómo manejo la devolución de combustible o equipo?",
    faqOwner11A: "Puede especificar en su listado si el combustible/equipo debe devolverse en las mismas condiciones. Siempre documente la condición al momento de la recogida y la devolución.",
    faqOwner12Q: "¿Puedo denunciar a un mal inquilino?",
    faqOwner12A: "Sí. Después de que finalice el alquiler, puede dejar una reseña e informar cualquier incidente grave al equipo de confianza y seguridad de Lorepa. El abuso repetido puede resultar en la prohibición de inquilinos.",

    // Global FAQ (Both)
    faqGlobal1Q: "¿Quién es responsable en caso de accidente o robo?",
    faqGlobal1A: "Los inquilinos son responsables de cualquier daño o pérdida durante el alquiler. En casos graves, pueden aplicarse informes policiales, reclamos de seguro y mediación de la plataforma.",
    faqGlobal2Q: "¿Lorepa ofrece cobertura de seguro?",
    faqGlobal2A: "Actualmente, Lorepa no ofrece directamente seguro, pero puede requerir prueba de cobertura de terceros. Próximamente se pueden agregar opciones de seguro dedicadas.",
    faqGlobal3Q: "¿Lorepa está disponible en los EE. UU.?",
    faqGlobal3A: "Lorepa se centra actualmente en Canadá. El uso transfronterizo solo está permitido con el consentimiento del propietario y la documentación adecuada.",
  },
  cn: {
    "signupsignin": "登录 / 注册",
    chatWithOwner: "下载应用以聊天",
    loading: "正在加载拖车详情...",
    trailerNotFound: "未找到拖车。",
    failedToFetch: "获取拖车详情失败",
    noImage: "无图片",
    basicInfo: "基本信息",
    trailerId: "拖车ID",
    nameOfOwner: "车主姓名",
    category: "类别",
    trailerTitleStatus: "拖车标题状态",
    detailedDescription: "详细描述",
    pricingRentalTerms: "定价与租赁条款",
    daily: "每日：",
    weekly: "每周：",
    monthly: "每月：",
    cleaningFee: "清洁费：",
    securityDeposit: "保证金：",
    insuranceDeductible: "保险免赔额：",
    trailerDetails: "拖车详情",
    hitchType: "挂钩类型",
    ballSize: "球尺寸",
    weightCapacity: "承载能力",
    lightPlugConfiguration: "灯插头配置",
    trailerDimension: "拖车尺寸",
    year: "年份",
    make: "品牌",
    model: "型号",
    vin: "车辆识别码",
    finalSetup: "最终设置",
    trailerValue: "拖车价值：",
    chatWithOwner: "与车主聊天",
    downloadApp: "下载应用程序",
    rentThisTrailer: "租用此拖车",
    faqTitle: "常见问题",
    seeAllFaq: "查看所有常见问题",
    guests: "租客",
    hosts: "车主",
    unknownOwner: "未知车主",
    ratingsAndReviews: "评分和评论",
    excellent: "优秀",
    good: "好",
    average: "一般",
    belowAverage: "低于平均水平",
    poor: "差",
    dayAgo: "天前",
    wasAnExcellentRenter: "是一位出色的租客！他们沟通清晰，准时取还拖车，并且非常爱护设备。所有东西都完好无损地归还。强烈推荐未来租赁！",
    smoothTransactionWith: "与lorepa的交易顺利！他们准时、有礼貌，对待拖车就像对待自己的。强烈推荐。",
    isATrustworthyRenter: "是一个值得信赖的租客。拖车完好无损地归还，整个过程轻松无忧。5星！",
    outstandingExperience: "出色的体验！lorepa易于合作，遵循所有指示，并确保拖车保持良好状态。",
    highlyRecommendedRenter: "强烈推荐的租客。lorepa有条理、有礼貌，并在租赁期间悉心照料拖车。",
    readMore: "阅读更多",
    // FAQ for Renters (Guests)
    faqRenter1Q: "在Lorepa上租用拖车需要什么？",
    faqRenter1A: "要租用拖车，您必须年满21岁，持有有效驾驶执照，并提供保险证明。您还需要一个经过验证的Lorepa账户。",
    faqRenter2Q: "租赁流程是怎样的？",
    faqRenter2A: "您浏览可用的拖车，向车主发送请求，一旦获得批准，即可确认预订。租赁合同和检查照片会自动生成。",
    faqRenter3Q: "租赁中包含保险吗？",
    faqRenter3A: "不。您需要提供涵盖拖车的有效汽车保险。结账时可能会提供额外的可选保护。",
    faqRenter4Q: "我可以取消预订吗？",
    faqRenter4A: "是的，您可以根据我们的取消政策中描述的条款取消。退款金额可能因取消时间与开始日期之间的关系而异。",
    faqRenter5Q: "如果我逾期归还拖车会怎样？",
    faqRenter5A: "逾期归还可能会产生固定罚款，具体请参见使用条款。请务必在延迟时通知车主，以避免争议。",
    faqRenter6Q: "如果拖车在我的旅途中损坏了怎么办？",
    faqRenter6A: "您对租赁期间的任何损坏负责。损坏费用可能会从您的押金中扣除或直接收取，具体取决于损坏的严重程度和证据。",
    faqRenter7Q: "如何处理付款和押金？",
    faqRenter7A: "付款通过Stripe安全处理。押金在租赁期间被保留，如果未报告任何问题，将在7天内释放。",
    faqRenter8Q: "我可以在哪里拖车？",
    faqRenter8A: "大多数拖车可以在加拿大境内拖动。如果计划跨境旅行（例如，到美国），请首先与车主确认并在您的请求中注明。",
    faqRenter9Q: "我需要特殊的拖车驾照吗？",
    faqRenter9A: "在大多数加拿大省份，标准的5级驾照足以拖动小型拖车。但是，您有责任确保您符合当地要求，并且您的车辆被评定为可以拖动所选拖车。",
    faqRenter10Q: "有哪些类型的拖车可用？",
    faqRenter10A: "Lorepa提供多用途拖车、封闭式货运拖车、汽车运输车、摩托车拖车等。您可以按类别、尺寸或位置进行筛选。",
    faqRenter11Q: "我可以租用拖车进行单程旅行吗？",
    faqRenter11A: "大多数租赁都是往返的。如果您需要单程租赁，请直接联系车主或查看具有灵活还车选项的列表。",
    faqRenter12Q: "有隐藏费用吗？",
    faqRenter12A: "没有隐藏费用。所有费用均 upfront 显示。如果不遵守某些额外规定（例如，清洁、额外天数、超里程），可能会添加一些额外费用。",
    faqRenter13Q: "如何联系客户支持？",
    faqRenter13A: "您可以通过应用程序或网站上的聊天功能，或发送电子邮件至 support@lorepa.ca 联系我们的支持团队。回复时间通常在24小时内。",

    // FAQ for Owners (Hosts)
    faqOwner1Q: "如何列出我的拖车？",
    faqOwner1A: "您可以通过注册，填写关键详情（描述、可用性、价格），上传照片，并提供所需文件（注册、保险）来列出您的拖车。",
    faqOwner2Q: "我可以通过Lorepa赚多少钱？",
    faqOwner2A: "您保留租赁价格的85%。剩余的15%用于支付Lorepa的服务费。租期结束后，款项将通过Stripe在3-5个工作日内自动处理。",
    faqOwner3Q: "我可以取消预订吗？",
    faqOwner3A: "是的，但车主每6个月只允许免费取消2次。此后，如果取消在政策范围内，则将收取100加元的罚款。滥用取消将导致账户审核。",
    faqOwner4Q: "如果我的拖车逾期归还或损坏了怎么办？",
    faqOwner4A: "您可以在24小时内通过平台报告任何问题。Lorepa可以协助从租客的押金中扣除罚款或损坏费用。",
    faqOwner5Q: "作为车主，我需要特殊保险吗？",
    faqOwner5A: "您必须保持有效的拖车保险。Lorepa不直接向车主提供保险。但是，未来可能会推出可选的保护计划。",
    faqOwner6Q: "我可以选择谁租用我的拖车吗？",
    faqOwner6A: "是的。您可以在接受请求之前查看租客的个人资料、文件和评分。您没有义务接受所有预订。",
    faqOwner7Q: "如何处理税款？",
    faqOwner7A: "您负责报告您的收入和管理您的税款。Lorepa可能会提供年度收入汇总，但不会代您汇出税款。",
    faqOwner8Q: "我可以出租多辆拖车吗？",
    faqOwner8A: "当然。Lorepa支持每个用户多重列表。您可以在一个账户下管理您的车队并调整每辆车的可用性。",
    faqOwner9Q: "我可以要求清洁费或其他条件吗？",
    faqOwner9A: "是的。您可以设置自己的规则（清洁费、拖车限制、滥用罚款），但必须在您的列表中明确披露。",
    faqOwner10Q: "如何提高我的拖车可见性？",
    faqOwner10A: "使用高质量的照片、详细的描述、公平的定价，并保持良好的回复率。经过验证的、评价良好的车主在搜索结果中排名更高。",
    faqOwner11Q: "如何处理燃油或设备归还？",
    faqOwner11A: "您可以在列表中指定燃油/设备是否必须以相同条件归还。务必在取车和还车时记录状况。",
    faqOwner12Q: "我可以举报不良租客吗？",
    faqOwner12A: "是的。租赁结束后，您可以留下评论并向Lorepa的信任与安全团队报告任何严重事件。重复滥用可能会导致租客被禁止。",

    // Global FAQ (Both)
    faqGlobal1Q: "发生事故或盗窃时谁负责？",
    faqGlobal1A: "租客对租赁期间的任何损坏或损失负责。在严重情况下，可能适用警方报告、保险索赔和平台调解。",
    faqGlobal2Q: "Lorepa提供保险范围吗？",
    faqGlobal2A: "目前，Lorepa不直接提供保险，但可能要求提供第三方保险证明。专用保险选项可能很快会添加。",
    faqGlobal3Q: "Lorepa在美国有售吗？",
    faqGlobal3A: "Lorepa目前专注于加拿大。跨境使用仅在车主同意并提供适当文件的情况下才允许。",
  },
  fr: {
    "signupsignin": "Se connecter / S'inscrire",
    chatWithOwner: "Téléchargez l'application pour discuter",
    loading: "Chargement des détails de la remorque...",
    trailerNotFound: "Remorque introuvable.",
    failedToFetch: "Échec du chargement des détails de la remorque",
    noImage: "Pas d'image",
    basicInfo: "Informations de base",
    trailerId: "ID de la remorque",
    nameOfOwner: "Nom du propriétaire",
    category: "Catégorie",
    trailerTitleStatus: "Statut du titre de la remorque",
    detailedDescription: "Description détaillée",
    pricingRentalTerms: "Tarifs et conditions de location",
    daily: "Journalier :",
    weekly: "Hebdomadaire :",
    monthly: "Mensuel :",
    cleaningFee: "Frais de nettoyage :",
    securityDeposit: "Dépôt de garantie :",
    insuranceDeductible: "Franchise d'assurance :",
    trailerDetails: "Détails de la remorque",
    hitchType: "Type d'attelage",
    ballSize: "Taille de la boule",
    weightCapacity: "Capacité de poids",
    lightPlugConfiguration: "Configuration de la prise d'éclairage",
    trailerDimension: "Dimension de la remorque",
    year: "Année",
    make: "Marque",
    model: "Modèle",
    vin: "NIV",
    finalSetup: "Configuration finale",
    trailerValue: "Valeur de la remorque :",
    chatWithOwner: "Discuter avec le propriétaire",
    downloadApp: "Télécharger l'application",
    rentThisTrailer: "Louer cette remorque",
    faqTitle: "Foire aux questions",
    seeAllFaq: "Voir toutes les FAQ",
    guests: "Invités",
    hosts: "Hôtes",
    unknownOwner: "Propriétaire inconnu",
    ratingsAndReviews: "Évaluations et avis",
    excellent: "Excellent",
    good: "Bon",
    average: "Moyenne",
    belowAverage: "En dessous de la moyenne",
    poor: "Médiocre",
    dayAgo: "jour",
    wasAnExcellentRenter: "était un excellent locataire ! Ils ont communiqué clairement, ont récupéré et rendu la remorque à temps, et ont pris grand soin de l'équipement. Tout a été rendu en parfait état. Fortement recommandé pour les locations futures !",
    smoothTransactionWith: "Transaction fluide avec lorepa ! Ils étaient ponctuels, polis et ont traité la remorque comme si c'était la leur. Fortement recommandé.",
    isATrustworthyRenter: "est un locataire digne de confiance. La remorque a été rendue en excellent état, et tout le processus s'est déroulé sans tracas. 5 étoiles !",
    outstandingExperience: "Expérience exceptionnelle ! lorepa était facile à travailler, a suivi toutes les instructions et s'est assuré que la remorque restait en excellent état.",
    highlyRecommendedRenter: "Locataire fortement recommandé. lorepa était organisé, courtois et a pris un excellent soin de la remorque pendant sa location.",
    readMore: "Lire la suite",
    // FAQ for Renters (Guests)
    faqRenter1Q: "De quoi ai-je besoin pour louer une remorque sur Lorepa ?",
    faqRenter1A: "Pour louer une remorque, vous devez avoir au moins 21 ans, détenir un permis de conduire valide et fournir une preuve d'assurance. Vous aurez également besoin d'un compte Lorepa vérifié.",
    faqRenter2Q: "Comment fonctionne le processus de location ?",
    faqRenter2A: "Vous parcourez les remorques disponibles, envoyez une demande au propriétaire et, une fois approuvée, confirmez votre réservation. Un contrat de location et des photos d'inspection sont générés automatiquement.",
    faqRenter3Q: "L'assurance est-elle incluse dans ma location ?",
    faqRenter3A: "Non. Vous êtes tenu de fournir une assurance automobile valide qui couvre le remorquage. Une protection optionnelle supplémentaire peut être offerte lors du paiement.",
    faqRenter4Q: "Puis-je annuler ma réservation ?",
    faqRenter4A: "Oui, vous pouvez annuler selon les termes décrits dans notre politique d'annulation. Les remboursements peuvent varier en fonction du moment où l'annulation est effectuée par rapport à la date de début.",
    faqRenter5Q: "Que se passe-t-il si je rends la remorque en retard ?",
    faqRenter5A: "Les retours tardifs peuvent entraîner des frais de pénalité fixes, comme indiqué dans les Conditions d'utilisation. Avertissez toujours le propriétaire en cas de retard pour éviter les litiges.",
    faqRenter6Q: "Que se passe-t-il si la remorque est endommagée pendant mon voyage ?",
    faqRenter6A: "Vous êtes responsable de tout dommage pendant la période de location. Les coûts des dommages peuvent être déduits de votre dépôt ou facturés directement, selon la gravité et la preuve.",
    faqRenter7Q: "Comment sont gérés les paiements et les dépôts ?",
    faqRenter7A: "Les paiements sont traités en toute sécurité via Stripe. Un dépôt de garantie est détenu pendant la période de location et libéré dans les 7 jours si aucun problème n'est signalé.",
    faqRenter8Q: "Où puis-je remorquer la remorque ?",
    faqRenter8A: "La plupart des remorques peuvent être remorquées au Canada. Si un voyage transfrontalier (par exemple, vers les États-Unis) est prévu, vérifiez d'abord avec le propriétaire et mentionnez-le dans votre demande.",
    faqRenter9Q: "Ai-je besoin d'un permis de remorquage spécial ?",
    faqRenter9A: "Dans la plupart des provinces canadiennes, un permis de classe 5 standard suffit pour les petites remorques. Cependant, il est de votre responsabilité de vous assurer que vous respectez les exigences locales et que votre véhicule est classé pour remorquer la remorque sélectionnée.",
    faqRenter10Q: "Quels types de remorques sont disponibles ?",
    faqRenter10A: "Lorepa propose des remorques utilitaires, des remorques cargo fermées, des transporteurs de voitures, des remorques de motos, et plus encore. Vous pouvez filtrer par catégorie, taille ou emplacement.",
    faqRenter11Q: "Puis-je louer une remorque pour un aller simple ?",
    faqRenter11A: "La plupart des locations sont aller-retour. Si vous avez besoin d'une location aller simple, contactez directement le propriétaire ou vérifiez les annonces avec des options de retour flexibles.",
    faqRenter12Q: "Y a-t-il des frais cachés ?",
    faqRenter12A: "Pas de frais cachés. Tous les frais sont affichés à l'avance. Des extras (par exemple, nettoyage, jours supplémentaires, dépassement de kilométrage) peuvent être ajoutés s'ils ne sont pas respectés.",
    faqRenter13Q: "Comment contacter le service client ?",
    faqRenter13A: "Vous pouvez joindre notre équipe d'assistance via la fonction de chat sur l'application ou le site web, ou par e-mail à support@lorepa.ca. Le temps de réponse est généralement inférieur à 24h.",

    // FAQ for Owners (Hosts)
    faqOwner1Q: "Comment puis-je lister ma remorque ?",
    faqOwner1A: "Vous pouvez lister votre remorque en vous inscrivant, en remplissant les détails clés (description, disponibilité, prix), en téléchargeant des photos et en fournissant les documents requis (immatriculation, assurance).",
    faqOwner2Q: "Combien puis-je gagner avec Lorepa ?",
    faqOwner2A: "Vous conservez 85% du prix de la location. Les 15% restants couvrent les frais de service de Lorepa. Les paiements sont traités automatiquement via Stripe dans les 3 à 5 jours ouvrables après la fin de la location.",
    faqOwner3Q: "Puis-je annuler une réservation ?",
    faqOwner3A: "Oui, mais les propriétaires ne sont autorisés qu'à 2 annulations gratuites tous les 6 mois. Après cela, une pénalité de 100 $ CA s'applique si l'annulation est conforme à la politique. L'abus d'annulations est sujet à examen du compte.",
    faqOwner4Q: "Que se passe-t-il si ma remorque est rendue en retard ou endommagée ?",
    faqOwner4A: "Vous pouvez signaler tout problème via la plateforme dans les 24 heures. Lorepa peut aider à déduire les pénalités ou les coûts des dommages du dépôt du locataire.",
    faqOwner5Q: "Ai-je besoin d'une assurance spéciale en tant que propriétaire ?",
    faqOwner5A: "Vous devez maintenir une assurance remorque valide. Lorepa ne fournit pas de couverture directe aux propriétaires. Cependant, des programmes de protection facultatifs pourront être introduits à l'avenir.",
    faqOwner6Q: "Puis-je choisir qui loue ma remorque ?",
    faqOwner6A: "Oui. Vous pouvez consulter le profil du locataire, les documents et les évaluations avant d'accepter une demande. Vous n'êtes pas obligé d'accepter toutes les réservations.",
    faqOwner7Q: "Comment les taxes sont-elles gérées ?",
    faqOwner7A: "Vous êtes responsable de déclarer vos revenus et de gérer vos taxes. Lorepa peut fournir des résumés de revenus annuels, mais ne remet pas les taxes en votre nom.",
    faqOwner8Q: "Puis-je louer plusieurs remorques ?",
    faqOwner8A: "Absolument. Lorepa prend en charge plusieurs annonces par utilisateur. Vous pouvez gérer votre flotte sous un seul compte et ajuster la disponibilité par unité.",
    faqOwner9Q: "Puis-je exiger des frais de nettoyage ou des conditions supplémentaires ?",
    faqOwner9A: "Oui. Vous pouvez définir vos propres règles (frais de nettoyage, restrictions de remorquage, pénalités pour mauvaise utilisation), mais elles doivent être clairement divulguées dans votre annonce.",
    faqOwner10Q: "Comment puis-je améliorer la visibilité de ma remorque ?",
    faqOwner10A: "Utilisez des photos de haute qualité, des descriptions détaillées, des prix équitables et maintenez un bon taux de réponse. Les propriétaires vérifiés avec de bonnes notes apparaissent plus haut dans les résultats de recherche.",
    faqOwner11Q: "Comment gérer le retour de carburant ou d'équipement ?",
    faqOwner11A: "Vous pouvez spécifier dans votre annonce si le carburant/équipement doit être retourné dans le même état. Documentez toujours l'état au moment de la prise en charge et du retour.",
    faqOwner12Q: "Puis-je signaler un mauvais locataire ?",
    faqOwner12A: "Oui. Une fois la location terminée, vous pouvez laisser un avis et signaler tout incident grave à l'équipe de confiance et de sécurité de Lorepa. Les abus répétés peuvent entraîner des interdictions de locataire.",

    // Global FAQ (Both)
    faqGlobal1Q: "Qui est responsable en cas d'accident ou de vol ?",
    faqGlobal1A: "Les locataires sont responsables de tout dommage ou perte pendant la location. Dans les cas graves, des rapports de police, des réclamations d'assurance et une médiation de la plateforme peuvent s'appliquer.",
    faqGlobal2Q: "Lorepa offre-t-elle une couverture d'assurance ?",
    faqGlobal2A: "Actuellement, Lorepa n'offre pas directement d'assurance mais peut exiger une preuve de couverture tierce. Des options d'assurance dédiées pourront être ajoutées prochainement.",
    faqGlobal3Q: "Lorepa est-il disponible aux États-Unis ?",
    faqGlobal3A: "Lorepa se concentre actuellement sur le Canada. L'utilisation transfrontalière n'est autorisée qu'avec le consentement du propriétaire et la documentation appropriée.",
  }
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div layout className="rounded-md mb-3 bg-white shadow-sm overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 text-left font-medium text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? <FaAngleUp /> : <FaAngleDown />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 border-t border-gray-300 text-gray-700"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ReviewBar = ({ label, percentage }) => (
  <div className="flex items-center flex-wrap mb-1 justify-between">
    <span className="text-sm text-gray-700 w-24">{label}</span>
    <div className='flex items-center gap-x-3'>
      <div className="w-[10rem] md:min-w-[20rem] bg-[#BBCBF0] rounded-sm h-2 mx-2">
        <div className="bg-[#2563EB] h-2 rounded-sm" style={{ width: `${percentage}%` }}></div>
      </div>
      <span className="text-sm text-gray-700 w-8 text-right">{percentage}%</span>
    </div>
  </div>
);

const ReviewCard = ({ name, rating, timeAgo, reviewText, avatar }) => (
  <div className="border-b border-gray-200 pb-4 mb-4 md:w-[50%]">
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-x-2'>
        <img src={manImage} alt={name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-gray-900 mr-2">{name}</p>
          <div className="flex text-[#2563EB]">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-2">{timeAgo}</p>
    </div>
    <p className="text-[#757982] text-sm mt-2">{reviewText}</p>
  </div>
);

const SingleTrailer = () => {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqGuest, setFaqGuest] = useState([]);
  const [faqHost, setFaqHost] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nav = useNavigate();

  const [translations, setTranslations] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return singleTrailerTranslations[storedLang] || singleTrailerTranslations.en;
  });

  const getFaqData = (lang) => {
    return {
      guest: [
        { question: lang.faqRenter1Q, answer: lang.faqRenter1A },
        { question: lang.faqRenter2Q, answer: lang.faqRenter2A },
        { question: lang.faqRenter3Q, answer: lang.faqRenter3A },
        { question: lang.faqRenter4Q, answer: lang.faqRenter4A },
        { question: lang.faqRenter5Q, answer: lang.faqRenter5A },
        { question: lang.faqRenter6Q, answer: lang.faqRenter6A },
        { question: lang.faqRenter7Q, answer: lang.faqRenter7A },
        { question: lang.faqRenter8Q, answer: lang.faqRenter8A },
        { question: lang.faqRenter9Q, answer: lang.faqRenter9A },
        { question: lang.faqRenter10Q, answer: lang.faqRenter10A },
        { question: lang.faqRenter11Q, answer: lang.faqRenter11A },
        { question: lang.faqRenter12Q, answer: lang.faqRenter12A },
        { question: lang.faqRenter13Q, answer: lang.faqRenter13A },
        { question: lang.faqGlobal1Q, answer: lang.faqGlobal1A },
        { question: lang.faqGlobal2Q, answer: lang.faqGlobal2A },
        { question: lang.faqGlobal3Q, answer: lang.faqGlobal3A },
      ],
      host: [
        { question: lang.faqOwner1Q, answer: lang.faqOwner1A },
        { question: lang.faqOwner2Q, answer: lang.faqOwner2A },
        { question: lang.faqOwner3Q, answer: lang.faqOwner3A },
        { question: lang.faqOwner4Q, answer: lang.faqOwner4A },
        { question: lang.faqOwner5Q, answer: lang.faqOwner5A },
        { question: lang.faqOwner6Q, answer: lang.faqOwner6A },
        { question: lang.faqOwner7Q, answer: lang.faqOwner7A },
        { question: lang.faqOwner8Q, answer: lang.faqOwner8A },
        { question: lang.faqOwner9Q, answer: lang.faqOwner9A },
        { question: lang.faqOwner10Q, answer: lang.faqOwner10A },
        { question: lang.faqOwner11Q, answer: lang.faqOwner11A },
        { question: lang.faqOwner12Q, answer: lang.faqOwner12A },
        { question: lang.faqGlobal1Q, answer: lang.faqGlobal1A },
        { question: lang.faqGlobal2Q, answer: lang.faqGlobal2A },
        { question: lang.faqGlobal3Q, answer: lang.faqGlobal3A },
      ]
    };
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      const currentTranslations = singleTrailerTranslations[storedLang] || singleTrailerTranslations.en;
      setTranslations(currentTranslations);
      const faqs = getFaqData(currentTranslations);
      setFaqGuest(faqs.guest);
      setFaqHost(faqs.host);
    };

    window.addEventListener('storage', handleStorageChange);
    handleStorageChange(); // Initial load

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchTrailer = async () => {
      const id = window.location.pathname.split('/').pop();
      try {
        const res = await axios.get(`${config.baseUrl}/trailer/single/${id}`);
        setTrailer(res.data.data);
      } catch (err) {
        setError(translations.failedToFetch);
      } finally {
        setLoading(false);
      }
    };
    fetchTrailer();
    window.scrollTo(0, 0);
  }, [translations]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === trailer.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? trailer.images.length - 1 : prevIndex - 1
    );
  };

  const handleDownloadAppClick = () => {
    console.log("Download App button clicked!");
  };

  if (loading || error || !trailer) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center font-inter">
        <Navbar />
        <p className={error ? 'text-red-500' : ''}>
          {loading ? translations.loading : error || translations.trailerNotFound}
        </p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <Navbar />

      <main className="flex-1 p-6 md:p-8 lg:p-10">
        <motion.div
          className="mb-8 rounded-lg overflow-hidden shadow-lg relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={trailer.images?.[currentImageIndex] || `https://placehold.co/800x400/F3F4F6/9CA3AF?text=${encodeURIComponent(translations.noImage)}`}
            alt={trailer.title}
            className="w-full h-96 object-cover"
          />
          {trailer.images && trailer.images.length > 1 && (
            <>
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-[#2563EB] text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                onClick={handlePrevImage}
              >
                <FaChevronLeft />
              </button>
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-[#2563EB] text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                onClick={handleNextImage}
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </motion.div>

        <motion.div className="bg-white rounded-lg" variants={fadeVariant} initial="hidden" animate="visible">
          <div>
            <div className="border border-[#C3C3C3] p-5 rounded-lg mb-4">
              <h2 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.basicInfo}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600">{translations.trailerId}</p>
                <p className="text-gray-800 text-right truncate">{trailer._id}</p>

                <p className="text-gray-600">{translations.nameOfOwner}</p>
                <p className="text-gray-800 text-right">{trailer.userId?.name || translations.unknownOwner}</p>

                <p className="text-gray-600">{translations.category}</p>
                <p className="text-gray-800 text-right">{trailer.category}</p>

                <p className="text-gray-600">{translations.trailerTitleStatus}</p>
                <p className="text-gray-800 text-right">{trailer.title}</p>

                <p className="text-gray-600">{translations.detailedDescription}</p>
                <p className="text-gray-800 text-right">{trailer.description}</p>
              </div>
            </div>

            <div className='border border-[#C3C3C3] p-5 rounded-lg mb-4'>
              <h3 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.pricingRentalTerms}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className='text-gray-600'>{translations.daily}</p>
                <p className='text-gray-800 text-right'>${trailer.dailyRate}</p>

                <p className='text-gray-600'>{translations.weekly}</p>
                <p className='text-gray-800 text-right'>${trailer.weeklyRate}</p>

                <p className='text-gray-600'>{translations.monthly}</p>
                <p className='text-gray-800 text-right'>${trailer.monthlyRate}</p>

                <p className='text-gray-600'>{translations.cleaningFee}</p>
                <p className='text-gray-800 text-right'>${trailer.cleaningRate}</p>

                <p className='text-gray-600'>{translations.securityDeposit}</p>
                <p className='text-gray-800 text-right'>${trailer.securityRate}</p>

                <p className='text-gray-600'>{translations.insuranceDeductible}</p>
                <p className='text-gray-800 text-right'>${trailer.insuranceDeductible}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="border border-[#C3C3C3] p-5 rounded-lg mb-4">
              <h2 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.trailerDetails}</h2>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-gray-600">{translations.hitchType}</p>
                <p className="text-gray-800 text-right">{trailer.hitchType || 'Bumper pull'}</p>

                <p className="text-gray-600">{translations.ballSize}</p>
                <p className="text-gray-800 text-right">{trailer.ballSize || '3 inch'}</p>

                <p className="text-gray-600">{translations.weightCapacity}</p>
                <p className="text-gray-800 text-right">{trailer.bearingCapacity || '50kg'}</p>

                <p className="text-gray-600">{translations.lightPlugConfiguration}</p>
                <p className="text-gray-800 text-right">{trailer.lightPlugConfiguration || '000'}</p>

                <p className="text-gray-600">{translations.trailerDimension}</p>
                <p className="text-gray-800 text-right">{trailer.axleDimension || '00000'}</p>

                <p className="text-gray-600">{translations.year}</p>
                <p className="text-gray-800 text-right">{trailer.year}</p>

                <p className="text-gray-600">{translations.make}</p>
                <p className="text-gray-800 text-right">{trailer.make}</p>

                <p className="text-gray-600">{translations.model}</p>
                <p className="text-gray-800 text-right">{trailer.model}</p>

                <p className="text-gray-600">{translations.vin}</p>
                <p className="text-gray-800 text-right">{trailer.vin || '-'}</p>
              </div>
            </div>

            <div className="border border-[#C3C3C3] p-5 rounded-lg">
              <h3 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.finalSetup}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className='text-gray-600'>{translations.trailerValue}</p>
                <p className='text-gray-800 text-right'>${Number(trailer?.dailyRate) + Number(trailer?.monthlyRate) + Number(trailer?.cleaningRate) + Number(trailer?.securityRate) + Number(trailer?.insuranceDeductible)}</p>
              </div>
            </div>

            <div className="border border-[#C3C3C3] p-5 rounded-lg mt-4">
              <h2 className="text-[20px] font-[600] text-[#0A0F18] mb-4">{translations.ratingsAndReviews}</h2>
              <div className="flex items-center mb-4">
                <span className="text-4xl font-bold text-gray-800 mr-2">4.5</span>
                <div className="flex text-[#2563EB]">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.539 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.565-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <svg
                    className="w-6 h-6 text-[#2563EB]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2L12.164 6.55L17.5 7.05L13.38 10.47L14.72 15.7L10 13.05L5.28 15.7L6.62 10.47L2.5 7.05L7.836 6.55L10 2Z" />
                  </svg>
                </div>
              </div>
              <div className="mb-6">
                <ReviewBar label={translations.excellent} percentage={70} />
                <ReviewBar label={translations.good} percentage={15} />
                <ReviewBar label={translations.average} percentage={5} />
                <ReviewBar label={translations.belowAverage} percentage={5} />
                <ReviewBar label={translations.poor} percentage={5} />
              </div>

              <div className="space-y-6">
                <ReviewCard
                  name="Joan Perkins"
                  rating={5}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.wasAnExcellentRenter}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Bessie Cooper"
                  rating={4}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.smoothTransactionWith}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Jenny Wilson"
                  rating={5}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.isATrustworthyRenter}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Ronald Richards"
                  rating={5}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.outstandingExperience}
                  avatar="https://via.placeholder.com/40"
                />
                <ReviewCard
                  name="Darlene Robertson"
                  rating={4}
                  timeAgo={`1 ${translations.dayAgo}`}
                  reviewText={translations.highlyRecommendedRenter}
                  avatar="https://via.placeholder.com/40"
                />
              </div>
              <button className="mt-6 bg-[#2563EB] text-white hover:underline text-sm p-3 rounded-md">
                {translations.readMore}
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-6 flex justify-end sm:space-x-4 flex-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <button onClick={handleDownloadAppClick} className="sm:w-fit w-[100%] text-nowrap mt-2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-6 rounded-md shadow-lg transition duration-200">
            {translations.chatWithOwner}
          </button>
          <button onClick={() => nav('/login')} className="sm:w-fit w-[100%] text-nowrap mt-2 bg-[#2563EB] hover:bg-blue-700 text-white py-3 px-6 rounded-md shadow-lg transition duration-200" >
            {translations.signupsignin}
          </button>
        </motion.div>

        {/* FAQ Section */}

        <div className="px-5 py-5 text-black">

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{translations.faqTitle}</h2>

          <div className='flex flex-wrap justify-between gap-x-5 mt-8'>

            <div className='w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0'>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">{translations.guests}</h3>
              {faqGuest.map((faq, index) => (
                <AccordionItem key={`guest-faq-${index}`} question={faq.question} answer={faq.answer} />
              ))}
            </div>

            <div className='w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0'>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">{translations.hosts}</h3>
              {faqHost.map((faq, index) => (
                <AccordionItem key={`host-faq-${index}`} question={faq.question} answer={faq.answer} />
              ))}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SingleTrailer;