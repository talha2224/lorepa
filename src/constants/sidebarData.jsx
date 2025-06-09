import { IoCall, IoSettingsOutline } from "react-icons/io5";
import { MdDashboard } from 'react-icons/md';
import { GoHome } from "react-icons/go";
import { BsBuildings } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

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