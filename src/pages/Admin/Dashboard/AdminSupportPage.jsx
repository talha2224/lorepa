import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../../../config';
import toast from 'react-hot-toast';

const AdminSupportPage = () => {
    const [tickets, setTickets] = useState([]);
    const [expandedTicket, setExpandedTicket] = useState(null);

    const fetchTickets = async () => {
        try {
            const res = await axios.get(`${config.baseUrl}/ticket/all`);
            setTickets(res.data.data);
        } catch (err) {
            toast.error('Failed to fetch tickets');
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    return (
        <div className='min-h-screen bg-white p-6 rounded-md'>
            <h1 className='text-3xl font-semibold mb-6'>All Support Tickets</h1>

            <div className='space-y-6'>
                {tickets.map((ticket, index) => (
                    <div key={ticket._id} className='border rounded-lg p-5 shadow-sm'>

                        {/* ================= TICKET HEADER ================= */}
                        <div className='flex justify-between items-start gap-6'>
                            <div className='space-y-1 w-full'>
                                <p className='text-sm text-gray-500'>
                                    #{index + 1} · Ticket ID: <b>{ticket._id.slice(-6).toUpperCase()}</b>
                                </p>

                                <div className='flex items-center gap-3 mt-2'>
                                    {ticket.userId?.profilePicture && (
                                        <img
                                            src={ticket.userId.profilePicture}
                                            alt='user'
                                            className='w-10 h-10 rounded-full'
                                        />
                                    )}

                                    <div>
                                        <p className='font-semibold'>{ticket.userId?.name}</p>
                                        <p className='text-xs text-gray-500'>
                                            {ticket.userId?.email} · {ticket.userId?.phone}
                                        </p>
                                    </div>
                                </div>

                                <p><b>Role:</b> {ticket.userId?.role}</p>
                                <p><b>User Type:</b> {ticket.userType}</p>
                                <p><b>Subject:</b> {ticket.subject}</p>
                                <p><b>Category:</b> {ticket.category}</p>
                                <p><b>Status:</b>
                                    <span className={`ml-2 px-2 py-1 text-xs rounded-full
                                        ${ticket.status === "Open"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"}`}>
                                        {ticket.status}
                                    </span>
                                </p>
                                <p><b>Description:</b> {ticket.description}</p>

                                {ticket.attachment && (
                                    <a
                                        href={ticket.attachment}
                                        target='_blank'
                                        rel='noreferrer'
                                        className='text-blue-600 underline text-sm'
                                    >
                                        View Ticket Attachment
                                    </a>
                                )}
                            </div>

                            <button
                                onClick={() =>
                                    setExpandedTicket(
                                        expandedTicket === ticket._id ? null : ticket._id
                                    )
                                }
                                className='text-blue-600 text-sm underline whitespace-nowrap'
                            >
                                {expandedTicket === ticket._id ? 'Hide Messages' : 'View Messages'}
                            </button>
                        </div>

                        {/* ================= MESSAGES ================= */}
                        {expandedTicket === ticket._id && (
                            <div className='mt-6 bg-gray-50 rounded-lg p-4 space-y-4'>
                                <h3 className='font-semibold'>Conversation</h3>

                                {ticket.messages?.length > 0 ? (
                                    ticket.messages.map((msg, i) => {
                                        const isUser =
                                            msg.senderId?._id === ticket.userId?._id;

                                        return (
                                            <div
                                                key={i}
                                                className={`p-4 rounded-md text-sm
                                                    ${isUser ? 'bg-white' : 'bg-blue-50'}`}
                                            >
                                                <div className='flex items-center gap-3 mb-1'>
                                                    {msg.senderId?.profilePicture && (
                                                        <img
                                                            src={msg.senderId.profilePicture}
                                                            alt='sender'
                                                            className='w-6 h-6 rounded-full'
                                                        />
                                                    )}

                                                    <p className='font-semibold text-xs'>
                                                        {msg.senderId?.name}
                                                        <span className='ml-1 text-gray-500'>
                                                            ({msg.senderId?.role})
                                                        </span>
                                                    </p>
                                                </div>

                                                <p className='ml-9'>{msg.message}</p>

                                                {msg.attachment && (
                                                    <a
                                                        href={msg.attachment}
                                                        target='_blank'
                                                        rel='noreferrer'
                                                        className='text-blue-600 text-xs underline ml-9 block mt-1'
                                                    >
                                                        View Attachment
                                                    </a>
                                                )}

                                                <p className='text-xs text-gray-400 ml-9 mt-1'>
                                                    {new Date(msg.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className='text-sm text-gray-500'>
                                        No messages yet.
                                    </p>
                                )}
                            </div>
                        )}

                        <p className='text-xs text-gray-400 mt-4'>
                            Created: {new Date(ticket.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminSupportPage;
