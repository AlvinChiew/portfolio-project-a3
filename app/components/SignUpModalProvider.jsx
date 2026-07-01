"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SignUpModal from "./SignUpModal";

const SignUpModalContext = createContext(null);

export const useSignUpModal = () => {
  const context = useContext(SignUpModalContext);
  if (!context) {
    throw new Error("useSignUpModal must be used within SignUpModalProvider");
  }
  return context;
};

const clearSignupHash = () => {
  if (window.location.hash === "#signup") {
    window.history.pushState(null, "", window.location.pathname);
  }
};

const SignUpModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSignUpModal = useCallback(() => {
    window.history.pushState(null, "", "#signup");
    setIsOpen(true);
  }, []);

  const closeSignUpModal = useCallback(() => {
    clearSignupHash();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const openIfSignupHash = () => {
      if (window.location.hash === "#signup") {
        setIsOpen(true);
      }
    };

    openIfSignupHash();
    window.addEventListener("hashchange", openIfSignupHash);
    return () => window.removeEventListener("hashchange", openIfSignupHash);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeSignUpModal();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeSignUpModal]);

  return (
    <SignUpModalContext.Provider value={{ openSignUpModal, closeSignUpModal }}>
      {children}
      <SignUpModal isOpen={isOpen} onClose={closeSignUpModal} />
    </SignUpModalContext.Provider>
  );
};

export default SignUpModalProvider;
