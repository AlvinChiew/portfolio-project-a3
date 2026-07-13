'use client';
import React, { useState } from 'react';
import MailIcon from '../../public/mail-icon.svg';
import DiscordIcon from '../../public/discord-icon.svg';
import PortfolioIcon from '../../public/portfolio-icon.svg';
import Link from 'next/link';
import Image from 'next/image';

const icons = [
  {
    name: 'Discord',
    href: 'https://discord.gg/4am6RhC2mx',
    src: DiscordIcon,
  },
  {
    name: 'Mail',
    href: 'mailto:contact@alvinchiew.com',
    src: MailIcon,
  },
  {
    name: 'Portfolio',
    href: 'https://alvinchiew.com',
    src: PortfolioIcon,
  },
];

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = '/api/send';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    if (response.status === 200) {
      console.log('Message sent.');
      setEmailSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="relative grid gap-4 py-36 md:grid-cols-2 md:py-28"
    >
      <div className="-translate-1/2 absolute -left-4 top-3/4 z-0 h-80 w-80 -translate-x-1/2 transform rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent blur-lg"></div>
      <div className="z-10">
        <h5 className="my-2 text-xl font-bold text-white">
          Let&apos;s Connect
        </h5>
        <p className="mb-4 max-w-md text-justify text-secondaryText">
          {' '}
          We are actively looking for business and partnership opportunities.
          Our inbox is always open, whether you have a question or just want to
          say hi. I&apos;ll get back to you soon!
        </p>
        <div className="socials flex flex-row gap-2">
          {icons.map(({ name, href, src }, index) => (
            <Link href={href} target="_blank" key={index}>
              <div className="flex items-center justify-center h-12 w-12">
                <Image
                  className="hover:animate-ping-custom rounded-full transition duration-500"
                  src={src}
                  alt={name}
                  width={40}
                  height={40}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="mt-2 text-sm text-green-300">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="john.doe@email.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-white"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-white"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-500 px-5 py-2.5 font-medium text-white hover:bg-primary-600"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
