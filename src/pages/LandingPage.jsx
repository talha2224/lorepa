import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../assets/landing/hero.png";
import Img from "../assets/landing/img.png";
import Host1 from "../assets/landing/rent_trailer_img.png";
import Host2 from "../assets/landing/become_host_img.png";
import {
  FaAngleDown,
  FaAngleUp,
  FaAngleLeft,
  FaAngleRight,
  FaSearch,
  FaLongArrowAltRight,
} from "react-icons/fa";
import axios from "axios";
import config from "../config";
import { Link, useNavigate } from "react-router-dom";
import { blurIn, fadeIn, fadeInDown, fadeInUp, flipIn, scaleIn, zoomBounce } from "../../animation";
import AccordionItem from "./AccordionItem.JSX";

const translations = {
  en: {
    trailerRental: "Trailer rental reinvented",
    rentAnywhere: "Rent the trailer you want, wherever you want!",
    where: "Where",
    placeholder: "City, airport, hotel",
    from: "From",
    until: "Until",
    newWay: "The new way to rent a trailer 24/7!",
    discover: "Discover the premier platform for trailer sharing between individuals in Qubec.",
    needTrailer: "Whether You Need a Trailer",
    shareOne: "or Have One to Share",
    rentTrailerTitle: "Rent a Trailer",
    rentTrailerDescription: "Find the perfect trailer for your needs, wherever you are in Quebec. Browse, book, and go!",
    rentTrailerButton: "Rent a trailer",
    becomeHostTitle: "Become a host",
    becomeHostDescription: "List your trailer and start earning by helping others move, travel, and explore. It's easy and secure",
    becomeHostButton: "Become a host",
    trustedBy: "Trusted by 1000 +",
    leadingPlatform: "Our company is the leading sharing platform where you can book any type of trailer from private individuals,",
    dynamicCommunity: "whatever the occasion, with a dynamic community of trusted hosts.",
    thankYou: "You are one of 1000 + people who trust us completely, Thank you!",
    popularLocations: "Popular Locations",
    carHauler: "Car Hauler Trailer",
    faq: "Frequently asked questions",
    seeAllFaq: "See all FAQ",
    guests: "Guests",
    hosts: "Hosts",
    faqContent: { // Nested object for all FAQ content
      renters: [
        { question: "What do I need to rent a trailer on Lorepa?", answer: "To rent a trailer, you must be at least 21 years old, hold a valid driver’s license, and provide proof of insurance. You will also need a verified Lorepa account." },
        { question: "How does the rental process work?", answer: "You browse available trailers, send a request to the owner, and once approved, confirm your booking. A rental contract and inspection photos are generated automatically." },
        { question: "Is insurance included in my rental?", answer: "No. You are required to provide valid auto insurance that covers towing. Additional optional protection may be offered during checkout." },
        { question: "Can I cancel my booking?", answer: "Yes, you can cancel under the terms described in our cancellation policy. Refunds may vary depending on when the cancellation is made relative to the start date." },
        { question: "What happens if I return the trailer late?", answer: "Late returns may incur a flat penalty fee, as outlined in the Terms of Use. Always notify the owner in case of delay to avoid disputes." },
        { question: "What if the trailer is damaged during my trip?", answer: "You are responsible for any damage during the rental period. Damage costs may be deducted from your deposit or charged directly, depending on the severity and proof." },
        { question: "How are payments and deposits handled?", answer: "Payments are processed securely through Stripe. A security deposit is held during the rental period and released within 7 days if no issues are reported." },
        { question: "Where can I tow the trailer?", answer: "Most trailers can be towed within Canada. If cross-border travel (e.g., to the USA) is planned, check with the owner first and mention it in your request." },
        { question: "Do I need a special towing license?", answer: "In most Canadian provinces, a standard Class 5 license is enough for small trailers. However, it's your responsibility to ensure you meet local requirements and that your vehicle is rated to tow the selected trailer." },
        { question: "What kind of trailers are available?", answer: "Lorepa offers utility trailers, enclosed cargo trailers, car haulers, motorcycle trailers, and more. You can filter by category, size, or location." },
        { question: "Can I rent a trailer for a one-way trip?", answer: "Most rentals are round-trip. If you need one-way rental, contact the owner directly or check listings with flexible return options." },
        { question: "Are there any hidden fees?", answer: "No hidden fees. All charges are shown upfront. Some extras (e.g., cleaning, extra days, mileage overage) may be added if not respected." },
        { question: "How do I contact customer support?", answer: "You can reach our support team via the chat feature on the app or website, or by email at support@lorepa.ca. Response time is typically under 24h." },
        { question: "Who is responsible in case of accident or theft?", answer: "Renters are liable for any damages or loss during the rental. In serious cases, police reports, insurance claims, and platform mediation may apply." }, // Moved from global
        { question: "Does Lorepa offer insurance coverage?", answer: "Currently, Lorepa does not directly offer insurance but may require proof of third-party coverage. Dedicated insurance options may be added soon." }, // Moved from global
        { question: "Is Lorepa available in the USA?", answer: "Lorepa is currently focused on Canada. Cross-border use is only allowed with owner consent and proper documentation." } // Moved from global
      ],
      owners: [
        { question: "How do I list my trailer?", answer: "You can list your trailer by signing up, filling in key details (description, availability, pricing), uploading photos, and providing required documents (registration, insurance)." },
        { question: "How much can I earn with Lorepa?", answer: "You keep 85% of the rental price. The remaining 15% covers Lorepa’s service fee. Payouts are processed automatically via Stripe within 3–5 business days after the rental ends." },
        { question: "Can I cancel a reservation?", answer: "Yes, but owners are allowed only 2 free cancellations every 6 months. After that, a $100 CAD penalty applies if the cancellation is within policy. Abuse of cancellations is subject to account review." },
        { question: "What if my trailer is returned late or damaged?", answer: "You can report any issue via the platform within 24 hours. Lorepa can assist with deducting penalties or damage costs from the renter’s deposit." },
        { question: "Do I need special insurance as an owner?", answer: "You must maintain valid trailer insurance. Lorepa does not provide direct coverage to owners. However, optional protection programs may be introduced in future." },
        { question: "Can I choose who rents my trailer?", answer: "Yes. You can review the renter’s profile, documents, and ratings before accepting a request. You are under no obligation to accept every booking." },
        { question: "How are taxes handled?", answer: "You are responsible for reporting your earnings and managing your taxes. Lorepa may provide annual income summaries, but does not remit taxes on your behalf." },
        { question: "Can I rent out multiple trailers?", answer: "Absolutely. Lorepa supports multiple listings per user. You can manage your fleet under one account and adjust availability per unit." },
        { question: "Can I require a cleaning fee or extra conditions?", answer: "Yes. You may set your own rules (cleaning fees, towing restrictions, penalties for misuse), but they must be clearly disclosed in your listing." },
        { question: "How can I improve my trailer visibility?", answer: "Use high-quality photos, detailed descriptions, fair pricing, and maintain a good response rate. Verified owners with good ratings appear higher in search results." },
        { question: "How do I handle fuel or equipment returns?", answer: "You can specify in your listing whether fuel/equipment must be returned in the same condition. Always document the condition at pickup and return." },
        { question: "Can I report a bad renter?", answer: "Yes. After the rental ends, you can leave a review and report any serious incident to Lorepa’s trust & safety team. Repeated abuse may result in renter bans." },
        { question: "How do I contact customer support?", answer: "You can reach our support team via the chat feature on the app or website, or by email at support@lorepa.ca. Response time is typically under 24h." },
        { question: "Who is responsible in case of accident or theft?", answer: "Renters are liable for any damages or loss during the rental. In serious cases, police reports, insurance claims, and platform mediation may apply." }, // Moved from global
        { question: "Does Lorepa offer insurance coverage?", answer: "Currently, Lorepa does not directly offer insurance but may require proof of third-party coverage. Dedicated insurance options may be added soon." }, // Moved from global
        { question: "Is Lorepa available in the USA?", answer: "Lorepa is currently focused on Canada. Cross-border use is only allowed with owner consent and proper documentation." } // Moved from global
      ]
    }
  },
  es: {
    trailerRental: "Alquiler de remolques reinventado",
    rentAnywhere: "¡Alquila el remolque que quieras, donde quieras!",
    where: "Dónde",
    placeholder: "Ciudad, aeropuerto, hotel",
    from: "Desde",
    until: "Hasta",
    newWay: "¡La nueva forma de alquilar un remolque 24/7!",
    discover: "Descubre la plataforma líder para compartir remolques entre particulares en Quebec.",
    needTrailer: "Ya sea que necesites un remolque",
    shareOne: "o tengas uno para compartir",
    rentTrailerTitle: "Alquilar un remolque",
    rentTrailerDescription: "Encuentra el remolque perfecto para tus necesidades, dondequiera que estés en Quebec. ¡Busca, reserva y listo!",
    rentTrailerButton: "Alquilar un remolque",
    becomeHostTitle: "Conviértete en anfitrión",
    becomeHostDescription: "Publica tu remolque y comienza a ganar ayudando a otros a mudarse, viajar y explorar. Es fácil y seguro.",
    becomeHostButton: "Conviértete en anfitrión",
    trustedBy: "Confiado por más de 1000 +",
    leadingPlatform: "Nuestra empresa es la plataforma líder para compartir donde puedes reservar cualquier tipo de remolque a particulares,",
    dynamicCommunity: "cualquiera sea la ocasión, con una comunidad dinámica de anfitriones confiables.",
    thankYou: "¡Eres una de las más de 1000 personas que confían completamente en nosotros, gracias!",
    popularLocations: "Lugares populares",
    carHauler: "Remolque para autos",
    faq: "Preguntas frecuentes",
    seeAllFaq: "Ver todas las FAQ",
    guests: "Invitados",
    hosts: "Anfitriones",
    faqContent: {
      renters: [
        { question: "¿Qué necesito para alquilar un remolque en Lorepa?", answer: "Para alquilar un remolque, debes tener al menos 21 años, poseer una licencia de conducir válida y proporcionar prueba de seguro. También necesitarás una cuenta verificada de Lorepa." },
        { question: "¿Cómo funciona el proceso de alquiler?", answer: "Buscas los remolques disponibles, envías una solicitud al propietario y, una vez aprobada, confirmas tu reserva. Un contrato de alquiler y fotos de inspección se generan automáticamente." },
        { question: "¿El seguro está incluido en mi alquiler?", answer: "No. Se requiere que proporciones un seguro de automóvil válido que cubra el remolque. Protección opcional adicional puede ser ofrecida durante el pago." },
        { question: "¿Puedo cancelar mi reserva?", answer: "Sí, puedes cancelar según los términos descritos en nuestra política de cancelación. Los reembolsos pueden variar dependiendo de cuándo se realice la cancelación en relación con la fecha de inicio." },
        { question: "¿Qué sucede si devuelvo el remolque tarde?", answer: "Los retrasos en la devolución pueden incurrir en una tarifa de penalización fija, según lo establecido en los Términos de uso. Siempre notifica al propietario en caso de retraso para evitar disputas." },
        { question: "¿Qué pasa si el remolque se daña durante mi viaje?", answer: "Eres responsable de cualquier daño durante el período de alquiler. Los costos de los daños pueden ser deducidos de tu depósito o cobrados directamente, dependiendo de la gravedad y la prueba." },
        { question: "¿Cómo se gestionan los pagos y depósitos?", answer: "Los pagos se procesan de forma segura a través de Stripe. Se retiene un depósito de seguridad durante el período de alquiler y se libera dentro de los 7 días si no se informan problemas." },
        { question: "¿Dónde puedo remolcar el remolque?", answer: "La mayoría de los remolques se pueden remolcar dentro de Canadá. Si se planea un viaje transfronterizo (por ejemplo, a los EE. UU.), consulta primero con el propietario y menciónalo en tu solicitud." },
        { question: "¿Necesito una licencia de remolque especial?", answer: "En la mayoría de las provincias canadienses, una licencia estándar de Clase 5 es suficiente para remolques pequeños. Sin embargo, es tu responsabilidad asegurarte de cumplir con los requisitos locales y de que tu vehículo esté clasificado para remolcar el remolque seleccionado." },
        { question: "¿Qué tipo de remolques están disponibles?", answer: "Lorepa ofrece remolques utilitarios, remolques de carga cerrados, remolques para automóviles, remolques para motocicletas y más. Puedes filtrar por categoría, tamaño o ubicación." },
        { question: "¿Puedo alquilar un remolque para un viaje de ida?", answer: "La mayoría de los alquileres son de ida y vuelta. Si necesitas un alquiler de ida, contacta directamente al propietario o busca listados con opciones de devolución flexibles." },
        { question: "¿Hay tarifas ocultas?", answer: "No hay tarifas ocultas. Todos los cargos se muestran por adelantado. Algunos extras (por ejemplo, limpieza, días adicionales, exceso de kilometraje) pueden agregarse si no se respetan." },
        { question: "¿Cómo me contacto con el soporte al cliente?", answer: "Puedes comunicarte con nuestro equipo de soporte a través de la función de chat en la aplicación o el sitio web, o por correo electrónico a support@lorepa.ca. El tiempo de respuesta es típicamente inferior a 24 horas." },
        { question: "¿Quién es responsable en caso de accidente o robo?", answer: "Los inquilinos son responsables de cualquier daño o pérdida durante el alquiler. En casos graves, pueden aplicarse informes policiales, reclamaciones de seguros y mediación de la plataforma." }, // Moved from global
        { question: "¿Lorepa ofrece cobertura de seguro?", answer: "Actualmente, Lorepa no ofrece directamente cobertura de seguro, pero puede requerir prueba de cobertura de terceros. Las opciones de seguro dedicadas pueden agregarse pronto." }, // Moved from global
        { question: "¿Lorepa está disponible en los EE. UU.?", answer: "Lorepa se centra actualmente en Canadá. El uso transfronterizo solo se permite con el consentimiento del propietario y la documentación adecuada." } // Moved from global
      ],
      owners: [
        { question: "¿Cómo publico mi remolque?", answer: "Puedes publicar tu remolque registrándote, completando detalles clave (descripción, disponibilidad, precios), subiendo fotos y proporcionando los documentos requeridos (registro, seguro)." },
        { question: "¿Cuánto puedo ganar con Lorepa?", answer: "Conservas el 85% del precio del alquiler. El 15% restante cubre la tarifa de servicio de Lorepa. Los pagos se procesan automáticamente a través de Stripe dentro de 3 a 5 días hábiles después de que finaliza el alquiler." },
        { question: "¿Puedo cancelar una reserva?", answer: "Sí, pero los propietarios solo tienen permitidas 2 cancelaciones gratuitas cada 6 meses. Después de eso, se aplica una penalización de $100 CAD si la cancelación está dentro de la política. El abuso de cancelaciones está sujeto a revisión de la cuenta." },
        { question: "¿Qué pasa si mi remolque se devuelve tarde o dañado?", answer: "Puedes informar cualquier problema a través de la plataforma dentro de las 24 horas. Lorepa puede ayudar con la deducción de multas o costos de daños del depósito del inquilino." },
        { question: "¿Necesito un seguro especial como propietario?", answer: "Debes mantener un seguro de remolque válido. Lorepa no proporciona cobertura directa a los propietarios. Sin embargo, es posible que se introduzcan programas de protección opcionales en el futuro." },
        { question: "¿Puedo elegir quién alquila mi remolque?", answer: "Sí. Puedes revisar el perfil del inquilino, los documentos y las calificaciones antes de aceptar una solicitud. No estás obligado a aceptar todas las reservas." },
        { question: "¿Cómo se manejan los impuestos?", answer: "Eres responsable de informar tus ganancias y gestionar tus impuestos. Lorepa puede proporcionar resúmenes de ingresos anuales, pero no remite los impuestos en tu nombre." },
        { question: "¿Puedo alquilar varios remolques?", answer: "Absolutamente. Lorepa admite múltiples listados por usuario. Puedes administrar tu flota bajo una cuenta y ajustar la disponibilidad por unidad." },
        { question: "¿Puedo exigir una tarifa de limpieza o condiciones adicionales?", answer: "Sí. Puedes establecer tus propias reglas (tarifas de limpieza, restricciones de remolque, multas por mal uso), pero deben divulgarse claramente en tu listado." },
        { question: "¿Cómo puedo mejorar la visibilidad de mi remolque?", answer: "Usa fotos de alta calidad, descripciones detalladas, precios justos y mantén una buena tasa de respuesta. Los propietarios verificados con buenas calificaciones aparecen más arriba en los resultados de búsqueda." },
        { question: "¿Cómo manejo el combustible o la devolución del equipo?", answer: "Puedes especificar en tu listado si el combustible/equipo debe devolverse en las mismas condiciones. Siempre documenta la condición al momento de la recogida y la devolución." },
        { question: "¿Puedo denunciar a un mal inquilino?", answer: "Sí. Una vez finalizado el alquiler, puedes dejar una reseña e informar cualquier incidente grave al equipo de confianza y seguridad de Lorepa. El abuso repetido puede resultar en la prohibición del inquilino." },
        { question: "¿Cómo me contacto con el soporte al cliente?", answer: "Puedes comunicarte con nuestro equipo de soporte a través de la función de chat en la aplicación o el sitio web, o por correo electrónico a support@lorepa.ca. El tiempo de respuesta es típicamente inferior a 24 horas." },
        { question: "¿Quién es responsable en caso de accidente o robo?", answer: "Los inquilinos son responsables de cualquier daño o pérdida durante el alquiler. En casos graves, pueden aplicarse informes policiales, reclamaciones de seguros y mediación de la plataforma." }, // Moved from global
        { question: "¿Lorepa ofrece cobertura de seguro?", answer: "Actualmente, Lorepa no ofrece directamente cobertura de seguro, pero puede requerir prueba de cobertura de terceros. Las opciones de seguro dedicadas pueden agregarse pronto." }, // Moved from global
        { question: "¿Lorepa está disponible en los EE. UU.?", answer: "Lorepa se centra actualmente en Canadá. El uso transfronterizo solo se permite con el consentimiento del propietario y la documentación adecuada." } // Moved from global
      ]
    }
  },
  cn: {
    trailerRental: "拖车租赁新体验",
    rentAnywhere: "随时随地租您想要的拖车！",
    where: "地点",
    placeholder: "城市、机场、酒店",
    from: "从",
    until: "直到",
    newWay: "全天候租拖车的新方式！",
    discover: "探索魁北克领先的个人拖车共享平台。",
    needTrailer: "无论您是否需要拖车",
    shareOne: "或愿意共享一个",
    rentTrailerTitle: "租一辆拖车",
    rentTrailerDescription: "在魁北克找到满足您需求的完美拖车，无论您身在何处。浏览、预订，然后出发！",
    rentTrailerButton: "租一辆拖车",
    becomeHostTitle: "成为房东",
    becomeHostDescription: "列出您的拖车，通过帮助他人搬家、旅行和探索来开始赚钱。这既简单又安全。",
    becomeHostButton: "成为房东",
    trustedBy: "1000+ 信任用户",
    leadingPlatform: "我们公司是领先的共享平台，您可以从个人手中预订各种类型的拖车，",
    dynamicCommunity: "无论场合如何，拥有值得信赖的动态社区主机。",
    thankYou: "感谢您成为 1000+ 完全信任我们的人之一！",
    popularLocations: "热门地点",
    carHauler: "汽车托运拖车",
    faq: "常见问题",
    seeAllFaq: "查看所有 FAQ",
    guests: "客人",
    hosts: "房东",
    faqContent: {
      renters: [
        { question: "在 Lorepa 租拖车需要什么？", answer: "要租拖车，您必须年满 21 岁，持有有效的驾驶执照，并提供保险证明。您还需要一个经过验证的 Lorepa 帐户。" },
        { question: "租赁流程如何运作？", answer: "您浏览可用的拖车，向车主发送请求，一旦获得批准，即可确认您的预订。租赁合同和检查照片会自动生成。" },
        { question: "我的租赁是否包含保险？", answer: "不。您需要提供有效的汽车保险，涵盖牵引。结账时可能会提供额外的可选保护。" },
        { question: "我可以取消我的预订吗？", answer: "是的，您可以根据我们的取消政策中描述的条款取消。退款可能因取消时间与开始日期的相对关系而异。" },
        { question: "如果我迟还拖车怎么办？", answer: "迟还可能会产生固定罚款，具体详情请参阅使用条款。请务必在延迟的情况下通知车主，以避免纠纷。" },
        { question: "如果拖车在我的行程中损坏了怎么办？", answer: "您对租赁期间的任何损坏负责。损坏费用可能会从您的押金中扣除或直接收取，具体取决于损坏的严重程度和证据。" },
        { question: "付款和押金如何处理？", answer: "付款通过 Stripe 安全处理。租赁期间会持有安全押金，如果在 7 天内没有报告问题，则会释放。" },
        { question: "我可以在哪里拖车？", answer: "大多数拖车可以在加拿大境内牵引。如果计划跨境旅行（例如，前往美国），请先与车主核实并在您的请求中提及。" },
        { question: "我需要特殊的牵引执照吗？", answer: "在大多数加拿大省份，标准 5 级驾照足以应对小型拖车。但是，您有责任确保您符合当地要求，并且您的车辆被评定为可以牵引所选拖车。" },
        { question: "有哪些类型的拖车可用？", answer: "Lorepa 提供多用途拖车、封闭式货运拖车、汽车运输拖车、摩托车拖车等。您可以按类别、尺寸或位置进行筛选。" },
        { question: "我可以租一辆拖车单程旅行吗？", answer: "大多数租赁都是往返的。如果您需要单程租赁，请直接联系车主或查看提供灵活还车选项的列表。" },
        { question: "有隐藏费用吗？", answer: "没有隐藏费用。所有费用都预先显示。如果未遵守某些规定，可能会添加一些额外费用（例如，清洁费、额外天数、超里程费）。" },
        { question: "如何联系客户支持？", answer: "您可以通过应用程序或网站上的聊天功能，或发送电子邮件至 support@lorepa.ca 联系我们的支持团队。回复时间通常在 24 小时内。" },
        { question: "发生事故或盗窃时谁负责？", answer: "租客对租赁期间的任何损坏或损失负责。在严重情况下，可能需要提交警方报告、保险索赔和平台调解。" }, // Moved from global
        { question: "Lorepa 提供保险吗？", answer: "目前，Lorepa 不直接提供保险，但可能要求提供第三方保险证明。专用保险选项可能会很快添加。" }, // Moved from global
        { question: "Lorepa 在美国可用吗？", answer: "Lorepa 目前专注于加拿大。跨境使用仅在车主同意和提供适当文件的情况下才允许。" } // Moved from global
      ],
      owners: [
        { question: "如何列出我的拖车？", answer: "您可以通过注册、填写关键详细信息（描述、可用性、定价）、上传照片和提供所需文件（注册、保险）来列出您的拖车。" },
        { question: "使用 Lorepa 我能赚多少钱？", answer: "您保留租赁价格的 85%。其余 15% 用于支付 Lorepa 的服务费。付款在租赁结束后 3-5 个工作日内通过 Stripe 自动处理。" },
        { question: "我可以取消预订吗？", answer: "是的，但车主每 6 个月只允许免费取消 2 次。在此之后，如果取消符合政策规定，则将收取 100 加元的罚款。滥用取消将受到帐户审核。" },
        { question: "如果我的拖车被迟还或损坏了怎么办？", answer: "您可以在 24 小时内通过平台报告任何问题。Lorepa 可以协助从租客的押金中扣除罚款或损坏费用。" },
        { question: "作为车主，我需要特殊保险吗？", answer: "您必须保持有效的拖车保险。Lorepa 不直接向车主提供保险。但是，未来可能会引入可选的保护计划。" },
        { question: "我可以选择谁租我的拖车吗？", answer: "是的。您可以在接受请求之前查看租客的个人资料、文件和评分。您没有义务接受所有预订。" },
        { question: "如何处理税款？", answer: "您有责任报告您的收入并管理您的税款。Lorepa 可能会提供年度收入汇总，但不会代表您汇款。" },
        { question: "我可以出租多个拖车吗？", answer: "当然可以。Lorepa 支持每个用户多个列表。您可以在一个帐户下管理您的车队并调整每个单位的可用性。" },
        { question: "我可以要求清洁费或额外条件吗？", answer: "是的。您可以设置自己的规则（清洁费、牵引限制、误用罚款），但必须在您的列表中清楚披露。" },
        { question: "如何提高我的拖车可见度？", answer: "使用高质量的照片、详细的描述、公平的定价，并保持良好的响应率。具有良好评分的经过验证的车主会出现在搜索结果中靠前的位置。" },
        { question: "如何处理燃料或设备归还？", answer: "您可以在您的列表中指定燃料/设备是否必须以相同条件归还。始终在取车和归还时记录状况。" },
        { question: "我可以举报不良租客吗？", answer: "是的。租赁结束后，您可以留下评论并向 Lorepa 的信任与安全团队报告任何严重事件。重复滥用可能会导致租客被禁止。" },
        { question: "如何联系客户支持？", answer: "您可以通过应用程序或网站上的聊天功能，或发送电子邮件至 support@lorepa.ca 联系我们的支持团队。回复时间通常在 24 小时内。" },
        { question: "发生事故或盗窃时谁负责？", answer: "租客对租赁期间的任何损坏或损失负责。在严重情况下，可能需要提交警方报告、保险索赔和平台调解。" }, // Moved from global
        { question: "Lorepa 提供保险吗？", answer: "目前，Lorepa 不直接提供保险，但可能要求提供第三方保险证明。专用保险选项可能会很快添加。" }, // Moved from global
        { question: "Lorepa 在美国可用吗？", answer: "Lorepa 目前专注于加拿大。跨境使用仅在车主同意和提供适当文件的情况下才允许。" } // Moved from global
      ]
    }
  },
  fr: {
    trailerRental: "Location de remorque réinventée",
    rentAnywhere: "Louez la remorque que vous voulez, où vous voulez !",
    where: "Où",
    placeholder: "Ville, aéroport, hôtel",
    from: "De",
    until: "Jusqu'à",
    newWay: "La nouvelle façon de louer une remorque 24h/24 et 7j/7 !",
    discover: "Découvrez la plateforme leader de partage de remorques entre particuliers au Québec.",
    needTrailer: "Que vous ayez besoin d'une remorque",
    shareOne: "ou que vous en ayez une à partager",
    rentTrailerTitle: "Louer une remorque",
    rentTrailerDescription: "Trouvez la remorque parfaite pour vos besoins, où que vous soyez au Québec. Parcourez, réservez et partez !",
    rentTrailerButton: "Louer une remorque",
    becomeHostTitle: "Devenir hôte",
    becomeHostDescription: "Listez votre remorque et commencez à gagner de l'argent en aidant les autres à déménager, voyager et explorer. C'est facile et sécurisé.",
    becomeHostButton: "Devenir hôte",
    trustedBy: "Fiable par plus de 1000 +",
    leadingPlatform: "Notre entreprise est la principale plateforme de partage où vous pouvez réserver tout type de remorque auprès de particuliers,",
    dynamicCommunity: "quelle que soit l'occasion, avec une communauté dynamique d'hôtes de confiance.",
    thankYou: "Vous êtes l'une des 1000+ personnes qui nous font entièrement confiance, merci !",
    popularLocations: "Lieux populaires",
    carHauler: "Remorque pour voiture",
    faq: "Questions fréquemment posées",
    seeAllFaq: "Voir toutes les FAQ",
    guests: "Invités",
    hosts: "Hôtes",
    faqContent: {
      renters: [
        { question: "De quoi ai-je besoin pour louer une remorque sur Lorepa ?", answer: "Pour louer une remorque, vous devez avoir au moins 21 ans, détenir un permis de conduire valide et fournir une preuve d'assurance. Vous aurez également besoin d'un compte Lorepa vérifié." },
        { question: "Comment fonctionne le processus de location ?", answer: "Vous parcourez les remorques disponibles, envoyez une demande au propriétaire et, une fois approuvée, confirmez votre réservation. Un contrat de location et des photos d'inspection sont générés automatiquement." },
        { question: "L'assurance est-elle incluse dans ma location ?", answer: "Non. Vous êtes tenu de fournir une assurance automobile valide qui couvre le remorquage. Une protection optionnelle supplémentaire peut être offerte lors du paiement." },
        { question: "Puis-je annuler ma réservation ?", answer: "Oui, vous pouvez annuler selon les termes décrits dans notre politique d'annulation. Les remboursements peuvent varier en fonction du moment de l'annulation par rapport à la date de début." },
        { question: "Que se passe-t-il si je retourne la remorque en retard ?", answer: "Les retours tardifs peuvent entraîner des frais de pénalité fixes, comme indiqué dans les Conditions d'utilisation. Avertissez toujours le propriétaire en cas de retard pour éviter les litiges." },
        { question: "Que se passe-t-il si la remorque est endommagée pendant mon voyage ?", answer: "Vous êtes responsable de tout dommage pendant la période de location. Les coûts des dommages peuvent être déduits de votre dépôt ou facturés directement, selon la gravité et la preuve." },
        { question: "Comment les paiements et les dépôts sont-ils gérés ?", answer: "Les paiements sont traités en toute sécurité via Stripe. Un dépôt de garantie est détenu pendant la période de location et libéré dans les 7 jours si aucun problème n'est signalé." },
        { question: "Où puis-je remorquer la remorque ?", answer: "La plupart des remorques peuvent être remorquées au Canada. Si un voyage transfrontalier (par exemple, vers les États-Unis) est prévu, vérifiez d'abord avec le propriétaire et mentionnez-le dans votre demande." },
        { question: "Ai-je besoin d'un permis de remorquage spécial ?", answer: "Dans la plupart des provinces canadiennes, un permis de classe 5 standard est suffisant pour les petites remorques. Cependant, il est de votre responsabilité de vous assurer de respecter les exigences locales et que votre véhicule est homologué pour remorquer la remorque sélectionnée." },
        { question: "Quels types de remorques sont disponibles ?", answer: "Lorepa propose des remorques utilitaires, des remorques cargo fermées, des remorques porte-voitures, des remorques moto, et bien plus encore. Vous pouvez filtrer par catégorie, taille ou emplacement." },
        { question: "Puis-je louer une remorque pour un aller simple ?", answer: "La plupart des locations sont aller-retour. Si vous avez besoin d'une location aller simple, contactez directement le propriétaire ou vérifiez les annonces avec des options de retour flexibles." },
        { question: "Y a-t-il des frais cachés ?", answer: "Pas de frais cachés. Tous les frais sont indiqués à l'avance. Certains extras (par exemple, nettoyage, jours supplémentaires, dépassement de kilométrage) peuvent être ajoutés si les conditions ne sont pas respectées." },
        { question: "Comment puis-je contacter le service client ?", answer: "Vous pouvez joindre notre équipe de support via la fonction de chat sur l'application ou le site web, ou par e-mail à support@lorepa.ca. Le temps de réponse est généralement inférieur à 24h." },
        { question: "Qui est responsable en cas d'accident ou de vol ?", answer: "Les locataires sont responsables de tout dommage ou perte pendant la location. Dans les cas graves, des rapports de police, des réclamations d'assurance et une médiation de la plateforme peuvent s'appliquer." }, // Moved from global
        { question: "Lorepa offre-t-il une couverture d'assurance ?", answer: "Actuellement, Lorepa n'offre pas directement d'assurance mais peut exiger une preuve de couverture tierce. Des options d'assurance dédiées pourraient être ajoutées prochainement." }, // Moved from global
        { question: "Lorepa est-il disponible aux États-Unis ?", answer: "Lorepa est actuellement axé sur le Canada. L'utilisation transfrontalière n'est autorisée qu'avec le consentement du propriétaire et les documents appropriés." } // Moved from global
      ],
      owners: [
        { question: "How do I list my trailer?", answer: "Vous pouvez lister votre remorque en vous inscrivant, en remplissant les détails clés (description, disponibilité, prix), en téléchargeant des photos et en fournissant les documents requis (immatriculation, assurance)." },
        { question: "Combien puis-je gagner avec Lorepa ?", answer: "Vous conservez 85% du prix de la location. Les 15% restants couvrent les frais de service de Lorepa. Les paiements sont traités automatiquement via Stripe dans les 3 à 5 jours ouvrables après la fin de la location." },
        { question: "Puis-je annuler une réservation ?", answer: "Oui, mais les propriétaires ne sont autorisés qu'à 2 annulations gratuites tous les 6 mois. Après cela, une pénalité de 100 $ CA s'applique si l'annulation est conforme à la politique. L'abus d'annulations est soumis à un examen du compte." },
        { question: "Que se passe-t-il si ma remorque est retournée en retard ou endommagée ?", answer: "Vous pouvez signaler tout problème via la plateforme dans les 24 heures. Lorepa peut vous aider à déduire les pénalités ou les coûts de dommages du dépôt du locataire." },
        { question: "Ai-je besoin d'une assurance spéciale en tant que propriétaire ?", answer: "Vous devez maintenir une assurance remorque valide. Lorepa ne fournit pas de couverture directe aux propriétaires. Cependant, des programmes de protection optionnels pourraient être introduits à l'avenir." },
        { question: "Puis-je choisir qui loue ma remorque ?", answer: "Oui. Vous pouvez consulter le profil du locataire, ses documents et ses évaluations avant d'accepter une demande. Vous n'êtes pas obligé d'accepter toutes les réservations." },
        { question: "Comment les taxes sont-elles gérées ?", answer: "Vous êtes responsable de déclarer vos revenus et de gérer vos impôts. Lorepa peut fournir des résumés de revenus annuels, mais ne remet pas les impôts en votre nom." },
        { question: "Puis-je louer plusieurs remorques ?", answer: "Absolument. Lorepa prend en charge plusieurs annonces par utilisateur. Vous pouvez gérer votre flotte sous un seul compte et ajuster la disponibilité par unité." },
        { question: "Puis-je exiger des frais de nettoyage ou des conditions supplémentaires ?", answer: "Oui. Vous pouvez définir vos propres règles (nettoyage, remorquage, pénalités pour mauvaise utilisation), mais elles doivent être clairement divulguées dans votre annonce." },
        { question: "Comment puis-je améliorer la visibilité de ma remorque ?", answer: "Utilisez des photos de haute qualité, des descriptions détaillées, des prix équitables et maintenez un bon taux de réponse. Les propriétaires vérifiés avec de bonnes évaluations apparaissent plus haut dans les résultats de recherche." },
        { question: "Comment gérer le carburant ou le retour de l'équipement ?", answer: "Vous pouvez spécifier dans votre annonce si le carburant/l'équipement doit être retourné dans le même état. Documentez toujours l'état au moment de la prise en charge et du retour." },
        { question: "Can I report a bad renter?", answer: "Yes. After the rental ends, you can leave a review and report any serious incident to Lorepa’s trust & safety team. Repeated abuse may result in renter bans." },
        { question: "Comment puis-je contacter le service client ?", answer: "Vous pouvez joindre notre équipe de support via la fonction de chat sur l'application ou le site web, ou par e-mail à support@lorepa.ca. Le temps de réponse est généralement inférieur à 24h." },
        { question: "Qui est responsable en cas d'accident ou de vol ?", answer: "Les locataires sont responsables de tout dommage ou perte pendant la location. Dans les cas graves, des rapports de police, des réclamations d'assurance et une médiation de la plateforme peuvent s'appliquer." }, // Moved from global
        { question: "Lorepa offre-t-il une couverture d'assurance ?", answer: "Actuellement, Lorepa n'offre pas directement d'assurance mais peut exiger une preuve de couverture tierce. Des options d'assurance dédiées pourraient être ajoutées prochainement." }, // Moved from global
        { question: "Lorepa est-il disponible aux États-Unis ?", answer: "Lorepa est actuellement axé sur le Canada. L'utilisation transfrontalière n'est autorisée qu'avec le consentement du propriétaire et les documents appropriés." } // Moved from global
      ]
    }
  }
};


