import React, { useState, useEffect } from 'react'
import { FaDollarSign, FaCalendarAlt, FaDownload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { IoFunnelOutline, IoShareOutline } from 'react-icons/io5'
import { FiClock } from 'react-icons/fi'
import axios from 'axios'
import config from '../../../config'
import pdfMake from "pdfmake/build/pdfmake";

const STATUS_MAP = {
    paid: { color: 'bg-green-100 text-green-700', icon: FaCheckCircle },
    pending: { color: 'bg-yellow-100 text-yellow-700', icon: FiClock },
    failed: { color: 'bg-red-100 text-red-700', icon: FaTimesCircle },
    default: { color: 'bg-gray-100 text-gray-700', icon: FaCheckCircle },
}

const StatusChip = ({ status }) => {
    const { color, icon: Icon } = STATUS_MAP[status.toLowerCase()] || STATUS_MAP.default
    return (
        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${color}`}>
            <Icon className="mr-1 h-3 w-3" />
            {status}
        </span>
    )
}

const MetricCard = ({ icon: Icon, title, value, subtext, iconBgColor, valueColor }) => (
    <div className="flex flex-col p-6 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
        <div className={`p-3 rounded-full ${iconBgColor}`}>
            <Icon className={`w-6 h-6 ${valueColor}`} />
        </div>
        <p className="mt-4 text-sm text-gray-500 font-medium">{title}</p>
        <div className="flex items-baseline mt-1">
            <h2 className="text-3xl font-bold">{value}</h2>
            {subtext && <p className="ml-2 text-xs text-green-500 font-semibold">{subtext}</p>}
        </div>
    </div>
)

const EarningsDashboard = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) return
        const fetchTransactions = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`${config.baseUrl}/transaction/user/${userId}`)
                setTransactions(
                    res.data.data.map((t) => ({
                        ...t,
                        date: new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        transactor: 'User',
                        fee: 0,
                        feeSource: 'Stripe',
                        receipt: t.status.toLowerCase() === 'paid',
                    }))
                )
            } catch (err) {
                console.error('Error fetching transactions:', err)
            } finally {
                setLoading(false)
            }
        }
        fetchTransactions()
    }, [])

    const generatePDF = (singleTransaction = null) => {
        const tableBody = [
            ["Date", "Transactor", "Amount", "Fee", "Status"]
        ];

        if (singleTransaction) {
            tableBody.push([
                singleTransaction.date,
                singleTransaction.transactor,
                `$${singleTransaction.amount.toFixed(2)}`,
                `$${singleTransaction.fee.toFixed(2)}`,
                singleTransaction.status,
            ]);
        } else {
            transactions.forEach(t => {
                tableBody.push([
                    t.date,
                    t.transactor,
                    `$${t.amount.toFixed(2)}`,
                    `$${t.fee.toFixed(2)}`,
                    t.status,
                ]);
            });
        }

        const docDefinition = {
            content: [
                { text: 'LOREPA - Transaction Report', fontSize: 18, margin: [0, 0, 0, 10] },
                { text: `Generated on: ${new Date().toLocaleString()}`, fontSize: 12, margin: [0, 0, 0, 20] },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*', '*'],
                        body: tableBody,
                    },
                    layout: 'lightHorizontalLines'
                }
            ],
            defaultStyle: {
                fontSize: 10
            }
        };

        pdfMake.createPdf(docDefinition).download(
            singleTransaction ? `transaction_${singleTransaction.date}.pdf` : "transaction_report.pdf"
        );
    };

    return (
        <div>
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">Earnings & Payouts</h1>
                <button
                    onClick={() => generatePDF()}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                    <FaDownload className="w-4 h-4 mr-2" />
                    Download Report PDF
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard
                    icon={FaDollarSign}
                    title="This Month's Revenue"
                    value={`$${transactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}`}
                    subtext="vs last month +12%"
                    iconBgColor="bg-green-100"
                    valueColor="text-green-600"
                />
                <MetricCard
                    icon={FaCalendarAlt}
                    title="Pending Payouts"
                    value={`$${transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0).toFixed(2)}`}
                    subtext="Next payout due in 3 days"
                    iconBgColor="bg-yellow-100"
                    valueColor="text-yellow-600"
                />
                <MetricCard
                    icon={IoFunnelOutline}
                    title="Transaction Fees & Service Charges"
                    value="$0"
                    subtext="Total Fees Deducted (YTD)"
                    iconBgColor="bg-blue-100"
                    valueColor="text-blue-600"
                />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Payout Transaction History</h2>
                </div>

                {loading ? (
                    <p className="text-gray-500 text-center py-10">Loading transactions...</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="w-12 px-2 py-3 text-left text-xs font-medium text-gray-500">
                                        <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                    </th>
                                    {['DATE', 'NAME OF TRANSACTOR', 'AMOUNT', 'STATUS', 'RECEIPT'].map((h) => (
                                        <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {transactions.map((t, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-2 py-4">
                                            <input type="checkbox" className="h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{t.date}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.transactor}</td>
                                        <td className="px-6 py-4 text-sm font-semibold">${t.amount.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <StatusChip status={t.status} />
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {t.receipt ? (
                                                <FaDownload
                                                    onClick={() => generatePDF(t)}
                                                    className="w-4 h-4 text-indigo-500 cursor-pointer hover:text-indigo-700"
                                                />
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EarningsDashboard
