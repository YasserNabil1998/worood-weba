"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useNotification } from "@/components/NotificationSystem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import profileData from "./profile-data.json";

type UserData = {
    name: string;
    email: string;
    phone: string;
    profileImage: string | null;
    gender: string;
    address: string;
    joinDate: string;
    totalOrders: number;
    totalSpent: number;
};

const initialUserData: UserData = profileData.userData;

export default function ProfilePage() {
    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(userData);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { showNotification } = useNotification();

    const handleEdit = () => {
        setEditData(userData);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setEditData(userData);
        setIsEditing(false);
    };

    const handleSave = async () => {
        // Validate email
        if (!isValidEmail(editData.email)) {
            showNotification("يرجى إدخال بريد إلكتروني صحيح", "error");
            return;
        }

        // Validate phone
        if (!isValidPhone(editData.phone)) {
            showNotification("يرجى إدخال رقم هاتف صحيح (10-15 رقم)", "error");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setUserData(editData);
        setIsEditing(false);
        setIsLoading(false);

        showNotification("تم حفظ البيانات بنجاح!", "success");
    };

    const handleInputChange = (field: string, value: string) => {
        // Format phone number input - let user control + sign
        if (field === "phone") {
            // Remove all non-numeric characters and + sign for processing
            const cleanValue = value.replace(/[^\d+]/g, "");

            if (cleanValue.length > 15) {
                value = cleanValue.substring(0, 15);
            } else {
                value = cleanValue;
            }
        }

        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setEditData((prev) => ({
                    ...prev,
                    profileImage: e.target?.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Validation functions
    const isValidEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhone = (phone: string) => {
        // Remove all non-numeric characters
        const cleanPhone = phone.replace(/[^\d]/g, "");

        // Accept phone numbers with 10-15 digits
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3E6D8] via-[#D1D6C4] to-[#C5C9B8]">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto">
                    {/* Profile Header */}
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Profile Image */}
                            <div className="relative">
                                {isEditing ? (
                                    <div className="relative">
                                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#5A5E4D]">
                                            {editData.profileImage ? (
                                                <Image
                                                    src={editData.profileImage}
                                                    alt="Profile"
                                                    width={128}
                                                    height={128}
                                                    className="object-cover"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-[#5A5E4D] flex items-center justify-center">
                                                    <span
                                                        className="text-white text-4xl font-bold"
                                                        style={{
                                                            fontFamily:
                                                                "var(--font-almarai)",
                                                        }}
                                                    >
                                                        {editData.name.charAt(
                                                            0
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <label className="absolute bottom-0 right-0 bg-[#5A5E4D] text-white p-2 rounded-full cursor-pointer hover:bg-[#4A4E3D] transition-colors">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                />
                                            </svg>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#5A5E4D]">
                                        {userData.profileImage ? (
                                            <Image
                                                src={userData.profileImage}
                                                alt="Profile"
                                                width={128}
                                                height={128}
                                                className="object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-[#5A5E4D] flex items-center justify-center">
                                                <span
                                                    className="text-white text-4xl font-bold"
                                                    style={{
                                                        fontFamily:
                                                            "var(--font-almarai)",
                                                    }}
                                                >
                                                    {userData.name.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-right">
                                <h1
                                    className="text-3xl font-bold text-[#5A5E4D] mb-2"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {userData.name}
                                </h1>
                                <p
                                    className="text-gray-600 mb-1"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {userData.email}
                                </p>
                                <p
                                    className="text-gray-600 mb-1"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {userData.phone}
                                </p>
                                <p
                                    className="text-gray-600 mb-1"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {userData.gender}
                                </p>
                                <p
                                    className="text-gray-600 mb-4 text-sm"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    {userData.address}
                                </p>
                            </div>

                            {/* Edit Button */}
                            <div className="flex gap-2">
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="bg-gradient-to-r from-[#5A5E4D] to-[#4A4E3D] text-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-3 font-semibold"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                        تعديل البيانات
                                    </button>
                                ) : (
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleCancel}
                                            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            إلغاء
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            disabled={isLoading}
                                            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-semibold"
                                            style={{
                                                fontFamily:
                                                    "var(--font-almarai)",
                                            }}
                                        >
                                            {isLoading ? (
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                            حفظ التغييرات
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2
                            className="text-2xl font-bold text-[#5A5E4D] mb-6"
                            style={{ fontFamily: "var(--font-almarai)" }}
                        >
                            تفاصيل الملف الشخصي
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name Field */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label
                                    className="block text-base font-bold text-[#5A5E4D] mb-2"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    الاسم الكامل
                                </label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-lg"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    />
                                ) : (
                                    <p
                                        className="text-gray-900 py-3 text-base font-medium"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {userData.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label
                                    className="block text-base font-bold text-[#5A5E4D] mb-2"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    البريد الإلكتروني
                                </label>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={editData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-lg ${
                                            editData.email &&
                                            !isValidEmail(editData.email)
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                        placeholder="example@email.com"
                                    />
                                ) : (
                                    <p
                                        className="text-gray-900 py-3 text-base font-medium"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {userData.email}
                                    </p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label
                                    className="block text-base font-bold text-[#5A5E4D] mb-2"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    رقم الهاتف
                                </label>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={editData.phone}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "phone",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none text-lg ${
                                            editData.phone &&
                                            !isValidPhone(editData.phone)
                                                ? "border-red-500 bg-red-50"
                                                : "border-gray-300"
                                        }`}
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                        placeholder="رقم الهاتف (10-15 رقم)"
                                        maxLength={15}
                                        pattern="[\d+]{10,15}"
                                        inputMode="tel"
                                    />
                                ) : (
                                    <p
                                        className="text-gray-900 py-3 text-base font-medium"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {userData.phone}
                                    </p>
                                )}
                            </div>

                            {/* Gender Field */}
                            <div className="border border-gray-200 rounded-lg p-4">
                                <label
                                    className="block text-base font-bold text-[#5A5E4D] mb-2"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    الجنس
                                </label>
                                {isEditing ? (
                                    <select
                                        value={editData.gender}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "gender",
                                                e.target.value
                                            )
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none text-lg"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        <option value="ذكر">ذكر</option>
                                        <option value="أنثى">أنثى</option>
                                    </select>
                                ) : (
                                    <p
                                        className="text-gray-900 py-3 text-base font-medium"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {userData.gender}
                                    </p>
                                )}
                            </div>

                            {/* Address Field */}
                            <div className="border border-gray-200 rounded-lg p-4 md:col-span-2">
                                <label
                                    className="block text-base font-bold text-[#5A5E4D] mb-2"
                                    style={{
                                        fontFamily: "var(--font-almarai)",
                                    }}
                                >
                                    العنوان
                                </label>
                                {isEditing ? (
                                    <textarea
                                        value={editData.address}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "address",
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none resize-none text-lg"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    />
                                ) : (
                                    <p
                                        className="text-gray-900 py-3 text-base font-medium"
                                        style={{
                                            fontFamily: "var(--font-almarai)",
                                        }}
                                    >
                                        {userData.address}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link
                            href="/orders"
                            className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#5A5E4D]/20"
                        >
                            <div className="w-14 h-14 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="font-bold text-gray-800 mb-2 text-lg group-hover:text-[#5A5E4D] transition-colors duration-300"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                طلباتي
                            </h3>
                            <p
                                className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                عرض جميع طلباتي
                            </p>
                        </Link>

                        <Link
                            href="/favorites"
                            className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#5A5E4D]/20"
                        >
                            <div className="w-14 h-14 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="font-bold text-gray-800 mb-2 text-lg group-hover:text-[#5A5E4D] transition-colors duration-300"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                المفضلة
                            </h3>
                            <p
                                className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                المنتجات المفضلة لديك
                            </p>
                        </Link>

                        <Link
                            href="/contact"
                            className="group bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#5A5E4D]/20"
                        >
                            <div className="w-14 h-14 bg-[#5A5E4D] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <svg
                                    className="w-7 h-7 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3
                                className="font-bold text-gray-800 mb-2 text-lg group-hover:text-[#5A5E4D] transition-colors duration-300"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                تواصل معنا
                            </h3>
                            <p
                                className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                                style={{ fontFamily: "var(--font-almarai)" }}
                            >
                                مركز المساعدة والدعم
                            </p>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
