"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import GoogleTranslate from "./GoogleTranslate";
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
  const navRef = useRef(null);
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

  useEffect(() => {
    if (!navbarOpen) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavbarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navbarOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-10 mx-auto border border-borderline bg-backdrop bg-opacity-100 px-12 py-3 lg:py-6"
    >
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-8">
        <Link
          href={"#about"}
          className="whitespace-nowrap text-lg font-semibold text-white sm:text-xl lg:text-2xl"
        >
          PROJECT A3
        </Link>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-x-8">
          <ul className="mt-0 hidden items-center md:flex md:gap-8">
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
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <button
                onClick={() => setNavbarOpen(true)}
                className="flex items-center rounded border border-slate-200 px-3 py-2 text-slate-200 hover:border-white hover:text-white"
                aria-expanded={false}
                aria-label="Open menu"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => setNavbarOpen(false)}
                className="flex items-center rounded border border-slate-200 px-3 py-2 text-slate-200 hover:border-white hover:text-white"
                aria-expanded={true}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          {navbarOpen ? (
            <div className="w-full basis-full border-t border-borderline pt-4 md:hidden">
              <MenuOverlay
                links={navLinks}
                getLinkClick={getLinkClick}
                onClick={() => {
                  setNavbarOpen(false);
                }}
              />
            </div>
          ) : null}
          <div
            className={
              navbarOpen
                ? "flex w-full basis-full justify-center pb-2 pt-3 md:w-auto md:basis-auto md:pb-0 md:pt-0"
                : "absolute -left-[9999px] top-0 md:static"
            }
          >
            <GoogleTranslate className={navbarOpen ? "text-xl" : ""} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
