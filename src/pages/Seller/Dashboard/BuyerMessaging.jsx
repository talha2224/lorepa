import React, { useState, useRef, useEffect } from 'react'
import { IoSearch, IoSend, IoAttachOutline } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'

const mockConversations = [
    { id: '1', name: 'John Nolan', lastMessage: 'Need to confirm hitch size for pickup.', time: '10m ago', unread: 0, avatar: 'JN', isOnline: true },
    { id: '2', name: 'RAVA Support', lastMessage: 'Your quarterly statement is ready to view.', time: 'Yesterday', unread: 2, avatar: 'RAVA', isOnline: false },
    { id: '3', name: 'Alice Miller', lastMessage: 'Can we change pickup time?', time: '2d ago', unread: 0, avatar: 'AM', isOnline: true },
    { id: '4', name: 'Theodore Long', lastMessage: 'Thanks, see you tomorrow.', time: '3d ago', unread: 0, avatar: 'TL', isOnline: false, meta: 'Gooseneck Flatbed (Booking #4564)' },
]

const mockMessages = [
    { id: 'm1', sender: 'Theodore Long', text: 'Hi, confirming the pickup is at 3:00 PM tomorrow?', timestamp: 'Yesterday • 9:00 AM', isBuyer: false, dateHeader: 'Yesterday' },
    { id: 'm2', sender: 'User', text: 'Yes, that works perfectly. See you then!', timestamp: 'Today • 10:15 AM', isBuyer: true, dateHeader: 'Today' },
]

const getAvatarColor = (initials) => {
    const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-pink-500', 'bg-green-500', 'bg-purple-500']
    let hash = 0
    for (let i = 0; i < initials.length; i++) hash = initials.charCodeAt(i) + ((hash << 5) - hash)
    return colors[Math.abs(hash) % colors.length]
}

const Avatar = ({ initials, isOnline, isSupport }) => {
    const display = initials.length > 3 ? initials.substring(0, 3) : initials
    const color = isSupport ? 'bg-black text-white' : getAvatarColor(display)
    return (
        <div className={`relative w-10 h-10 flex items-center justify-center rounded-full font-bold text-white text-sm ${color}`}>
            {display}
            {isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white" />}
        </div>
    )
}

const ConversationItem = ({ conv, isActive, onClick }) => (
    <div
        onClick={() => onClick(conv.id)}
        className={`flex items-start p-3 cursor-pointer rounded-lg transition-colors duration-150 ${isActive ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}
    >
        <Avatar initials={conv.avatar} isOnline={conv.isOnline} isSupport={conv.avatar === 'RAVA'} />
        <div className="ml-3 flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
                <p className={`text-sm font-semibold truncate ${isActive ? 'text-indigo-800' : 'text-gray-900'}`}>{conv.name}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap">{conv.time}</span>
            </div>
            <p className={`text-sm mt-1 truncate ${isActive ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                {conv.lastMessage}
            </p>
            {conv.unread > 0 && (
                <span className="absolute top-2 right-2 text-xs font-bold text-white bg-red-500 rounded-full px-2 py-0.5">
                    {conv.unread}
                </span>
            )}
        </div>
    </div>
)

const ChatMessage = ({ message }) => {
    const isBuyer = message.isBuyer
    const align = isBuyer ? 'justify-end' : 'justify-start'
    const bubble = isBuyer
        ? 'bg-indigo-600 text-white rounded-tr-xl rounded-b-xl'
        : 'bg-gray-100 text-gray-800 rounded-tl-xl rounded-b-xl'
    return (
        <div className={`flex ${align} my-2`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-4 shadow-md ${bubble}`}>
                <p className="text-sm break-words">{message.text}</p>
                <span className={`text-xs mt-1 ${isBuyer ? 'text-indigo-200' : 'text-gray-500'} self-end`}>
                    {message.timestamp}
                </span>
            </div>
        </div>
    )
}

const BuyerMessaging = () => {
    const [conversations] = useState(mockConversations)
    const [messages, setMessages] = useState(mockMessages)
    const [activeConversationId, setActiveConversationId] = useState(mockConversations[3].id)
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef(null)

    const activeConversation = conversations.find(c => c.id === activeConversationId) || mockConversations[0]

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    useEffect(() => scrollToBottom(), [messages])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!newMessage.trim()) return
        const msg = {
            id: crypto.randomUUID(),
            sender: 'User',
            text: newMessage.trim(),
            timestamp: new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' }),
            isBuyer: true,
            dateHeader: '',
        }
        setMessages([...messages, msg])
        setNewMessage('')
    }

    return (
        <div className="flex h-screen overflow-hidden font-inter bg-gray-50">
            <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col border-r border-gray-200 bg-white">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Messages</h1>
                    <p className="text-sm text-gray-500">Stay connected with renters and support — all in one place.</p>
                    <div className="flex space-x-2 mt-4">
                        {['All', 'Unread(2)', 'Support'].map(tab => (
                            <button
                                key={tab}
                                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${tab === 'All'
                                        ? 'bg-indigo-500 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-4 flex space-x-3 border-b border-gray-100">
                    <button className="flex items-center justify-center w-full px-3 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150">
                        <FaPlus className="w-4 h-4 mr-2" /> New Message
                    </button>
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search Conversation"
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                        <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1">
                    {conversations.map(conv => (
                        <ConversationItem
                            key={conv.id}
                            conv={conv}
                            isActive={conv.id === activeConversationId}
                            onClick={setActiveConversationId}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col bg-white">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
                    <div className="flex items-center">
                        <Avatar initials={activeConversation.avatar} isOnline={activeConversation.isOnline} isSupport={activeConversation.avatar === 'RAVA'} />
                        <div className="ml-3">
                            <p className="text-lg font-bold text-gray-900">{activeConversation.name}</p>
                            {activeConversation.meta && <p className="text-sm text-gray-500">{activeConversation.meta}</p>}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`flex items-center text-sm font-semibold ${activeConversation.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                            <span className={`w-2 h-2 rounded-full mr-1 ${activeConversation.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
                            {activeConversation.isOnline ? 'Online' : 'Offline'}
                        </span>
                        <a href="#" className="text-indigo-600 text-sm font-semibold hover:text-indigo-800">
                            View Profile
                        </a>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map(msg => (
                        <React.Fragment key={msg.id}>
                            {msg.dateHeader && (
                                <div className="text-center my-4">
                                    <span className="inline-block px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                                        {msg.dateHeader}
                                    </span>
                                </div>
                            )}
                            <ChatMessage message={msg} />
                        </React.Fragment>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center space-x-3">
                        <button type="button" className="p-3 text-gray-500 hover:text-indigo-600 transition duration-150">
                            <IoAttachOutline className="w-6 h-6" />
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type Your Message"
                            className="flex-1 p-3 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className={`p-3 rounded-full transition duration-150 ${!newMessage.trim()
                                    ? 'bg-indigo-300 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg'
                                }`}
                        >
                            <IoSend className="w-6 h-6 text-white" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BuyerMessaging
