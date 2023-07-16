import React from "react";
import Link from "next/link";
import varaibles from "../styles/variables.module.scss";

const Footer = () => {
  return (
    <footer
      className={`${varaibles.footer} bg-transparent border-t-2 border-slate-700 text-gray-300 py-8 relative mx-auto  flex items-center justify-center`}
    >
      <div className="text-center text-slate-400">
        copyright &copy; all reights reserved |{" "}
        <Link href="/" className="text-[#23ba9e]">
          Faruq Blog 2023
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
