"use client";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { useSignUpModal } from "./SignUpModalProvider";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Tools",
    path: "#tools",
  },
  {
    title: "Activation Code",
    path: "#signup",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { openSignUpModal } = useSignUpModal();

  const getLinkClick = (path) => {
    if (path !== "#signup") {
      return undefined;
    }

    return (e) => {
      e.preventDefault();
      openSignUpModal();
      setNavbarOpen(false);
    };
  };

  return (
    <nav className="bg-backdrop border-borderline fixed left-0 right-0 top-0 z-10 mx-auto border bg-opacity-100 px-12 py-3 lg:py-6">
      <div className="container mx-auto flex flex-nowrap items-center justify-between gap-8 ">
        <Link
          href={"#about"}
          className="whitespace-nowrap text-lg font-semibold text-white sm:text-xl lg:text-2xl"
        >
          PROJECT A3
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center rounded border border-slate-200 px-3 py-2 text-slate-200 hover:border-white hover:text-white"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center rounded border border-slate-200 px-3 py-2 text-slate-200 hover:border-white hover:text-white"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="mt-0 flex p-4 md:flex-row md:space-x-8 md:p-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  href={link.path}
                  title={link.title}
                  onClick={getLinkClick(link.path)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <MenuOverlay
          links={navLinks}
          getLinkClick={getLinkClick}
          onClick={() => {
            setNavbarOpen(false);
          }}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