const AnimatedText = ({ text, variant, className = "" }) => (
  <motion.h1
    variants={variant}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className={`text-center ${className}`}
  >
    {text}
  </motion.h1>
);
const LandingPage = () => {
  const [trustedBy, setTrustedBy] = useState([]);
  const [locations, setLocations] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [faqContent, setFaqContent] = useState({ renters: [], owners: [], global: [] });
  const [translationsData, setTranslationsData] = useState(() => {
    const storedLang = localStorage.getItem('lang');
    return translations[storedLang] || translations.en;
  });
  const [location, setLocation] = useState("");
  const [inputValue, setInputValue] = useState(""); // This variable seems unused, consider removing if not needed.
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);
  const isLogin = localStorage.getItem("userId")
  const nav = useNavigate()
  useEffect(() => {
    const handleStorageChange = () => {
      const storedLang = localStorage.getItem('lang');
      setTranslationsData(translations[storedLang] || translations.en);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also run on mount to ensure the latest language is picked up if it changes externally
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [trustedRes, locationRes, trailerRes] = await Promise.all([
          axios.get(`${config.baseUrl}/content/trusted`),
          axios.get(`${config.baseUrl}/content/locations`),
          axios.get(`${config.baseUrl}/content/trailers`),
          // Removed the direct FAQ API call here as we are now using static content
        ]);

        setTrustedBy(trustedRes.data.data);
        setLocations(locationRes.data.data);
        setTrailers(trailerRes.data.data);
        // Set FAQ content directly from translations
        setFaqContent(translationsData.faqContent);
      } catch (error) {
        console.error("Failed to fetch landing content:", error);
      }
    };

    fetchContent();
  }, [translationsData]); // Depend on translationsData to update FAQs when language changes

  const fetchSuggestions = async (inputText) => {
    if (!inputText) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(`https://lorepa-backend.vercel.app/api/autocomplete`, {
        params: { input: inputText },
      });

      if (res.data.status === "OK") {
        const filtered = res.data.predictions.filter((prediction) =>
          prediction.types.includes("locality") ||
          prediction.types.includes("country") ||
          prediction.types.includes("administrative_area_level_1")
        );
        setSuggestions(filtered);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };


  const handleSelect = async (item) => {
    setLocation(item.description);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Hide suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#fff] flex flex-col overflow-x-hidden">
      <motion.div variants={fadeInDown} initial="hidden" animate="visible">
        {/* Assuming Navbar also needs to know the current language */}
        <Navbar currentLanguage={translationsData} />
      </motion.div>

      <div style={{ backgroundImage: `url(${Hero})` }} className="relative min-h-[110vh] w-screen bg-cover">
        <motion.div variants={zoomBounce} initial="hidden" animate="visible" className="w-full flex justify-center items-center flex-col">
          <AnimatedText text={translationsData?.trailerRental} variant={fadeInUp} className="text-white text-xl md:text-6xl mt-[3rem]" />
          <AnimatedText text={translationsData?.rentAnywhere} variant={fadeIn} className="text-white text-sm mt-2 font-medium" />
          <motion.div variants={blurIn} initial="hidden" animate="visible" className="bg-white md:bg-opacity-100 bg-opacity-80 rounded-md p-3 sm:w-[80%] w-[90%] mx-20 my-10 md:flex justify-center items-center flex-wrap">
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem] relative" ref={wrapperRef}>
              <h1 className="text-sm">{translationsData?.where}</h1>
              <input value={location} onChange={(e) => { fetchSuggestions(e.target.value); setLocation(e.target.value) }} type="text" placeholder={translationsData?.placeholder} className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1 text-sm" />
              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 top-[4rem] left-0 right-0 bg-white shadow-md rounded-md mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item)} className="p-2 hover:bg-gray-100 cursor-pointer text-sm">
                      {item.description}
                    </li>
                  ))}
                </ul>
              )}

            </div>
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm">{translationsData?.from}</h1>
              <div className="flex justify-between items-center gap-x-1">
                <input type="date" className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1" />
              </div>
            </div>
            <div className="flex-1 border border-[#9DA0A6] mt-1 mr-3 py-1 px-6 rounded-[2rem]">
              <h1 className="text-sm">{translationsData?.until}</h1>
              <div className="flex justify-between items-center gap-x-1">
                <input type="date" className="border-none bg-transparent outline-none placeholder:text-[#9DA0A6] flex-1" />
              </div>
            </div>
            <div className="md:w-[3rem] md:flex-none flex-1 md:mt-0 mt-2">
              <Link to={`/trailers?city=${location}`} className="w-[3rem] h-[3rem] bg-[#2563EB] rounded-full flex justify-center items-center text-white">
                <FaSearch />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex justify-center items-center flex-col my-10 p-3">
        <AnimatedText text={translationsData.newWay} variant={flipIn} className="text-[40px] font-medium text-black" />
        <AnimatedText
          text={translationsData.discover}
          variant={fadeInUp}
          className="text-xs text-black mt-1"
        />
        <motion.img variants={scaleIn} src={Img} alt="" className="mt-6" />
      </motion.div>

      <div className="bg-[#2563EB] px-3 py-5">
        <AnimatedText
          text={translationsData.needTrailer}
          variant={fadeInDown}
          className="text-[40px] text-white font-semibold mt-10"
        />
        <AnimatedText
          text={translationsData.shareOne}
          variant={fadeInDown}
          className="text-[40px] text-white font-semibold mb-10"
        />
        <div className="flex justify-center items-center flex-wrap gap-x-5 px-4 pb-10">
          {/* Rent a Trailer Card */}
          <motion.div variants={flipIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-white rounded-tl-lg rounded-tr-lg shadow-lg sm:min-w-[25rem] sm:max-w-[36rem] my-4 overflow-hidden px-5">
            <div className="py-7 sm:py-10">
              <h2 className="text-xl sm:text-[46px] font-[300] mb-1 sm:mb-4">{translationsData.rentTrailerTitle}</h2>
              <p className="text-gray-700 mb-4 sm:text-base text-sm">{translationsData.rentTrailerDescription}</p>
              <div onClick={() => {
                if (isLogin) {
                  nav("/booking")
                }
                else {
                  localStorage.setItem("naviagte", "/booking"); nav("/login")
                }
              }}>
                <button className="border border-[#000] text-[#000] px-4 py-2 rounded-lg bg-transparent">{translationsData.rentTrailerButton}</button>
              </div>
            </div>
            <img src={Host1} alt="Rent a Trailer" className="w-full h-[20rem] rounded-tl-lg rounded-tr-lg object-cover" />
          </motion.div>

          {/* Become a host Card */}
          <motion.div variants={flipIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="bg-white rounded-tl-lg rounded-tr-lg shadow-lg sm:min-w-[25rem] sm:max-w-[36rem] my-4 overflow-hidden px-5">
            <div className="py-7 sm:py-10">
              <h2 className="text-xl sm:text-[46px] font-[300] mb-1 sm:mb-4">{translationsData.becomeHostTitle}</h2>
              <p className="text-gray-700 mb-4 sm:text-base text-sm">{translationsData.becomeHostDescription}</p>
              <div onClick={() => {
                if (isLogin) {
                  nav("/host")
                }
                else {
                  localStorage.setItem("naviagte", "/host"); nav("/login")
                }
              }}>
                <button className="border border-[#000] text-[#000] px-4 py-2 rounded-lg bg-transparent">{translationsData.becomeHostButton}</button>
              </div>
            </div>
            <img src={Host2} alt="Become a Host" className="w-full h-[20rem] rounded-tl-lg rounded-tr-lg object-cover" />
          </motion.div>
        </div>
      </div>

      <motion.div variants={flipIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} className="flex justify-center items-center flex-col bg-[#E9EFFD] py-[4rem] px-3">
        <AnimatedText text={translationsData.trustedBy} variant={fadeInDown} className="text-[40px] text-black font-semibold" />
        <AnimatedText text={translationsData.leadingPlatform} variant={fadeInUp} className="text-xs text-black mt-1" />
        <AnimatedText text={translationsData.dynamicCommunity} variant={fadeInUp} className="text-xs text-black mt-1" />
        <div className="flex flex-wrap justify-center gap-0 mt-6">
          {trustedBy.map((item, i) => (
            // w-[3rem] h-[3rem] object-cover rounded-full
            <img key={i} src={item.image} alt="trusted" className="" />
          ))}
        </div>

        <AnimatedText text={translationsData.thankYou} variant={blurIn} className="text-sm font-bold text-black mt-3" />
      </motion.div>

      <motion.div variants={flipIn} whileInView="visible" className="flex justify-center items-center flex-col p-3">
        <AnimatedText text={translationsData.popularLocations} variant={scaleIn} className="text-2xl text-black font-semibold mt-10" />
        <div className="flex overflow-x-auto gap-10 mt-6 w-[100%] px-4">
          {locations.map((loc, i) => (
            <Link to={`/trailers?city=${loc.title}`} key={i}>
              <img
                src={loc.image}
                alt={loc.title}
                className="max-w-[15rem] min-w-[15rem] min-h-[10rem] max-h-[10rem] rounded-md"
              />
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium mt-2 text-black">{loc.title}</p>
                <FaLongArrowAltRight className="text-blue-700" />
              </div>
            </Link>
          ))}
        </div>

      </motion.div>

      <motion.div
        variants={zoomBounce}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex justify-center items-center flex-col bg-[#0A0F18] p-3 text-white"
      >
        <div className="flex justify-between items-center mt-10 w-full flex-wrap">
          <AnimatedText
            text={translationsData.carHauler}
            variant={fadeInUp}
            className="text-2xl font-semibold mt-2"
          />
          <div className="flex justify-between items-center gap-x-3 mt-2">
            {[FaAngleLeft, FaAngleRight].map((Icon, i) => (
              <div
                key={i}
                className="bg-white w-[2rem] h-[2rem] rounded-full text-black flex justify-center items-center"
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
        <Link to={"/trailers"} className="flex overflow-x-auto gap-5 mt-6 w-[100%] px-4">
          {trailers.map((item, i) => (
            <div key={i} className="relative cursor-pointer">
              <img src={item.image} alt={item.title} className="rounded-md max-w-[22rem] min-w-[22rem] min-h-[16rem] max-h-[16rem] bg-contain" />
              <p className="absolute bottom-5 left-5">{item.title}</p>
            </div>
          ))}
        </Link>
      </motion.div>

      <div className="px-5 py-5 text-black">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-between items-center mt-10 w-full flex-wrap text-black"
        >
          <AnimatedText
            text={translationsData.faq}
            variant={fadeInUp}
            className="text-lg sm:text-2xl font-semibold mt-2"
          />
          <button className="px-3 py-2 mt-2 rounded-md bg-[#2563EB] text-white text-xs">
            <Link to={"/faq"}>{translationsData.seeAllFaq}</Link>
          </button>
        </motion.div>
        <div className="flex flex-wrap justify-between gap-x-5 mt-8">
          {/* Renters (Guests) FAQ Section */}
          <motion.div
            variants={flipIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0"
          >
            <AnimatedText
              text={translationsData.guests}
              variant={fadeInUp}
              className="text-xl font-semibold mb-4"
            />
            {faqContent.renters.map((faq, index) => (
              <AccordionItem
                key={`renter-faq-${index}`}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>

          {/* Owners (Hosts) FAQ Section */}
          <motion.div
            variants={flipIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-[48%] bg-[#F1F1F1] p-5 rounded-md mt-8 md:mt-0"
          >
            <AnimatedText
              text={translationsData.hosts}
              variant={fadeInUp}
              className="text-xl font-semibold mb-4"
            />
            {faqContent.owners.map((faq, index) => (
              <AccordionItem
                key={`owner-faq-${index}`}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default LandingPage;