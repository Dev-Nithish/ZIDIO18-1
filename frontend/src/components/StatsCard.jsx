import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatsCard = ({ title, value, change, positive }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow-md">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-2xl font-semibold mt-1">{value}</p>
      <div
        className={`flex items-center text-sm mt-1 ${
          positive ? "text-green-400" : "text-red-400"
        }`}
      >
        {positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span className="ml-1">{change} from last month</span>
      </div>
    </div>
  );
};

export default StatsCard;
