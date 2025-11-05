import React from "react";
import { FaClipboardList, FaSpinner, FaCheckCircle, FaBullhorn } from "react-icons/fa";

const icons = {
  FaClipboardList: <FaClipboardList className="text-indigo-500 text-3xl" />,
  FaSpinner: <FaSpinner className="text-blue-500 text-3xl animate-spin-slow" />,
  FaCheckCircle: <FaCheckCircle className="text-green-500 text-3xl" />,
  FaBullhorn: <FaBullhorn className="text-amber-500 text-3xl" />,
};

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5 w-full sm:w-[230px] border border-gray-100 hover:shadow-md transition-all">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-2xl font-semibold text-gray-800">{value}</span>
      </div>
      <div className="bg-indigo-50 p-3 rounded-xl">{icons[icon]}</div>
    </div>
  );
}
