import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSearch, FaChevronDown, FaChevronUp, FaEye, FaPlus, FaTimes, FaPaperclip, FaTelegramPlane } from 'react-icons/fa'
import config from '../../../config'
import toast from 'react-hot-toast'
import { IoIosArrowRoundBack } from 'react-icons/io'

const mockFaqs = [
    {
        id: 1,
        question: "How do I modify or cancel an existing booking?",
        answer: "To modify or cancel a booking, go to 'Reservations', select booking and modify or cancel."
    },
    {
        id: 2,
        question: "What payment methods are accepted?",
        answer: "We accept Visa, MasterCard, American Express, and PayPal."
    },
    {
        id: 3,
        question: "What should I do if my trailer breaks down?",
        answer: "Contact our 24/7 roadside assistance immediately."
    }
]

const FaqSection = ({ faqs }) => {
    const [openId, setOpenId] = useState(null)
    const toggleFaq = (id) => setOpenId(openId === id ? null : id)

    return (
        <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Help Center</h3>
            <div className="relative mb-6">
                <input type="text" placeholder="Search here" className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg" />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
                {faqs.map((faq) => (
                    <div key={faq.id}>
                        <button onClick={() => toggleFaq(faq.id)} className="flex justify-between items-center w-full p-4 text-left">
                            <span className="text-gray-700 font-medium">{faq.question}</span>
                            {openId === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {openId === faq.id && (
                            <div className="px-4 pb-4 pt-2 bg-gray-50 text-gray-600 text-sm">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

const TicketsTable = ({ tickets, onViewTicket }) => {
    const [activeTab, setActiveTab] = useState('open')
    const filteredTickets = activeTab === 'open'
        ? tickets.filter(t => t.status === 'Open')
        : tickets.filter(t => t.status !== 'Open')

    return (
        <div className="mt-4">
            <div className="flex space-x-4 border-b mb-6">
                <button onClick={() => setActiveTab('open')} className={`pb-2 ${activeTab === 'open' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                    Open Tickets ({tickets.filter(t => t.status === 'Open').length})
                </button>
                <button onClick={() => setActiveTab('closed')} className={`pb-2 ${activeTab === 'closed' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
                    Closed Tickets ({tickets.filter(t => t.status !== 'Open').length})
                </button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['TICKET ID', 'SUBJECT', 'STATUS', 'LAST UPDATE', 'ACTIONS'].map((h) => (
                                <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td className="px-6 py-4 text-sm">{ticket._id}</td>
                                <td className="px-6 py-4 text-sm">{ticket.subject}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 text-xs rounded-full bg-green-100 text-green-800">
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">{ticket.updatedAt?.slice(0, 10)}</td>
                                <td className="px-6 py-4 text-sm">
                                    <button onClick={() => onViewTicket(ticket)} className="text-blue-600">
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const CreateTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [userType, setUserType] = useState("Guest")
    const [subject, setSubject] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [attachment, setAttachment] = useState(null)

    if (!isOpen) return null

    const submitHandler = () => {
        onSubmit({ userType, subject, category, description, attachment })
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl">
                <div className="p-5 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">Create Support Ticket</h3>
                    <button onClick={onClose}><FaTimes /></button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="flex space-x-4">
                        <label className="flex items-center space-x-2">
                            <input type="radio" checked={userType === "Guest"} onChange={() => setUserType("Guest")} />
                            <span>Guest</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input type="radio" checked={userType === "Host"} onChange={() => setUserType("Host")} />
                            <span>Host</span>
                        </label>
                    </div>

                    <input placeholder="Subject" className="w-full border p-2 rounded" value={subject} onChange={e => setSubject(e.target.value)} />

                    <select className="w-full border p-2 rounded" value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option>Billing</option>
                        <option>Technical Issue</option>
                        <option>Reservation</option>
                    </select>

                    <label className="block w-full border p-2 bg-gray-50 text-center rounded cursor-pointer">
                        <input type="file" className="hidden" onChange={(e) => setAttachment(e.target.files[0])} />
                        Upload Attachment
                    </label>

                    <textarea placeholder="Describe your issue" className="w-full border p-2 rounded" rows="4" value={description} onChange={e => setDescription(e.target.value)} />

                    <button onClick={submitHandler} className="w-full py-2 bg-blue-600 text-white rounded">
                        Submit Ticket
                    </button>
                </div>
            </div>
        </div>
    )
}

const BuyerSupport = () => {
    const [mainView, setMainView] = useState('tickets')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedTicketId, setSelectedTicketId] = useState(null)
    const [tickets, setTickets] = useState([])
    const userId = localStorage.getItem("userId")

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/ticket/user/${userId}`)
            setTickets(res.data.data)
        } catch {
            toast.error("Failed to load tickets")
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    const createTicket = async ({ userType, subject, category, description, attachment }) => {
        const form = new FormData()
        form.append("userId", userId)
        form.append("userType", userType)
        form.append("subject", subject)
        form.append("category", category)
        form.append("description", description)
        if (attachment) form.append("attachment", attachment)

        const loadingToast = toast.loading("Creating ticket...")

        try {
            await axios.post(`${config.baseUrl}/ticket/create`, form)
            toast.success("Ticket created", { id: loadingToast })
            setIsModalOpen(false)
            fetchTickets()
        } catch {
            toast.error("Failed to create ticket", { id: loadingToast })
        }
    }


    const handleViewTicket = (id) => {
        setSelectedTicketId(id)
        setMainView('chat')
    }

    const handleBack = () => {
        setSelectedTicketId(null)
        setMainView('tickets')
    }

    return (
        <div>
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Support & Tickets</h1>
                    {mainView !== 'chat' && (
                        <button onClick={() => setIsModalOpen(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded">
                            <FaPlus className="mr-2" /> Create New Ticket
                        </button>
                    )}
                </div>

                {mainView !== 'chat' ? (
                    <>
                        <div className="flex space-x-2 mb-8">
                            <button onClick={() => setMainView('tickets')} className={`px-6 py-2 rounded ${mainView === 'tickets' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                                Tickets
                            </button>
                            <button onClick={() => setMainView('faqs')} className={`px-6 py-2 rounded ${mainView === 'faqs' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                                FAQ's
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            {mainView === 'faqs' && <FaqSection faqs={mockFaqs} />}
                            {mainView === 'tickets' && <TicketsTable tickets={tickets} onViewTicket={handleViewTicket} />}
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <button onClick={handleBack} className="text-blue-600 flex items-center gap-3"><IoIosArrowRoundBack /> Back</button>
                        <h2 className="text-xl font-bold mt-4">Subject: {selectedTicketId?.subject}</h2>
                        <h2 className="text-sm mt-4">Description: {selectedTicketId?.description}</h2>
                    </div>
                )}

                <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={createTicket} />
            </div>
        </div>
    )
}

export default BuyerSupport
