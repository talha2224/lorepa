import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import CustomSwitch from "../../../components/Switch";
import config from "../../../config";
import toast from "react-hot-toast";

const AddTrailerModal = ({ isOpen, onClose, trailerData }) => {
    const [listingEnabled, setListingEnabled] = useState(true);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Utility");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [closedDates, setClosedDates] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [location, setLocation] = useState({ latitude: null, longitude: null, city: "", country: "" });
    const [dailyRate, setDailyRate] = useState(0);
    const [depositRate, setDepositRate] = useState(0);
    const [loading, setLoading] = useState(false);

    const maxDescChars = 300;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysInThisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    useEffect(() => {
        if (trailerData) {
            setTitle(trailerData.title);
            setCategory(trailerData.category);
            setDescription(trailerData.description);
            setExistingImages(trailerData.images || []);
            setClosedDates(trailerData.closedDates || []);
            setLocation({
                latitude: trailerData.latitude,
                longitude: trailerData.longitude,
                city: trailerData.city || "",
                country: trailerData.country || ""
            });
            setDailyRate(trailerData.dailyRate || 0);
            setDepositRate(trailerData.depositRate || 0);
        } else {
            if (!navigator.geolocation) return;
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(prev => ({ ...prev, latitude, longitude }));
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    setLocation(prev => ({
                        ...prev,
                        city: data.address.city || data.address.town || data.address.village || "",
                        country: data.address.country || ""
                    }));
                } catch { }
            });
        }
    }, [trailerData]);

    const goToPrevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
        else setCurrentMonth(currentMonth - 1);
    };
    const goToNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
        else setCurrentMonth(currentMonth + 1);
    };
    const toggleClosed = (day) => {
        const key = `${currentYear}-${currentMonth + 1}-${day}`;
        if (closedDates.includes(key)) setClosedDates(closedDates.filter(d => d !== key));
        else setClosedDates([...closedDates, key]);
    };
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length + existingImages.length > 4) return toast.error("Maximum 4 images allowed.");
        setImages([...images, ...files]);
    };
    const removeImage = (index) => setImages(images.filter((_, i) => i !== index));
    const removeExistingImage = (img) => setExistingImages(existingImages.filter(i => i !== img));

    const handleSubmitTrailer = async () => {
        if (!location.latitude || !location.longitude) return toast.error("Location required.");
        if (!title || !category || !description || (images.length + existingImages.length) === 0) return toast.error("All fields required.");

        const formData = new FormData();
        formData.append("userId", localStorage.getItem("userId"));
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("latitude", location.latitude);
        formData.append("longitude", location.longitude);
        formData.append("city", location.city);
        formData.append("country", location.country);
        formData.append("dailyRate", dailyRate);
        formData.append("depositRate", depositRate);
        formData.append("closedDates", JSON.stringify(closedDates));
        existingImages.forEach(img => formData.append("existingImages[]", img));
        images.forEach(img => formData.append("images", img));

        setLoading(true);
        const toastId = toast.loading(trailerData ? "Updating trailer..." : "Creating trailer...");
        try {
            const url = trailerData ? `${config.baseUrl}/trailer/update/${trailerData._id}` : `${config.baseUrl}/trailer/create`;
            const method = trailerData ? "PUT" : "POST";
            const res = await fetch(url, { method, body: formData });
            const data = await res.json();
            if (res.ok) {
                toast.success(trailerData ? "Trailer updated!" : "Trailer created!", { id: toastId });
                onClose();
            } else toast.error(data.msg || "Operation failed", { id: toastId });
        } catch {
            toast.error("Something went wrong", { id: toastId });
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-y-hidden">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{trailerData ? "Edit Trailer" : "Add New Trailer"}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><FaTimes className="w-5 h-5" /></button>
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 overflow-y-auto">
                    <div className="space-y-6">
                        <div>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Listing Status</label>
                                        <p className="text-xs text-gray-500">Publicly listed and visible for booking.</p>
                                    </div>
                                    <CustomSwitch enabled={listingEnabled} onChange={setListingEnabled} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input type="text" className="block w-full border border-gray-300 rounded-md py-2 px-3 outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select className="block w-full border border-gray-300 rounded-md py-2 px-3 outline-none" value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {["Utility", "Enclosed", "Flatbed", "Dump", "Boat"].map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description (max {maxDescChars} chars)</label>
                                    <textarea rows="4" className="block w-full border border-gray-300 rounded-md py-2 px-3 outline-none resize-none" value={description} onChange={(e) => setDescription(e.target.value.slice(0, maxDescChars))} />
                                    <p className="text-xs text-gray-500 text-right">{description.length}/{maxDescChars}</p>
                                </div>
                                {location.city && location.country && <p className="text-sm text-gray-600 mt-2">Location: {location.city}, {location.country}</p>}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price per day ($)</label>
                                        <input type="number" value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} className="w-full border border-gray-300 rounded-md py-2 px-3 outline-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Photos</h3>
                            <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer block transition">
                                <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">Upload Image</p>
                                <p className="text-xs text-gray-500">Recommended 3–4 high-quality photos</p>
                                <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                            </label>
                            {(existingImages.length + images.length) > 0 && (
                                <div className="grid grid-cols-4 gap-3 mt-3">
                                    {existingImages.map((img, idx) => <div key={idx} className="relative"><img src={img} className="h-20 w-full object-cover rounded" /><button onClick={() => removeExistingImage(img)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"><FaTimes size={12} /></button></div>)}
                                    {images.map((img, idx) => <div key={idx} className="relative"><img src={URL.createObjectURL(img)} className="h-20 w-full object-cover rounded" /><button onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1"><FaTimes size={12} /></button></div>)}
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Closed Dates</h3>
                            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <button onClick={goToPrevMonth} className="p-2 rounded-full hover:bg-gray-200"><FaChevronLeft /></button>
                                    <span className="font-semibold text-gray-800">{monthNames[currentMonth]} {currentYear}</span>
                                    <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-200"><FaChevronRight /></button>
                                </div>
                                <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d}>{d}</div>)}</div>
                                <div className="grid grid-cols-7 gap-1 text-sm">
                                    {[...Array(firstDayOfMonth)].map((_, i) => <div key={i} className="p-2"></div>)}
                                    {[...Array(daysInThisMonth)].map((_, i) => {
                                        const day = i + 1;
                                        const dateKey = `${currentYear}-${currentMonth + 1}-${day}`;
                                        const isClosed = closedDates.includes(dateKey);
                                        return <div key={day} onClick={() => toggleClosed(day)} className={`p-2 text-center rounded-lg cursor-pointer transition ${isClosed ? "bg-red-300 text-red-900" : "bg-green-200 text-green-800"}`}>{day}</div>
                                    })}
                                </div>
                                <p className="text-xs text-gray-500 mt-4 text-center">Click a date to mark it as <span className="text-red-600 font-semibold">Closed</span>.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 mr-3 hover:bg-gray-50">Cancel</button>
                    <button disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-md" onClick={handleSubmitTrailer}>{loading ? "Saving..." : "Save Trailer"}</button>
                </div>
            </div>
        </div>
    );
};

export default AddTrailerModal;
