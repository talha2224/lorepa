import React, { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp, FaEye, FaPlus, FaTimes, FaPaperclip, FaTelegramPlane } from 'react-icons/fa';

// --- Data Structures ---

const mockFaqs = [
    {
        id: 1,
        question: "How do I modify or cancel an existing booking?",
        answer: "To modify or cancel a booking, please navigate to the 'Reservations' tab in the sidebar, select the specific booking, and look for the 'Modify' or 'Cancel' options. Note that cancellation fees may apply depending on the time remaining before the rental start.",
    },
    {
        id: 2,
        question: "What payment methods are accepted?",
        answer: "We currently accept Visa, MasterCard, American Express, and PayPal for all bookings and deposits.",
    },
    {
        id: 3,
        question: "What should I do if my trailer breaks down during the rental period?",
        answer: "Immediately contact our 24/7 roadside assistance line provided in your rental agreement. Do not attempt to fix the trailer yourself. We will dispatch help as quickly as possible.",
    },
    {
        id: 4,
        question: "Where do I upload my check-in and check-out photos?",
        answer: "You can upload check-in and check-out photos directly from the 'Documents' page or via the link provided in your trip status notifications.",
    },
];

const mockTickets = [
    {
        id: '#1043',
        subject: 'Payment refund delay',
        status: 'Open',
        lastUpdate: '2h ago',
    },
    {
        id: '#1050',
        subject: 'Issue with Check-in Photos',
        status: 'Open',
        lastUpdate: '1 day ago',
    },
    {
        id: '#1051',
        subject: 'Inaccurate Flatbed dimensions',
        status: 'Open',
        lastUpdate: '2h ago',
    },
    {
        id: '#1052',
        subject: 'Wrong trailer delivered',
        status: 'Open',
        lastUpdate: '2h ago',
    },
    {
        id: '#1053',
        subject: 'Late return penalty inquiry',
        status: 'Open',
        lastUpdate: '2h ago',
    },
];

// --- Sub-Components ---

/**
 * FAQ List Component
 */
