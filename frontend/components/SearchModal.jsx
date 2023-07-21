import React from "react";

function SearchModal(props) {
  const { isOpen, onClose, children } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-50 inset-0">
      <div className="flex items-center justify-center">
        <div className="fixed inset-0 backdrop-blur-xl bg-slate-700/40"></div>
        <div className="bg-[#0f172a] rounded-[1rem] p-6 relative w-full lg:w-[1200px] mt-[6rem]">
          <div className="max-h-[600px] overflow-y-scroll">
          <div>{children}</div>
            {/* Add a specific height and overflow property to the container element */}
            {/* Content goes here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
