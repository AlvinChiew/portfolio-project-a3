'use client';
import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import {
  BLOCKED_SIGNUP_EMAIL_MESSAGE,
  isBlockedSignupEmail,
} from '../lib/signupValidation';

const SignUpModal = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const companySize = e.target.company_size.value.trim();
    const email = e.target.email.value.trim();

    if (!/^\d+$/.test(companySize) || Number(companySize) < 1) {
      setError('Company size must be a whole number.');
      return;
    }

    if (isBlockedSignupEmail(email)) {
      setError(BLOCKED_SIGNUP_EMAIL_MESSAGE);
      return;
    }

    const data = {
      name: e.target.name.value,
      email,
      website: e.target.website.value,
      job_role: e.target.job_role.value,
      company: e.target.company.value,
      company_size: companySize,
      industry: e.target.industry.value,
      sourced_from: e.target.sourced_from.value,
    };

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.status === 200) {
      setSubmitted(true);
      return;
    }

    setError(result.error || 'Something went wrong. Please try again.');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-modal-title"
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border border-borderline bg-secondaryBackdrop p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded p-1 text-secondaryText hover:text-white"
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <h2
          id="signup-modal-title"
          className="mb-6 pr-8 text-xl font-bold text-white"
        >
          Get free activation code
        </h2>

        {submitted ? (
          <p className="text-sm text-green-300">
            Thanks — your free activation code is on its way. Check your inbox
            soon.
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div
              className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="signup-website">Website</label>
              <input
                name="website"
                type="text"
                id="signup-website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signup-name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                id="signup-name"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="Your name"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-medium text-white"
              >
                Business email
              </label>
              <input
                name="email"
                type="email"
                id="signup-email"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="you@company.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signup-job-role"
                className="mb-2 block text-sm font-medium text-white"
              >
                Job role
              </label>
              <input
                name="job_role"
                type="text"
                id="signup-job-role"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signup-company"
                className="mb-2 block text-sm font-medium text-white"
              >
                Company
              </label>
              <input
                name="company"
                type="text"
                id="signup-company"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="Your company"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signup-company-size"
                className="mb-2 block text-sm font-medium text-white"
              >
                Company size
              </label>
              <input
                name="company_size"
                type="number"
                id="signup-company-size"
                min="1"
                step="1"
                inputMode="numeric"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="e.g. 10"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signup-industry"
                className="mb-2 block text-sm font-medium text-white"
              >
                Industry
              </label>
              <input
                name="industry"
                type="text"
                id="signup-industry"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="e.g. Real estate, SaaS, Retail"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="signup-sourced-from"
                className="mb-2 block text-sm font-medium text-white"
              >
                How did you know us?
              </label>
              <input
                name="sourced_from"
                type="text"
                id="signup-sourced-from"
                required
                className="block w-full rounded-lg border border-borderline bg-formInput p-2.5 text-sm text-gray-100 placeholder-formPlaceholder"
                placeholder="e.g. YouTube, LinkedIn"
              />
            </div>
            {error && <p className="mb-4 text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary-500 px-5 py-2.5 font-medium text-white hover:bg-primary-600"
            >
              Get activation code
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;
