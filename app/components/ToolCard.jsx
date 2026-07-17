import React from 'react';
import {
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

const ToolCard = ({
  id,
  logo,
  name,
  description,
  githubUrl,
  downloadUrl,
  releasesUrl,
  videoUrl,
  status,
}) => {
  const isAvailable = status === 'available';
  const effectiveDownloadUrl = downloadUrl || releasesUrl;

  return (
    <div
      className={`group/card overflow-hidden rounded-xl border border-borderline bg-secondaryBackdrop shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-a3Accent/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_32px_rgba(97,230,146,0.12)] ${
        status === 'coming-soon' ? 'opacity-60' : ''
      }`}
    >
      <div
        className={`group relative flex h-52 items-center justify-center md:h-72 ${
          isAvailable ? 'bg-a3Navy' : 'bg-secondaryBackdrop'
        }`}
      >
        {logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            width={256}
            height={256}
            className="h-36 w-36 rounded-2xl object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover/card:scale-105 group-hover/card:drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] group-hover/card:drop-shadow-[0_12px_32px_rgba(97,230,146,0.2)] md:h-48 md:w-48"
          />
        ) : (
          <span className="text-secondaryText">Coming soon</span>
        )}
        {isAvailable && (
          <div className="overlay absolute left-0 top-0 hidden h-full w-full items-center justify-center gap-8 bg-secondaryBackdrop bg-opacity-0 transition-all duration-500 group-hover:flex group-hover:bg-opacity-80">
            {githubUrl && (
              <Link
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative h-20 w-20 rounded-full border-[3px] border-secondaryText transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/30 hover:shadow-xl hover:shadow-white/30"
                title="View on GitHub"
              >
                <DocumentTextIcon className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer stroke-[1.5] text-secondaryText transition-all duration-300 group-hover/link:animate-pulse group-hover/link:text-white" />
              </Link>
            )}
            {videoUrl && (
              <Link
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative h-20 w-20 rounded-full border-[3px] border-secondaryText transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/30 hover:shadow-xl hover:shadow-white/30"
                title="Watch video"
              >
                <EyeIcon className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer stroke-[1.5] text-secondaryText transition-all duration-300 group-hover/link:animate-pulse group-hover/link:text-white" />
              </Link>
            )}
            {effectiveDownloadUrl && (
              <Link
                href={effectiveDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link relative h-20 w-20 rounded-full border-[3px] border-secondaryText transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/30 hover:shadow-xl hover:shadow-white/30"
                title="Download"
              >
                <ArrowDownTrayIcon className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer stroke-[1.5] text-secondaryText transition-all duration-300 group-hover/link:animate-pulse group-hover/link:text-white" />
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="px-4 py-6 text-white">
        <h5 className="mb-2 text-center text-xl font-semibold">
          {name}
          {id && (
            <span className="m-2 align-middle text-xs font-medium uppercase tracking-wide text-a3Accent">
              {id}
            </span>
          )}
        </h5>
        <p className="text-secondaryText">{description}</p>
      </div>
    </div>
  );
};

export default ToolCard;
