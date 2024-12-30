import { ChevronDown, ChevronUp, Globe, IndianRupee } from "lucide-react";
import { useState } from "react";

const EventDetail = ({amount}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="w-full transform transition-all duration-300 hover:scale-[1.01]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-[#060C1C] rounded-xl border border-blue-400/20 shadow-lg hover:border-blue-400/40 transition-all">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors group"
        >
          <span className="text-orange-400 group-hover:text-orange-300 font-semibold text-lg">
            Event Details
          </span>
          {showDetails ? (
            <ChevronUp className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
          ) : (
            <ChevronDown className="w-5 h-5 text-orange-400 group-hover:text-orange-300" />
          )}
        </button>

        <div className="flex flex-col items-end gap-3">
          <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-lg">
            <IndianRupee className="w-4 h-4 text-green-400" />
            <span className="text-white font-medium">
              {amount}/- <span className="text-gray-400">National Entries</span>
            </span>
          </div>

          <div className="flex items-center gap-2 bg-gray-800/30 px-4 py-2 rounded-lg">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-white font-medium">
              Free <span className="text-gray-400">International Entries</span>
            </span>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-2 p-6 bg-gray-800/50 rounded-xl border border-gray-700 animate-fadeIn">
          <p className="text-gray-300">Event details content goes here...</p>
        </div>
      )}
    </div>
  );
};

export default EventDetail;