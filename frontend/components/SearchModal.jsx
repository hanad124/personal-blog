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
          <div>{children}</div>
          <div className="max-h-[400px] overflow-y-scroll">
            {/* Add a specific height and overflow property to the container element */}
            {/* Content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