const FaqSection = ({ faqs }) => {
    const [openId, setOpenId] = useState(null);

    const toggleFaq = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Help Center</h3>
            {/* Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search here"
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Accordion Items */}
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                {faqs.map((faq) => (
                    <div key={faq.id} className="cursor-pointer">
                        <button
                            className="flex justify-between items-center w-full p-4 text-left hover:bg-gray-50 transition"
                            onClick={() => toggleFaq(faq.id)}
                        >
                            <span className="text-gray-700 font-medium">{faq.question}</span>
                            {openId === faq.id ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                        </button>
                        {openId === faq.id && (
                            <div className="px-4 pb-4 pt-2 bg-gray-50 text-gray-600 text-sm border-t border-gray-200">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

/**
 * Tickets Table Component
 */
const TicketsTable = ({ tickets, onViewTicket }) => {
    const [activeTab, setActiveTab] = useState('open'); // 'open' or 'closed'

    const filteredTickets = activeTab === 'open'
        ? tickets.filter(t => t.status === 'Open')
        : tickets.filter(t => t.status !== 'Open'); // Simple closed filter

    return (
        <div className="mt-4">
            {/* Sub-Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveTab('open')}
                    className={`pb-2 text-sm font-medium ${activeTab === 'open' ? 'border-b-2 border-blue-600 text-[#2563EB]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Open Tickets ({tickets.filter(t => t.status === 'Open').length})
                </button>
                <button
                    onClick={() => setActiveTab('closed')}
                    className={`pb-2 text-sm font-medium ${activeTab === 'closed' ? 'border-b-2 border-blue-600 text-[#2563EB]' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Closed Tickets ({tickets.filter(t => t.status !== 'Open').length})
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['TICKET ID', 'SUBJECT', 'STATUS', 'LAST UPDATE', 'ACTIONS'].map((header) => (
                                <th
                                    key={header}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{ticket.lastUpdate}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => onViewTicket(ticket.id)}
                                        className="text-[#2563EB] hover:text-blue-900 focus:outline-none"
                                        title="View Ticket"
                                    >
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
                <p>Page 1 of 30</p>
                <div className="flex items-center space-x-2">
                    <span className="cursor-pointer font-bold text-[#2563EB]">1</span>
                    <span className="cursor-pointer">2</span>
                    <span className="cursor-pointer">3</span>
                    <span>...</span>
                    <span className="cursor-pointer">10</span>
                    <span className="cursor-pointer">11</span>
                    <span className="cursor-pointer">12</span>
                    <span>Go to page</span>
                    <select className="border border-gray-300 rounded-lg py-1 px-2 text-sm focus:ring-blue-500 focus:border-blue-500">
                        <option>00</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

/**
 * Create Ticket Modal
 */
const CreateTicketModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl">
                {/* Modal Header */}
                <div className="p-5 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">Create Support Ticket</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 space-y-4">
                    {/* User Type Radio */}
                    <div className="flex space-x-4">
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio text-[#2563EB]" name="userType" value="Guest" defaultChecked />
                            <span className="ml-2 text-gray-700 font-medium">Guest</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-radio text-[#2563EB]" name="userType" value="Host" />
                            <span className="ml-2 text-gray-700 font-medium">Host</span>
                        </label>
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            placeholder="Enter Subject"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Category & Attachment */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white">
                                <option>Select Category</option>
                                <option>Billing</option>
                                <option>Technical Issue</option>
                                <option>Reservation</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Attachment (Optional)</label>
                            <div className="w-full py-2 border border-gray-300 rounded-lg text-center text-gray-600 bg-gray-50 cursor-pointer hover:bg-gray-100 transition">
                                Upload File
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            placeholder="Describe your issue"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button className="w-full py-2.5 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#2563EB] transition shadow-md">
                        Submit Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};

/**
 * Ticket Chat View Component
 */
const TicketChatView = ({ ticketId, onBack }) => {
    const mockMessages = [
        {
            sender: 'User',
            text: 'I was promised a refund 5 days ago, but I still haven’t seen it. Can you check the status?',
            time: 'Oct 6, 2025, 8:00 AM',
            isUser: true,
        },
        {
            sender: 'Support Team',
            text: 'Hello! We apologize for the delay. I’ve just escalated this to our finance team. You should receive a confirmation email within the next 24 hours',
            time: 'Oct 6, 2025, 9:00 AM',
            isUser: false,
        },
    ];

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-[calc(100vh-160px)] flex flex-col">
            {/* Header */}
            <div className="pb-4 border-b flex justify-between items-center">
                <button onClick={onBack} className="text-[#2563EB] flex items-center hover:text-blue-800 transition">
                    <span className="mr-2">←</span> Back to Tickets
                </button>
                <span className="px-3 py-1 text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Open
                </span>
            </div>

            {/* Ticket Title */}
            <h2 className="text-2xl font-bold text-gray-800 my-4">{ticketId} — ZFDSGFHGJ</h2>

            {/* Chat Area */}
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {mockMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xl p-3 rounded-xl shadow-sm ${msg.isUser ? 'bg-[#2563EB] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                            {!msg.isUser && <p className="text-xs font-semibold mb-1">{msg.sender}</p>}
                            <p className="text-sm">{msg.text}</p>
                            <p className={`text-right text-xs mt-1 ${msg.isUser ? 'text-blue-200' : 'text-gray-500'}`}>{msg.time}</p>
                        </div>
                    </div>
                ))}
                {/* Placeholder for new message bubble */}
            </div>

            {/* Message Input */}
            <div className="pt-4 border-t mt-4 flex items-center space-x-3">
                <input
                    type="text"
                    placeholder="Type Your Message"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="text-gray-500 hover:text-[#2563EB] p-2 transition">
                    <FaPaperclip className="text-xl" />
                </button>
                <button className="bg-[#2563EB] text-white p-2 rounded-full hover:bg-[#2563EB] transition">
                    <FaTelegramPlane className="text-xl" />
                </button>
            </div>
        </div>
    );
};

// --- Main Component ---

const UserSupport = () => {
    // State to manage the main view: 'tickets', 'faqs', or 'chat'
    const [mainView, setMainView] = useState('faqs');
    // State to manage the visibility of the "Create Ticket" modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    // State to track which ticket is being viewed in the 'chat' state
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const handleViewTicket = (id) => {
        setSelectedTicketId(id);
        setMainView('chat');
    };

    const handleBackToTickets = () => {
        setSelectedTicketId(null);
        setMainView('tickets');
    };

    const isChatView = mainView === 'chat';
    const currentTicket = mockTickets.find(t => t.id === selectedTicketId) || {};

    return (
        <div>
            <div>
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Support & Tickets</h1>
                    {!isChatView && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center px-4 py-2 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-[#2563EB] transition"
                        >
                            <FaPlus className="mr-2 text-sm" />
                            Create New Ticket
                        </button>
                    )}
                </div>

                {/* Main Content (Tabs or Chat View) */}
                {!isChatView ? (
                    <>
                        {/* Tabs for Tickets/FAQ's */}
                        <div className="flex space-x-2 mb-8">
                            <button
                                onClick={() => setMainView('tickets')}
                                className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${mainView === 'tickets' ? 'bg-[#2563EB] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                            >
                                Tickets
                            </button>
                            <button
                                onClick={() => setMainView('faqs')}
                                className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${mainView === 'faqs' ? 'bg-[#2563EB] text-white' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                            >
                                FAQ's
                            </button>
                        </div>

                        {/* Conditional Rendering of Tab Content */}
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            {mainView === 'faqs' && <FaqSection faqs={mockFaqs} />}
                            {mainView === 'tickets' && <TicketsTable tickets={mockTickets} onViewTicket={handleViewTicket} />}
                        </div>
                    </>
                ) : (
                    /* Ticket Chat View */
                    <TicketChatView
                        ticketId={currentTicket.id}
                        onBack={handleBackToTickets}
                    />
                )}

                {/* Create Ticket Modal */}
                <CreateTicketModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </div>
    );
};

export default UserSupport;