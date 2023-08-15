"use client";

import Link from "next/link";
import variables from "../../styles/variables.module.scss";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Popover } from "@headlessui/react";
import { HiBars3 } from "react-icons/hi2";
import { HiXMark } from "react-icons/hi2";
import { BiUpArrowAlt } from "react-icons/bi";

const Header = ({ onSearch, handleMdlOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleModal = () => {
    handleMdlOpen(true);
  };

  function handleScroll() {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function handleClick() {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  return (
    <>
      {isVisible && (
        <button
          className="fixed bottom-10 right-10 backdrop-blur-2xl bg-slate-700/20 text-white rounded-full p-3 text-lg shadow-lg focus:outline-none border border-slate-700 hover:bg-gray-700 z-50 hover:shadow-xl hover:shadow-[#23ba9e]"
          onClick={handleClick}
        >
          <BiUpArrowAlt className="to-top-arrow text-lg font-lg" />
        </button>
      )}
      <div className="header sticky top-0 mx-0 left-0 w-full backdrop-blur-2xl bg-slate-700/20 border-b-2 border-slate-700  z-50 ">
        <Popover className="container mx-auto flex   items-center sm:justify-between  px-6 py-1 h-20">
          <div className="flex items-center gap-3">
            <div className="bg-slate-700 font-bold text-xl w-7 h-7 rounded-md flex justify-center items-center text-white">
              F
            </div>
            <h1 className="font-bold text-white text-lg">
              <Link href="/">Faruq Blog</Link>
            </h1>
          </div>
          <div className="grow ">
            <div className="hidden lg:flex items-center justify-center gap-2 md:gap-8 text-white">
              <Link href="ui-design">UI-design</Link>
              <Link href="front-end">Front-end</Link>
              <Link href="back-end">Back-end</Link>
              <Link href="about">About</Link>
              <Link href="contact">Contact</Link>
            </div>
          </div>

          <div className="flex grow items-center justify-end sm:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <HiBars3 className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <Popover.Overlay className="fixed inset-0  backdrop-blur-2xl bg-slate-700/20 " />

          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="rounded-lg bg-[#4B5563] shadow-lg ring-1 ring-black ring-opacity-5 divide-y-q divide-gray-50">
              <div className="px-5 pt-5 pb-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-700 font-bold text-xl w-7 h-7 rounded-md flex justify-center items-center text-white">
                      F
                    </div>
                    <h1 className="font-bold text-white text-lg">
                      <Link href="/">Faruq Blog</Link>
                    </h1>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-[#4B5563] p-2 text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <HiXMark className="h-6 w-6 " aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-6">
                    <Link
                      href="ui-design"
                      className=" focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                    >
                      UI-design
                    </Link>
                    <Link
                      href="front-end"
                      className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                    >
                      Front-end
                    </Link>
                    <Link
                      href="back-end"
                      className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                    >
                      Back-end
                    </Link>
                    <Link
                      href="about"
                      className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                    >
                      About
                    </Link>
                    <Link
                      href="contact"
                      className="focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 px-2"
                    >
                      Contact
                    </Link>
                  </nav>
                </div>
                <div
                  className={`${variables.header_search} mt-6 flex text-white items-center gap-2  rounded-full  px-2 py-1`}
                >
                  <FiSearch />
                  <input
                    type="text"
                    className="bg-transparent px-3 w-full"
                    placeholder="search..."
                  />
                </div>
              </div>
            </div>
          </Popover.Panel>

          <div className="header-search hidden sm:block text-white items-center gap-2  rounded  px-2 py-1">
            <div
              className={`${variables.header_search}  flex text-white items-center gap-2  rounded  px-2 py-1`}
            >
              <FiSearch onClick={handleSearch} />
              <div
                onClick={handleModal}
                className="bg-transparent px-8 cursor-pointer text-[#687383] text-sm"
              >
                Quick search...
              </div>
            </div>
          </div>
        </Popover>
      </div>
    </>
  );
};

export default Header;
