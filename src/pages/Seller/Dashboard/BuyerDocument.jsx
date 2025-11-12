import React, { useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { FaCalendarAlt, FaTruck, FaUserCircle, FaDownload, FaSearch } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';
import { IoWalletOutline, IoClose } from 'react-icons/io5';
import { MdOutlineDocumentScanner } from 'react-icons/md';

// Data structure for the documents
const documentsData = [
    {
        id: 1,
        title: "Diamond C Utility 77\" x14'",
        type: "Contract",
        trailer: "Diamond C Utility",
        uploaded: "Dec 12, 2025",
        color: "bg-[#2563EB]",
        documentType: "Contracts",
    },
    {
        id: 2,
        title: "Check-in Photos - Diamond C",
        type: "Check-in Photos",
        trailer: "Diamond C Utility",
        uploaded: "Dec 12, 2025",
        color: "bg-purple-600",
        documentType: "Check-in Photos",
    },
    {
        id: 3,
        title: "Check-out Photos - Diamond C",
        type: "Check-out Photos",
        trailer: "Diamond C Utility",
        uploaded: "Dec 12, 2025",
        color: "bg-pink-600",
        documentType: "Check-out Photos",
    },
    {
        id: 4,
        title: "Insurance Rider",
        type: "Contract",
        trailer: "Diamond C Utility",
        uploaded: "Dec 12, 2025",
        color: "bg-[#2563EB]",
        documentType: "Contracts",
    },
    {
        id: 5,
        title: "Damage Report - Flatbed",
        type: "Report",
        trailer: "Diamond C Utility",
        uploaded: "Dec 12, 2025",
        color: "bg-red-600",
        documentType: "Reports",
    },
];

// Helper component for the document card
const DocumentCard = ({ doc, onView }) => {
    // Determine icon and text color for the document type chip
    const getChipStyles = (type) => {
        switch (type) {
            case "Contract":
                return "text-green-500 bg-green-100";
            case "Check-in Photos":
            case "Check-out Photos":
                return "text-purple-500 bg-purple-100";
            case "Report":
                return "text-red-500 bg-red-100";
            default:
                return "text-gray-500 bg-gray-100";
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            <div className={`p-6 flex flex-col justify-between h-48 ${doc.color}`}>
                <MdOutlineDocumentScanner className="text-white text-5xl" />
                <FaDownload className="text-white text-xl cursor-pointer hover:text-gray-200 transition" />
            </div>
            <div className="p-4 space-y-2">
                <p className="text-sm font-semibold truncate">{doc.title}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getChipStyles(doc.type)}`}>
                    {doc.type}
                </span>
                <p className="text-xs text-gray-500">
                    <span className='font-bold text-black'>Trailer:</span> {doc.trailer}
                </p>
                <p className="text-xs text-gray-500">
                    <span className='font-bold text-black'>Uploaded:</span>{doc.uploaded}
                </p>

                <div className='flex justify-between items-center'>
                    <button
                        onClick={() => onView(doc)}
                        className="mt-2 px-5 text-[#2563EB] border border-blue-600 hover:bg-blue-50 text-sm font-medium py-1 rounded-md transition"
                    >
                        View
                    </button>
                    <HiDownload className='text-[#2563EB]' />

                </div>
            </div>
        </div>
    );
};

// Modal component
const DocumentModal = ({ isOpen, onClose, documentTitle }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-2xl">
                {/* Modal Header */}
                <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold">{documentTitle}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-green-100 text-green-700">
                            Contract
                        </span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <IoClose className="text-xl" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-12 flex flex-col items-center justify-center space-y-6 min-h-[300px]">
                    <MdOutlineDocumentScanner className="text-gray-300 text-7xl" />
                    <p className="text-gray-500">Secure Document Viewer</p>
                    <button className="flex items-center justify-center px-6 py-2 bg-[#2563EB] text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md">
                        <HiDownload className="mr-2" />
                        Download Contract
                    </button>
                </div>
            </div>
        </div >
    );
};

// Main Component
const BuyerDocument = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = (doc) => {
        setSelectedDocument(doc);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedDocument(null);
    };

    // Filter documents based on active tab and search term
    const filteredDocuments = documentsData.filter(doc => {
        const matchesTab = activeTab === 'All' || doc.documentType === activeTab;
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.trailer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const tabs = ['All', 'Contracts', 'Check-in Photos', 'Check-out Photos', 'Reports'];

    return (
        <div className="min-h-screen">
            <div className="">
                {/* Header and Download Button */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Documents</h1>
                    <button className="flex items-center px-4 py-2 bg-[#2563EB] text-white rounded-lg  hover:bg-blue-700 transition">
                        <HiDownload className="mr-2" />
                        Download All (ZIP)
                    </button>
                </div>

                {/* Filtering and Search */}
                <div className="flex justify-between items-center mb-6 pb-4">
                    {/* Tab Navigation (based on first screenshot) */}
                    <div className="flex space-x-6 text-sm font-medium mb-[-0.5rem] border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 border-b-2 transition duration-300 ${activeTab === tab
                                    ? 'border-blue-600 text-[#2563EB]font-semibold'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Search and Calendar (based on second screenshot) */}
                    <div className="flex items-center space-x-3">
                        {/* A simplified search input for the current layout */}
                        <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                            <input
                                type="text"
                                placeholder="Search by trailer name or..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <div className='bg-[#F2F2F2] p-2 rounded-md'>
                            <FaCalendarAlt className="text-gray-500 text-xl cursor-pointer hover:text-[#2563EB]transition" />
                        </div>
                    </div>
                </div>

                {/* Document Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDocuments.length > 0 ? (
                        filteredDocuments.map((doc) => (
                            <DocumentCard key={doc.id} doc={doc} onView={openModal} />
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500 py-10">
                            No documents found matching your criteria.
                        </p>
                    )}
                </div>

                {/* Document Viewer Modal */}
                <DocumentModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    documentTitle={selectedDocument ? `Rental Contract - ${selectedDocument.uploaded.replace('Dec', 'Dec ')}` : ''}
                />
            </div>
        </div>
    );
};

export default BuyerDocument;