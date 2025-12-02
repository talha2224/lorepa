import { IoCall, IoChatbox, IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from 'react-icons/md';
import { GoHome } from "react-icons/go";
import { BsBuildings } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { FaRegBell, FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineCreditCard } from "react-icons/hi2";
import { GrDocumentText } from "react-icons/gr";
import { RxGear } from "react-icons/rx";
import { RiCalendarTodoFill } from "react-icons/ri";

export const navData = [
    {
        id: 1,
        link: "home",
        name: "Home",
        icon: <MdDashboard />
    },
    {
        id: 7,
        link: "hotline",
        name: "HotLine",
        icon: <IoCall />
    }
];

export const userNav = [
    {
        id: 1,
        link: "home",
        name: "Dashboard",
        icon: <GoHome />
    },
    {
        id: 2,
        link: "reservation",
        name: "Reservation",
        icon: <FaRegCalendarAlt />
    },
    {
        id: 3,
        link: "payment",
        name: "Payments & Receipts",
        icon: <HiOutlineCreditCard />
    },
    {
        id: 4,
        link: "document",
        name: "Document",
        icon: <GrDocumentText />
    },
    {
        id: 7,
        link: "messaging",
        name: "Messaging",
        icon: <IoChatbox />
    },
    {
        id: 5,
        link: "notification",
        name: "Notifications",
        icon: <FaRegBell />
    },
    {
        id: 6,
        link: "support",
        name: "Support",
        icon: <RxGear />
    },
    {
        id: 7,
        link: "profile",
        name: "Profile & Settings",
        icon: <RxGear />
    },
];
export const buyerNav = [
    {
        id: 1,
        link: "home",
        name: "Dashboard",
        icon: <GoHome />
    },
    {
        id: 2,
        link: "listing",
        name: "Listing",
        icon: <RiCalendarTodoFill />
    },
    {
        id: 3,
        link: "reservation",
        name: "Reservation",
        icon: <RiCalendarTodoFill />
    },
    {
        id: 4,
        link: "earnings",
        name: "Earning & Payout",
        icon: <GrDocumentText />
    },
    {
        id: 5,
        link: "documents",
        name: "Documents & Contract",
        icon: <GrDocumentText />
    },
    {
        id: 7,
        link: "messaging",
        name: "Messaging",
        icon: <IoChatbox />
    },
    {
        id: 6,
        link: "support",
        name: "Support",
        icon: <RxGear />
    },
    {
        id: 7,
        link: "profile",
        name: "Profile & Settings",
        icon: <RxGear />
    },
];


export const adminNav = [
    {
        id: 1,
        link: "home",
        name: "Dashboard",
        icon: <GoHome />
    },
    {
        id: 2,
        link: "listing",
        name: "Listing",
        icon: <BsBuildings />
    },
    {
        id: 3,
        link: "booking",
        name: "Bookings",
        icon: <IoCalendarOutline />
    },
    {
        id: 4,
        link: "user",
        name: "User Management",
        icon: <FiUser />
    },
    {
        id: 4,
        link: "settings",
        name: "Platform Setting",
        icon: <IoSettingsOutline />
    }
]