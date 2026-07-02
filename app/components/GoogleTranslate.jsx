"use client";

import { useEffect } from "react";
import { LanguageIcon } from "@heroicons/react/24/outline";

const CONTAINER_ID = "google_translate_element";
const SCRIPT_ID = "google-translate-script";

let translateInitialized = false;

const GoogleTranslate = ({ className = "" }) => {
  useEffect(() => {
    let retryTimer;

    const initTranslate = () => {
      if (translateInitialized) {
        return true;
      }

      const container = document.getElementById(CONTAINER_ID);
      if (!container || !window.google?.translate?.TranslateElement) {
        return false;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        CONTAINER_ID
      );
      translateInitialized = true;
      return true;
    };

    const scheduleInit = () => {
      if (initTranslate()) {
        return;
      }

      retryTimer = window.setInterval(() => {
        if (initTranslate()) {
          window.clearInterval(retryTimer);
        }
      }, 200);
    };

    window.googleTranslateElementInit = scheduleInit;

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      scheduleInit();
    }

    return () => {
      if (retryTimer) {
        window.clearInterval(retryTimer);
      }
    };
  }, []);

  return (
    <div
      className={`google-translate-wrapper notranslate group relative flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center text-secondaryText transition-colors hover:text-white ${className}`}
      aria-label="Translate page"
    >
      <LanguageIcon
        className="pointer-events-none h-5 w-5 shrink-0"
        aria-hidden="true"
      />
      <div
        id={CONTAINER_ID}
        className="absolute inset-0 overflow-hidden opacity-0"
        aria-hidden="true"
      />
    </div>
  );
};

export default GoogleTranslate;
