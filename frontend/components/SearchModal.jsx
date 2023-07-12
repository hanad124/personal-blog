import React from "react";

function SearchModal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0">
      <div className="flex items-center justify-center lg:h-[13rem] mx:h-[13rem]">
        <div className="fixed inset-0 backdrop-blur-xl bg-slate-700/40"></div>
        <div className="bg-[#0f172a] rounded-[1rem] p-6 relative w-full lg:w-[1200px] mt-[15rem]">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 p-2 text-red-500 hover:text-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
