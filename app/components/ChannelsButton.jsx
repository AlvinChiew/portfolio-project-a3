'use client';
import { useEffect, useState } from 'react';
import {
  FaYoutube,
  FaInstagram,
  FaLinkedin,
  FaFacebook,
  FaDiscord,
} from 'react-icons/fa';
import { SiXiaohongshu } from 'react-icons/si';

const channels = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@project-a3',
    Icon: FaYoutube,
  },
  {
    name: 'RedNote',
    href: 'https://www.xiaohongshu.com/user/profile/project-a3',
    Icon: SiXiaohongshu,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/projecta3',
    Icon: FaInstagram,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/project-a3',
    Icon: FaLinkedin,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/projecta3',
    Icon: FaFacebook,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/4am6RhC2mx',
    Icon: FaDiscord,
  },
];

const ChannelsButton = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="rounded-full border border-borderline px-6 py-3 text-white hover:border-a3Accent hover:text-a3Accent"
      >
        Channels
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Channels"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-2xl border border-borderline bg-secondaryBackdrop p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)] md:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-4 top-4 text-2xl leading-none text-secondaryText transition-colors duration-300 hover:text-a3Accent"
            >
              &times;
            </button>

            <h3 className="mb-8 text-center text-2xl font-bold text-white">
              Follow Project A3
            </h3>

            <div className="flex flex-wrap items-start justify-center gap-6 md:gap-8">
              {channels.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex flex-col items-center gap-3"
                >
                  <span className="hover:animate-ping-custom relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-secondaryText transition-all duration-300 group-hover/link:scale-110 group-hover/link:border-white group-hover/link:bg-white/20 group-hover/link:shadow-xl group-hover/link:shadow-white/20 md:h-24 md:w-24">
                    <Icon className="h-9 w-9 text-secondaryText transition-colors duration-300 group-hover/link:animate-pulse group-hover/link:text-white md:h-11 md:w-11" />
                  </span>
                  <span className="text-sm font-medium text-secondaryText transition-colors duration-300 group-hover/link:text-a3Accent">
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelsButton;
